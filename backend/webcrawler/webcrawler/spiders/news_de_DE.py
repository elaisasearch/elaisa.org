import scrapy


class NewsSpider(scrapy.Spider):
    name = "news_de_DE"
    start_urls = [
        'https://www.tagesschau.de/inland/ruestungsexporte-169.html',
        'https://www.tagesschau.de/ausland/brexit-879.html',
        'https://www.tagesschau.de/ausland/ukraine-odessa-101.html',
        'https://www.tagesschau.de/ausland/guaido-venezuela-109.html'
    ]

    def parse(self, response):
        url = response.url
        for data in response.css('html'):
            if data.css('html::attr(lang)').get() == "de":
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
                    'text': "".join(str(element) for element in data.css('p::text').getall()) 
                }
            else: 
                continue
        for a in response.css('a::attr(href)'):
            yield response.follow(a, callback=self.parse)
