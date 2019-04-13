from bottle import route, run, response
import bottle

# import lib files
from lib import search, wikipedia


# source: https://stackoverflow.com/questions/17262170/bottle-py-enabling-cors-for-jquery-ajax-requests
# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/find&query=<query>', method=["OPTIONS","GET"])
@enable_cors
def find(query):
    response.headers['Content-type'] = 'application/json'

    return search.findDocuments(query)

@route('/wiki&term=<term>&language=<language>', method=["OPTIONS","GET"])
@enable_cors
def getInformationFromWikipedia(term, language):
    return wikipedia.getWikiEntry(term, language)


run(host='localhost', port=8080, debug=True)