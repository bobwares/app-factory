# ADR: Implement Turbo Monorepo Stack

## Status

Accepted

## Context

The user requested implementation of the tech stack profile `container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo`. This profile specifies a containerized monorepo architecture with:

- NestJS backend with Fastify
- Next.js hybrid frontend
- PostgreSQL persistence
- Turborepo build orchestration
- pnpm workspaces
- OpenTelemetry observability

## Decision

Implemented a complete turbo monorepo under `./tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/` with:

1. **Root Configuration**: Turborepo, pnpm workspace, shared prettier/gitignore
2. **apps/api**: NestJS with Fastify, JWT auth, health endpoints, OpenTelemetry tracing
3. **apps/web**: Next.js 15 with App Router, Tailwind CSS, server-side API health check
4. **packages/config**: Shared environment configuration
5. **packages/types**: Shared TypeScript types (ApiResponse, HealthStatus, User)
6. **packages/ui**: Shared React components (Button, Card, StatusBadge)
7. **Docker Compose**: Full stack with PostgreSQL, Jaeger, Prometheus, OTEL Collector

## Consequences

- 51 files created following the existing implementation patterns
- Monorepo ready for `pnpm install && pnpm dev` local development
- Docker Compose supports full containerized deployment
- Shared packages enable type-safe cross-app development
