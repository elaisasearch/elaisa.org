from pymongo import MongoClient, ASCENDING
import bcrypt


GLOBALS = {
    "mongo": {
        "client": "mongodb://localhost:27017/",
        "database": "LanguageLevelSearchEngine",
        "collections": "users"
    }
}


def createUser(firstname, lastname, email, password):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]]
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
    col = db[GLOBALS["mongo"]["collections"]]

    results = col.find({"email": email})

    for user in results: 
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return "Success"
        else: 
            return "Error"