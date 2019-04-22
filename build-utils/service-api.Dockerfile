# source: https://idolstarastronomer.com/docker-and-bottle.html

FROM devries/bottle

RUN pip install gevent

ADD services/service-api /app
WORKDIR /app

CMD ["gunicorn","-b","0.0.0.0:8080","-w","3","-k","gevent","--log-file","-","--log-level","debug","--access-logfile","-","api:app"]