# language-level-search-engine
Search engine depending on the language level

# Docker

**Build the images:**

- `docker build -f build-utils/service-ui.Dockerfile -t service-ui:1.0.0 .`
- `docker build -f build-utils/service-api.Dockerfile -t service-api:1.0.1 .`
- `docker build -f build-utils/service-crawler.Dockerfile -t service-crawler:1.0.0 .`

**Test the image:**

`docker run -t service-ui:1.0.0 ls`

This will show the content of the UI image in your terminal.

**Start UI and DB**

1. `docker-compose up`
   - This will start the application on `localhost`
   - and start the mongo db on `0.0.0.0:27016`
2. Visit `localhost` on your webbrowser

**Fill the Database**

1. Start UI and DB
2. Navigate to the `service-crawler`
3. Start the crawler with `scrapy crawl <spider>` 
4. Index the crawled documents
    1. Navigate to the `service-index`
    2. Run `python indexer.py`

Now the database is ready for production.

***Warning***
*If you want to use your own builds, then you have to change the `docker-compose.yml` file and insert your `service-ui` container for the `ui` service!!*

### This Video shows the basic use

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/PUorFd57_fE/0.jpg)](http://www.youtube.com/watch?v=PUorFd57_fE)

### Architecture

 ![Architecture](docs/LanguageLevelSearchEngine.jpg)
