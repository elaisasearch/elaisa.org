from bottle import route, run
from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from json import JSONEncoder

# source: https://gotofritz.net/blog/weekly-challenge/restful-python-api-bottle/

#JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid
class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:            
            return JSONEncoder.default(obj, **kwargs)

@route('/find&query=<term>', method="GET")
def find(term):
    client = MongoClient('mongodb://localhost:27017/')
    db = client["LanguageLevelSearchEngine"]
    objdb = db["inverted_index_de_DE"].find({'word': term}).skip(0).limit(3)
    entries = [entry for entry in objdb]
    return json.dumps(entries, cls=MongoEncoder)


run(host='localhost', port=8080, debug=True)