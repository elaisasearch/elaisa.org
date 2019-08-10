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
relPath = 'globals.json'
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
    docIds = set(docs)

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
    objdb = db[GLOBALS["mongo"]["collections"]["inverted_index"][0]]

    query = []
    found_ids = []

    # Check the boolesche term. OR, AND
    if any(elem in terms for elem in ['or', 'oder', 'e']):
        # Delete boolesche term from terms
        if 'or' in terms: terms.remove('or')
        elif 'oder' in terms: terms.remove('oder')
        elif 'e' in terms: terms.remove('e')

        # create db query
        # source: https://docs.mongodb.com/manual/reference/operator/query/or/
        for w in terms: 
            query.append({'word': {'$eq': w}})

        results = objdb.find({ '$or': query}).skip(0)
        entries = [entry for entry in results]

        # delete position number from document ID list. ['asdgf356345d', 327] -> 'asdgf356345d'
        found_ids = [ent[0] for ent in entries[0]["documents"]]

    elif any(elem in terms for elem in ['and', 'und', 'y']):
        if 'and' in terms: terms.remove('and')
        elif 'und' in terms: terms.remove('und')
        elif 'y' in terms: terms.remove('y')

        # Query the database for each term in terms
        found_results = []
        for w in terms: 
            db_found = objdb.find({"word": w})
            found_results.append(db_found)

        # Extract the found entries from the mongo db cursor; for each result in found_results
        found_entries = []
        for fr in found_results:
            tmp = [e for e in fr]
            found_entries.append(tmp)
        
        # Extract only the IDs and store them in lists for each term in terms
        found_ids = []
        for fe in found_entries:
            # delete position number from document ID list. ['asdgf356345d', 327] -> 'asdgf356345d'
            tmp = [e[0] for e in fe[0]["documents"]]
            found_ids.append(tmp)

        # Only store the common IDs in a new set
        # TODO: Allow more than two terms for AND
        found_ids = list(set(found_ids[0]).intersection(found_ids[1]))

    # Finally return all found IDs
    try:
        return found_ids
    except:
        return []