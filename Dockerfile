FROM node:latest

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN node ace build

RUN node build/ace migration:fresh
RUN node build/server.js
EXPOSE 3333
