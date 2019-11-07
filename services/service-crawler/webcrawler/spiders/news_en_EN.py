"""
Webcrawler for english news sites.
"""

import scrapy
import thinc
import textacy
import re
from textblob import TextBlob
from . import categorize
from . import nlp
from . import db

class NewsSpider(scrapy.Spider):
    """
    The NewsSpider searches for english news sites and crawls the information. Later in the pipeline, this data will be stored in the mongo database.
    """

    # The spider's name.
    name = "news_en_EN"

    # The only wanted domains the spider should use for crawling.
    allowed_domains = [
        'theguardian.com',
        'bbc.com',
        'bbc.co.uk',
        'worldofwanderlust.com',
        'hannahgale.co.uk',
        'thewanderblogger.com'
    ]

    # The already seen urls
    seen_urls: list = db.getSeenUrls()

    # The urls with whom the spider starts crawling.
    start_urls = [
        'https://www.theguardian.com/',
        'https://www.theguardian.com/uk/sport',
        'https://www.theguardian.com/uk/culture',
        'https://www.theguardian.com/film/2019/oct/02/its-very-modern-armando-iannucci-rips-up-rules-with-dickens-adaption',
        'https://www.theguardian.com/international',
        'https://www.theguardian.com/world/2019/jun/17/iran-it-will-break-uranium-stockpile-limit-set-nuclear-deal',  # new
        'https://www.bbc.com/', 
        'https://www.bbc.com/news/world-us-canada-48666249'
        'https://www.bbc.co.uk/',  # news
        'https://www.bbc.co.uk/newsround',  # news for children
        'http://www.bbc.co.uk/learningenglish/english/',  # BBC ESL site
        'http://www.worldofwanderlust.com/',  # travel blog
        'http://hannahgale.co.uk/',  # livestyle blow
        'https://www.thewanderblogger.com/',  # expat livestyle blog
        'https://www.thesun.co.uk/',
        'https://www.thesun.co.uk/sport/football/',
        'https://www.thesun.co.uk/news/',
        'https://www.thesun.co.uk/tech/',
        'https://www.thesun.co.uk/money/'
    ]

    # Prevent crawling sign in pages etc.
    exluded_paths = ['newsround','profile', 'game', 'play', 'sign', 'join', 'info', 'log', 'password', 'account', 'home', 'job', 'portal', 'usingthebbc', 'help', 'wiki', 'center', 'faq']

    def parse(self, response):
        """
        Parses the start_urls and returns the data as dictionary
        :self: NewsSpider
        :response: ScrapyResponse
        """
        url = response.url

        # check if the current url was already seen by the crawler
        if url not in self.seen_urls and not any(elem in url for elem in self.exluded_paths):

            # append the current url to seen
            self.seen_urls.append(url)

            for data in response.css('html'):

                if data.css('html::attr(lang)').get() in ['en', 'en-EN', 'en-US']:
                
                    # get the extracted domain from url for inverted index company search
                    domain = nlp.extractDomainName(url)

                    # preprocess text for lowercase search and normalized data
                    text = " ".join(str(element)
                                    for element in data.css('p::text').getall())
                    # add domain name to text to store it in the inverted index
                    text += ' {} '.format(domain)

                    preprocessedText = textacy.preprocess_text(
                        text,
                        no_accents=True,
                        no_punct=True,
                        lowercase=False,
                        fix_unicode=True,
                        no_emails=True,
                        no_phone_numbers=True,
                        no_contractions=True
                    )

                    # lemmatize the entire text
                    # first, split the text to a list of words
                    words = TextBlob(preprocessedText).words
                    # then, lemmatize each word
                    lemmatizedText = ""
                    for w in words:
                        lemmatizedText += "{} ".format(w.lemmatize())

                    # normalize the whitespaces for texts which include s.l. 'Title    And I am ...'
                    preprocessedText = textacy.preprocess.normalize_whitespace(
                        lemmatizedText)

                    # categorize documents
                    # [MainLevel, easy/hard]
                    levelMetaPackage = categorize.categorizeText(
                        preprocessedText)

                    # only return articles with text inside. Otherwise the categorizer returns null
                    if len(preprocessedText) != 0:
                        yield {
                            'url': url,
                            'meta': {
                                'language': 'en',
                                'keywords': data.css('meta[name*=eywords]::attr(content)').get(),
                                'author': data.css("meta[name*=uthor]::attr(content)").get(),
                                'publisher': data.css("meta[name*=ublisher]::attr(content)").get(),
                                'desc': data.css("meta[name*=escription]::attr(content)").get(),
                                'date': data.css("meta[name*=ate]::attr(content)").get()
                            },
                            'title': data.css('title::text').get(),
                            'abstract': data.css('strong::text').get(),
                            'text': preprocessedText,
                            'level': levelMetaPackage[0],
                            'level_meta': {
                                'difficulty': levelMetaPackage[1],
                                'A1': levelMetaPackage[2]["A1"],
                                'A2': levelMetaPackage[2]["A2"],
                                'B1': levelMetaPackage[2]["B1"],
                                'B2': levelMetaPackage[2]["B2"],
                                'C1': levelMetaPackage[2]["C1"],
                                'C2': levelMetaPackage[2]["C2"],
                                'unknown': levelMetaPackage[2]["unknown"]
                            },
                            'links': [link.extract() for link in response.css('a::attr(href)')],
                            'pagerank': 1
                        }
                    else: 
                        continue
                else:
                    continue

            # Follow every link on the current webpage.
            for a in response.css('a::attr(href)'):
                yield response.follow(a, callback=self.parse)
