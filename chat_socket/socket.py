from api.v1.app import app
from flask_socketio import SocketIO, send, emit, join_room


socketio = SocketIO(app,logger=True, engineio_logger=True)
