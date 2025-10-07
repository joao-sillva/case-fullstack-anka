"""
FastAPI application entry point
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.database import engine, Base
from app.models import *  # Import all models to register them
from app.routers import auth, users, health

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for FastAPI app"""
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown (if needed)
    pass


app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="Backend API para gerenciamento de ativos financeiros",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(health.router)




@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "API de Ativos Financeiros está funcionando!", "version": settings.version}


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)