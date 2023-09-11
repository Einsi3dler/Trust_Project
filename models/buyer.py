#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Buyer(Base, Database):
    __tablename__ = "buyers"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    email = Column(String(128), nullable=False)
    paystack_id = Column(String(60), nullable=True)
    transaction = relationship("Transaction", backref="buyer",
                               cascade="all, delete")

    def __init__(self, *args, **kwargs):
        """initializes Buyer"""
        super().__init__(*args, **kwargs)

