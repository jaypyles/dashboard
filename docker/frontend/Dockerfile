FROM jpyles0524/doppler-node:latest

ARG DOPPLER_TOKEN

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public /app/public
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.js /app/tailwind.config.js
COPY next.config.mjs /app/next.config.mjs
COPY postcss.config.js /app/postcss.config.js

RUN doppler run -t ${DOPPLER_TOKEN} -- npm run build