from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from get_all_products import get_all_products
from get_product_details import get_product_by_id
from checkout import update_products_quantities

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)


@app.route("/products", methods=['GET'])
def get_products():
    data = get_all_products()
    response = make_response(jsonify(data))
    return response

@app.route('/products/<string:id>', methods=['GET'])
def get_product_details(id):
    product = get_product_by_id(id)
    if product is None:
        product = {}
    response = make_response(jsonify(product))
    return response

@app.route('/checkout', methods=['POST'])
def show_post():
    if request.is_json:
        data = request.get_json()
        result = update_products_quantities(data)
        response = make_response(jsonify(result))
        return response
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)