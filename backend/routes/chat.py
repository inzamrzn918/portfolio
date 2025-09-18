import traceback
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
import re
import uuid
from promopts import generate_prompt
from storage import retrieve_dynamic
from embedding import EmbeddingClient
from config import GEMINI_API_KEY
from langchain_google_genai import ChatGoogleGenerativeAI


router = APIRouter()
_llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0.7,
)
_embedding_client = EmbeddingClient()

_connections = {}


@router.websocket("/chat")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    conn_id = str(uuid.uuid4())
    _connections[conn_id] = {"history": []}

    await websocket.send_text("✅ Connected to INZA AI, The AI Assistant")

    try:
        while True:
            try:
                data = await websocket.receive_text()
            except WebSocketDisconnect:
                break

            if not data.strip():
                continue

            # RAG retrieval
            top_docs = retrieve_dynamic(_embedding_client, data)
            if not top_docs:
                await websocket.send_json({
                    "direct_answer": "I don't have that information at the moment.",
                    "source": "Not Found",
                    "confidence": "Low",
                    "notes": "No relevant info found in resume or fallback sources.",
                })
                continue

            # Prompt assembly
            prompt = generate_prompt(
                data,
                [d["text"] for d in top_docs],
                _connections[conn_id]["history"],
            )

            # Run LLM in executor
            loop = asyncio.get_running_loop()
            try:
                resp = await loop.run_in_executor(None, lambda: _llm.invoke(prompt))
            except Exception as e:
                await websocket.send_json({
                    "direct_answer": "LLM call failed.",
                    "source": "System",
                    "confidence": "Low",
                    "notes": str(e),
                })
                continue

            # Normalize content
            content = getattr(resp, "content", resp)
            if not isinstance(content, str):
                try:
                    content = json.dumps(content)
                except Exception:
                    content = str(content)

            # Try to parse JSON
            response = None
            match = re.search(r"```(?:json)?\s*(.*?)\s*```", content, re.DOTALL)
            if match:
                try:
                    response = json.loads(match.group(1))
                except Exception:
                    pass

            if response is None:
                try:
                    response = json.loads(content)
                except Exception:
                    response = {
                        "direct_answer": "I couldn't generate a valid response. Please try rephrasing your question.",
                        "source": "Other",
                        "confidence": "Low",
                        "notes": "Invalid JSON format received.",
                    }

            # Track history
            _connections[conn_id]["history"].append(f"User: {data}")
            _connections[conn_id]["history"].append(f"Bot: {response.get('direct_answer', '')}")

            await websocket.send_json(response)

    except Exception as e:
        traceback.print_exc()
        await websocket.send_json({
            "direct_answer": "Connection closed or error occurred.",
            "source": "Other",
            "confidence": "Low",
            "notes": str(e),
        })

    finally:
        # Cleanup
        _connections.pop(conn_id, None)
        await websocket.close()
