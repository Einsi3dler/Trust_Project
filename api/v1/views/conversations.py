#!/usr/bin/python3
"""API for sellers"""

from models import storage
from models.conversation import Conversation
from models.user import User
from api.v1.views import chat_views, make_error
from flask import jsonify, make_response


chat_views.strict_slashes = False

@chat_views.route("/<user_id>/conversations", methods=['GET'])
def get_conversation(user_id):
    """Get all user conversations"""
    user = list(storage.get(User, id=user_id).values())[0]
    if user is None:
        return make_error(400, "User not found")
    conversation_list = []
    for user_conversation in user.conversations:
        if user_id == user_conversation.receiver_id and  user_id == user_conversation.sender_id:
            receiver = list(storage.get(User, user_conversation.receiver_id).values())[0]
            if  not any(chat['id'] == receiver.id for chat in conversation_list):
                message = user_conversation.message
                conversation_list.append({'id': receiver.id, 'message': message, 'chat_user': {'first_name': "You", 'last_name': ''}})
        elif user_id == user_conversation.sender_id:
            receiver = list(storage.get(User, user_conversation.receiver_id).values())[0]
            if  not any(chat['id'] == receiver.id for chat in conversation_list):
                message = user_conversation.message
                conversation_list.append({'id': receiver.id, 'message': message, 'chat_user': receiver.to_dict()})
        elif user_id == user_conversation.receiver_id:
            sender = list(storage.get(User, user_conversation.sender_id).values())[0]
            if  not any(chat['id'] == sender.id for chat in conversation_list):
                message = user_conversation.message
                conversation_list.append({'id': sender.id, 'message': message, 'chat_user': sender.to_dict()})
    if not conversation_list:
        print("No conversation found")
        make_error(200, "No conversation found")
    return make_response(jsonify(conversation_list))

@chat_views.route("/<sender_id>/<receiver_id>/messages", methods=['GET'])
def get_message(sender_id, receiver_id):
    """Get all user messages in a conversation"""
    user = list(storage.get(User, id=sender_id).values())[0]
    if user is None:
        return make_error(400, "User not found")

    receiver = list(storage.get(User, id=receiver_id).values())[0]
    if receiver is None:
        return make_error(400, "Receiver not found")
    conversation_list = []
    for user_conversation in user.conversations:
        if sender_id == receiver_id:
            if user_conversation.receiver_id == receiver_id and\
        	  user_conversation.sender_id == sender_id:
                conversation_list.append(user_conversation.to_dict())
        elif user_conversation.receiver_id == receiver_id or\
        user_conversation.sender_id == receiver_id:
            conversation_list.append(user_conversation.to_dict())


    return jsonify(conversation_list)
