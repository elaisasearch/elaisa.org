import textacy
from collections import defaultdict

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

def calculateTermfrequency(query: str, ids: list, texts: dict) -> dict:
    """
    Calcualtes the TF part of the TF*IDF formular to show documents at the top of the result list
    in which the search query occurs the most.
    Example: 
        - Before -> ids: ['5d7bcb60f85903a2af72c4a3', '5d7bcb6bf85903a2af72c4a6']
        - After  -> {'5d7bcb6bf85903a2af72c4a6': {'wordFrequency': 5, 'textWordCount': 1440, 'tf': 0.003472222222222222}, 
                    ''5d7bcb60f85903a2af72c4a3': {'wordFrequency': 1, 'textWordCount': 1494, 'tf': 0.0006693440428380187}}
    source: https://stackoverflow.com/questions/722697/best-way-to-turn-word-list-into-frequency-dict
    tfIdf: https://www.onely.com/blog/what-is-tf-idf/

    :query: String
    :ids: List
    :texts: Dictionary

    :return: Dictionary
    """
    return  {
                id: {
                        'wordFrequency': ids.count(id), 
                        'textWordCount': len(texts[id].split()),
                        'tf': ids.count(id) / len(texts[id].split())
                } 
                for id in set(ids)
            }
   
    

