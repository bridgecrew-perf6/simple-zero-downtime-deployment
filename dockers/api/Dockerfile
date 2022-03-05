FROM node:16.13.2-alpine

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

COPY . /app

WORKDIR /app

COPY package*.json ./app/

RUN yarn install