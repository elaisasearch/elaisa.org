"""
Handles the Wikipedia data for the user's search value.
"""

import wikipedia

def getWikiEntry(term, language): 
    """
    Takes the user's search term and chosen language and returns the wikipedia article information.
    :term: String
    :language: String
    :return: Dictionary
    """

    try:
        wikipedia.set_lang(language)
        page = wikipedia.page(term)
        
        return {
            "url": page.url,
            "title": page.title,
            "summary": page.summary
        }
    except:
        return {
            "url": "",
            "title": "",
            "summary": ""
        }
