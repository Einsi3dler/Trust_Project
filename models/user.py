#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from hashlib import md5


class User(Base, Database):
    __tablename__ = 'users'
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    facebook_handle = Column(String(128), nullable=True)
    twitter_handle = Column(String(128), nullable=True)
    instagram_handle = Column(String(128), nullable=True)
    transactions = relationship("Transaction", backref="place",
                                cascade="all, delete")
