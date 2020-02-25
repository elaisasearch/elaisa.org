"""
The Application Programming Interface (API) for the entire Search Engine.
"""

import json
from bottle import Bottle, request, response, run, template
# import lib files
from lib.search import findDocuments, getIdsFromWord, getListOfSearchTerms, getWordsFromInvertedIndex, getMostCommonWordsFromInvertedIndex
from lib.wikipedia import getWikiEntry
from lib.user import createUser, getSearchHistoryForUser, loginUser, writeSearchDataIntoDatabase
from lib.password import changePasswordHandler, resetPasswordHandler, sendResetPasswordToken
from lib.nlp import extractNamedEntities, lemmatizeSearchQuery, checkSpelling
from lib.globals import GLOBALS, API_KEY


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
    :return: Template
    """
    return template('index')


@app.route('/find', method=["OPTIONS", "GET"])
def find() -> dict:
    """
    Takes the user input and returns the found documents as dictionary.
    :query: String
    :level: String
    :language: String
    :loggedIn: Boolean
    :email: String
    :mode: String
    :exclude: List
    :return: Dictionary
    """
    query: str = request.params.get('query')
    level: str = request.params.get('level')
    language: str = request.params.get('language')
    loggedIn: str = request.params.get('loggedin')
    email: str = request.params.get('email')
    mode: str = request.params.get('mode')
    exclude: str = request.params.get('exclude')

    # Get values to exclude from result quantity
    try:
        exclude: list = exclude.split(",")
    except:
        exclude: list = []

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    if loggedIn == "true":
        writeSearchDataIntoDatabase(query, level, language, email)

    """
    Check if query is spelled correctly. The result will be a string and if the string 
    don't equals the query, the query was spelled wrong.
    """
    try:
        spellCheck: str = checkSpelling(query)
    except:
        response.status = 400
        return {
            "error": "Your request is missing the 'query' parameter!"
        }

    """
    If the spell check is equivalent to the search query, return the found documents.
    Otherwise return the correct spelling suggestion of the given query
    """
    if spellCheck == query:
        
        # lemmatize query for search in inverted index.
        query = lemmatizeSearchQuery(query)

        # remove 'the' from query so the user can search for 'the guardian' but gets 'guardian' result
        query = query.replace('the', '')

        """
        Check if the query contains Named Entities and create a list of search terms.
        This list is used to query the database.
        Example:
            - ['angela merkel', 'and', 'germany']
            - ['summer']
        """
        # Extract named entities
        try:
            named_entities: list = extractNamedEntities(query, language)
        except:
            response.status = 400
            return {
                "error": "Your request is missing the 'language' parameter!"
            }

        terms: list = []
        if len(list(named_entities)) != 0:
            terms = getListOfSearchTerms(named_entities, query)
        else:
            # If there are no named entites, use the splitted query sentence.
            terms = query.split()

        # Check if client wants to exclude stuff
        if "wikipedia" in exclude: wikipedia: dict = {}
        else: wikipedia: dict = getWikiEntry(terms, language)
        
        if "documents" in exclude: documents: dict = {}
        else: documents: dict = findDocuments(terms, level, language, mode)

        return {
            "result": {
                "spellcheck": {
                    "checked": False,
                    "correctquery": ""
                },
                "wikipedia": wikipedia,
                "documents": documents
            }
        }
    else:
        return {
            "result": {
                "spellcheck": {
                    "checked": True,
                    "correctquery": str(spellCheck)
                },
                "wikipedia": {},
                "documents": {}
            }
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

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    createdUser: bool = createUser(firstname, lastname, email, password)

    if createdUser: 
        return {
            "result": {
                "email": email,
                "message": "success",
                "user": {
                    "email": email,
                    "firstname": firstname,
                    "lastname": lastname
                }
            }
        }
    else: 
        return {
            "result": {
                "email": email,
                "message": "already exists",
                "user": {}
            }
        }



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

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    loginResponse: str = loginUser(email, password)
    result: dict = json.loads(loginResponse)

    try:
        if result["message"] == "error": response.status = 500

        return {
            "result": result
        }
    except:
        return {
            "result": {
                "email": email,
                "message": "error: Mail not found",
                "user": {}
            }
        }


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

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    changedPasswordResponse: bool = changePasswordHandler(email, oldPass, newPass)

    if changedPasswordResponse == "Old password incorrect":
        response.status = 500
        return {
            "result": {
                "email": email,
                "message": "error: Old password is incorrect."
            }
        }
    elif changedPasswordResponse == True: 
        return {
            "result": {
                "email": email,
                "message": "success"
            }
        }
    else:
        response.status = 500
        return {
            "result": {
                "email": email,
                "message": "error"
            }
        }



@app.route('/forgotpassword', method=["OPTIONS", "POST"])
def forgotPassword() -> str:
    """
    Changes the user's password with the new user's input. First, the method checks the old password (coming soon).
    :email: String
    :return: String
    """
    email: str = request.params.get('email')

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    sentResetPasswordToken: bool = sendResetPasswordToken(email)
    
    if sentResetPasswordToken == True:
        message = "success"
    else:
        response.status = 500
        message = "error"

    return {
        "result": {
            "email": email,
            "message": message
        }
    }

@app.route('/resetpassword', method=["OPTIONS", "POST"])
def resetPassword() -> str:
    """
    Changes the user's password with the new user's input. First, the method checks the old password (coming soon).
    :email: String
    :newPass: String
    :return: String
    """
    email: str = request.params.get('email')
    newPass: str = request.params.get('newpassword')

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    resetResponse = resetPasswordHandler(email, newPass)
    
    if resetResponse == "Mail not found":
        response.status = 404
        message = "error: Mail not found"
    elif resetResponse == True:
        message = "success"
    else:
        response.status = 500
        message = "error"

    return {
        "result": {
            "email": email,
            "message": message
        }
    }


@app.route('/searchhistory', method=["OPTIONS", "GET"])
def getSearchHistory():
    """
    Takes the user email and returns the user's search history.
    :email: String
    :return: Dictionary
    """
    email: str = request.params.get('email')

    # Check API Key
    if str(request.params.get('key')) != API_KEY:
        response.status = 401
        return {
            "error": "API-KEY is wrong or missing. See https://github.com/dasmemeteam/language-level-search-engine/blob/master/bin/README.md for more information."
        }

    results: dict = getSearchHistoryForUser(email)

    if len(results["statistics"]) == 0: response.status = 500
    return {
        "result": results
    }


@app.route('/getwords', method=["OPTIONS", "GET"])
def getSearchHistory():
    """
    Returns all words from the inverted index. Used for autosuggestion in Searchbar.js.
    :return: List
    """
    wordList: list =  getWordsFromInvertedIndex()
    if len(wordList) == 0: response.status = 503

    return {
        "result": wordList
    }

@app.route('/gettopics', method=["OPTIONS", "GET"])
def getMostCommonWords():
    """
    Returns the n most common words from the inverted index to have topics. Used for the quick search feature.
    :return: List
    """

    number: str = request.params.get('number')

    try:
        number = int(number)
    except:
        number = 3

    topics: list =  getMostCommonWordsFromInvertedIndex(number)
    if len(topics) == 0: response.status = 503

    return {
        "result": {
            "length": number,
            "topics": topics
        }
    }
    


app.run(host='0.0.0.0', port=8080, debug=True, reloader=True)