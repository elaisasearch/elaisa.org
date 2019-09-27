import textacy
from collections import defaultdict
import math
from textblob import TextBlob, Word

def extractNamedEntities(query: str, language: str) -> list:
    """
    Extract Phrases from a given query sentence string
    :query: String
    :language: String
    :returns: List
    """
    doc = textacy.Doc(query, lang=language)
    entities = list(textacy.extract.named_entities(doc))

    return [str(ent) for ent in entities]

def calculateTermfrequency(query: str, resultIds: list, allDocsContainTermCount: int, allDocInDBCount:int, texts: dict) -> dict:
    """
    Calcualtes TF*IDF formula to show documents at the top of the result list
    in which the search query occurs the most.
    Example: 
        - Before -> ids: ['5d7bcb60f85903a2af72c4a3', '5d7bcb6bf85903a2af72c4a6']
        - After  -> {'5d7bcb6bf85903a2af72c4a6': {'wordFrequency': 5, 'textWordCount': 1440, 'tfidf': 0.003472222222222222}, 
                    ''5d7bcb60f85903a2af72c4a3': {'wordFrequency': 1, 'textWordCount': 1494, 'tfidf': 0.0006693440428380187}}
    source: https://stackoverflow.com/questions/722697/best-way-to-turn-word-list-into-frequency-dict
    tfIdf: https://www.onely.com/blog/what-is-tf-idf/

    :query: String
    :resultIds: List
    :allDocsContainTermCount: Integer
    :allDocInDBCount: Integer
    :texts: Dictionary

    :return: Dictionary
    """
    return  {
                id: {
                        'wordFrequency': resultIds.count(id), 
                        'textWordCount': len(texts[id].split()),
                        'tfidf': (resultIds.count(id) / len(texts[id].split())) * (math.log((allDocInDBCount / allDocsContainTermCount)))
                } 
                for id in set(resultIds)
            }

def lemmatizeSearchQuery(query: str) -> str:
    """
    Lemmatize the search query because in the inverted index there are only lemmatized word entries.
    :query: String
    :return: String
    """
    # get a list of words from the query
    words = TextBlob(query).words
    # then, lemmatize each word
    lemmatizedText = ""
    for w in words:
        lemmatizedText += "{} ".format(w.lemmatize())
   
    return lemmatizedText


def checkSpelling(text: str) -> str:
    """
    Checks if the text is spelled correctly. If not, it returns the probable right text
        - source: https://textblob.readthedocs.io/en/dev/quickstart.html#spelling-correction
    :text: String
    """

    # ignore a list of terms in the spell check
    ignoredTerms = ['Iran']

    word = Word(text)
    # returns something like: [('hello', 0.7619047619047619), ('hell', 0.23809523809523808)]
    checkResult: list = word.spellcheck()
    # most probable texts probability
    probability: float = checkResult[0][1]

    # Don't correct named entites like 'Iran'.
    # Set value to 1.0 so that it won't hit
    if probability > 0.9 and text not in ignoredTerms:
        blob = TextBlob(text)
        # return the most probable correct word
        return blob.correct()
    else:
        return text

