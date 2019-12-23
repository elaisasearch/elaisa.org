from pymongo import MongoClient
from json import JSONEncoder
from bson.objectid import ObjectId
from .globals import GLOBALS

# Global connection to database
# source: https://api.mongodb.com/python/current/examples/authentication.html
client = MongoClient(
    GLOBALS["mongo"]["auth"]["host"],
    username= GLOBALS["mongo"]["auth"]["username"],
    password= GLOBALS["mongo"]["auth"]["password"],
    authSource= GLOBALS["mongo"]["auth"]["authSource"],
    authMechanism= GLOBALS["mongo"]["auth"]["authMechanism"]
)

# Database name
db = client[GLOBALS["mongo"]["database"]]

# Different database collections
news_de_DE = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][0]]
news_en_EN = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][1]]
news_es_ES = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][2]]

# Different inverted indices
inverted_index_de_DE = db[GLOBALS["mongo"]["collections"]["inverted_index"][0]]
inverted_index_en_EN = db[GLOBALS["mongo"]["collections"]["inverted_index"][1]]
inverted_index_es_ES = db[GLOBALS["mongo"]["collections"]["inverted_index"][2]]

# Create indices for the mongo db collections to make the query even faster
# Sources:
#   - https://kb.objectrocket.com/mongo-db/how-to-create-an-index-for-a-mongodb-collection-in-python-371
#   - https://api.mongodb.com/python/current/api/pymongo/collection.html#pymongo.collection.Collection.create_index
inverted_index_de_DE.create_index("word")
inverted_index_en_EN.create_index("word")
inverted_index_es_ES.create_index("word")


# Different user collections
users = db[GLOBALS["mongo"]["collections"]["user"][0]]
search_history = db[GLOBALS["mongo"]["collections"]["user"][1]]

class MongoEncoder(JSONEncoder):
    """
    Mongo DB results encoder.
    """
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)
