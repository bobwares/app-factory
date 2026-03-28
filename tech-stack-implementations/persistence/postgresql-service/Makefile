# App: app-factory
# File: Makefile
# Version: 0.1.0
# Turns: 5
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T21:45:00Z
# Description: Makefile for postgresql-service operations
# Log:
# 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

.PHONY: help start up down logs shell migrate seed clean status

# Default environment file
ENV_FILE ?= .env

# Load environment if exists
ifneq (,$(wildcard $(ENV_FILE)))
    include $(ENV_FILE)
    export
endif

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

start: up ## Alias for up (used by root Makefile launcher)

up: ## Start PostgreSQL service
	docker compose up -d postgres
	@echo "Waiting for PostgreSQL to be healthy..."
	@./scripts/wait-for-postgres.sh
	@echo "PostgreSQL is ready at localhost:$${POSTGRES_PORT:-5432}"

up-tools: ## Start PostgreSQL with pgAdmin
	docker compose --profile tools up -d
	@echo "PostgreSQL: localhost:$${POSTGRES_PORT:-5432}"
	@echo "pgAdmin: http://localhost:$${PGADMIN_PORT:-5050}"

down: ## Stop all services
	docker compose --profile tools down

down-clean: ## Stop services and remove volumes
	docker compose --profile tools down -v

logs: ## View PostgreSQL logs
	docker compose logs -f postgres

shell: ## Open psql shell
	docker compose exec postgres psql -U $${POSTGRES_USER:-appuser} -d $${POSTGRES_DB:-appdb}

migrate: ## Run pending migrations
	./scripts/run-migrations.sh

seed: ## Run seed data
	PGPASSWORD=$${POSTGRES_PASSWORD:-apppass} psql -h localhost -p $${POSTGRES_PORT:-5432} \
		-U $${POSTGRES_USER:-appuser} -d $${POSTGRES_DB:-appdb} -f seeds/seed_data.sql

status: ## Check PostgreSQL status
	@docker compose ps postgres
	@echo ""
	@docker compose exec postgres pg_isready -U $${POSTGRES_USER:-appuser} -d $${POSTGRES_DB:-appdb}

clean: ## Remove all data (destructive!)
	@echo "WARNING: This will delete all PostgreSQL data!"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	docker compose --profile tools down -v
	@echo "All data removed"
