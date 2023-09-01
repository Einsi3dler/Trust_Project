#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Conversation(Base, Database):
    __tablename__ = 'Conversations'
    name = Column(String(60), nullable=False)
    chatted_user_id =  Column(String(60), ForeignKey("users.id"), nullable=False)
    messages = relationship("Message", backref="conversation",
                            cascade="all, delete")

    def __init__(self, *args, **kwargs):
        """initializes Conversation"""
        super().__init__(*args, **kwargs)

