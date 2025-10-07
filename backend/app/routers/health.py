"""
Rotas para health check e status do sistema
"""
from fastapi import APIRouter
from app.core.redis_client import get_redis_info

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/")
async def health_check():
    """Health check geral da aplicação"""
    return {"status": "healthy", "service": "FastAPI Backend"}


@router.get("/redis")
async def redis_status():
    """Status da conexão Redis"""
    redis_info = get_redis_info()
    return {"redis": redis_info}


@router.get("/detailed")
async def detailed_health():
    """Health check detalhado com informações do sistema"""
    redis_info = get_redis_info()
    
    return {
        "status": "healthy",
        "service": "FastAPI Backend",
        "components": {
            "database": "sqlite (connected)",
            "redis": redis_info,
            "authentication": "JWT (active)"
        }
    }