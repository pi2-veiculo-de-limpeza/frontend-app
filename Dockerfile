FROM node:10-alpine

ADD . /app
WORKDIR /app/pi2app

RUN apk add --no-cache bash git

COPY /pi2app/package.json /app/pi2app/
