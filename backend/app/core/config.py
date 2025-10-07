"""
Configuração da aplicação
"""
import os
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    
    # JWT Settings
    secret_key: str = os.getenv("SESSION_SECRET", "default-secret-key")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Database - Force SQLite for this implementation
    database_url: str = "sqlite:///./app.db"
    
    # Redis
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    
    # App Settings
    app_name: str = "Financial Assets Management API"
    version: str = "1.0.0"


@lru_cache()
def get_settings():
    return Settings()