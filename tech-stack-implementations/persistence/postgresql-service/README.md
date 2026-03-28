# postgresql-service

PostgreSQL persistence layer implementation with versioned migrations, seed data, and local development tooling.

## Tech Stack

| Component        | Technology                    |
|------------------|-------------------------------|
| Database         | PostgreSQL 16 (Alpine)        |
| Container        | Docker Compose                |
| Migrations       | Versioned SQL files           |
| Admin UI         | pgAdmin 4 (optional)          |
| Extensions       | uuid-ossp, pgcrypto           |

## Quick Start

```bash
# Copy environment template
cp .env.example .env

# Start PostgreSQL
make up

# Open psql shell
make shell

# View logs
make logs
```

## With pgAdmin

```bash
# Start with pgAdmin UI
make up-tools

# Access pgAdmin at http://localhost:5050
# Email: admin@local.dev
# Password: admin
```

## Migrations

Migrations use a versioned naming convention: `V{version}__{description}.sql`

```bash
# Run pending migrations
make migrate

# Example: create new migration
touch migrations/V002__add_orders_table.sql
```

### Migration Structure

Each migration should:
1. Be idempotent where possible (use `IF NOT EXISTS`)
2. Include rollback comments
3. Update schema_version table

## Seed Data

```bash
# Run seed data (development only)
make seed
```

Seed data is automatically applied when `SEED_DATA=true` is set during container initialization.

## Endpoints

| Resource        | Address                    |
|-----------------|----------------------------|
| PostgreSQL      | localhost:5432             |
| pgAdmin         | http://localhost:5050      |

## Environment Variables

| Variable           | Default          | Description                   |
|--------------------|------------------|-------------------------------|
| POSTGRES_USER      | appuser          | Database user                 |
| POSTGRES_PASSWORD  | apppass          | Database password             |
| POSTGRES_DB        | appdb            | Database name                 |
| POSTGRES_PORT      | 5432             | Host port mapping             |
| SEED_DATA          | false            | Enable seed data on init      |
| PGADMIN_EMAIL      | admin@local.dev  | pgAdmin login email           |
| PGADMIN_PASSWORD   | admin            | pgAdmin login password        |
| PGADMIN_PORT       | 5050             | pgAdmin host port             |

## Connection Strings

### Node.js / TypeScript
```typescript
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}`;
```

### Java / Spring Boot
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/appdb
    username: appuser
    password: apppass
```

### Python
```python
DATABASE_URL = "postgresql://appuser:apppass@localhost:5432/appdb"
```

## Schema Overview

The initial migration includes:

- **schema_version**: Migration tracking table
- **users**: Reference user table with soft delete
- **audit_log**: Centralized audit trail
- **update_updated_at()**: Trigger for auto-updating timestamps
- **audit_trigger_func()**: Generic audit logging trigger

## Audit Logging

Tables can be audited by adding the generic audit trigger:

```sql
CREATE TRIGGER my_table_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON my_table
    FOR EACH ROW
    EXECUTE FUNCTION audit_trigger_func();
```

Correlation IDs are captured from the session variable:
```sql
SET app.correlation_id = 'your-correlation-id';
```

## Project Structure

```
postgresql-service/
├── docker-compose.yml    # Service definitions
├── Makefile              # Development commands
├── .env.example          # Environment template
├── migrations/           # SQL migration files
│   └── V001__initial_schema.sql
├── seeds/                # Development seed data
│   └── seed_data.sql
├── scripts/              # Utility scripts
│   ├── init-db.sh        # Container init script
│   ├── wait-for-postgres.sh
│   └── run-migrations.sh
└── pgadmin/              # pgAdmin configuration
    └── servers.json
```

## Integration with Backend Stacks

This persistence layer integrates with backend implementations:

1. Add this as a dependency in your backend's docker-compose
2. Use the connection strings above
3. Backend waits for postgres using `wait-for-postgres.sh`

Example backend docker-compose override:
```yaml
services:
  api:
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://appuser:apppass@postgres:5432/appdb

  postgres:
    extends:
      file: ../persistence/postgresql-service/docker-compose.yml
      service: postgres
```

## Profile Reference

Generated from: `tech-stack-profiles/persistence/postgresql-service.yaml`
