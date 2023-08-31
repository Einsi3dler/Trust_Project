#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Seller(Base, Database):
    __tablename__ = "sellers"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    username = Column(String(128), nullable=False)
    good_service = Column(String(128), nullable=False)
    asking_price = Column(Integer, default=0, nullable=False)
    transaction = relationship("Transaction", backref="seller",
                               cascade="all, delete")

    def __init__(self, *args, **kwargs):
        """initializes Seller"""
        super().__init__(*args, **kwargs)

