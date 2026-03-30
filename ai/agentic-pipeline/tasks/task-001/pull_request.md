# Pull Request — Task 001

## Title

Add serverless-typescript-lambda tech stack implementation

## Description

Implements the `serverless-typescript-lambda` tech stack profile as a reference implementation under `./tech-stack-implementations/backend/serverless-typescript-lambda/`.

## Summary

- Add complete serverless TypeScript Lambda backend with AWS SAM
- Implement Lambda Powertools observability (X-Ray, CloudWatch metrics, structured logging)
- Configure API Gateway HTTP API with JWT authorization
- Create Zod validation schemas with TypeScript type inference
- Set up lightweight factory DI pattern for services
- Include Vitest test suite and Docker Compose for local development

## Test Plan

- [ ] Run `npm install` to verify dependencies
- [ ] Run `npm test` to execute Vitest test suite
- [ ] Run `npm run build` to verify esbuild compilation
- [ ] Run `docker-compose up -d` to start local DynamoDB
- [ ] Run `npm run local:api` to test SAM local API

## Changes

| Category | Files |
|----------|-------|
| Handlers | `health.ts`, `example.ts` |
| Services | `factory.ts`, `item.service.ts` |
| Schemas | `item.schema.ts` |
| Middleware | `observability.ts`, `correlation.ts` |
| Utils | `response.ts`, `errors.ts` |
| Types | `api.ts`, `events.ts` |
| Tests | `health.test.ts`, `item.schema.test.ts` |
| Config | `package.json`, `tsconfig.json`, `template.yaml`, `vitest.config.ts`, etc. |

## PR URL

[Pending — will be populated after PR creation]
