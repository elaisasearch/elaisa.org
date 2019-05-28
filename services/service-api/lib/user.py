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
        
def loginUser(email, password):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]]

    query = {"email": email, "password": password}
    results = col.find(query)

    resultsLen = 0
    for x in results:
        resultsLen += 1

    if resultsLen == 0:
        return "Error"
    elif resultsLen == 1:
        return "Success"


