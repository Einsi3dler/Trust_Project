from flask import Flask
from flask_socketio import SocketIO, send, emit, join_room
from flask_cors import CORS


app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
cors = CORS(app, resources={r"/user/<id>/*": {"origins": "*"}})
