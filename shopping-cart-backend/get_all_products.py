import firebase_admin
from firebase_admin import firestore

def get_all_products():
    db = firestore.client()

    products_ref = db.collection('products')

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