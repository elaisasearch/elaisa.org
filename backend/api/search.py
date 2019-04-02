from pymongo import MongoClient
import pymongo

# source: https://gotofritz.net/blog/weekly-challenge/restful-python-api-bottle/

def getWordsFromMongo():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["LanguageLevelSearchEngine"]
    mycol = mydb["inverted_index_de_DE"]

    return [x for x in mycol.find({},{ "_id": 0, "word": 1})]


# TODO: finvindex not defined
def termsearch(terms, words):  # Searches full inverted index
    if not set(terms).issubset(words):
        return set()
    return reduce(set.intersection,
                  (set(x[0] for x in txtindx)
                   for term, txtindx in finvindex.items()
                   if term in terms),
                  set(texts.keys()))