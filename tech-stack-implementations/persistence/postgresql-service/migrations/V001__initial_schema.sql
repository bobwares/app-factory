-- App: app-factory
-- File: V001__initial_schema.sql
-- Version: 0.1.0
-- Turns: 5
-- Author: AI Coding Agent (Claude Opus 4.5)
-- Date: 2026-03-28T21:45:00Z
-- Description: Initial schema with audit infrastructure and example tables
-- Log:
-- 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- AUDIT INFRASTRUCTURE
-- ============================================================================

CREATE TABLE IF NOT EXISTS schema_version (
    version_id      SERIAL PRIMARY KEY,
    version         VARCHAR(50) NOT NULL UNIQUE,
    description     VARCHAR(200),
    applied_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    execution_time  INTEGER
);

INSERT INTO schema_version (version, description)
VALUES ('V001', 'Initial schema with audit infrastructure');

-- ============================================================================
-- AUDIT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- EXAMPLE: USERS TABLE (reference implementation)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    display_name    VARCHAR(100),
    password_hash   VARCHAR(255),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ,

    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_active ON users (is_active) WHERE is_active = TRUE;
CREATE INDEX idx_users_deleted ON users (deleted_at) WHERE deleted_at IS NULL;

-- ============================================================================
-- EXAMPLE: AUDIT LOG TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_log (
    id              BIGSERIAL PRIMARY KEY,
    table_name      VARCHAR(100) NOT NULL,
    record_id       UUID NOT NULL,
    action          VARCHAR(10) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values      JSONB,
    new_values      JSONB,
    changed_by      UUID,
    changed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    correlation_id  VARCHAR(36)
);

CREATE INDEX idx_audit_log_table_record ON audit_log (table_name, record_id);
CREATE INDEX idx_audit_log_changed_at ON audit_log (changed_at);
CREATE INDEX idx_audit_log_correlation ON audit_log (correlation_id) WHERE correlation_id IS NOT NULL;

-- ============================================================================
-- GENERIC AUDIT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    record_id UUID;
    old_data JSONB;
    new_data JSONB;
BEGIN
    IF TG_OP = 'DELETE' THEN
        record_id := OLD.id;
        old_data := to_jsonb(OLD);
        new_data := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
        record_id := NEW.id;
        old_data := to_jsonb(OLD);
        new_data := to_jsonb(NEW);
    ELSIF TG_OP = 'INSERT' THEN
        record_id := NEW.id;
        old_data := NULL;
        new_data := to_jsonb(NEW);
    END IF;

    INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, correlation_id)
    VALUES (TG_TABLE_NAME, record_id, TG_OP, old_data, new_data, current_setting('app.correlation_id', TRUE));

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Enable audit on users table
CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_trigger_func();

COMMENT ON TABLE users IS 'Reference user table implementation';
COMMENT ON TABLE audit_log IS 'Centralized audit log for all audited tables';
COMMENT ON TABLE schema_version IS 'Migration version tracking';
