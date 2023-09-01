#!/usr/bin/python3
"""API for sellers"""

from models import storage
from models.seller import Seller
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


app_views.strict_slashes = False

@app_views.route("/sellers", methods=['GET'])
def get_sellers():
    """Get all sellers"""
    all_sellers = storage.all(Seller).values()
    seller_list = []
    for seller in all_sellers:
        seller_list.append(seller.to_dict())
    return jsonify(seller_list)

@app_views.route("/sellers/<seller_id>", methods=['GET'])
def get_seller(seller_id):
	seller = storage.get(Seller, seller_id)
	if not seller:
		abort(404)
	return jsonify(seller.to_dict())

@app_views.route("/sellers/<seller_id>", methods=['POST'])
def post_seller(seller_id):
    seller = storage.get(Seller, seller_id)
    if not seller:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    compulsory_data = ['user_id', 'username', 'good_service' 'asking_price']
    for data in compulsory_data:
        if data not in request.get_json():
            abort(404, description="Missing {}".format(data))
    data = request.get_json()
    new_seller = Seller(**data)
    new_seller.save
    return make_response(jsonify(new_seller), 201)

@app_views.route("/sellers/<seller_id>", methods=['DELETE'])
def delete_user_transactions(seller_id):
    seller = storage.get(Seller, seller_id)
    if not seller:
        abort(404)
    storage.delete(seller)
    storage.save
