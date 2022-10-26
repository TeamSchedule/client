ARG NODE_VERSION=16.17.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
