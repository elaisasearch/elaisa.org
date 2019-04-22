from pymongo import MongoClient
import json
from bson.objectid import ObjectId
from json import JSONEncoder

# get database info
# BUG: no such file or dictionary ERROR ... 
f = open("../../../bin/globals.json", "r")
GLOBALS = json.load(f)

#JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid
class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:            
            return JSONEncoder.default(obj, **kwargs)

def findDocuments(query):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][0]]

    terms = query.split()
    docs = getIdsFromWord(terms)
    docIds = [id[0] for id in docs]

    documents = []
    for id in docIds:
        query= {"_id": ObjectId(id)}
        documents.append(col.find(query)[0])

    return json.dumps(documents, cls=MongoEncoder)

def getIdsFromWord(terms):
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    # TODO: Allow multiple terms search
    objdb = db[GLOBALS["mongo"]["collections"]["inverted_index"][0]].find({'word': terms[0]}).skip(0)
    entries = [entry for entry in objdb]
    return entries[0]["documents"]
