from pymongo import MongoClient


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

    try: 
        col.insert_one(
            {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": password
            }
        )
        return "Success"
    except: 
        return "Error"

