#!/usr/bin/python3
"""API Blueprint"""
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/vi")


from api.v1.views.buyers import *
from api.v1.views.sellers import *
from api.v1.views.user import *
from api.v1.views.transactions import *
