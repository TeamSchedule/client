ARG NODE_VERSION=16.17.1

FROM node:${NODE_VERSION}-alpine
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# RUN npm i --legacy-peer-deps

COPY src .
COPY public .
