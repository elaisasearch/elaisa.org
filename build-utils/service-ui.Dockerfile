# Dockerfile for service-ui

# stage 1: build our react app
FROM node:dubnium-alpine as builder

COPY services/service-ui/package*.json /app/
WORKDIR /app

RUN yarn install

COPY services/service-ui/ /app
RUN yarn build


# stage 2: build an image with NGINX that we will use in production
FROM nginx:stable-alpine

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html