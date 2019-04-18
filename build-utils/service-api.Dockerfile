# Dockerfile for service-api

FROM python:3.6.5

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Copy api files into workdir
COPY services/service-api /api

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8080

# Run api.py when the container launches
CMD [ "python", "api.py" ]