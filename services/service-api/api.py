from bottle import Bottle, request, response, run
# import lib files
from lib import search, wikipedia

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

@app.route('/find&query=<query>', method=["OPTIONS","GET"])
def find(query):
    response.headers['Content-type'] = 'application/json'

    return search.findDocuments(query)

@app.route('/wiki&term=<term>&language=<language>', method=["OPTIONS","GET"])
def getInformationFromWikipedia(term, language):
    response.headers['Content-type'] = 'application/json'

    return wikipedia.getWikiEntry(term, language)

app.run(host='0.0.0.0', port=8080, debug=True)
