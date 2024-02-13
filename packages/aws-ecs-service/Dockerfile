FROM node:20-alpine as app-builder

RUN mkdir -p /app
WORKDIR /app
COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .
RUN npm run build

FROM node:20-alpine as app-runner

RUN mkdir -p /app
WORKDIR /app
COPY --from=app-builder /app ./

EXPOSE 4000
CMD [ "npm", "run", "start"]