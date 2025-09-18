from fastapi import FastAPI
from storage import preload_memory_cache
from routes.upload import router as upload_router
from routes.chat import router as chat_router
import asyncio


app = FastAPI()
app.include_router(upload_router)
app.include_router(chat_router)


@app.on_event('startup')
async def startup_event():
    count = preload_memory_cache()
    print(f'Preloaded {count} chunks into memory')