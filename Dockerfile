FROM node:16.2.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.* .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
