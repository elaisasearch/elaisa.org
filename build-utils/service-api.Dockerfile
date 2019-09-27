FROM python:3.6.5

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy api files into workdir
COPY services/service-api /app
COPY bin/globals.json /app/lib


# Install cld2-cffi package first for language detection
# source: https://github.com/chartbeat-labs/textacy/issues/5
RUN CFLAGS="-Wno-narrowing" pip install cld2-cffi
# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt
# Install langugages for textacy NLP
RUN python -m spacy download en
RUN python -m spacy download de
RUN python -m spacy download es
# Install textblob corpora for lemmatizing search query
RUN python -m textblob.download_corpora

# Run api.py when the container launches
CMD [ "python", "api.py" ]