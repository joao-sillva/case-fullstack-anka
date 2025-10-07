"""
Modelo de ativo financeiro
"""
from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    exchange = Column(String, nullable=False)
    currency = Column(String, nullable=False)