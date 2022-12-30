FROM node:latest

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm install @adonisjs/assembler
RUN node ace migration:fresh
RUN node ace build

WORKDIR /usr/local/app/build
RUN node server.js
EXPOSE 3333
