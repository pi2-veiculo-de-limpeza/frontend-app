FROM node:10-alpine

WORKDiR /app

RUN apk add --no-cache bash

COPY /pi2app/package.json /app/pi2app/

WORKDIR /app/pi2app

RUN yarn install
