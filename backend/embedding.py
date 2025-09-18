import numpy as np
from langchain_huggingface import HuggingFaceEmbeddings
from concurrent.futures import ThreadPoolExecutor


_executor = ThreadPoolExecutor(max_workers=4)


class EmbeddingClient:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self._client = HuggingFaceEmbeddings(model_name=model_name)


    def embed_documents(self, docs: list) -> np.ndarray:
    # run in threadpool because underlying client is blocking
        return np.array(self._client.embed_documents(docs), dtype=np.float32)


    def embed_query(self, text: str) -> np.ndarray:
        return self.embed_documents([text])[0]