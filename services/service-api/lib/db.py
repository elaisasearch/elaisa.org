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


class MongoEncoder(JSONEncoder):
    """
    Mongo DB results encoder.
    """
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)
