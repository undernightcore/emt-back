FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
ENV NODE_ENV=development
RUN npm install
RUN node ace build --production

FROM node:latest
WORKDIR /usr/local/app
COPY --from=build /usr/local/app/build/ /usr/local/app/
ENV NODE_ENV=production
RUN npm ci
RUN node ace migration:run --force
CMD [ "node", "server.js" ]
EXPOSE 3333
