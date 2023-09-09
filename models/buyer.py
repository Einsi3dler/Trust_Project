#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Buyer(Base, Database):
    __tablename__ = "buyers"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    transaction = relationship("Transaction", backref="buyer",
                               cascade="all, delete")
    good_service = Column(String(128), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Buyer"""
        super().__init__(*args, **kwargs)

