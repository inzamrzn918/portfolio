from collections import defaultdict
import os
import traceback
from fastapi import BackgroundTasks, FastAPI, UploadFile, WebSocket
from pathlib import Path
from pdf2image import convert_from_path
import pdfplumber, re, asyncio, json, numpy as np
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from typing import List
from pydantic import BaseModel
from duckduckgo_search import DDGS
import pytesseract  # lightweight web search

load_dotenv()

app = FastAPI()


# ----------------------------
# PROMPTS
# ----------------------------
def generate_prompt(
    system_prompt: str,
    user_question: str,
    context_chunks: List[str],
    history: List[str],
    max_context_chars: int = 2000
) -> str:
    """Generate a final LLM prompt combining system instructions, context, history, and user question."""
    # Concatenate history
    history_text = "\n".join(history[-5:])  # keep last 5 exchanges
    
    # Concatenate context
    context_text = "\n\n".join(context_chunks)
    if len(context_text) > max_context_chars:
        context_text = context_text[-max_context_chars:]

    prompt = (
        f"{system_prompt}\n\n"
        f"Conversation History:\n{history_text}\n\n"
        f"Context:\n{context_text}\n\n"
        f"Question: {user_question}\n\n"
        f"Answer (valid JSON only):"
    )
    return prompt


# ----------------------------
# CONFIG
# ----------------------------
EMBED_DIM = 384
SIM_THRESHOLD = 0.9
MAX_IN_MEMORY_CHUNKS = 50000
DATA_FOLDER = Path("storage")
DATA_FOLDER.mkdir(exist_ok=True)
ARCHIVE_EMB_FILE = DATA_FOLDER / "archive_emb.npz"
ARCHIVE_META_FILE = DATA_FOLDER / "archive_meta.json"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0.5
)

emb = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
lock = asyncio.Lock()
in_memory_chunks = []  # list of dict: {"text":..., "embedding": np.array, "source":...}
chat_histories = defaultdict()  # per-connection chat history


# ----------------------------
# UTILITIES
# ----------------------------
def extract_text(file_path: Path) -> str:
    text = ""
    if file_path.suffix.lower() == ".pdf":
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""
        except Exception as e:
            print(f"[extract_text] pdfplumber failed: {e}")

        # OCR fallback if no text
        if not text.strip():
            print("[extract_text] No text extracted, using OCR fallback...")
            try:
                images = convert_from_path(str(file_path))
                ocr_texts = [pytesseract.image_to_string(img, lang="eng") for img in images]
                text = "\n".join(ocr_texts)
            except Exception as e:
                print(f"[extract_text] OCR failed: {e}")
    else:
        text = file_path.read_text(encoding="utf-8", errors="ignore")

    return text.strip()

def chunk_text(text, max_chars=800):
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks, cur = [], ''
    for s in sentences:
        if len(cur) + len(s) <= max_chars:
            cur += (' ' if cur else '') + s
        else:
            chunks.append(cur)
            cur = s
    if cur:
        chunks.append(cur)
    return chunks

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def save_to_disk_incremental(chunk_texts, chunk_embeddings, source_file):
    prefix = source_file.replace(" ", "_")
    emb_file = DATA_FOLDER / f"{prefix}_emb.npz"
    meta_file = DATA_FOLDER / f"{prefix}_meta.json"

    if emb_file.exists():
        existing_embs = np.load(emb_file)["embeddings"].astype(np.float32)
        chunk_embeddings = np.vstack([existing_embs, chunk_embeddings])
    np.savez_compressed(emb_file, embeddings=chunk_embeddings)

    if meta_file.exists():
        with open(meta_file, "r", encoding="utf-8") as f:
            meta = json.load(f)
        meta.extend([{"text": t} for t in chunk_texts])
    else:
        meta = [{"text": t} for t in chunk_texts]
    with open(meta_file, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False)

async def prune_memory():
    global in_memory_chunks
    async with lock:
        if len(in_memory_chunks) <= MAX_IN_MEMORY_CHUNKS:
            return
        excess = len(in_memory_chunks) - MAX_IN_MEMORY_CHUNKS
        to_archive = in_memory_chunks[:excess]
        in_memory_chunks = in_memory_chunks[excess:]

    emb_to_archive = np.array([c["embedding"] for c in to_archive], dtype=np.float32)
    meta_to_archive = [{"text": c["text"], "source": c["source"]} for c in to_archive]

    if ARCHIVE_EMB_FILE.exists():
        existing_embs = np.load(ARCHIVE_EMB_FILE)["embeddings"].astype(np.float32)
        emb_to_archive = np.vstack([existing_embs, emb_to_archive])
    np.savez_compressed(ARCHIVE_EMB_FILE, embeddings=emb_to_archive)

    if ARCHIVE_META_FILE.exists():
        with open(ARCHIVE_META_FILE, "r", encoding="utf-8") as f:
            existing_meta = json.load(f)
        meta_to_archive = existing_meta + meta_to_archive
    with open(ARCHIVE_META_FILE, "w", encoding="utf-8") as f:
        json.dump(meta_to_archive, f, ensure_ascii=False)

async def filter_new_chunks(chunks, source_file):
    global in_memory_chunks
    new_chunks = []
    chunk_embeddings = np.array(emb.embed_documents(chunks), dtype=np.float32)

    async with lock:
        for chunk, chunk_emb in zip(chunks, chunk_embeddings):
            if any(cosine_similarity(chunk_emb, existing["embedding"]) >= SIM_THRESHOLD for existing in in_memory_chunks):
                continue
            new_chunks.append({
                "text": chunk,
                "embedding": chunk_emb,
                "source": source_file
            })
        in_memory_chunks.extend(new_chunks)
    return new_chunks

async def preload_memory_cache():
    global in_memory_chunks
    for meta_file in DATA_FOLDER.glob("*_meta.json"):
        prefix = meta_file.stem.replace("_meta", "")
        if prefix == "archive":
            continue
        emb_file = DATA_FOLDER / f"{prefix}_emb.npz"
        if not emb_file.exists():
            continue
        with open(meta_file, "r", encoding="utf-8") as f:
            meta = json.load(f)
        embeddings = np.load(emb_file)["embeddings"].astype(np.float32)
        for m, e in zip(meta, embeddings):
            in_memory_chunks.append({"text": m["text"], "embedding": e, "source": prefix})
    print(f"Preloaded {len(in_memory_chunks)} chunks into memory.")

def retrieve_top_k(query, k=6, search_archive=False):
    print(f"[retrieve_top_k] Query: {query}")
    print(f"[retrieve_top_k] Memory chunks available: {len(in_memory_chunks)}")
    query_emb = np.array(emb.embed_documents([query]), dtype=np.float32)[0]
    sims = [(c, cosine_similarity(query_emb, c["embedding"])) for c in in_memory_chunks]
    sims.sort(key=lambda x: x[1], reverse=True)
    results = [c for c, s in sims[:k]]

    if search_archive and len(results) < k and ARCHIVE_EMB_FILE.exists():
        print(f"[retrieve_top_k] Searching archive for more results...")
        arch_embs = np.load(ARCHIVE_EMB_FILE)["embeddings"].astype(np.float32)
        with open(ARCHIVE_META_FILE, "r", encoding="utf-8") as f:
            arch_meta = json.load(f)
        arch_sims = [(c, cosine_similarity(query_emb, emb)) for c, emb in zip(arch_meta, arch_embs)]
        arch_sims.sort(key=lambda x: x[1], reverse=True)
        for c, s in arch_sims:
            if len(results) >= k:
                break
            results.append({"text": c["text"], "source": c["source"], "embedding": None})
    return results

def web_search_fallback(query: str, max_results=3):
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            results.append({"text": r["body"], "source": r["href"]})
    return results


# ------------------
# UPLOAD
#-------------------
async def process_file(temp_path: Path, filename: str):
    text = extract_text(temp_path)
    chunks = chunk_text(text)
    new_chunks = await filter_new_chunks(chunks, filename)
    if new_chunks:
        save_to_disk_incremental(
            [c["text"] for c in new_chunks],
            np.array([c["embedding"] for c in new_chunks], dtype=np.float32),
            filename
        )
    temp_path.unlink()

# ----------------------------
# ENDPOINTS
# ----------------------------
@app.on_event("startup")
async def startup_event():
    await preload_memory_cache()

@app.post("/upload/")
async def upload_file(file: UploadFile, background_tasks: BackgroundTasks):
    temp_path = Path(f"temp_{file.filename}")
    with temp_path.open("wb") as f:
        f.write(await file.read())
    background_tasks.add_task(process_file, temp_path, file.filename)
    return {"status": "processing started", "file": file.filename}

@app.websocket("/chat")
async def chat_endpoint(websocket: WebSocket):
    from promopts import sys_prompts
    await websocket.accept()
    await websocket.send_text("Connected to in-memory RAG chatbot.")
    chat_histories[id(websocket)] = []
    try:
        while True:
            data = await websocket.receive_text()
            if not data.strip():
                continue
            top_docs = retrieve_top_k(data, k=6, search_archive=True)
            if not top_docs:
                await websocket.send_json({
                    "direct_answer": "I don't have that information at the moment.",
                    "source": "Not Found",
                    "confidence": "Low",
                    "notes": "No relevant info found in resume or fallback sources."
                })
                continue

            # Call LLM
            prompt = generate_prompt(sys_prompts, data, [d["text"] for d in top_docs], history=chat_histories.get(id(websocket), []))
            resp = await asyncio.to_thread(
                lambda: llm.invoke(prompt)
            )

            # Extract JSON response
            match = re.search(r"```(?:json)?\s*(.*?)\s*```", resp.content, re.DOTALL)
            if match:
                response = json.loads(match.group(1))
            else:
                try:
                    response = json.loads(resp.content)
                except:
                    response = {
                        "direct_answer": "I couldn't generate a valid response. Please try rephrasing your question.",
                        "source": "Other",
                        "confidence": "Low",
                        "notes": "Invalid JSON format received."
                    }

            # Save history
            chat_histories[id(websocket)].append(f"User: {data}")
            chat_histories[id(websocket)].append(f"Bot: {response.get('direct_answer', '')}")

            await websocket.send_json(response)

    except Exception as e:
        await websocket.send_json({
            "direct_answer": "Connection closed or error occurred.",
            "source": "Other",
            "confidence": "Low",
            "notes": str(e)
        })
        traceback.print_exc()
        await websocket.close()
