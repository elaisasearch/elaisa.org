"""
Handles the user methods for signing and logging user.
"""

from pymongo import ASCENDING
import bcrypt
import json
from bson.objectid import ObjectId
import datetime
import pickle
import string
import random
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
        return "Success"
    except:
        return "Error"


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


def handlePasswordChange(email: str, oldPass: str, newPass: str) -> str:
    """
    Changes the password for the user in the database (hashed).
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    col = users

    newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
    try:
        col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        return True
    except:
        return False

def handleForgotPassword(email: str) -> dict:
    """
    Changes the password for the user in the database (hashed).
    :email: String
    :oldPass: String
    :newPass: String
    :return: Dictionary
    """
    col = users

    newPassword = randomString(8)
    newPass_hash = bcrypt.hashpw(newPassword.encode('utf-8'), bcrypt.gensalt(14))

    html = """\
    <html>
        <body>
            <p>Hello Elaisa user,<br><br>
            Since you forgot your password, we send you another one with this email.
            Please sign in to Elaisa again and change the temorary password in your 'Account'.
            Then store the new password on a save place to look it up if you forget it the next time :) <br><br>
            <b>New Password: {password}</b>
            <br><br>
            <a href="http://elaisa.org/signin">Sign in with your new password</a>
            <br><br>
            Best regards, <br>
            Alex <br><br>
            Elaisa Support Team
            </p>
        </body>
    </html>
    """.format(password=newPassword)

    try:
        updatedAccount = col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        
        if updatedAccount.matched_count == 0:
            return "Mail not found"

        sendEmail(email, 'Elaisa - Your new password', html)

        return "Success",
    except:
        return "Error",


def randomString(stringLength: int) -> str:
    """
    Generate a random string with the combination of lowercase and uppercase letters
    :stringLength: Integer
    :return: String
    """

    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(stringLength))


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