import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

with open('products.json', 'r') as file:
    json_objects = json.load(file)

collection_ref = db.collection('products')

# Insert each JSON object into the collection
for obj in json_objects['products']:
	custom_id = obj.pop('id')
	doc_ref = collection_ref.document(str(custom_id))
	doc_ref.set(obj)

print("JSON objects inserted successfully.")
