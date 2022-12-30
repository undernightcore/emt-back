FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
ENV NODE_ENV=development
RUN npm install
RUN node ace build --production

FROM node:latest as production
COPY --from=build /usr/local/app/build/* /usr/local/app/
ENV NODE_ENV=production
RUN npm install
RUN node ace migration:fresh
RUN node server.js
EXPOSE 3333
