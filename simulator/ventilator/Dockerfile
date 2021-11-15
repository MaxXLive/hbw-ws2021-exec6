FROM node:alpine
WORKDIR /ventilator
COPY package.json package.json
RUN npm install
COPY ./ ./
CMD ["npm", "start", "0001", "1000", "0", "3"]