from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room
from models import storage
from models.user import User
from models.conversation import Conversation
from flask import session
from flask_login import current_user


socketio = SocketIO(app, logger=True, engineio_logger=True, manage_session=False)


@socketio.on('send_msg')
def send_msg(data):
    print(data)
    if session.get("user") is None:
        user_id = current_user.id
    else:
        user_id = session.get("user").id


    user = storage.get(User, user_id)
    chatted_user = data['chatted_user_id']
    for chatted in user.conversations:
        if chatted.chatted_user_id == chatted_user:
            room = chatted
            join_room(room.name)
    print(data['message'])
    send({"msg": data['message'], "conversation_id": room.id})



@socketio.on('join', namespace='/chat')
def join(data):
    conversation_id = data.get("conversation_id")
    if conversation_id:
        conversation = storage.get(Conversation, id=conversation_id)
        room = conversation.name
        join_room(room)
    else:
        #Start new conversation
        new_conversation = Conversation(data)
        new_conversation.save()
        room = new_conversation.name
        join_room(room)


