"""
Handles the database methods for finding documents.
"""

from pymongo import MongoClient
import json
from bson.objectid import ObjectId
from json import JSONEncoder
import os

"""
Load the global configurations for database connection and collections.
    - source: https://stackoverflow.com/questions/7165749/open-file-in-a-relative-location-in-python
"""
scriptDir = os.path.dirname(__file__) 
relPath = '../../../bin/globals.json'
with open(os.path.join(scriptDir, relPath)) as f: 
    GLOBALS = json.load(f)


# JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid


class MongoEncoder(JSONEncoder):
    def default(self, obj, **kwargs):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return JSONEncoder.default(obj, **kwargs)


def findDocuments(query, level, language):
    """
    Takes the search values and searches the database for results.
    :query: String
    :level: String
    :language: String
    :return: JSON
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    col = db[GLOBALS["mongo"]["collections"]["crawled"]["news"][0]]

    # TODO: Handle all terms of query
    terms = query.split()
    docs = getIdsFromWord(terms)

    """
    Only store a set of all IDs. If this is no set, there maybe will be several equal IDs
    since the indexer stores the same ID again in the 'documents' list, if the indexed word
    happens at several points.
    """
    docIds = set([id[0] for id in docs])

    documents = []
    for id in docIds:
        query = {"_id": ObjectId(id), "level": level, "meta.language": language}
        results = col.find(query)

        for r in results: 
            documents.append(r)

    return json.dumps(documents, cls=MongoEncoder)


def getIdsFromWord(terms):
    """
    Takes the search terms and gets the document IDs for findDocuments().
    :terms: List
    :return: Dictionary
    """
    client = MongoClient(GLOBALS["mongo"]["client"])
    db = client[GLOBALS["mongo"]["database"]]
    # TODO: Allow multiple terms search
    objdb = db[GLOBALS["mongo"]["collections"]
               ["inverted_index"][0]].find({'word': terms[0]}).skip(0)
    entries = [entry for entry in objdb]
    try:
        return entries[0]["documents"]
    except:
        return []
