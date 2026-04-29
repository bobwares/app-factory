# ADR - Turn 5: PostgreSQL Persistence Layer Design

- **Date**: 2026-03-28T19:43:53Z
- **Agent**: AI Coding Agent (Claude Opus 4.5)
- **Status**: Accepted

---

## Context

The app-factory project requires a reusable PostgreSQL persistence layer that can be integrated with various backend tech stacks. The `postgresql-service` profile specifies:
- PostgreSQL engine with relational service pattern
- Required versioned migrations with seed support
- Container-based local development

## Decision 1: Versioned SQL Migrations Over ORM Migrations

**Decision**: Use raw SQL migration files with naming convention `V{version}__{description}.sql` rather than ORM-specific migrations (TypeORM, Prisma, Drizzle).

**Rationale**:
- Backend-agnostic: Works with Java/Spring, TypeScript/NestJS, Python/FastAPI without coupling
- Full SQL control: Complex constraints, triggers, and functions are expressed naturally
- Explicit versioning: `schema_version` table tracks applied migrations
- Team readability: SQL is universally understood

**Trade-offs**:
- (-) No automatic rollback generation
- (-) Manual coordination with ORM entity definitions
- (+) Portable across all backend stacks
- (+) Production-grade migration patterns

## Decision 2: Generic Audit Trigger Architecture

**Decision**: Implement a reusable `audit_trigger_func()` that can be attached to any table requiring audit logging.

**Rationale**:
- Centralized audit in `audit_log` table with JSONB for old/new values
- Correlation ID captured from session variable `app.correlation_id`
- Minimal boilerplate: single `CREATE TRIGGER` statement per audited table

**Trade-offs**:
- (-) JSONB storage uses more space than normalized audit tables
- (-) Requires application to set correlation_id session variable
- (+) Zero application code for audit capture
- (+) Consistent audit format across all tables

## Decision 3: PostgreSQL 16 Alpine Base Image

**Decision**: Use `postgres:16-alpine` as the container image.

**Rationale**:
- Alpine reduces image size (~80MB vs ~400MB for debian)
- PostgreSQL 16 provides latest features (MERGE, JSON improvements)
- Production-parity with common cloud offerings (RDS, Cloud SQL)

## Consequences

- All backend implementations can share this persistence layer via docker-compose extends
- Migrations must be written in portable SQL (no vendor-specific syntax)
- Audit logging is opt-in per table via trigger attachment
- Local development matches production PostgreSQL version

---

## References

- Profile: `tech-stack-profiles/persistence/postgresql-service.yaml`
- Implementation: `tech-stack-implementations/persistence/postgresql-service/`
