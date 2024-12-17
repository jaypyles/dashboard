.DEFAULT_GOAL := help

COMPOSE_DEV = docker compose -f docker-compose.yml -f docker-compose.dev.yml
COMPOSE_PROD = docker compose -f docker-compose.yml

HOSTNAME_PROD = "localhost"
HOSTNAME_DEV = "localhost"

.PHONY: help deps build pull up-prod up-dev down setup deploy docs

help:
	@echo "Usage:"
	@echo "  make logs    - Check Docker container logs"
	@echo "  make deps    - Build frontend assets"
	@echo "  make build   - Build Docker images"
	@echo "  make pull    - Pull Docker images"
	@echo "  make up-prd  - Start production environment"
	@echo "  make up-dev  - Start development environment"
	@echo "  make down    - Stop and remove containers, networks, images, and volumes"
	@echo "  make setup   - Setup server with dependencies and clone repo"
	@echo "  make deploy  - Deploy site onto server"
	@echo "  make docs    - Use puppeteer to take docs screenshots"
	@echo ""

logs:
	docker compose logs -f

deps:
	pdm install
	npm install
	npm run build

build:
	$(COMPOSE_DEV) build

pull:
	docker compose pull

up-prd:
	export HOSTNAME=$(HOSTNAME_PROD) && \
	$(COMPOSE_PROD) up -d --force-recreate

up-dev:
	export HOSTNAME=$(HOSTNAME_DEV) && \
	$(COMPOSE_DEV) up -d --force-recreate

down:
	$(COMPOSE_DEV) down
	$(COMPOSE_PROD) down

setup:
	ansible-playbook -i ./ansible/inventory.yaml ./ansible/setup.yaml

deploy:
	ansible-playbook -i ./ansible/inventory.yaml ./ansible/deploy_site.yaml -v

docs:
	npm run docs