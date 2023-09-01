from flask_login import LoginManager
from api.v1.app import app
from models.user import User
from models import storage
from flask import request, session
from flask_login import login_user
from hashlib import md5

login_manager = LoginManager()

login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        form = request.form
        user_data = {}
        user_data['email'] = form.get('email')
        password = form.get('password')
        user_data['password'] = md5(password.encode()).hexdigest()
        remember = True if request.form.get('remember') else False

        for data in user_data:
            if not data:
                error = "Please fill all required details"
                return error
            user = storage.get(User, **data)
            if user is None:
                error = "Please try again, wrong {}".format(data.values())
                return error

        user = storage.get(User, **user_data)
        session.pop('user', None)
        login_user(user, remember=remember)



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        form = request.form
        user_data = {}
        #Remember to validate and sanitize input
        user_data['email'] = form.get('email')
        user_data['first_name'] = form.get('first_name')
        user_data['last_name'] = form.get('last_name')
        user_data['password'] = form.get('password')

        for data in user_data:
            if not data:
                error = "Please fill all required details"
                return error
        if storage.get(User, {'email': user_data['email']}):
            error = "Please try again, email already taken"
            return error

        new_user = User(user_data)
        new_user.save()
        session.pop('username', None)

