FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
ENV NODE_ENV=development
RUN npm install
RUN node ace build --production

FROM node:latest as production
WORKDIR /usr/local/app
COPY --from=build /usr/local/app/ /usr/local/app/
ENV NODE_ENV=production
RUN npm ci
RUN node build/ace migration:fresh
RUN node build/server.js
EXPOSE 3333
