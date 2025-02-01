from collections import defaultdict
import datetime
from typing import Any, Dict, List
from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from app.config.mongodb import MongoDB
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from app.services.watcher import RequestWatcher
import asyncio

app = FastAPI()
watcher = RequestWatcher()
watcher_task = None

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

request_store = defaultdict(lambda: None)  # IP -> last request timestamp

def has_requested_today(ip_address: str) -> bool:
    """ Check if the IP address has made a request today """
    last_request = request_store[ip_address]
    if last_request:
        try:
            # Parse the stored timestamp and get current UTC time
            last_request_date = datetime.datetime.fromisoformat(last_request).replace(tzinfo=datetime.UTC)
            now = datetime.datetime.now(datetime.UTC)

            # Check if the last request was made today (UTC)
            return last_request_date.date() == now.date()
        except ValueError:
            # Handle invalid timestamp format
            print(f"Invalid timestamp format for IP: {ip_address}")
            return False
    return False

def serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Convert MongoDB document to serializable dict"""
    doc['_id'] = str(doc['_id'])
    return doc

@app.post("/store_request_data", response_model=Dict[str, Any])
async def store_request_data(data: Dict[str, Any], request: Request):
    ip_address =  request.client.host
    timestamp = data.get("timestamp")
    print(f"Received request from IP: {ip_address}, timestamp: {timestamp}")
    if has_requested_today(ip_address):
        raise HTTPException(status_code=200, detail="Request already made today from this IP.")
    
    # Store the new request data
    request_store[ip_address] = ip_address
    collection = MongoDB.database.requests
    metadata = {
        "headers": dict(request.headers),
        "client": request.client.host
    }
    data["metadata"] = metadata
    result = await collection.insert_one(data)
    return {"message": "Data stored successfully", "id": str(result.inserted_id)}

@app.get("/get_request_data", response_model=List[Dict[str, Any]])
async def get_request_data():
    collection = MongoDB.database.requests
    cursor = collection.find()
    data = await cursor.to_list(length=None)
    return [serialize_doc(doc) for doc in data]

@app.get("/get_client_ip")
async def get_client_ip(request: Request):
    """ Endpoint to get the client's IP address (for testing purposes) """
    client_ip = request.client.host
    return {"ip": client_ip}

@app.on_event("startup")
async def startup_db_client():
    global watcher_task
    await MongoDB.connect_to_mongo()
    collection = MongoDB.database.requests
    # Start watcher in background
    watcher_task = asyncio.create_task(watcher.start_watching(collection))

@app.on_event("shutdown")
async def shutdown_db_client():
    global watcher_task
    # Cancel watcher task if running
    if watcher_task:
        watcher_task.cancel()
        try:
            await watcher_task
        except asyncio.CancelledError:
            pass
    # Close MongoDB connection
    await MongoDB.close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "FastAPI with MongoDB backend"}

@app.post("/drop_db")
async def root(data: Dict[str, Any]):
    if data.get("secret") == "delete_secret":
        await MongoDB.database.requests.drop()
        return {"message": "Database dropped successfully"}
    return {"message": "FastAPI with MongoDB backend"}
