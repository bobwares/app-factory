# Turbo Monorepo: NestJS + Next.js

A production-ready monorepo stack with containerized NestJS API and hybrid Next.js frontend.

## Stack

- **Backend**: NestJS with Fastify, TypeScript, OpenTelemetry
- **Frontend**: Next.js 15 with App Router, React 18, Tailwind CSS
- **Build**: Turborepo with pnpm workspaces
- **Database**: PostgreSQL
- **Observability**: OpenTelemetry, Jaeger, Prometheus

## Structure

```
.
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Next.js frontend
├── packages/
│   ├── config/       # Shared configuration
│   ├── types/        # Shared TypeScript types
│   └── ui/           # Shared React components
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 9+
- Docker & Docker Compose

### Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:8000

### Docker

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Services

| Service    | URL                    | Description          |
|------------|------------------------|----------------------|
| Web        | http://localhost:3000  | Next.js frontend     |
| API        | http://localhost:8000  | NestJS backend       |
| Jaeger     | http://localhost:16686 | Distributed tracing  |
| Prometheus | http://localhost:9090  | Metrics              |

## Commands

```bash
# Development
pnpm dev          # Start all apps in dev mode

# Build
pnpm build        # Build all packages and apps

# Test
pnpm test         # Run tests

# Lint
pnpm lint         # Lint all packages and apps

# Clean
pnpm clean        # Remove build artifacts
```

## Adding Packages

Shared packages live in `packages/`. To use a shared package:

```json
{
  "dependencies": {
    "@repo/types": "workspace:*",
    "@repo/ui": "workspace:*"
  }
}
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- `BYPASS_AUTH`: Set to `true` for development
- `OTEL_EXPORTER_OTLP_ENDPOINT`: OpenTelemetry collector endpoint

## API Endpoints

- `GET /health` - Health check with system status
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe
