FROM node:20-alpine3.17
WORKDIR srv/booking_client
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3006
CMD ["yarn", "run", "start"]