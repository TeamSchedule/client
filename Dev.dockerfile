ARG NODE_VERSION=16.13.0

FROM node:${NODE_VERSION}-alpine AS deps-builder
WORKDIR /deps
COPY package.json ./
RUN npm i --legacy-peer-deps


FROM node:${NODE_VERSION}-alpine
WORKDIR /app
COPY --from=deps-builder /deps/node_modules ./node_modules
COPY . .
ENTRYPOINT npm run start
