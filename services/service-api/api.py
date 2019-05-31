from bottle import Bottle, request, response, run
# import lib files
from lib import search, wikipedia, user
import json

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
    return "API - Language Level Search Engine"


@app.route('/find', method=["OPTIONS", "GET"])
def find():
    query = request.params.get('query')
    level = request.params.get('level')
    language = request.params.get('language')

    return {
        "wikipedia": wikipedia.getWikiEntry(query, language),
        "documents": search.findDocuments(query, level, language)
    }


@app.route('/signup', method="POST")
def signUp():
    firstname = request.params.get('firstname')
    lastname = request.params.get('lastname')
    email = request.params.get('email')
    password = request.params.get('password')

    result = user.createUser(firstname, lastname, email, password)

    if result == "Success":
        return
    else:
        return "Error"


@app.route('/signin', method=["OPTIONS", "POST"])
def signIn():
    email = request.params.get('email')
    password = request.params.get('password')

    result =  user.loginUser(email, password)

    return json.loads(result)


@app.route('/changepassword', method=["OPTIONS", "POST"])
def changePassword():
    email = request.params.get('email')
    oldPass = request.params.get('oldpassword')
    newPass = request.params.get('newpassword')

    result = user.handlePasswordChange(email, oldPass, newPass)

    if result == "Success":
        return "Success"
    else:
        return "Error"


app.run(host='0.0.0.0', port=8080, debug=True)
