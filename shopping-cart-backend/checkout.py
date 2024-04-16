import firebase_admin
from firebase_admin import firestore

def update_products_quantities(products_list):
    db = firestore.client()

    products_ref = db.collection('products')

    # Flag to track if all products have sufficient quantities
    all_products_sufficient = True

    # Batch for updating multiple documents atomically
    batch = db.batch()

    # Iterate over the products in the list
    for product in products_list:
        product_id = product['id']
        required_quantity = product['quantity']

        # Get the product document
        product_doc_ref = products_ref.document(product_id)

        # Fetch the product data
        product_data = product_doc_ref.get().to_dict()

        # Check if product exists and has sufficient quantity
        if product_data and product_data.get('stock', 0) >= required_quantity:
            # Update the quantity by subtracting the required quantity
            new_quantity = product_data['stock'] - required_quantity
            batch.update(product_doc_ref, {'stock': new_quantity})
        else:
            # Set flag to False if any product does not have sufficient quantity
            all_products_sufficient = False
            less_quantity_product = product_data['title']
            less_quantity_stock = product_data['stock']
            break  # Exit loop if any product does not have sufficient quantity

    # If all products have sufficient quantities, commit the batch update
    if all_products_sufficient:
        batch.commit()
        return {
            "status": 1
        }
    else:
        return {
            "status": 0,
            "title": less_quantity_product,
            "stock": less_quantity_stock
        }