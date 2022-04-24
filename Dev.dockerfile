ARG NODE_VERSION=16.13.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /client

COPY package.json /client/
COPY package-lock.json /client/

RUN npm install
COPY . .
ENTRYPOINT npm run start
