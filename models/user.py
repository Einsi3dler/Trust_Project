#!/usr/bin/python3

from models.base import Base, Database
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from hashlib import md5
from flask_login import UserMixin



user_message = Table('user_message', Database.metadata,
                          Column('user_id', String(60),
                                 ForeignKey('users.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True),
                          Column('conversation_id', String(60),
                                 ForeignKey('conversations.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True))


class User(Base, Database, UserMixin):
    __tablename__ = 'users'
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    facebook_handle = Column(String(128), nullable=True)
    twitter_handle = Column(String(128), nullable=True)
    instagram_handle = Column(String(128), nullable=True)
    seller = relationship("Seller", backref="users",
                                cascade="all, delete")
    buyer = relationship("Buyer", backref="users",
                                cascade="all, delete")

    conversations = relationship("Conversation", order_by="Conversation.created_at",
                                 secondary="user_message",
                                viewonly=False)

    def __init__(self, *args, **kwargs):
        """initializes User"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
