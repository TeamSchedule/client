ARG NODE_VERSION=16.13.0

FROM node:${NODE_VERSION}-alpine AS deps-builder
WORKDIR /deps
COPY package.json ./
RUN npm i --legacy-peer-deps
