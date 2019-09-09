FROM python:3.6.5

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy api files into workdir
COPY services/service-api /app
COPY bin/globals.json /app/lib

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt
# Install langugages for textacy NLP
RUN python -m spacy download en
RUN python -m spacy download de
RUN python -m spacy download es

# Run api.py when the container launches
CMD [ "python", "api.py" ]