"""
Webcrawler for english news sites.
"""

import scrapy
import thinc
import textacy
import re 
from . import categorize

class NewsSpider(scrapy.Spider):
    """
    The NewsSpider searches for english news sites and crawls the information. Later in the pipeline, this data will be stored in the mongo database.
    """

    # The spider's name.
    name = "news_en_EN"

    # The only wanted domains the spider should use for crawling.
    allowed_domains = [
        'theguardian.com', 
        'dogonews.com'
    ]

    # The already seen urls
    seen_urls = []

    # The urls with whom the spider starts crawling.
    start_urls = [
        'https://www.theguardian.com/music/2019/jun/15/madonna-becomes-latest-artist-to-call-out-instagram',
        'https://www.dogonews.com/2019/5/30/all-white-giant-panda-caught-on-camera-for-the-first-time' 
    ]

    def parse(self, response):
        """
        Parses the start_urls and returns the data as dictionary
        :self: NewsSpider
        :response: ScrapyResponse
        """
        url = response.url

        # check if the current url was already seen by the crawler
        if url not in self.seen_urls:

            # append the current url to seen
            self.seen_urls.append(url)

            for data in response.css('html'):

                if data.css('html::attr(lang)').get() == "en":

                    # preprocess text for lowercase search and normalized data
                    text = " ".join(str(element) for element in data.css('p::text').getall())
                    preprocessedText = textacy.preprocess_text(
                        text, 
                        no_accents=True, 
                        no_punct=True, 
                        lowercase=False, 
                        fix_unicode=True, 
                        no_emails=True, 
                        no_phone_numbers=True,
                        no_numbers=True,
                        no_contractions=True
                    )
                    preprocessedText = textacy.preprocess.normalize_whitespace(preprocessedText)
                    
                    # TODO: add lemmatizing for words"""

                    # categorize documents
                    # [MainLevel, easy/hard]
                    levelMetaPackage = categorize.categorizeText(preprocessedText)
                    
                    yield {
                        'url': url,
                        'meta': {
                            'language': data.css('html::attr(lang)').get(),
                            'keywords': data.css('meta[name*=eywords]::attr(content)').get(),
                            'author': data.css("meta[name*=uthor]::attr(content)").get(),
                            'publisher': data.css("meta[name*=ublisher]::attr(content)").get(),
                            'desc': data.css("meta[name*=escription]::attr(content)").get(),
                            'date': data.css("meta[name*=ate]::attr(content)").get()
                        },
                        'title': data.css('title::text').get(),
                        'abstract': data.css('strong::text').get(),
                        'text': preprocessedText,
                        'original_text' : text,
                        'level': levelMetaPackage[0],
                        'level_meta' : {
                                'difficulty' : levelMetaPackage[1],
                                'A1' : levelMetaPackage[2]["A1"],
                                'A2' : levelMetaPackage[2]["A2"],
                                'B1' : levelMetaPackage[2]["B1"],
                                'B2' : levelMetaPackage[2]["B2"],
                                'C1' : levelMetaPackage[2]["C1"],
                                'C2' : levelMetaPackage[2]["C2"],
                                'unknown' : levelMetaPackage[2]["unknown"]
                                },
                        'comment' : "added name_entity recognizition"
                        
                    }
                else:
                    continue

            # Follow every link on the current webpage.
            for a in response.css('a::attr(href)'):
                yield response.follow(a, callback=self.parse)
