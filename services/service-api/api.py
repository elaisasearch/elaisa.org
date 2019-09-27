"""
The Application Programming Interface (API) for the entire Search Engine.
"""

import json
from bottle import Bottle, request, response, run
# import lib files
from lib.search import findDocuments, getIdsFromWord, getListOfSearchTerms
from lib.wikipedia import getWikiEntry
from lib.user import createUser, getSearchHistoryForUser, handlePasswordChange, loginUser, writeSearchDataIntoDatabase, handleForgotPassword
from lib.nlp import extractNamedEntities, lemmatizeSearchQuery, checkSpelling

app = Bottle()


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@app.route('/')
def index() -> str:
    """
    Root api requst url.
    :return: String
    """
    return "API - Language Level Search Engine"


@app.route('/find', method=["OPTIONS", "GET"])
def find() -> dict:
    """
    Takes the user input and returns the found documents as dictionary.
    :query: String
    :level: String
    :language: String
    :loggedIn: Boolean
    :email: String
    :return: Dictionary
    """
    query: str = request.params.get('query')
    level: str = request.params.get('level')
    language: str = request.params.get('language')
    loggedIn: str = request.params.get('loggedin')
    email: str = request.params.get('email')

    if loggedIn == "true":
        writeSearchDataIntoDatabase(query, level, language, email)

    """
    Check if query is spelled correctly. The result will be a string and if the string 
    don't equals the query, the query was spelled wrong.
    """
    spellCheck: str = checkSpelling(query)

    """
    If the spell check is equivalent to the search query, return the found documents.
    Otherwise return the correct spelling suggestion of the given query
    """
    if spellCheck == query:
        
        # lemmatize query for search in inverted index.
        query = lemmatizeSearchQuery(query)

        """
        Check if the query contains Named Entities and create a list of search terms.
        This list is used to query the database.
        Example:
            - ['angela merkel', 'and', 'germany']
            - ['summer']
        """
        # Extract named entities
        named_entities: list = extractNamedEntities(query, language)
        terms: list = []
        if len(list(named_entities)) != 0:
            terms = getListOfSearchTerms(named_entities, query)
        else:
            # If there are no named entites, use the splitted query sentence.
            terms = query.split()

        return {
            "wikipedia": getWikiEntry(terms, language),
            "documents": findDocuments(terms, level, language)
        }
    else:
        return {
            "correct_query": str(spellCheck)
        }


@app.route('/signup', method="POST")
def signUp() -> str:
    """
    Takes the user information and signs up the new user in the database by calling the createUser() function.
    :firtname: String
    :lastname: String
    :email: String
    :password: String
    :return: String
    """
    firstname: str = request.params.get('firstname')
    lastname: str = request.params.get('lastname')
    email: str = request.params.get('email')
    password: str = request.params.get('password')

    result: str = createUser(firstname, lastname, email, password)

    if result == "Success":
        return "Success"
    else:
        return "Error"


@app.route('/signin', method=["OPTIONS", "POST"])
def signIn() -> dict:
    """
    Takes the user input and checks if the credentials are right by calling loginUser() from user.py.
    :email: String
    :password: String
    :return: Dictionary
    """
    email: str = request.params.get('email')
    password: str = request.params.get('password')

    result: str = loginUser(email, password)

    return json.loads(result)


@app.route('/changepassword', method=["OPTIONS", "POST"])
def changePassword() -> str:
    """
    Changes the user's password with the new user's input. First, the method checks the old password (coming soon).
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    email: str = request.params.get('email')
    oldPass: str = request.params.get('oldpassword')
    newPass: str = request.params.get('newpassword')

    result: str = handlePasswordChange(email, oldPass, newPass)

    if result == "Success":
        return "Success"
    else:
        return "Error"


@app.route('/forgotpassword', method=["OPTIONS", "POST"])
def forgotPassword() -> str:
    """
    Changes the user's password with the new user's input. First, the method checks the old password (coming soon).
    :email: String
    :return: String
    """
    email: str = request.params.get('email')

    return handleForgotPassword(email)


@app.route('/searchhistory', method=["OPTIONS", "GET"])
def getSearchHistory():
    """
    Takes the user email and returns the user's search history.
    :email: String
    :return: Dictionary
    """
    email: str = request.params.get('email')

    results: dict = getSearchHistoryForUser(email)

    if results["response"] == "Success":
        return results
    else:
        return "Error"


app.run(host='0.0.0.0', port=8080, debug=True)
