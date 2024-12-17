# Stage 1: Build the frontend application
FROM jpyles0524/doppler-node:latest AS frontend-builder

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY public /frontend/public
COPY src /frontend/src
COPY tsconfig.json /frontend/tsconfig.json
COPY tailwind.config.js /frontend/tailwind.config.js
COPY next.config.mjs /frontend/next.config.mjs
COPY postcss.config.js /frontend/postcss.config.js

RUN npm run build

# Stage 2: Build the Python backend
FROM python:3.10-slim AS backend-builder

WORKDIR /backend

RUN apt update && apt install -y uvicorn docker.io
RUN python -m pip --no-cache-dir install pdm
RUN pdm config python.use_venv false

COPY pyproject.toml pdm.lock /backend/
COPY ./api /backend/api/

# Stage 3: Combine frontend and backend into a single final image with supervisor
FROM alpine:latest

# Install Supervisor
RUN apk add --no-cache supervisor nodejs npm py3-pip pipx bash
RUN pipx install pdm

# Supervisor configuration directory
RUN mkdir -p /etc/supervisor/conf.d

ENV PATH="/root/.local/share/pipx/venvs/pdm/bin:$PATH"
ENV PATH="/root/.local/bin:$PATH"

# Frontend setup
WORKDIR /app
COPY --from=frontend-builder /frontend/public ./public
COPY --from=frontend-builder /frontend/dist ./dist
COPY --from=frontend-builder /frontend/node_modules ./node_modules
COPY --from=frontend-builder /frontend/package.json ./package.json
COPY --from=frontend-builder /usr/bin/doppler /usr/bin/doppler
COPY --from=frontend-builder /frontend/tsconfig.json ./tsconfig.json
COPY --from=frontend-builder /frontend/tailwind.config.js ./tailwind.config.js
COPY --from=frontend-builder /frontend/next.config.mjs ./next.config.mjs
COPY --from=frontend-builder /frontend/postcss.config.js ./postcss.config.js

# Backend setup
WORKDIR /project
COPY --from=backend-builder /backend /project/

RUN pdm install

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY start.sh /start.sh