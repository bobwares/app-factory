#!/bin/bash
# App: app-factory
# File: run-migrations.sh
# Version: 0.1.0
# Turns: 5
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T21:45:00Z
# Description: Run pending database migrations
# Log:
# 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MIGRATIONS_DIR="${SCRIPT_DIR}/../migrations"

HOST="${POSTGRES_HOST:-localhost}"
PORT="${POSTGRES_PORT:-5432}"
USER="${POSTGRES_USER:-appuser}"
DB="${POSTGRES_DB:-appdb}"
PASSWORD="${POSTGRES_PASSWORD:-apppass}"

export PGPASSWORD="$PASSWORD"

echo "=== Running Migrations ==="
echo "Host: $HOST:$PORT"
echo "Database: $DB"
echo "Migrations: $MIGRATIONS_DIR"

# Get applied migrations
applied=$(psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -t -c \
    "SELECT version FROM schema_version ORDER BY version;" 2>/dev/null || echo "")

# Run each migration that hasn't been applied
for migration in "$MIGRATIONS_DIR"/V*.sql; do
    if [ -f "$migration" ]; then
        filename=$(basename "$migration")
        version=$(echo "$filename" | sed 's/V\([0-9]*\)__.*/V\1/' | sed 's/V/V00/' | tail -c 4)
        version="V${version##V}"

        # Extract version number (e.g., V001 from V001__initial_schema.sql)
        version=$(echo "$filename" | grep -oE '^V[0-9]+')

        if echo "$applied" | grep -q "$version"; then
            echo "Skipping $filename (already applied)"
        else
            echo "Applying $filename..."
            start_time=$(date +%s%N)

            psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -v ON_ERROR_STOP=1 -f "$migration"

            end_time=$(date +%s%N)
            execution_ms=$(( (end_time - start_time) / 1000000 ))

            echo "Applied $filename in ${execution_ms}ms"
        fi
    fi
done

echo "=== Migrations complete ==="
