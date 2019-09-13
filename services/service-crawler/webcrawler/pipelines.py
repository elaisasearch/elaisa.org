# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.exceptions import DropItem
import pymongo
import textacy


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
            # Remove all stop words from the text first
            wordsWithoutStopWordsList = self.removeStopWordsFromText(news["text"])
            # Handle Named Entities to store them as one word
            txt = self.extractNamedEntitiesAndCreateTextList(wordsWithoutStopWordsList)
            words |= set(txt)
            texts[str(news["_id"])] = txt
        return texts, words

    def removeStopWordsFromText(self, text):
        """
        Removes all stop words from the text, so that they aren't stored in the database.
        Example: 
            - Before: 'Tony Stark is the man'
            - After: ['Tony', 'Stark', 'man']
        :text: String
        :returns: List
        """
        # TODO: handle all used languages (en, es, de)
        doc = textacy.Doc(text, lang='en')
        # source: https://chartbeat-labs.github.io/textacy/api_reference/information_extraction.html?highlight=stop%20words
        wordsWithoutStopWordsList = list(textacy.extract.words(doc, filter_stops=True, filter_punct=True))

        return [str(word) for word in wordsWithoutStopWordsList]

    def extractNamedEntitiesAndCreateTextList(self, wordsWithoutStopWordsList):
        """
        Extract named entities from a given text and create a 
        list of all words in the article's text. In this case, 
        the named entites will be stored as one item, such as [...,'Angela Merkel, 'said',...]
        :text: String
        :returns: List
        """

        # transform text list to string, since removeStopWordsFromText() returns a list
        text = " ".join(w for w in wordsWithoutStopWordsList)

        # TODO: handle all used languages (en, es, de)
        doc = textacy.Doc(text, lang='en')
        entities = list(textacy.extract.named_entities(doc, exclude_types='numeric'))

        named_entities = [str(ent) for ent in entities]

        # replace named entites in text with 'tmpN' string
        for i, en in enumerate(named_entities):
            # Replace the first occuring named entity with the tmpN value. This is very important,
            # as there would be various tmp1 for example and the system wouldn't be able to change the values
            # in the next step.
            text = text.replace(en, 'tmp{}'.format(i), 1)

        # text string to list
        text = text.split()

        # change the 'tmpN' string in text list with named entity in entities list
        for j, ent in enumerate(named_entities):
            text[text.index('tmp{}'.format(j))] = ent

        # return the new text as list, that contains all words and named antities
        return text

    def storeIndexInMongo(self, finvindex):
        """
        Stores the index for each word in the current document in the database
        :finvindex: Dictionary
        """
        # Connect to mongo db
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        collection = self.db["inverted_index_en_EN"]

        """
        For every word in our current document, iterate through all document IDs of this word
        and update the database object, where the 'word' value equals this current word in the for loop.
        1. The upsert=True says that we create a new object in the database, if there is no obj with the current word.
        2. The $addToSet key says, that we only add the current docId from the document IDs list, if it doesn't already exists.
            - source: https://stackoverflow.com/questions/38970835/mongodb-add-element-to-array-if-not-exists
        """
        for word, docs in finvindex.items():
            # for each id in document IDs, check if it already is stored; otherwise store it.
            for d in docs:
                collection.update({"word": word}, {"$addToSet": {
                                  "documents": d}}, upsert=True)

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
        if spider.name == "news_en_EN":
            self.collection_name = 'news_en_EN'
        else:
            self.collection_name = 'crawled_items'

        self.db[self.collection_name].insert_one(dict(item))
        return item


class PageRankPipeline(object):
    """
    Ranks each crawled item (website) with Google's PageRank algorithm.
    """

    # connect to database

    collection_name = "news_en_EN"
    max_iterations = 3

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

    def getCrawledWebpages(self):
        """
        Returns all stored documents from the database
        :return: MongoDB Cursor Object
        """
        return self.db[self.collection_name].find()

    def getLenOfCrawledWebpages(self):
        """
        Returns the number of webpages in the db
        :return: Integer
        """
        counter = 0
        dbCol = self.db[self.collection_name].find()

        for _ in dbCol: 
            counter += 1
        return counter

    def getBacklinkPages(self, page):
        """
        Returns all pages that link to the current page
        :page: Dictionary
        :return: List
        """
        return [page for p in self.getCrawledWebpages() if page['url'] in p['links']]

    def updatePageRank(self, page, pagerank):
        """
        Updates the webpage's pagerank in the db
        :page: Dictionary
        :pagerank: Float
        """
        self.db[self.collection_name].update_one({'_id': page['_id']}, {"$set": {"pagerank": pagerank}})

    # source: https://github.com/nicholaskajoh/devsearch/blob/master/devsearch/pagerank.py
    def process_item(self, item, spider):
        """
        Updates the pagerank for each crawled webpage in the mongo database
        """

        # get the number of all pages in the db
        N = self.getLenOfCrawledWebpages()

        # set the initial pagerank for the current item
        initial_pr = 1 / N
        item['pagerank'] = initial_pr

        for _ in range(1, self.max_iterations + 1):
            pr_change_sum = 0

            for page in self.getCrawledWebpages():
                current_pagerank = page['pagerank']
                new_pagerank = 0

                # get all pages who link to our current webpage
                backlink_pages = self.getBacklinkPages(page)

                # calculate the new pagerank
                for backlink_page in backlink_pages:
                    new_pagerank += (backlink_page['pagerank'] /
                                     len(backlink_page['links']))
                damping_factor = 0.85
                new_pagerank = ((1 - damping_factor) / N) + \
                    (damping_factor * new_pagerank)

                # update pagerank for current page
                self.updatePageRank(page, new_pagerank)

                pr_change = abs(
                    new_pagerank - current_pagerank) / current_pagerank
                pr_change_sum += pr_change

            average_pr_change = pr_change_sum / N
            if average_pr_change < 0.0001:
                break
        
        return item
