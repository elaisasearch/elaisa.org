from pymongo import MongoClient

# source: http://rosettacode.org/wiki/Inverted_index#Python


def parseMongo():
    client = MongoClient('mongodb://localhost:27017/')
    db = client["LanguageLevelSearchEngine"]
    collection = db["news_en_EN"]
    texts, words = {}, set()
    for news in collection.find():
        txt = news["text"].split()
        words |= set(txt)
        texts[str(news["_id"])] = txt
    return texts, words


texts, words = parseMongo()

# TODO: normalize words -> delete ""()... etc. 
finvindex = {word: set((txt, wrdindx)
                       for txt, wrds in texts.items()
                       for wrdindx in (i for i, w in enumerate(wrds) if word == w)
                       if word in wrds)
             for word in words}


def storeIndexInMongo(finvindex):
    client = MongoClient('mongodb://localhost:27017/')
    db = client["LanguageLevelSearchEngine"]
    collection = db["inverted_index_en_EN"]

    for word, docs in finvindex.items():
        collection.insert_one({"word": word, "documents": list(docs)})

storeIndexInMongo(finvindex)