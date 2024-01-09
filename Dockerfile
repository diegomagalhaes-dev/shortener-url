FROM node:latest AS build
WORKDIR /build

COPY package*.json ./
RUN npm i --ignore-scripts

COPY . ./

RUN npm run build

FROM node:alpine AS release

WORKDIR /usr/app

COPY --from=build /build/package*.json ./
COPY --from=build /build/dist dist

RUN npm install --only=production
RUN npm run migration:run:prod

EXPOSE 3000
CMD ["npm", "start"]