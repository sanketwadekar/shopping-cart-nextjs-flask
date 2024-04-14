import firebase_admin
from firebase_admin import credentials, firestore

def get_all_products():
    # Initialize Firebase Admin SDK with your credentials

    # Initialize Firestore client
    db = firestore.client()

    # Reference to the "products" collection
    products_ref = db.collection('products')

    # Retrieve all documents from the "products" collection
    products = products_ref.get()

    # Store the documents in a list
    all_products = []
    for product in products:
        # Convert Firestore document to dictionary
        product_data = product.to_dict()
        product_data['id'] = product.id
        # Append the product data to the list
        all_products.append(product_data)
    return all_products