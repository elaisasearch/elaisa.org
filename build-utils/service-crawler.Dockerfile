# Dockerfile for service-crawler

FROM python:3.6.5

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy api files into workdir
COPY services/service-crawler /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run api.py when the container launches
CMD [ "scrapy", "crawl", "news_de_DE" ]