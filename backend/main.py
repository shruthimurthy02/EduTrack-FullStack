"""
FastAPI application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import tasks

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="EduTrack API",
    description="CRUD API for managing tasks for students and teachers",
    version="1.0.0",
)

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include task routes
app.include_router(tasks.router)


@app.get("/")
def root():
    """
    Root endpoint to check if the API is running.

    Returns:
        Dict with API status message
    """
    return {"message": "EduTrack API running!"}


@app.get("/health")
def health_check():
    """
    Health check endpoint.

    Returns:
        Dict with API health status
    """
    return {"status": "healthy", "api": "EduTrack API"}
