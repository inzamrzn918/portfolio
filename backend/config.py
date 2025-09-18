from pathlib import Path
import os
from dotenv import load_dotenv


load_dotenv()


DATA_FOLDER = Path(os.getenv('DATA_FOLDER', 'storage'))
DATA_FOLDER.mkdir(exist_ok=True)
ARCHIVE_EMB_FILE = DATA_FOLDER / "archive_emb.npz"
ARCHIVE_META_FILE = DATA_FOLDER / "archive_meta.json"
EMBED_DIM = int(os.getenv('EMBED_DIM', '384'))
SIM_THRESHOLD = float(os.getenv('SIM_THRESHOLD', '0.90'))
MAX_IN_MEMORY_CHUNKS = int(os.getenv('MAX_IN_MEMORY_CHUNKS', '50000'))
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')