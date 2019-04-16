from pymongo import MongoClient
import json
from bson.objectid import ObjectId
from json import JSONEncoder


#JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid
class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:            
            return JSONEncoder.default(obj, **kwargs)

def findDocuments(query):
    client = MongoClient('mongodb://localhost:27017/')
    db = client["LanguageLevelSearchEngine"]
    col = db["news_de_DE"]

    terms = query.split()
    docs = getIdsFromWord(terms)
    docIds = [id[0] for id in docs]

    documents = []
    for id in docIds:
        query= {"_id": ObjectId(id)}
        documents.append(col.find(query)[0])

    return json.dumps(documents, cls=MongoEncoder)

def getIdsFromWord(terms):
    client = MongoClient('mongodb://localhost:27017/')
    db = client["LanguageLevelSearchEngine"]
    # TODO: Allow multiple terms search
    objdb = db["inverted_index_de_DE"].find({'word': terms[0]}).skip(0)
    entries = [entry for entry in objdb]
    return entries[0]["documents"]