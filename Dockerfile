FROM node:lts

WORKDIR /

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

ENV PORT=80

ENV NODE_ENV=production

ENV BASE_DOMAIN="ai.serpa.cloud"

COPY . .

RUN yarn build && yarn build:webpack

EXPOSE 80

CMD [ "npm", "start" ]
