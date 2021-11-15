FROM node:latest

WORKDIR /urs/src/app

COPY package*.json .
RUN npm install

COPY index.js .

CMD ["node", "index.js"]