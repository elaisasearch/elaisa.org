from pymongo import MongoClient, ASCENDING
import bcrypt
import json
from bson.objectid import ObjectId
from json import JSONEncoder
import datetime
import pickle

GLOBALS = {
    "mongo": {
        "client": "mongodb://localhost:27017/",
        "database": "LanguageLevelSearchEngine",
        "collections": [
            "users",
            "search_history"
        ]
    }
}


class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def createUser(firstname, lastname, email, password):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"][0]]
    col.create_index([('email', ASCENDING)], unique=True)

    # hash password
    salt = bcrypt.gensalt(14)
    pass_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

    try:
        col.insert_one(
            {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": pass_hash
            },
        )
        return "Success"
    except:
        return "Error"


def loginUser(email, password):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"][0]]

    userObject = {}

    results = col.find({"email": email})

    for user in results:
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            userObject = {
                "response": "Success",
                "user": {
                    "email": user['email'],
                    "firstname": user['firstname'],
                    "lastname": user['lastname']
                }
            }
        else:
            userObject = {
                "response": "Error"
            }

    return json.dumps(userObject, cls=MongoEncoder)


def handlePasswordChange(email, oldPass, newPass):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"][0]]

    newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
    try:
        col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        return "Success"
    except:
        return "Error"


def writeSearchDataIntoDatabase(query, level, language, email):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"][1]]

    date = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")

    try:
        col.insert_one({
            "email": email,
            "level": level,
            "language": language,
            "query": query,
            "date": date
        })
    except:
        return

def getSearchHistoryForUser(email):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"][1]]

    try:
        historyData = col.find({
            "email": email
        })
    
        data = []
        for d in historyData:
            data.append({
                "email": d["email"],
                "level": d["level"],
                "language": d["language"],
                "query": d["query"],
                "date": d["date"]
            })

        return {
            "response": "Success",
            "history": data
        }
    except:
        return {
            "response": "Error"
        }
