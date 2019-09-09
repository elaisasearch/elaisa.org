from textblob import TextBlob

def extractNamedEntities(query):
    """
    Extract Phrases from a given query sentence string
    :query: String
    :returns: List
    """
    queryBlob = TextBlob(query)
    return queryBlob.noun_phrases
