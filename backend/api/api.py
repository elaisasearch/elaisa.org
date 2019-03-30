from bottle import route, run

# source: https://gotofritz.net/blog/weekly-challenge/restful-python-api-bottle/

@route('/')
def hello():
    return "Hello World!"

run(host='localhost', port=8080, debug=True)