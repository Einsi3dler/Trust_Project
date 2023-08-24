#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Integer


class Transaction(Base, Database):
    __tablename__ = 'Transactions'
    name = Column(String(128), nullable=False)
    buyer_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    seller_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    price = Column(Integer, nullable=False, default=0)
    description = Column(String(1024), nullable=True)

