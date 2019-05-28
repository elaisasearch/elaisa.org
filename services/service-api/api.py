from bottle import Bottle, request, response, run
# import lib files
from lib import search, wikipedia, user

app = Bottle()

@app.route('/')
def index():
    return "API - Language Level Search Engine"

@app.route('/find', method=["OPTIONS","GET"])
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
        response.status = 200
        return "Success"
    else:
        response.status = 500
        return "Error"

@app.route('/signin', method="POST")
def signIn():
    email = request.params.get('email')
    password = request.params.get('password')

    result = user.loginUser(email, password)

    if result == "Success":
        response.status = 200
        return "Success"
    else:
        response.status = 500
        return "Error"


app.run(host='0.0.0.0', port=8080, debug=True)
