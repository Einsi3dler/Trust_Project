from flask_login import LoginManager
from api.v1.app import app
from models.user import User
from models import storage

login_manager = LoginManager()

login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id)

@app.route('login', methods=['GET', 'POST'])
