from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room
from models import storage
from models.user import User
from models.conversation import Conversation
from flask import session, request
from flask_login import current_user
from dotenv import load_dotenv
from os import environ



load_dotenv()
socketio = SocketIO(app, logger=True, engineio_logger=True, manage_session=False, cors_allowed_origins="*")

online_users = []
def find_receiver_sid(receiver_id):
    for online_user in online_users:
        if list(online_user.keys())[0] == receiver_id:
            return online_user[receiver_id]

@socketio.on('add_user')
def add_user(user_id):
    user = list(storage.get(User, user_id).values())[0]
    if user is not None:
        online_users.append({user_id: request.sid})


@socketio.on('send_msg')
def send_msg(data):

    user_id = data['sender_id']

    user = list(storage.get(User, user_id).values())[0]
    conversation_data = {"message": data['message'], "sender_id": user.id, "receiver_id": data["receiver_id"]}
    conversation = Conversation(**conversation_data)
    conversation.save()
    user.conversations.append(conversation)
    user.save()
    print(data['message'])
    receiver_sid = find_receiver_sid(data['receiver_id'])
    emit("receive_msg", {"msg": conversation.to_dict(), "receiver_id": data['receiver_id']}, to=receiver_sid)



@socketio.on('send_img')
def send_image(data):
    user_id = data.get("receiver_id")
    user = storage.get(User, user_id).values()[0]
    if user is None:
        return None
    conversation_id = data.get("msg")[id]
    conversation = storage.get(Conversation, conversation_id)
    user.conversations.append(conversation)
    print(data.get("msg")['message'])
    emit('receiveClient')

if __name__ == '__main__':
    """ Main Function """
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    socketio.run(app, host=host, port=port)
