from pymongo import MongoClient
import os
import json

"""
Load the global configurations for database connection and collections.
    - source: https://stackoverflow.com/questions/7165749/open-file-in-a-relative-location-in-python
"""
scriptDir = os.path.dirname(__file__) 
relPath = '../globals.json'
with open(os.path.join(scriptDir, relPath)) as f: 
    GLOBALS = json.load(f)


def getSeenUrls() -> list:
    """
    Returns all URLs from the databse to fill the crawler's seed list.
    :return: List
    """

    urls = []

    # Global connection to database
    # source: https://api.mongodb.com/python/current/examples/authentication.html
    # Comment this line for development mode
    client = MongoClient(
        GLOBALS["mongo"]["auth"]["host"],
        #username= GLOBALS["mongo"]["auth"]["username"],
        #password= GLOBALS["mongo"]["auth"]["password"],
        #authSource= GLOBALS["mongo"]["auth"]["authSource"],
        #authMechanism= GLOBALS["mongo"]["auth"]["authMechanism"]
    
    )
    db = client[GLOBALS["mongo"]["database"]]
    collection = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][0]]

    for x in collection.find({},{ "_id": 0, "url": 1}):
        urls.append(x["url"])

    return urls