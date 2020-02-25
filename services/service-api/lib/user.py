"""
Handles the user methods for signing and logging user.
"""

from pymongo import ASCENDING
import pymongo
import bcrypt
import json
from bson.objectid import ObjectId
import datetime
import pickle
import string
import random
from datetime import datetime
from .mail import sendEmail
from .globals import GLOBALS
from .db import client, MongoEncoder, users, search_history


def createUser(firstname: str, lastname: str, email: str, password: str) -> str:
    """
    Takes the user infos and creates a new user in the database.
    :firstname: String
    :lastname: String
    :email: String
    :password: String
    :return: String
    """
    col = users
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
        return True
    except pymongo.errors.DuplicateKeyError:
        return False


def loginUser(email: str, password: str) -> str:
    """
    Takes the user credentials and tries to login the user.
    :email: String
    :password: String
    :return: JSON String
    """
    col = users

    userObject: dict = {}

    results = col.find({"email": email})

    for user in results:
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            userObject = {
                "email": email,
                "message": "success",
                "user": {
                    "email": user['email'],
                    "firstname": user['firstname'],
                    "lastname": user['lastname']
                }
            }
        else:
            userObject = {
                "email": email,
                "message": "error: Password is incorrect",
                "user": {}
            }
    return json.dumps(userObject, cls=MongoEncoder)


def writeSearchDataIntoDatabase(query: str, level: str, language: str, email: str):
    """
    Stores the user's search data for search history.
    :query: String
    :level: String
    :language: String
    :email: String
    :return: None
    """
    col = search_history

    date: str = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")

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

def getSearchHistoryForUser(email: str) -> dict:
    """
    Get's the user's search history from user mail.
    :email: String
    :return: Dictionary
    """
    col = search_history

    try:
        historyData = col.find({
            "email": email
        })
    
        data: list = []
        en, es, de, all, a1, a2, b1, b2, c1, c2 = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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
            if d["level"] == "all": all += 1
            if d["level"] == "A1": a1 += 1
            if d["level"] == "A2": a2 += 1
            if d["level"] == "B1": b1 += 1
            if d["level"] == "B2": b2 += 1
            if d["level"] == "C1": c1 += 1
            if d["level"] == "C2": c2 += 1

        return {
            "email": email,
            "statistics": {
                "language": {
                    "en": en,
                    "es": es,
                    "de": de
                },
                "level": {
                    "all": all,
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
            "email": email,
            "statistics": {},
            "history": {}
        }