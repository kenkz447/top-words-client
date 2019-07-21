FROM node:10
RUN npm install
RUN npm run build

FROM node:10
WORKDIR /app
COPY ./dist .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]