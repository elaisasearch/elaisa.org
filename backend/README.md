# Backend for Search Engine

## First Steps

- `pip3 install -r requirements.txt`

## Start the example news_de_DE.py crawler

`cd` in the directory *backend/webcrawler* and type in the following command: 

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

## Web-Crawler

- https://medium.com/python-pandemonium/develop-your-first-web-crawler-in-python-scrapy-6b2ee4baf954
- https://scrapy.org/
- https://docs.scrapy.org/en/latest/intro/tutorial.html#creating-a-project

