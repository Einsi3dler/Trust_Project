#!/usr/bin/python3
"""API Blueprint"""
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")
auth_views = Blueprint("auth_views", __name__, url_prefix="/auth")


from api.v1.views.buyers import *
from api.v1.views.sellers import *
from api.v1.views.user import *
from api.v1.views.transactions import *
from api.v1.views.auth import *
