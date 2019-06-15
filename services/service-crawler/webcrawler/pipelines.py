# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.exceptions import DropItem
import pymongo


class WebcrawlerPipeline(object):
    def process_item(self, item, spider):
        return item


class DuplicatesPipeline(object):

    def __init__(self):
        self.titles_seen = set()

    def process_item(self, item, spider):
        if item['url'] in self.titles_seen:
            raise DropItem("Duplicate item found: %s" % item)
        else:
            self.titles_seen.add(item['url'])
            return item


class InvertedIndexPipeline(object):
    """
    Adds the crawled document to the inverted index
    """

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            # Get the mongo db config from settings.py
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
        )

    def parseMongo(self):
        # Connect to mongo db
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        collection = self.db["news_en_EN"]

        # Return the texts and words from the database objects
        texts, words = {}, set()
        for news in collection.find():
            txt = news["text"].split()
            words |= set(txt)
            texts[str(news["_id"])] = txt
        return texts, words

    def storeIndexInMongo(self, finvindex):
        # Connect to mongo db
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        collection = self.db["inverted_index_en_EN"]

        # TODO: Append word to existing db items and don't create a new one for the same word
        for word, docs in finvindex.items():
            collection.insert_one({"word": word, "documents": list(docs)})

    def main(self):
        texts, words = self.parseMongo()

        finvindex = {word: set((txt, wrdindx)
                               for txt, wrds in texts.items()
                               for wrdindx in (i for i, w in enumerate(wrds) if word == w)
                               if word in wrds)
                     for word in words}

        self.storeIndexInMongo(finvindex)

    def process_item(self, item, spider):
        self.main()
        return item


class MongoPipeline(object):
    """
    Takes the crawled data and stores it into the mongo database for every crawled webpage.
    """

    collection_name = ""

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        """
        Check the spider's name to store the current crawled webpage in the right mongo collection.
        """
        if spider.name == "news_de_DE":
            self.collection_name = 'news_de_DE'
        elif spider.name == "news_en_EN":
            self.collection_name = 'news_en_EN'
        else:
            self.collection_name = 'crawled_items'

        self.db[self.collection_name].insert_one(dict(item))
        return item
