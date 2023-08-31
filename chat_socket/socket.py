from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room
from models import storage
from models.user import User
from models.conversation import Conversation
from flask import session
from flask_login import current_user


socketio = SocketIO(app,logger=True, engineio_logger=True)


@socketio.on('send_msg')
def send_msg():

@socketio.on('join')
def join(data):
    if (data['name']):
        join_room(data['name'])

@socketio.on('message')
def handle_message(data):
    print(data)
    if session.get("id") is None:
        userId = current_user.id
        conversation = current_user.conversation
    else:
        userId = session['id']
        conversations = current_user.conversation

    user = storage.get(User, userId)
    if conversation in user.conversations:
