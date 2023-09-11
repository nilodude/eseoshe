# syntax=docker/dockerfile:1

#STAGE 0: BUILD NODE FRONTEND APP
FROM node:18.17.1 
ENV NODE_ENV=production

RUN mkdir -p /app

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . ./app

RUN npm run build --prod


#STAGE 1: BUILD NGINX SERVER WITH COMPILED NODE FRONTEND APP
FROM nginx:alpine

COPY /dist/eseoshe /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
