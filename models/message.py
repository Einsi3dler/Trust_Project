#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey


class Message(Base, Database):
    __tablename__ = 'Messages'
    conversation_id = Column(String(60), ForeignKey("Conversations.id"), nullable=False)
    user1_message = Column(String(2048), nullable=True)
    user2_message = Column(String(2048), nullable=True)


    def __init__(self, *args, **kwargs):
        """initializes Messages"""
        super().__init__(*args, **kwargs)
