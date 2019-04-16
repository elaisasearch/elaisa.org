import wikipediaapi

def getWikiEntry(term, language): 

    wiki_wiki = wikipediaapi.Wikipedia(language)
    page = wiki_wiki.page(term)
    
    if page.exists():
        return {
            "url": page.fullurl,
            "title": page.title,
            "summary": page.summary
        }
    else: 
        return {"error": "page doesn't exist."}

    print("Page - Title: %s" % page.title)
    print("Page - Summary: %s" % page.summary)
