#!/bin/bash
# App: app-factory
# File: wait-for-postgres.sh
# Version: 0.1.0
# Turns: 5
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T21:45:00Z
# Description: Wait for PostgreSQL to be ready before proceeding
# Log:
# 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

set -e

HOST="${POSTGRES_HOST:-localhost}"
PORT="${POSTGRES_PORT:-5432}"
USER="${POSTGRES_USER:-appuser}"
DB="${POSTGRES_DB:-appdb}"
MAX_RETRIES="${MAX_RETRIES:-30}"
RETRY_INTERVAL="${RETRY_INTERVAL:-2}"

echo "Waiting for PostgreSQL at $HOST:$PORT..."

retries=0
until pg_isready -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" > /dev/null 2>&1; do
    retries=$((retries + 1))
    if [ $retries -ge $MAX_RETRIES ]; then
        echo "Error: PostgreSQL not ready after $MAX_RETRIES attempts"
        exit 1
    fi
    echo "Waiting for PostgreSQL... (attempt $retries/$MAX_RETRIES)"
    sleep $RETRY_INTERVAL
done

echo "PostgreSQL is ready!"
exec "$@"
