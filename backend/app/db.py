# app/db.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# Use the correct env variable name you have set
MONGO_DETAILS = os.getenv("MONGO_URL") or os.getenv("MONGODB_URI")

if not MONGO_DETAILS:
    raise ValueError("MongoDB connection string is missing in environment variables")

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.get_default_database()  # This picks DB from URI if specified, else default

async def connect_to_mongo():
    try:
        # Ping to verify connection
        await client.admin.command('ping')
        print("Connected to MongoDB successfully.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        raise e

async def close_mongo_connection():
    client.close()
