import scrapy


class QuotesSpider(scrapy.Spider):
    name = "news_de_DE"
    start_urls = [
        'https://www.tagesschau.de/inland/ruestungsexporte-169.html',
        'https://www.tagesschau.de/ausland/brexit-879.html',
        'https://www.tagesschau.de/ausland/ukraine-odessa-101.html',
        'https://www.tagesschau.de/ausland/guaido-venezuela-109.html'
    ]

    def parse(self, response):
        for data in response.css('html'):
            yield {
                'title': data.css('title::text').get(),
                'abstract': data.css('strong::text').get(),
                'text': data.css('p::text').getall()
            }
        next_page = response.css('div.linklist li a::attr(href)').get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)