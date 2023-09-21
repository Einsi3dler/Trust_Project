#!/usr/bin/python3
"""API for transactions"""

from models import storage
from models.transaction import Transaction
from models.buyer import Buyer
from models.seller import Seller
from models.paystack_models.transaction import Paystack_Transaction
from models.user import User
from api.v1.views import app_views, make_error
from models.paystack_models.customers import Customer
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

@app_views.route("/<user_id>/transactions", methods=['GET'])
def get_user_transactions(user_id):
	user = list(storage.get(Transaction, data={"seller_id": user_id, "buyer_id": user_id}).values())
	if not user:
		return jsonify([])
	user = user[0]
	transaction_list = []
	for transaction in user:
		transaction_list.append(transaction.to_dict())
	return jsonify(transaction_list)

@app_views.route("/<user_id>/start_transaction", methods=['POST'])
def post_user_transactions(user_id):
    user = list(storage.get(User, user_id).values())
    if not user:
        make_error(404, "User not found")
    user = user[0]
    print("here")
    form = request.form
    transaction_data = {}
    transaction_data['name'] = form.get('name')
    transaction_data['agreed_price'] = form.get('price')
    transaction_data['description'] = form.get('description')
    transaction_data['item'] = form.get('item')
    transaction_data['buyer_id'] = form.get('buyer_id')
    transaction_data['seller_id'] = form.get('seller_id')
    compulsory_data = ['buyer_id', 'seller_id', 'name', 'agreed_price']
    for data in compulsory_data:
        if data not in transaction_data.keys():
            abort(404, description="Missing {}".format(data))
    seller_id = form.get('seller_id')
    seller = storage.get(Seller, data = {"user_id": seller_id})
    if not seller:
        user_seller = list(storage.get(User, seller_id).values())
        if not user_seller:
            return make_error(200, "Seller not found")
        user_seller = user_seller[0]
        customer = Customer()
        new_customer = customer.create(email=user_seller.email, first_name=user_seller.first_name, last_name=user_seller.last_name)
        print(new_customer)
        new_seller = Seller(user_id=seller_id, email=user_seller.email, paystack_id=new_customer.get('customer_code'))
        new_seller.save()

    buyer_id = form.get('buyer_id')
    buyer = storage.get(Buyer, data = {"user_id": buyer_id})
    if not buyer:
        user_buyer = list(storage.get(User,buyer_id).values())
        if not user_buyer:
            make_error(400, "Buyer not found")
        user_buyer = user_buyer[0]
        customer = Customer()
        new_customer = customer.create(email=user_buyer.email, first_name=user_buyer.first_name, last_name=user_buyer.last_name)
        print(new_customer)
        new_buyer = Buyer(user_id=buyer_id, email=user_buyer.email, paystack_id=new_customer.get('customer_code'))
        new_buyer.save()
    new_transaction = Transaction(**transaction_data)
    new_transaction.save()
    return jsonify(new_transaction.to_dict())

@app_views.route("/<user_id>/transactions/<transaction_id>", methods=['DELETE'])
def delete_transactions(user_id, transaction_id):
    user = list(storage.get(User, user_id).values())
    if not user:
        abort(404)
    transaction = storage.get(Transaction, transaction_id)
    storage.delete(transaction)
    storage.save

@app_views.route("/<user_id>/<transaction_id>", methods=['POST'])
def complete_transactions(user_id, transaction_id):
    user = list(storage.get(User, user_id).values())
    if not user:
        abort(404)
    user = user[0]
    transaction = list(storage.get(Transaction, transaction_id).values())
    transaction = transaction[0]
    pay = {}
    if not transaction:
        abort(404)
    if transaction.status == 1:
        paystack =  Paystack_Transaction()
        buyer = list(storage.get(Buyer, transaction.buyer_id).values())[0]
        seller = list(storage.get(Seller, transaction.seller_id).values())[0]
        print(buyer.email)
        pay = paystack.initialize(email=buyer.email, amount=transaction.agreed_price)
        return jsonify(pay)
    return jsonify(pay)
