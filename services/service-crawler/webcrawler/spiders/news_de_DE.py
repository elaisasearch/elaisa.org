import scrapy
import textacy
import re 

class NewsSpider(scrapy.Spider):
    name = "news_de_DE"
    allowed_domains = [
        'spiegel.de',
        'tagesschau.de',
        'wdr.de',
        'kindersache.de',
        'zdf.de',
        'faz.net'
    ]
    
    start_urls = [
        'http://www.spiegel.de/',
        'https://www.tagesschau.de/',
        'https://www1.wdr.de/',
        'https://www.tagesschau.de/inland/ruestungsexporte-169.html',
        'https://www1.wdr.de/sport/fussball/vorbericht-bayer-leverkusen-in-hoffenheim-100.htmls',
        'http://www.spiegel.de/politik/ausland/brexit-eu-koennte-grossbritannien-verlaengerung-verweigern-a-1260391.html',
        'https://www.kindersache.de/',
        'https://www.zdf.de/nachrichten',
        'https://www.faz.net/aktuell/'
    ]

    def parse(self, response):
        url = response.url
        for data in response.css('html'):

            # TODO: check if current url is in trusted Urls, so that we only parse news sites
            #re.match(r'{}'.format(url))

            if data.css('html::attr(lang)').get() == "de":

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
                    'text': preprocessedText
                }
            else:
                continue
        for a in response.css('a::attr(href)'):
            yield response.follow(a, callback=self.parse)