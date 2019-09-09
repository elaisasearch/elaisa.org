import textacy

def extractNamedEntities(query):
    """
    Extract Phrases from a given query sentence string
    :query: String
    :returns: List
    """
    doc = textacy.Doc(query)
    entities = list(textacy.extract.named_entities(doc))

    return [str(ent) for ent in entities]

