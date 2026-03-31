# serverless-typescript-lambda

Serverless TypeScript Lambda implementation with API Gateway HTTP API, X-Ray tracing, and CloudWatch observability.

## Tech Stack

| Component          | Technology                          |
|--------------------|-------------------------------------|
| Runtime            | Node.js 22                          |
| Language           | TypeScript (strict mode)            |
| API                | AWS API Gateway HTTP API            |
| Compute            | AWS Lambda                          |
| Auth               | JWT (API Gateway authorizer)        |
| Validation         | Zod                                 |
| Persistence        | DynamoDB (single-table design)      |
| Tracing            | AWS X-Ray (via Powertools)          |
| Metrics            | CloudWatch Embedded Metrics         |
| Logging            | Structured JSON (Powertools)        |
| Testing            | Vitest                              |
| IaC                | AWS SAM                             |

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build handlers
npm run build

# Start local API (requires SAM CLI and Docker)
docker-compose up -d
npm run local:api
```

## Project Structure

```
src/
├── handlers/           # Lambda function entry points
│   ├── health.ts       # Health check handler
│   └── example.ts      # Example CRUD handler
├── services/           # Business logic with factory DI
│   ├── factory.ts      # Service factory
│   └── item.service.ts # Item service
├── schemas/            # Zod validation schemas
│   └── item.schema.ts  # Item schemas with derived types
├── middleware/         # Request processing middleware
│   ├── observability.ts # Powertools setup
│   └── correlation.ts  # Correlation ID handling
├── types/              # TypeScript type definitions
│   ├── api.ts          # API response contracts
│   └── events.ts       # Lambda event extensions
└── utils/              # Shared utilities
    ├── response.ts     # Response builders
    └── errors.ts       # Error classes and handling
tests/
├── health.test.ts      # Health handler tests
└── item.schema.test.ts # Schema validation tests
```

## Deployment

### Prerequisites

- AWS SAM CLI
- Docker (for local development)
- AWS credentials configured

### Deploy to AWS

```bash
# First deployment (guided)
npm run deploy:guided

# Subsequent deployments
npm run deploy

# Deploy to specific environment
sam deploy --config-env staging
sam deploy --config-env prod
```

### Configuration

Copy `samconfig.example.toml` to `samconfig.toml` and configure:

- `stack_name`: CloudFormation stack name
- `region`: AWS region
- `parameter_overrides`: JWT issuer and audience

## Local Development

### Start DynamoDB Local

```bash
docker-compose up -d
```

Access DynamoDB Admin UI at http://localhost:8001

### Run SAM Local API

```bash
npm run local:api
```

API available at http://localhost:3000

### Invoke Function Locally

```bash
sam local invoke HealthFunction --event events/health.json
```

## API Endpoints

| Endpoint           | Method | Auth     | Description          |
|--------------------|--------|----------|----------------------|
| /health            | GET    | None     | Health check         |
| /health/live       | GET    | None     | Liveness probe       |
| /health/ready      | GET    | None     | Readiness probe      |
| /items             | GET    | JWT      | List items           |
| /items/{id}        | GET    | JWT      | Get item by ID       |
| /items             | POST   | JWT      | Create item          |

## Environment Variables

| Variable                      | Description                        |
|-------------------------------|------------------------------------|
| LOG_LEVEL                     | Log level (DEBUG, INFO, WARN, ERROR) |
| POWERTOOLS_SERVICE_NAME       | Service name for observability     |
| POWERTOOLS_METRICS_NAMESPACE  | CloudWatch metrics namespace       |
| TABLE_NAME                    | DynamoDB table name                |

## Observability

### X-Ray Tracing

- All Lambda functions have X-Ray tracing enabled
- AWS SDK calls are automatically traced
- Custom subsegments for handler logic

View traces in AWS X-Ray console.

### CloudWatch Metrics

Custom metrics are published via Embedded Metric Format (EMF):

- `HealthChecks`: Health endpoint invocations
- `ItemsListed`: Items retrieved in list operations
- `ItemCreated`: New items created
- `ApplicationErrors`: Application-level errors
- `UnhandledErrors`: Unexpected errors

### Structured Logging

All logs are JSON-formatted with:
- Correlation ID
- Request ID
- User ID (when authenticated)
- Service name
- Log level

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:cov
```

## Profile Reference

Generated from: `tech-stack-profiles/backend/serverless-typescript-lambda.yaml`
