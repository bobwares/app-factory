# ADR — Task 001 Turn 001: Serverless TypeScript Lambda Stack Implementation

- **Date**: 2026-03-30T00:15:00Z
- **Agent**: AI Coding Agent (claude-opus-4-5-20251101)
- **Status**: Accepted

## Context

The project requires a reference implementation for the `serverless-typescript-lambda` tech stack profile. This profile specifies a serverless backend using AWS Lambda with TypeScript, API Gateway HTTP API, X-Ray tracing, CloudWatch metrics, and Zod validation.

## Decision

### 1. AWS Lambda Powertools for Observability

**Chosen**: `@aws-lambda-powertools/logger`, `@aws-lambda-powertools/tracer`, `@aws-lambda-powertools/metrics`

**Alternatives considered**:
- OpenTelemetry SDK directly
- Custom logging/tracing wrappers

**Rationale**: Lambda Powertools is the official AWS solution optimized for Lambda cold starts. It provides structured logging, X-Ray tracing, and CloudWatch Embedded Metric Format (EMF) with minimal configuration. Better Lambda integration than generic OpenTelemetry.

### 2. Zod for Validation

**Chosen**: Zod with type inference (`z.infer<typeof Schema>`)

**Alternatives considered**:
- class-validator with class-transformer
- Yup
- io-ts

**Rationale**: Profile specifies Zod. Provides excellent TypeScript integration with runtime validation and compile-time type inference. No decorators or class boilerplate required, aligning with lightweight factory DI pattern.

### 3. esbuild for Bundling

**Chosen**: esbuild with SAM build integration

**Alternatives considered**:
- webpack
- rollup
- tsc only

**Rationale**: esbuild provides fastest build times for Lambda deployments. SAM natively supports esbuild via `BuildMethod: esbuild` metadata. Produces optimized bundles with tree-shaking.

### 4. Per-Route Handler Architecture

**Chosen**: Separate Lambda functions per route group (health, items)

**Alternatives considered**:
- Single monolithic handler
- One function per HTTP method

**Rationale**: Profile specifies `handlerStyle: per-route-handler`. Balances cold start optimization with deployment simplicity. Related routes share a handler to minimize infrastructure.

### 5. Lightweight Factory DI Pattern

**Chosen**: Service factory with cached singleton instances

**Alternatives considered**:
- Full DI container (inversify, tsyringe)
- Pure functions with dependency passing

**Rationale**: Profile specifies `dependencyInjection: lightweight-factory`. Factory pattern provides testability via mock injection without container overhead. Cached instances work well with Lambda's execution context reuse.

## Consequences

### Positive
- Optimized for Lambda cold start performance
- Full observability with minimal setup
- Type-safe validation with runtime enforcement
- Testable architecture with mock injection

### Negative
- AWS-specific implementation (not portable to other clouds)
- Requires SAM CLI for local development
- Lambda Powertools adds ~2MB to bundle size

## Implementation Notes

Files created:
- SAM template with HTTP API and JWT authorizer
- Lambda handlers with X-Ray subsegments
- Service factory with DynamoDB client
- Zod schemas with derived types
- Response builders and error handlers
- Vitest test suite
- Docker Compose for local DynamoDB
