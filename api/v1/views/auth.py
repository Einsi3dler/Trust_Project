from flask_login import LoginManager
from api.v1.views import auth_views
from models.user import User
from models import storage
from flask import request, session, abort, jsonify, redirect
from flask_login import login_user
from hashlib import md5
from api.v1.app import make_error


@auth_views.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        form = request.form
        user_data = {}
        user_data['email'] = form.get('email')
        password = form.get('password')
        user_data['password'] = md5(password.encode()).hexdigest()
        remember = True if request.form.get('remember') else False

        for keys, data in user_data.items():
            if not data:
                error = "Please fill in your {}".format(keys)
                return make_error(404, error)
            user = storage.get(User, data={keys: data}).values()
            if not user:
                error = "Please try again, wrong {}".format(keys)
                return make_error(404, error)


        user = list(storage.get(User, data=user_data).values())
        session["user"] = user
        login_user(user[0], remember=remember)
        return jsonify(user[0].to_dict())



@auth_views.route('/signup', methods=['GET', 'POST'])
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

        if storage.get(User, data={'email': user_data['email']}).values():
            error = "Please try again, email already taken"
            return error

        new_user = User(**user_data)
        new_user.save()
        session['user'] = new_user.to_dict()
        return redirect("http://localhost:3000/login")
