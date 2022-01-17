FROM node:14

WORKDIR /minuka-app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD ["node", "index.js"]