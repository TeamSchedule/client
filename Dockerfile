ARG NODE_VERSION=16.17.1

FROM node:${NODE_VERSION}-alpine as deps

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build


FROM alpine:latest as built_client
WORKDIR /static
COPY --from=deps /app/build/* /static/
