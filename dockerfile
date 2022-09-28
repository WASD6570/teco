FROM node:16.17.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set network-timeout 300000
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

