# Globals for Mongo DB Usage

The `.gitignore` file ignores a JSON called `globals.json`, which is used by the **service-api** for connecting to the mongo db service and **service-ui** to get the API Key for HTTP-Requests. 

If you want to connect to your own database or API, you have to follow this template: 

```JSON
{
    "api": {
        "x-api-key": ""
    },
    "mongo": {
        "auth": {
            "host": "example.com:27017",
            "username": "",
            "password": "",
            "authSource": "admin",
            "authMechanism": "SCRAM-SHA-256"
        },
        "database": "LanguageLevelSearchEngine",
        "collections": {
            "inverted_index": [
                "inverted_index_en_EN"
            ],
            "crawled": {
                "news": [
                    "news_en_EN"
                ]
            },
            "user": [
                "users",
                "search_history"
            ],
            "cefr": [
                "vocab_english"
            ] 
        }
    }
}
```

Is is very important to use the `username` and `password` of your new created mongo db user. The **Docker Secret**, used in `elaisa.yml` is only needed for the **Root** user.