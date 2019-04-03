from bottle import route, run, response
import bottle
from pymongo import MongoClient
import pymongo
from bson.objectid import ObjectId
import json
from json import JSONEncoder
try:
    reduce
except:
    from functools import reduce
from search import *


#JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid
class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:            
            return JSONEncoder.default(obj, **kwargs)

# source: https://stackoverflow.com/questions/17262170/bottle-py-enabling-cors-for-jquery-ajax-requests
# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/find&query=<query>', method=["OPTIONS","GET"])
@enable_cors
def find(query):
    response.headers['Content-type'] = 'application/json'

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
    objdb = db["inverted_index_de_DE"].find({'word': terms[0]}).skip(0)
    entries = [entry for entry in objdb]
    return entries[0]["documents"]

run(host='localhost', port=8080, debug=True)