from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room
from models import storage
from models.user import User
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
        username = current_user.id
    else:
        username = session['id']
    user = storage.get(User, )
    if user.workspace_list:
        wlist = user.workspace_list.split()
        wid = int(wlist[0])
        room = Workspace.query.filter_by(id = wid).first()
        join_room(room.name)
    send({"msg": data['data']})