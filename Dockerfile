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

# Stage 2: Combine frontend and backend into a single final image with supervisor
FROM python:3.10.5-slim as final-image

RUN apt update && apt install -y --no-install-recommends supervisor curl uvicorn docker.io && \
    rm -rf /var/lib/apt/lists/* 

ENV NODE_VERSION=18.17.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

RUN python -m pip --no-cache-dir install pdm

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
COPY pyproject.toml pdm.lock /project/
COPY ./api /project/api/

RUN pdm install && \
    rm -rf /root/.cache/pip

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY start.sh /start.sh

# Set up log function
RUN echo "function logs() { tail -f /var/log/\$1.log; }" >> /root/.bashrc
RUN echo "function logs_err() { tail -f /var/log/\$1_error.log; }" >> /root/.bashrc
