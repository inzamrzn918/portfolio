from fastapi import APIRouter, UploadFile, BackgroundTasks
from pathlib import Path
from processing import process_file
from embedding import EmbeddingClient
from storage import save_chunks_to_disk, _in_memory_chunks
from config import SIM_THRESHOLD


router = APIRouter()
_embedding_client = EmbeddingClient()


@router.post("/upload")
async def upload_file(file: UploadFile, background_tasks: BackgroundTasks):
    temp_path = Path(f"temp_{file.filename}")
    with temp_path.open('wb') as f:
        f.write(await file.read())
        # schedule background processing
        background_tasks.add_task(process_file, temp_path, file.filename, _embedding_client, save_chunks_to_disk, _in_memory_chunks, SIM_THRESHOLD)
    return {"status": "processing started", "file": file.filename}