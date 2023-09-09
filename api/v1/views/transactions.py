#!/usr/bin/python3
"""API for transactions"""

from models import storage
from models.transaction import Transaction
from models.user import User
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


app_views.strict_slashes = False

@app_views.route("/transactions", methods=['GET'])
def get_transactions():
    """Get all transactions"""
    all_transactions = storage.all(Transaction).values()
    transaction_list = []
    for transaction in all_transactions:
        transaction_list.append(transaction.to_dict())
    return jsonify(transaction_list)

@app_views.route("users/<user_id>/transactions", methods=['GET'])
def get_user_transactions(user_id):
	user = list(storage.get(User, user_id).values())[0]
	if not user:
		abort(404)
	transaction_list = []
	for transaction in user:
		transaction_list.append(transaction.to_dict())
	return jsonify(transaction_list)

@app_views.route("/<user_id>/transactions", methods=['POST'])
def post_user_transactions(user_id):
    user = storage.get(User, user_id).values()
    if not user:
        abort(404)
    form = request.form
    transaction_data = {}
    transaction_data['name'] = form.get('title')
    transaction_data['agreed_price'] = form.get('price')
    transaction_data['description'] = form.get('description')
    transaction_data['item'] = form.get('item')
    compulsory_data = ['buyer_id', 'seller_id', 'name', 'agreed_price']
    for data in compulsory_data:
        if data not in transaction_data.keys():
            abort(404, description="Missing {}".format(data))
    new_transaction = Transaction(**transaction_data)
    new_transaction.save
    return make_response(jsonify(new_transaction), 201)

@app_views.route("/<user_id>/transactions/<transaction_id>", methods=['DELETE'])
def delete_transactions(user_id, transaction_id):
    user = storage.get(User, user_id).values()
    if not user:
        abort(404)
    transaction = storage.get(Transaction, transaction_id)
    storage.delete(transaction)
    storage.save
