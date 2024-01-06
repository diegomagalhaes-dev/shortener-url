FROM node:latest AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM dependencies AS build
COPY . .
RUN npm run build

FROM node:alpine:latest AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

EXPOSE 3000
CMD ["npm", "start"]