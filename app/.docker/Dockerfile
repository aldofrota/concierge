FROM node:18

USER root

RUN npm install -g @nestjs/cli@10.1.18

WORKDIR /usr/concierge/app

COPY packge*.json ./

COPY . .

RUN yarn install