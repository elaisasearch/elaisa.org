"""
The Application Programming Interface (API) for the entire Search Engine.
"""

import json
from bottle import Bottle, request, response, run
# import lib files
from lib.search import findDocuments, getIdsFromWord
from lib.wikipedia import getWikiEntry
from lib.user import createUser, getSearchHistoryForUser, handlePasswordChange, loginUser, writeSearchDataIntoDatabase

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
def index():
    """
    Root api requst url.
    :return: String
    """
    return "API - Language Level Search Engine"


@app.route('/find', method=["OPTIONS", "GET"])
def find():
    """
    Takes the user input and returns the found documents as dictionary.
    :query: String
    :level: String
    :language: String
    :loggedIn: Boolean
    :email: String
    :return: Dictionary
    """
    query = request.params.get('query')
    level = request.params.get('level')
    language = request.params.get('language')
    loggedIn = request.params.get('loggedin')
    email = request.params.get('email')

    if loggedIn == "true":
        writeSearchDataIntoDatabase(query, level, language, email)

    return {
        "wikipedia": getWikiEntry(query, language),
        "documents": findDocuments(query, level, language)
    }


@app.route('/signup', method="POST")
def signUp():
    """
    Takes the user information and signs up the new user in the database by calling the createUser() function.
    :firtname: String
    :lastname: String
    :email: String
    :password: String
    :return: String
    """
    firstname = request.params.get('firstname')
    lastname = request.params.get('lastname')
    email = request.params.get('email')
    password = request.params.get('password')

    result = createUser(firstname, lastname, email, password)

    if result == "Success":
        return
    else:
        return "Error"


@app.route('/signin', method=["OPTIONS", "POST"])
def signIn():
    """
    Takes the user input and checks if the credentials are right by calling loginUser() from user.py.
    :email: String
    :password: String
    :return: Dictionary
    """
    email = request.params.get('email')
    password = request.params.get('password')

    result =  loginUser(email, password)

    return json.loads(result)


@app.route('/changepassword', method=["OPTIONS", "POST"])
def changePassword():
    """
    Changes the user's password with the new user's input. First, the method checks the old password (coming soon).
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    email = request.params.get('email')
    oldPass = request.params.get('oldpassword')
    newPass = request.params.get('newpassword')

    result = handlePasswordChange(email, oldPass, newPass)

    if result == "Success":
        return "Success"
    else:
        return "Error"


@app.route('/searchhistory', method=["OPTIONS", "GET"])
def getSearchHistory():
    """
    Takes the user email and returns the user's search history.
    :email: String
    :return: Dictionary
    """
    email = request.params.get('email')

    results = getSearchHistoryForUser(email)

    if results["response"] == "Success":
        return results
    else: 
        return "Error"

app.run(host='0.0.0.0', port=8080, debug=True)
