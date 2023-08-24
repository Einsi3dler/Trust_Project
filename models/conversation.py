#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Conversation(Base, Database):
    __tablename__ = 'conversation'
    user1_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user2_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    messages = relationship("Message", backref="conversation",
                                cascade="all, delete")


