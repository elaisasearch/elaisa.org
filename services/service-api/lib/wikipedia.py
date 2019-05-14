import wikipedia

def getWikiEntry(term, language): 

    # wikipedia.set_lang(language)
    page = wikipedia.page(term)
    
    return {
        "url": page.url,
        "title": page.title,
        "summary": page.summary
    }
