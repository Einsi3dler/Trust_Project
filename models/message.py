#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String


class Message(Base, Database):
    __tablename__ = 'Messages'
    user1_messages = Column(String(2048), nullable=True)
    user2_messages = Column(String(2048), nullable=True)


