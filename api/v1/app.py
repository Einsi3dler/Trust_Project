#!/usr/bin/python3
""" Flask Application """
from models import storage
from api.v1.views import app_views, auth_views
from os import environ
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
from flask_login import LoginManager
from models.user import User

login_manager = LoginManager()


load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret api key"
app.config['SESSION_TYPE'] = "filesystem"
login_manager.init_app(app)
Session(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
app.register_blueprint(auth_views)
CORS(app)


@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id).values()

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


def make_error(status_code, message, action=None):
    response = jsonify({
        'status': status_code,
        'message': message,
        'action': action
    })
    response.status_code = status_code
    return response


if __name__ == '__main__':
    """ Main Function """
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True)
