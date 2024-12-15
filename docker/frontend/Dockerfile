# builder
FROM jpyles0524/doppler-node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public /app/public
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.js /app/tailwind.config.js
COPY next.config.mjs /app/next.config.mjs
COPY postcss.config.js /app/postcss.config.js

ARG DOPPLER_TOKEN

RUN doppler run -t $DOPPLER_TOKEN -- npm run build

# final
FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /usr/bin/doppler /usr/bin/doppler