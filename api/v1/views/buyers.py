#!/usr/bin/python3
"""API for buyers"""

from models import storage
from models.transaction import Transaction
from models.buyer import Buyer
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


app_views.strict_slashes = False

@app_views.route("/buyers", methods=['GET'])
def get_buyers():
    """Get all buyers"""
    all_buyers = storage.all(Transaction).values()
    seller_list = []
    for buyer in all_buyers:
        seller_list.append(buyer.to_dict())
    return jsonify(seller_list)

@app_views.route("buyers/<buyer_id>", methods=['GET'])
def get_buyer(buyer_id):
	buyer = storage.get(Buyer, buyer_id)
	if not buyer:
		abort(404)
	return jsonify(buyer.to_dict())

@app_views.route("buyers/<buyer_id>", methods=['POST'])
def post_buyer(buyer_id):
    buyer = storage.get(Buyer, buyer_id)
    if not buyer:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    compulsory_data = ['user_id', 'username', 'good_service' 'asking_price']
    for data in compulsory_data:
        if data not in request.get_json():
            abort(404, description="Missing {}".format(data))
    data = request.get_json()
    new_seller = Buyer(**data)
    new_seller.save
    return make_response(jsonify(new_seller), 201)

@app_views.route("buyers/<buyer_id>", methods=['DELETE'])
def delete_buyer_transactions(buyer_id):
    buyer = storage.get(Buyer, buyer_id)
    if not buyer:
        abort(404)
    storage.delete(buyer)
    storage.save
