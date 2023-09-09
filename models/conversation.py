#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Conversation(Base, Database):
    __tablename__ = 'conversations'
    message = Column(String(2048), nullable=True)
    sender_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    receiver_id = Column(String(60), ForeignKey('users.id'), nullable=False)

    sender = relationship("User", backref="sender", foreign_keys=[sender_id])
    receiver = relationship("User", backref="receiver", foreign_keys=[receiver_id])

    def __init__(self, *args, **kwargs):
        """initializes Conversation"""
        super().__init__(*args, **kwargs)

