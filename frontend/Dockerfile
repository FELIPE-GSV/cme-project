FROM node:20.16.0-alpine

WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "dev"]