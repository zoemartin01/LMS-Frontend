FROM node:lts-alpine3.12 as build

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app

RUN npm install -g @angular/cli
RUN npm ci

COPY . /app

RUN ng b

FROM nginx:mainline-alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html
