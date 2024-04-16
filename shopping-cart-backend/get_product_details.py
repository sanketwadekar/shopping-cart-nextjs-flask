import firebase_admin
from firebase_admin import firestore

def get_product_by_id(product_id):
    db = firestore.client()

    products_ref = db.collection('products')

    product = products_ref.document(product_id).get()

    # Check if the product exists
    if product.exists:
        # Convert Firestore document to dictionary
        product_data = product.to_dict()
        product_data['id'] = product.id
        return product_data
    else:
        # Product with the specified ID does not exist
        return None
