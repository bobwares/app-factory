# container-typescript-nestjs

NestJS backend implementation with Fastify, OpenTelemetry observability, and OAuth2-JWT security.

## Tech Stack

| Component        | Technology                    |
|------------------|-------------------------------|
| Runtime          | Node.js 22                    |
| Framework        | NestJS 10.x                   |
| HTTP Server      | Fastify                       |
| Validation       | class-validator               |
| Serialization    | class-transformer             |
| Testing          | Vitest                        |
| Tracing          | OpenTelemetry                 |
| Metrics          | Prometheus-compatible (OTLP)  |
| Logging          | Pino (structured JSON)        |
| Auth             | Passport + JWT                |

## Quick Start

```bash
# Install dependencies
npm install

# Start in development mode
npm run start:dev

# Run tests
npm test

# Build for production
npm run build
```

## Docker

```bash
# Build image
docker build -t container-typescript-nestjs .

# Run with docker-compose (includes OTEL, Jaeger, Prometheus)
docker-compose up -d
```

## Endpoints

| Endpoint       | Description              |
|----------------|--------------------------|
| GET /health    | Application health       |
| GET /health/live  | Liveness probe        |
| GET /health/ready | Readiness probe       |

## Environment Variables

| Variable                     | Default                          | Description                      |
|------------------------------|----------------------------------|----------------------------------|
| NODE_ENV                     | development                      | Environment (local/development/production) |
| PORT                         | 3000                             | HTTP port                        |
| LOG_LEVEL                    | info                             | Pino log level                   |
| JWT_SECRET                   | -                                | JWT signing secret               |
| JWT_ISSUER                   | -                                | Expected JWT issuer              |
| BYPASS_AUTH                  | false                            | Bypass auth in local env         |
| OTEL_SERVICE_NAME            | container-typescript-nestjs      | Service name for traces/metrics  |
| OTEL_EXPORTER_OTLP_ENDPOINT  | http://localhost:4318            | OTLP collector endpoint          |

## Observability

- **Traces**: Exported to OTLP collector, viewable in Jaeger at http://localhost:16686
- **Metrics**: Prometheus-compatible at http://localhost:9090
- **Logs**: Structured JSON with correlation ID

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── tracing.ts              # OpenTelemetry SDK setup
├── app.module.ts           # Root module
├── auth/                   # JWT authentication
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── public.decorator.ts
├── health/                 # Health endpoints
│   ├── health.module.ts
│   ├── health.controller.ts
│   └── health.service.ts
├── common/                 # Shared utilities
│   ├── dto/
│   │   └── api-response.dto.ts
│   ├── filters/
│   │   └── global-exception.filter.ts
│   ├── interceptors/
│   │   └── correlation-id.interceptor.ts
│   └── middleware/
│       └── correlation-id.middleware.ts
└── config/
    └── logger.config.ts
```

## Profile Reference

Generated from: `tech-stack-profiles/backend/container-typescript-nestjs.yaml`
