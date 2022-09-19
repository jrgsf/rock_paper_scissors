import pymongo
from pymongo import MongoClient
import pprint


client = MongoClient()
db = client.rps
users = db.users

# users.insert_one({"test_field": "test_val"}).inserted_id
# pprint.pprint(users.find_one())

# db.list_collection_names()