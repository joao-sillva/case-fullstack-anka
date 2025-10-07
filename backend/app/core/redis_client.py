"""
Cliente Redis para cache
"""
import redis
import json
from typing import Any, Optional
from app.core.config import get_settings

settings = get_settings()

# Configurar cliente Redis
try:
    redis_client = redis.Redis(
        host=settings.redis_host,
        port=settings.redis_port,
        db=settings.redis_db,
        decode_responses=True,
        socket_connect_timeout=5,
        socket_timeout=5,
        health_check_interval=30
    )
    # Testar conexão
    redis_client.ping()
    REDIS_AVAILABLE = True
except (redis.ConnectionError, redis.TimeoutError):
    REDIS_AVAILABLE = False
    redis_client = None


def get_cache(key: str) -> Optional[Any]:
    """Obter valor do cache Redis"""
    if not REDIS_AVAILABLE or not redis_client:
        return None
    
    try:
        value = redis_client.get(key)
        if value:
            return json.loads(value)
        return None
    except (redis.RedisError, json.JSONDecodeError):
        return None


def set_cache(key: str, value: Any, expire: int = 300) -> bool:
    """Definir valor no cache Redis com expiração (padrão: 5 minutos)"""
    if not REDIS_AVAILABLE or not redis_client:
        return False
    
    try:
        serialized = json.dumps(value, default=str)
        return redis_client.setex(key, expire, serialized)
    except (redis.RedisError, json.JSONEncodeError):
        return False


def delete_cache(key: str) -> bool:
    """Deletar chave do cache Redis"""
    if not REDIS_AVAILABLE or not redis_client:
        return False
    
    try:
        return bool(redis_client.delete(key))
    except redis.RedisError:
        return False


def clear_cache_pattern(pattern: str) -> bool:
    """Limpar cache por padrão (ex: 'users:*')"""
    if not REDIS_AVAILABLE or not redis_client:
        return False
    
    try:
        keys = redis_client.keys(pattern)
        if keys:
            return bool(redis_client.delete(*keys))
        return True
    except redis.RedisError:
        return False


def get_redis_info() -> dict:
    """Obter informações do Redis para health check"""
    if not REDIS_AVAILABLE or not redis_client:
        return {"status": "unavailable"}
    
    try:
        info = redis_client.info()
        return {
            "status": "connected",
            "version": info.get("redis_version"),
            "memory_used": info.get("used_memory_human")
        }
    except redis.RedisError:
        return {"status": "error"}