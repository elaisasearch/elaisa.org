import scrapy
import textacy
import re 
from . import categorize

class NewsSpider(scrapy.Spider):
    name = "news_en_EN"
    start_urls = [
        'https://www.theguardian.com/', #new
        'https://www.firstnews.co.uk/', #news for children
        'https://www.bbc.com/', 'https://www.bbc.co.uk/', #news
        'https://www.bbc.co.uk/newsround', #news for children
        'http://www.bbc.co.uk/learningenglish/english/', #BBC ESL site
        'http://www.worldofwanderlust.com/', #travel blog
        'http://hannahgale.co.uk/', #livestyle blow
        'https://www.thewanderblogger.com/' #expat livestyle blog
    ]

    trustedUrls = [
        'https://www.theguardian.com/', #new
        'https://www.firstnews.co.uk/', #news for children
        'https://www.bbc.com/', 'https://www.bbc.co.uk/', #news
        'http://www.worldofwanderlust.com/', #travel blog
        'http://hannahgale.co.uk/', #livestyle blow
        'https://www.thewanderblogger.com/' #expat livestyle blog
    ]

    def parse(self, response):
        url = response.url
        for data in response.css('html'):

            # TODO: check if current url is in trusted Urls, so that we only parse news sites
            #re.match(r'{}'.format(url))

            if data.css('html::attr(lang)').get() == "en":

                # preprocess text for lowercase search and normalized data
                text = " ".join(str(element) for element in data.css('p::text').getall())
                preprocessedText = textacy.preprocess_text(
                    text, 
                    no_accents=True, 
                    no_punct=True, 
                    lowercase=True, 
                    fix_unicode=True, 
                    no_emails=True, 
                    no_phone_numbers=True,
                    no_contractions=True
                )
                preprocessedText = textacy.preprocess.normalize_whitespace(preprocessedText)
                # TODO: add lemmatizing for words

                # categorize documents
                # categorize.categorizeText(text)
                
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
                    'level': categorize.categorizeText(text)
                }
            else:
                continue
        for a in response.css('a::attr(href)'):
            yield response.follow(a, callback=self.parse)
