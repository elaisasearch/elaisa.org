# language-level-search-engine
Search engine depending on the language level

# Docker

**Build the images:**

- `docker build -f build-utils/service-ui.Dockerfile -t service-ui:1.0.0 .`
- `docker build -f build-utils/service-api.Dockerfile -t service-api:1.0.0 .`
- `docker build -f build-utils/service-crawler.Dockerfile -t service-crawler:1.0.0 .`

**Test the image:**

`docker run -t service-ui:1.0.0 ls`

This will show the content of the UI image in your terminal.

### This Video shows the basic use

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/PUorFd57_fE/0.jpg)](http://www.youtube.com/watch?v=PUorFd57_fE)

### Architecture

 ![Architecture](docs/LanguageLevelSearchEngine.jpg)
