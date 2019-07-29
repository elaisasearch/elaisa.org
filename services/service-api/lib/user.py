"""
Handles the user methods for signing and logging user.
"""

from pymongo import MongoClient, ASCENDING
import bcrypt
import json
from bson.objectid import ObjectId
from json import JSONEncoder
import datetime
import pickle
import os

"""
Load the global configurations for database connection and collections.
    - source: https://stackoverflow.com/questions/7165749/open-file-in-a-relative-location-in-python
"""
scriptDir = os.path.dirname(__file__) 
relPath = 'globals.json'
with open(os.path.join(scriptDir, relPath)) as f: 
    GLOBALS = json.load(f)


class MongoEncoder(JSONEncoder):
    """
    Mongo DB results encoder.
    """
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)

class SetEncoder(json.JSONEncoder):
    """
    Set encoder for results in JSON.
    """
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def createUser(firstname, lastname, email, password):
    """
    Takes the user infos and creates a new user in the database.
    :firstname: String
    :lastname: String
    :email: String
    :password: String
    :return: String
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["user"][0]]
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
    """
    Takes the user credentials and tries to login the user.
    :email: String
    :password: String
    :return: JSON
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["user"][0]]

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
    """
    Changes the password for the user in the database (hashed).
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["user"][0]]

    newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
    try:
        col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        return "Success"
    except:
        return "Error"


def writeSearchDataIntoDatabase(query, level, language, email):
    """
    Stores the user's search data for search history.
    :query: String
    :level: String
    :language: String
    :email: String
    :return: None
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["user"][1]]

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
    """
    Get's the user's search history from user mail.
    :email: String
    :return: Dictionary
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["user"][1]]

    try:
        historyData = col.find({
            "email": email
        })
    
        data = []
        en, es, de, a1, a2, b1, b2, c1, c2 = 0, 0, 0, 0, 0, 0, 0, 0, 0
        for d in historyData:
            data.append({
                "email": d["email"],
                "level": d["level"],
                "language": d["language"],
                "query": d["query"],
                "date": d["date"]
            })
            if d["language"] == "en": en += 1
            if d["language"] == "es": es += 1
            if d["language"] == "de": de += 1
            if d["level"] == "A1": a1 += 1
            if d["level"] == "A2": a2 += 1
            if d["level"] == "B1": b1 += 1
            if d["level"] == "B2": b2 += 1
            if d["level"] == "C1": c1 += 1
            if d["level"] == "C2": c2 += 1

        return {
            "response": "Success",
            "statistics": {
                "language": {
                    "en": en,
                    "es": es,
                    "de": de
                },
                "level": {
                    "a1": a1,
                    "a2": a2,
                    "b1": b1,
                    "b2": b2,
                    "c1": c1,
                    "c2": c2
                }
            },
            "history": data
        }
    except:
        return {
            "response": "Error"
        }
