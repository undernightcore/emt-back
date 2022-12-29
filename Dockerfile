FROM node:latest
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN node ace migration:fresh
RUN node ace build
WORKDIR /usr/local/app/build
COPY /usr/local/app/.env /usr/local/app/build/
RUN node server.js
EXPOSE 3333
