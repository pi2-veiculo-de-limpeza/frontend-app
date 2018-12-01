FROM node:10-alpine

COPY pi2app/package.json /app/pi2app/
WORKDIR /app/pi2app

RUN apk add --no-cache bash git