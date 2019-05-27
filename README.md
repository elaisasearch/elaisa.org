# language-level-search-engine
Search engine depending on the language level

<img src="services/service-ui/src/assets/img/logo.png" alt="Logo" width="250"/>

**[Watch the Demo Video](https://www.youtube.com/watch?v=p2H1hCRi_5Y&feature=youtu.be)**

# Start App without Docker

1. `cd services/service-ui/ && yarn && yarn start`
2. `cd services/service-api && python api.py`
    - If you're on Windows, please check if you can start Python files with `python file.py`
3. Mongo DB should run on `localhost:27017`
4. `cd services/service-cefr/en && python enHandler.py`
5. `cd services/service-crawler && scrapy crawl news_en_EN`
6. `cd services/service-index && python indexer.py`

Now you can visit the application on `localhost:3000` and search for english documents.

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

### Architecture

 ![Architecture](docs/LanguageLevelSearchEngine.jpg)
