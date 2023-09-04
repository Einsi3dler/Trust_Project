#!/usr/bin/python3
"""API for sellers"""

from models import storage
from models.conversation import Conversation
from models.user import User
from api.v1.views import chat_views, make_error
from flask import abort, jsonify, make_response


chat_views.strict_slashes = False

@chat_views.route("/<user_id>/conversations", methods=['GET'])
def get_conversation(user_id):
    """Get all user conversations"""
    user = list(storage.get(User, id=user_id).values())[0]
    if user is None:
        return make_error(400, "User not found")
    conversation_list = []
    for user_conversation in user.conversations:
        if user_id == user_conversation.sender_id:
            receiver = list(storage.get(User, user_conversation.receiver_id).values())[0]
            if receiver.to_dict() not in conversation_list:
                conversation_list.append(receiver.to_dict())
        elif user_id == user_conversation.receiver_id:
            sender = list(storage.get(User, user_conversation.sender_id).values())[0]
            if sender.to_dict() not in conversation_list:
                conversation_list.append(sender.to_dict())
    return jsonify(conversation_list)

@chat_views.route("/<sender_id>/<receiver_id>/messages", methods=['GET'])
def get_message(sender_id, receiver_id):
    """Get all user messages in a conversation"""
    user = list(storage.get(User, id=sender_id).values())[0]
    if user is None:
        return make_error(400, "User not found")

    conversation_list = []
    for user_conversation in user.conversations:
        if user_conversation.receiver_id == receiver_id:
            conversation_list.append(user_conversation.to_dict())

    return jsonify(conversation_list)
