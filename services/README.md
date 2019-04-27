# Services for Search Engine

## First Steps

- `pip3 install -r ../requirements.txt`

## Start the example news_de_DE.py crawler

`cd` in the directory *service-crawler* and type in the following command: 

- ` scrapy crawl news_de_DE -o news_de_DE.json `

This will create a file called *news_de_DE.json* filled with news from tagesschau.de/*. 

```json
[
    {
        "title": "Export-Stopp verl\u00e4ng....",
        "abstract": "Lange hatte...",
        "text": [
            "Detail Navigation:",
            " Die Bundesregierung hat ihren wochenlangen Streit um den 												R\u00fcstungsexportstopp f\u...
```

## Configure Mongo DB

As it isn't the best practise to store the results locally in a JSON file, we now want to configure a Database — in this case [Mongo DB](https://www.mongodb.com/). This database is a so called Key-Value database, what is similar to the [JSON](https://www.json.org/json-de.html). 

### Install Mongo DB on your machine

[This guide will show you the steps to install mongo on your system](https://docs.mongodb.com/guides/server/install/)

If you installed all dependencies and played around a little bit, you can use the [Mongo DB Localhost](mongodb://127.0.0.1:27017) for this project. The *settings.py* already says that you need a Mongo DB URI and a **database**. So finally here are the configs:

- Database Name: LanguageLevelSearchEngine
- Mongo URI: mongodb://127.0.0.1:27017

To get the Mongo URI you have to start Mongo DB in your Terminal/CommandLine: 

1. ` mongod `
2. `mongo`

Now you are in the Mongo Shell. As the Shell isn't easy to use for newbies, you can use the [Mongo DB Compass Desctop Application](https://www.mongodb.com/products/compass). With this application you can easily create or manipulate your databases.

## Web-Crawler

- https://medium.com/python-pandemonium/develop-your-first-web-crawler-in-python-scrapy-6b2ee4baf954
- https://scrapy.org/
- https://docs.scrapy.org/en/latest/intro/tutorial.html#creating-a-project

