# Dockerfile for service-ui

FROM node:10.15.3

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json into workdir
COPY services/service-ui/package*.json /app

# Install all dependencies
RUN yarn install

ADD services/service-ui/src /app/src
ADD services/service-ui/public /app/public

# Build the application
RUN yarn build

CMD [ "yarn", "start" ]