#!/bin/bash
# App: app-factory
# File: init-db.sh
# Version: 0.1.0
# Turns: 5
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T21:45:00Z
# Description: Database initialization script run by postgres container on first start
# Log:
# 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

set -e

echo "=== PostgreSQL Service Initialization ==="
echo "Database: $POSTGRES_DB"
echo "User: $POSTGRES_USER"

# Run migrations in order
echo "Running migrations..."
for migration in /docker-entrypoint-initdb.d/migrations/V*.sql; do
    if [ -f "$migration" ]; then
        echo "Applying: $(basename "$migration")"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$migration"
    fi
done

# Run seed data if SEED_DATA is enabled
if [ "${SEED_DATA:-false}" = "true" ]; then
    echo "Seeding database..."
    for seed in /docker-entrypoint-initdb.d/seeds/*.sql; do
        if [ -f "$seed" ]; then
            echo "Applying seed: $(basename "$seed")"
            psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$seed"
        fi
    done
else
    echo "Skipping seed data (set SEED_DATA=true to enable)"
fi

echo "=== Initialization complete ==="
