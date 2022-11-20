ARG NODE_VERSION=16.17.1

FROM node:${NODE_VERSION}-alpine as deps

RUN apt-get update -y
RUN apt-get install -y python

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN corepack enable
RUN corepack prepare yarn@stable --activate

RUN yarn install
COPY . .
RUN yarn build


FROM alpine:latest as built_client
WORKDIR /static
COPY --from=deps /app/build/* /static/
