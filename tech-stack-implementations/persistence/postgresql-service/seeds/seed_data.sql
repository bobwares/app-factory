-- App: app-factory
-- File: seed_data.sql
-- Version: 0.1.0
-- Turns: 5
-- Author: AI Coding Agent (Claude Opus 4.5)
-- Date: 2026-03-28T21:45:00Z
-- Description: Development seed data for local testing
-- Log:
-- 5, 0.1.0, 2026/03/28, 09:45 PM, Claude Opus 4.5

-- ============================================================================
-- SEED DATA (only for development/testing)
-- ============================================================================

-- Check if we should seed (avoid duplicate seeding)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN

        -- Admin user (password: 'admin123' - bcrypt hash)
        INSERT INTO users (id, email, display_name, password_hash, is_active, email_verified)
        VALUES (
            'a0000000-0000-0000-0000-000000000001',
            'admin@example.com',
            'Admin User',
            '$2a$10$N9qo8uLOickgx2ZMRZoMye9oXJP3e4Lj3F8M8qCqKqWKkQxQz3q.S',
            TRUE,
            TRUE
        );

        -- Test users
        INSERT INTO users (id, email, display_name, password_hash, is_active, email_verified)
        VALUES
            (
                'a0000000-0000-0000-0000-000000000002',
                'user1@example.com',
                'Test User 1',
                '$2a$10$N9qo8uLOickgx2ZMRZoMye9oXJP3e4Lj3F8M8qCqKqWKkQxQz3q.S',
                TRUE,
                TRUE
            ),
            (
                'a0000000-0000-0000-0000-000000000003',
                'user2@example.com',
                'Test User 2',
                '$2a$10$N9qo8uLOickgx2ZMRZoMye9oXJP3e4Lj3F8M8qCqKqWKkQxQz3q.S',
                TRUE,
                FALSE
            ),
            (
                'a0000000-0000-0000-0000-000000000004',
                'inactive@example.com',
                'Inactive User',
                '$2a$10$N9qo8uLOickgx2ZMRZoMye9oXJP3e4Lj3F8M8qCqKqWKkQxQz3q.S',
                FALSE,
                TRUE
            );

        RAISE NOTICE 'Seed data inserted successfully';
    ELSE
        RAISE NOTICE 'Seed data already exists, skipping';
    END IF;
END $$;
