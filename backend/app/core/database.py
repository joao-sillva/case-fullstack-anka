"""
Configuração do banco de dados SQLAlchemy 2
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import get_settings
import os

settings = get_settings()

# Use environment DATABASE_URL if available, otherwise fallback to SQLite
database_url = os.getenv("DATABASE_URL")
if not database_url or database_url.startswith("postgresql"):
    # Force SQLite for this implementation
    database_url = "sqlite:///./app.db"

# Create database engine with SQLAlchemy 2 practices
engine = create_engine(
    database_url,
    future=True,  # SQLAlchemy 2.x style
    connect_args={"check_same_thread": False} if database_url.startswith("sqlite") else {}
)

# Create session with SQLAlchemy 2.x practices
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    future=True  # SQLAlchemy 2.x style
)

# Create base class for models
Base = declarative_base()


def get_db():
    """Dependency para obter sessão do banco"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()