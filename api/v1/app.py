#!/usr/bin/python3
""" Flask Application """
from models import storage
from api.v1.views import app_views, auth_views, chat_views
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_session import Session
from flask_login import LoginManager
from models.user import User

login_manager = LoginManager()


app = Flask(__name__)
app.config['SECRET_KEY'] = "secret api key"
app.config['SESSION_TYPE'] = "filesystem"
app.config['transports'] = 'websocket'
login_manager.init_app(app)
Session(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
app.register_blueprint(auth_views)
app.register_blueprint(chat_views)

CORS(app)


@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id).values()

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()



