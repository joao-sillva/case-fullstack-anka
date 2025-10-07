"""
Modelo de transação (depósitos/saques)
"""
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    type = Column(String, nullable=False)  # 'deposit' ou 'withdrawal'
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    note = Column(String, nullable=True)
    
    # Relacionamento
    client = relationship("Client", backref="transactions")