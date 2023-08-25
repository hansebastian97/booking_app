FROM node:20-alpine3.17
WORKDIR srv/booking_api
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 8800
ENV MONGO=${MONGO}
CMD ["yarn", "run", "start"]