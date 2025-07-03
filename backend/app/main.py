from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import notes, users
from app.db import connect_to_mongo, close_mongo_connection
import logging

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app instance
app = FastAPI(
    title="GenMed AI Backend",
    description="A Generative AI-powered assistant for rural healthcare in India",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB at startup
@app.on_event("startup")
async def startup_db():
    await connect_to_mongo()
    logger.info("MongoDB connected successfully.")

# Disconnect MongoDB at shutdown
@app.on_event("shutdown")
async def shutdown_db():
    await close_mongo_connection()
    logger.info("MongoDB connection closed.")

# Include API routes
app.include_router(users.router)
app.include_router(notes.router)

# Root check endpoint
@app.get("/")
def root():
    return {"message": "GenMed API is running"}
