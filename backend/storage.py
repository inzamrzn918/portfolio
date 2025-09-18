import json
from sys import prefix
import numpy as np
from threading import RLock
from pathlib import Path
from config import DATA_FOLDER, ARCHIVE_EMB_FILE, ARCHIVE_META_FILE
from utils import cosine_similarity


_lock = RLock()
_in_memory_chunks = [] # list of dict: {text, embedding (np.ndarray), source}



def preload_memory_cache():
    """Idempotent preload; safe to call on startup."""
    with _lock:
        loaded = 0
        for meta_file in DATA_FOLDER.glob("*_meta.json"):
            prefix = meta_file.stem.replace("_meta", "")
            if prefix == "archive":
                continue
            emb_file = DATA_FOLDER / f"{prefix}_emb.npz"
            if not emb_file.exists():
                continue

            with open(meta_file, 'r', encoding='utf-8') as f:
                meta = json.load(f)
            embs = np.load(emb_file)["embeddings"].astype(np.float32)

            for m, e in zip(meta, embs):
                _in_memory_chunks.append({"text": m["text"], "embedding": e, "source": prefix})
                loaded += 1
        return loaded   # return actual count instead of just True/False


def save_chunks_to_disk(prefix: str, chunk_texts: list, chunk_embeddings: np.ndarray):
    emb_file = DATA_FOLDER / f"{prefix}_emb.npz"
    meta_file = DATA_FOLDER / f"{prefix}_meta.json"

    with _lock:
        # Save embeddings
        if emb_file.exists():
            existing = np.load(emb_file)["embeddings"].astype(np.float32)
            chunk_embeddings = np.vstack([existing, chunk_embeddings])
        np.savez_compressed(emb_file, embeddings=chunk_embeddings)

        # Save metadata
        if meta_file.exists():
            with open(meta_file, 'r', encoding='utf-8') as f:
                meta = json.load(f)
            meta.extend([{"text": t, "source": prefix} for t in chunk_texts])
        else:
            meta = [{"text": t, "source": prefix} for t in chunk_texts]

        with open(meta_file, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False)



def archive_append(meta_list: list, emb_array: np.ndarray):
    if ARCHIVE_EMB_FILE.exists():
        existing = np.load(ARCHIVE_EMB_FILE)["embeddings"].astype(np.float32)
        emb_array = np.vstack([existing, emb_array])
        np.savez_compressed(ARCHIVE_EMB_FILE, embeddings=emb_array)


    if ARCHIVE_META_FILE.exists():
        with open(ARCHIVE_META_FILE, 'r', encoding='utf-8') as f:
            existing_meta = json.load(f)
            meta_list = existing_meta + meta_list
        with open(ARCHIVE_META_FILE, 'w', encoding='utf-8') as f:
            json.dump(meta_list, f, ensure_ascii=False)


def retrieve_dynamic(embedding_client, query: str, 
                     base_k: int = 20, 
                     max_k: int = 50, 
                     threshold: float = 0.25, 
                     search_archive: bool = True):
    """
    Dynamically retrieves relevant chunks:
    - Always returns at least base_k.
    - Expands until max_k or similarity threshold reached.
    """
    query_emb = embedding_client.embed_query(query)
    if query_emb is None:
        print(f"[WARN] Embedding client returned None for query: {query}")
        return []

    if not isinstance(query_emb, np.ndarray):
        query_emb = np.array(query_emb, dtype=np.float32)

    sims = []
    for c in _in_memory_chunks:
        try:
            score = cosine_similarity(query_emb, c['embedding'])
            sims.append((c, score))
        except Exception as e:
            print(f"[ERR] Failed sim for chunk: {c.get('text')[:50]}... error: {e}")

    sims.sort(key=lambda x: x[1], reverse=True)

    # Start with base_k
    results = [c for c, s in sims[:base_k]]

    # Expand dynamically if more chunks are above threshold
    for c, s in sims[base_k:]:
        if s >= threshold and len(results) < max_k:
            results.append(c)
        else:
            break

    print(f"[DEBUG] Dynamic retrieval: base_k={base_k}, max_k={max_k}, "
          f"threshold={threshold}, got={len(results)} for query='{query}'")

    # Archive fallback
    if search_archive and len(results) < base_k and ARCHIVE_EMB_FILE.exists():
        arch_embs = np.load(ARCHIVE_EMB_FILE)["embeddings"].astype(np.float32)
        with open(ARCHIVE_META_FILE, 'r', encoding='utf-8') as f:
            arch_meta = json.load(f)

        arch_sims = []
        for m, emb in zip(arch_meta, arch_embs):
            try:
                score = cosine_similarity(query_emb, emb)
                arch_sims.append((m, score))
            except Exception as e:
                print(f"[ERR] Archive sim failed: {e}")

        arch_sims.sort(key=lambda x: x[1], reverse=True)
        for m, s in arch_sims:
            if len(results) >= base_k:
                break
            results.append({
                "text": m["text"],
                "source": m.get("source", "archive"),
                "embedding": None
            })

    return results




def retrieve_top_k(embedding_client, query: str, k: int = 6, search_archive: bool = True):
    query_emb = embedding_client.embed_query(query)
    if query_emb is None:
        print(f"[WARN] Embedding client returned None for query: {query}")
        return []

    if not isinstance(query_emb, np.ndarray):
        query_emb = np.array(query_emb, dtype=np.float32)

    sims = []
    for c in _in_memory_chunks:
        try:
            score = cosine_similarity(query_emb, c['embedding'])
            sims.append((c, score))
        except Exception as e:
            print(f"[ERR] Failed sim for chunk: {c.get('text')[:50]}... error: {e}")

    sims.sort(key=lambda x: x[1], reverse=True)
    results = [c for c, s in sims[:k]]

    print(f"[DEBUG] Top-k={k}, got {len(results)} results for query='{query}'")

    # Archive fallback
    if search_archive and len(results) < k and ARCHIVE_EMB_FILE.exists():
        arch_embs = np.load(ARCHIVE_EMB_FILE)["embeddings"].astype(np.float32)
        with open(ARCHIVE_META_FILE, 'r', encoding='utf-8') as f:
            arch_meta = json.load(f)

        arch_sims = []
        for m, emb in zip(arch_meta, arch_embs):
            try:
                score = cosine_similarity(query_emb, emb)
                arch_sims.append((m, score))
            except Exception as e:
                print(f"[ERR] Archive sim failed: {e}")

        arch_sims.sort(key=lambda x: x[1], reverse=True)
        for m, s in arch_sims:
            if len(results) >= k:
                break
            results.append({
                "text": m["text"],
                "source": m.get("source", "archive"),
                "embedding": None
            })

    return results
