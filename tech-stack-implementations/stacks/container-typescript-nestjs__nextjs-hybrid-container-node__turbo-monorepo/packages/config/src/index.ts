/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: packages/config/src/index.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Shared configuration module for API, web, database, auth, and observability
 */

export const config = {
  api: {
    port: parseInt(process.env.API_PORT || '8000', 10),
    host: process.env.API_HOST || '0.0.0.0',
  },
  web: {
    port: parseInt(process.env.WEB_PORT || '3000', 10),
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/appdb',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
    bypassAuth: process.env.BYPASS_AUTH === 'true',
  },
  observability: {
    serviceName: process.env.OTEL_SERVICE_NAME || 'app',
    otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
} as const;

export type Config = typeof config;
