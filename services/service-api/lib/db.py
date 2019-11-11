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

class MongoEncoder(JSONEncoder):
    """
    Mongo DB results encoder.
    """
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)
