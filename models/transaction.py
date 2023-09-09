#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Integer


class Transaction(Base, Database):
    __tablename__ = 'transactions'
    name = Column(String(128), nullable=False)
    buyer_id = Column(String(60), ForeignKey('buyers.id'), nullable=False)
    seller_id = Column(String(60), ForeignKey('sellers.id'), nullable=False)
    agreed_price = Column(Integer, nullable=False, default=0)
    item = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes Transaction"""
        super().__init__(*args, **kwargs)
