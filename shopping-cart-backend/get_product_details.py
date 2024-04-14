import firebase_admin
from firebase_admin import credentials, firestore

def get_product_by_id(product_id):
    # cred = credentials.Certificate("./serviceAccountKey.json")
    # firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Reference to the "products" collection
    products_ref = db.collection('products')

    # Query Firestore for the product with the specified ID
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

# Example usage
# product_id = "2"
# product = get_product_by_id(product_id)
# if product:
#     print("Product found:", product)
# else:
#     print("Product not found.")
