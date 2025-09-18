from pathlib import Path
import pdfplumber
from pdf2image import convert_from_path
import pytesseract
import re
from embedding import EmbeddingClient
from storage import save_chunks_to_disk

def extract_text(file_path: Path) -> str:
    text = ''
    if file_path.suffix.lower() == '.pdf':
        try:
            with pdfplumber.open(file_path) as pdf:
                for p in pdf.pages:
                    text += p.extract_text() or ''
        except Exception:
            text = ''
            if not text.strip():
                images = convert_from_path(str(file_path))
                ocr_texts = [pytesseract.image_to_string(img, lang='eng') for img in images]
                text = '\n'.join(ocr_texts)
    else:
        text = file_path.read_text(encoding='utf-8', errors='ignore')
    return text.strip()


def chunk_text(text: str, max_chars: int = 800):
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

async def filter_new_chunks(chunks: list, source_file: str, embedding_client: EmbeddingClient, in_memory_chunks_ref: list, sim_threshold: float):
    import numpy as np
    new_chunks = []
    if not chunks:
        return new_chunks, np.empty((0,))


    chunk_embeddings = embedding_client.embed_documents(chunks)
    for chunk, chunk_emb in zip(chunks, chunk_embeddings):
        if any(np.dot(chunk_emb, existing['embedding']) / (np.linalg.norm(chunk_emb) * np.linalg.norm(existing['embedding'])) >= sim_threshold for existing in in_memory_chunks_ref):
            continue
        new_chunks.append({
        'text': chunk,
        'embedding': chunk_emb,
        'source': source_file
        })
    return new_chunks, np.array([c['embedding'] for c in new_chunks], dtype=np.float32)

async def process_file(temp_path: Path, filename: str, embedding_client: EmbeddingClient, storage_save_fn, in_memory_chunks_ref, sim_threshold: float):
    text = extract_text(temp_path)
    chunks = chunk_text(text)
    new_chunks, emb_array = await filter_new_chunks(chunks, filename, embedding_client, in_memory_chunks_ref, sim_threshold)
    if new_chunks:
        storage_save_fn(filename.replace(' ', '_'), [c['text'] for c in new_chunks], emb_array)
        in_memory_chunks_ref.extend(new_chunks)
    try:
        temp_path.unlink()
    except Exception:
        pass