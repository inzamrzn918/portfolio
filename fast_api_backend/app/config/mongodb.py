from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

    @classmethod
    async def connect_to_mongo(cls):
        # Get MongoDB URI from environment variable
        mongodb_uri = os.getenv("MONGODB_URI")
        # print(f"Connecting to MongoDB at {mongodb_uri}")
        if not mongodb_uri:
            raise ValueError("MONGODB_URI environment variable is not set")

        # Create async MongoDB client
        cls.client = AsyncIOMotorClient(
            mongodb_uri, 
            server_api=ServerApi('1'),
            tls=True,
            tlsAllowInvalidCertificates=True
            )
        cls.database = cls.client.portfolio  # database name
        
        # Verify connection
        try:
            await cls.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise

    @classmethod
    async def close_mongo_connection(cls):
        if cls.client:
            await cls.client.close()