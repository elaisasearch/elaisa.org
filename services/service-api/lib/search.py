"""
Handles the database methods for finding documents.
"""

import json
# JSON Encoder
# https://stackoverflow.com/questions/28251835/from-pymongo-objectid-import-objectid-importerror-no-module-named-objectid
from bson.objectid import ObjectId
from .nlp import calculateTermfrequency
import math
from .globals import GLOBALS
from .db import client, news_de_DE, news_en_EN, news_es_ES, MongoEncoder


def findDocuments(query: list, level: str, language: str) -> dict:
    """
    Takes the search values and searches the database for results.
    :query: List
    :level: String
    :language: String
    :return: Dictionary
    """

    # Choose news collection by given language
    if language == 'de':
        col = news_de_DE
    elif language == 'en':
        col = news_en_EN
    elif language == 'es':
        col = news_es_ES
    
    # Get the IDs of the documents which contain the given search terms.
    docIds: list = getIdsFromWord(query)

    """
    Only store a set of all IDs. If this is no set, there maybe will be several equal IDs
    since the indexer stores the same ID again in the 'documents' list, if the indexed word
    happens at several points.
    """
    docIdsSet: set = set(docIds)

    # Get result documents filtered by language level
    documents, textsOfDocuments, resultIds = getDocumentsByLevel(docIdsSet, level, language, col)

    # Get the number of all documents in the database for IDF
    allDocInDBCount: int = col.count_documents(filter={})
    
    # Get the TF*IDF formula for result's ranking
    tf: dict = calculateTermfrequency(query, resultIds, len(docIdsSet), allDocInDBCount, textsOfDocuments)

    # remove unnecessary data from documents
    for d in documents: 
        del d['links']
        del d['text']
        if d['pagerank'] == math.inf:
            d['pagerank'] = 0

    # translate BSON structure to JSON to return real JSON and not stringified JSON
    bsonToJSON = json.dumps(documents, cls=MongoEncoder)
    jsonResults = json.loads(bsonToJSON)

    """
    Update the pagerank and add the term frequency (TF*IDF) to pagerank value
    Example: 
        - Pagerank before -> 0.0002604166666666667
        - Pagerank after  -> 0.005091334541062802
    """
    for jres in jsonResults:
        jres['pagerank'] +=  tf[jres['_id']]['tfidf']

    return {
        "length": len(json.loads(bsonToJSON)),
        "results": jsonResults,
    }


def getIdsFromWord(terms: list) -> list:
    """
    Takes the search terms and gets the document IDs for findDocuments().
    :terms: List
    :return: List
    """
    db = client[GLOBALS["mongo"]["database"]]
    objdb = db[GLOBALS["mongo"]["collections"]["inverted_index"][0]]

    query: list = []
    found_ids: list = []

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
        entries: list = [entry for entry in results]

        # delete position number from document ID list. ['asdgf356345d', 327] -> 'asdgf356345d'
        # TODO: use position for ranking
        found_ids = [ent['id'] for ent in entries[0]["documents"]]

    elif any(elem in terms for elem in ['and', 'und', 'y'])  or not any(elem in terms for elem in ['and', 'und', 'y', 'oder', 'e', 'or']) and len(terms) > 1:
        """
        Check if terms list contains any value of ['and', 'und', 'y'] or non of list ['and', 'und', 'y', 'oder', 'e', 'or'].
        Thus, the user can use the AND operator with 'summer and hot' or just 'summer hot'
        """

        # delete the operator from terms list
        if 'and' in terms: terms.remove('and')
        elif 'und' in terms: terms.remove('und')
        elif 'y' in terms: terms.remove('y')

        # Query the database for each term in terms
        found_results: list = []
        for w in terms: 
            db_found = objdb.find({"word": w})
            found_results.append(db_found)

        # Extract the found entries from the mongo db cursor; for each result in found_results
        found_entries: list = []
        for fr in found_results:
            tmp = [e for e in fr]
            found_entries.append(tmp)
        
        # Extract only the IDs and store them in lists for each term in terms
        found_ids: list = []
        for fe in found_entries:
            # TODO: use position for ranking
            # delete position number from document ID list. ['asdgf356345d', 327] -> 'asdgf356345d'
            try:
                tmp = [e['id'] for e in fe[0]["documents"]]
            except:
                tmp = []
            found_ids.append(tmp)

        # Only store the common IDs in a new set
        # TODO: Allow more than two terms for AND
        found_ids = list(set(found_ids[0]).intersection(found_ids[1]))

    # If the user only searches for one term
    else:
        results = objdb.find({ 'word': terms[0]}).skip(0)
        entries: list = [entry for entry in results]

        # delete position number from document ID list. ['asdgf356345d', 327] -> 'asdgf356345d'
        try:
            found_ids: list = [ent['id'] for ent in entries[0]["documents"]]
        except:
            # handle error if there are no documents for this search
            found_ids: list = []

    # Finally return all found IDs
    try:
        return found_ids
    except:
        return []


def getListOfSearchTerms(named_entities: list, query: str) -> list:
    """
    Generates the list of search terms if the query contains named entities.
    Thus, the named entity would be one item of the list and not two or three.
    Example: 
        before -> query = 'Angela Merkel and Germany'
        after ->  query = ['Angela Merkel', and', 'Germany']

    :named_entities: List
    :query: String
    :returns: List
    """

    # replace named entites in query with 'tmpN' string
    for i, en in enumerate(named_entities):
        query = query.replace(en, 'tmp{}'.format(i))

    # query string to list
    query: list = query.split()

    # change the 'tmpN' string in query list with named entity in entities list
    for j, ent in enumerate(named_entities):
        query[query.index('tmp{}'.format(j))] = ent

    return query


def getWordsFromInvertedIndex() -> list:
    """
    Returns a list of all words from the inverted index.
    Used for autosuggestion.
    Example:
        - [{'label': 'summer'}, ...]
    :return: List
    """
    db = client[GLOBALS["mongo"]["database"]]
    objdb = db[GLOBALS["mongo"]["collections"]["inverted_index"][0]]

    try:
        return [w for w in objdb.find({},{ "_id": 0, "documents": 0})]
    except:
        return []


def getDocumentsByLevel(docIdsSet: set, level: str, language: str, col):
    documents: list = []
    # Is used for calculating TF. See nlp.py/calculateTermfrequency
    textsOfDocuments: dict = {}
    # Only use the IDs of the result documents to prevent KeyError
    resultIds: list = []
    for id in docIdsSet:

        # Check if the user wants to search for all documents with this search term
        # and remove the filter for this case
        if level == 'all':
            query: dict = {"_id": ObjectId(id), "meta.language": language}
        else:
            query: dict = {"_id": ObjectId(id), "level": level, "meta.language": language}
        
        results = col.find(query)

        for r in results: 
            documents.append(r)
            resultIds.append(str(r['_id']))
            textsOfDocuments[str(r['_id'])] = r['text']

    return documents, textsOfDocuments, resultIds