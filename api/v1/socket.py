from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room
from models import storage
from models.user import User
from models.conversation import Conversation
from models.message import Message
from flask import session
from flask_login import current_user


socketio = SocketIO(app, logger=True, engineio_logger=True, manage_session=False, cors_allowed_origins="*")


@socketio.on('send_msg')
def send_msg(data):
    print(data)
    if session.get("user") is None:
        user_id = current_user.id
    else:
        user_id = session.get("user").id


    user = storage.get(User, user_id)
    conversation_id = data['conversation_id']
    for conversation in user.conversations:
        if conversation.id == conversation_id:
            room = conversation
            join_room(room.name)
    print(data['message'])
    new_message = Message({"conversation_id": conversation_id, "user1_message": data.get("message")})
    new_message.save()
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
        conversation_id = new_conversation.id
        room = new_conversation.name
        data['conversation_id'] = conversation_id
        join_room(room)
    print("Connected")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)