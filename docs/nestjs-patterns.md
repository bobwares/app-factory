# NestJS Pattern Resources

Checked on 2026-03-29.

NestJS also does not have a single Serverless Land-style pattern gallery. The closest official equivalent is the combination of Nest documentation, the Recipes section, and the official sample repository.

## Closest Equivalent

| Resource | Best for | Notes |
| --- | --- | --- |
| [NestJS Recipes](https://docs.nestjs.com/recipes) | Opinionated patterns and integrations | This is the highest-signal official section for real application patterns. |
| [NestJS Techniques](https://docs.nestjs.com/techniques) | Core app-building techniques | Covers validation, caching, versioning, queues, events, file upload, SSE, sessions, and more. |
| [Official samples repo](https://github.com/nestjs/nest/tree/master/sample) | Runnable code | Best source when you want concrete code instead of prose docs. |

## Best Official Starting Points by Pattern

| Pattern area | Recommended starting point | Why it is useful |
| --- | --- | --- |
| Basic REST service | [01-cats-app sample](https://github.com/nestjs/nest/tree/master/sample/01-cats-app) | The canonical first sample for controllers, providers, and modules. |
| CRUD APIs | [CRUD generator recipe](https://docs.nestjs.com/recipes/crud-generator) | Fastest official path to boilerplate CRUD scaffolding. |
| JWT auth | [19-auth-jwt sample](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt) | Best official auth sample to start from. |
| Auth integration | [Passport recipe](https://docs.nestjs.com/recipes/passport) | Use this when you need auth architecture instead of just one sample. |
| OpenAPI / Swagger | [Swagger recipe](https://docs.nestjs.com/recipes/swagger) | Official OpenAPI integration guidance. |
| Swagger sample | [11-swagger sample](https://github.com/nestjs/nest/tree/master/sample/11-swagger) | Concrete runnable example for DTOs and API docs. |
| GraphQL | [GraphQL quick start](https://docs.nestjs.com/graphql/quick-start) | Official entry point for schema-first and code-first GraphQL. |
| GraphQL code-first sample | [23-graphql-code-first](https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first) | Best runnable code-first GraphQL example. |
| GraphQL schema-first sample | [12-graphql-schema-first](https://github.com/nestjs/nest/tree/master/sample/12-graphql-schema-first) | Best runnable schema-first GraphQL example. |
| Federation | [31-graphql-federation-code-first](https://github.com/nestjs/nest/tree/master/sample/31-graphql-federation-code-first) and [32-graphql-federation-schema-first](https://github.com/nestjs/nest/tree/master/sample/32-graphql-federation-schema-first) | Official federation samples. |
| CQRS | [CQRS recipe](https://docs.nestjs.com/recipes/cqrs) | Best official architectural pattern doc for larger apps. |
| Microservices | [03-microservices sample](https://github.com/nestjs/nest/tree/master/sample/03-microservices) | Good first step for message-based Nest apps. |
| gRPC | [04-grpc sample](https://github.com/nestjs/nest/tree/master/sample/04-grpc) | Official RPC example. |
| Kafka | [Kafka microservices guide](https://docs.nestjs.com/microservices/kafka) | Best official Kafka transporter documentation. |
| Queues | [26-queues sample](https://github.com/nestjs/nest/tree/master/sample/26-queues) | Good reference for background jobs and queue workers. |
| Scheduling | [27-scheduling sample](https://github.com/nestjs/nest/tree/master/sample/27-scheduling) | Good for cron and timed jobs. |
| Server-sent events | [28-sse sample](https://github.com/nestjs/nest/tree/master/sample/28-sse) | Useful for streaming event responses to clients. |
| Event-driven internal pub/sub | [30-event-emitter sample](https://github.com/nestjs/nest/tree/master/sample/30-event-emitter) | Good for internal modular eventing. |
| File upload | [29-file-upload sample](https://github.com/nestjs/nest/tree/master/sample/29-file-upload) | Official multipart upload example. |
| Fastify | [10-fastify sample](https://github.com/nestjs/nest/tree/master/sample/10-fastify) | Best first stop if you want performance-oriented HTTP instead of Express. |

## Useful Official Ecosystem Repos

| Repo | Link | Why it matters |
| --- | --- | --- |
| Core framework | [nestjs/nest](https://github.com/nestjs/nest) | Main framework repo and the source of the official samples. |
| GitHub org | [nestjs org](https://github.com/nestjs) | Handy index of official modules like Swagger, GraphQL, and TypeORM integrations. |

## Recommended Browsing Order

1. Start with [Recipes](https://docs.nestjs.com/recipes) when you have a concrete problem.
2. Jump to the matching sample under [nestjs/nest/sample](https://github.com/nestjs/nest/tree/master/sample).
3. Use [Techniques](https://docs.nestjs.com/techniques) for framework-native approaches to validation, queues, events, caching, and sessions.
4. Use [Microservices](https://docs.nestjs.com/microservices/kafka) and [GraphQL](https://docs.nestjs.com/graphql/quick-start) docs when your app moves beyond simple HTTP CRUD.

## Practical Take

If you want the closest NestJS equivalent to Serverless Land, start with:

1. [Recipes](https://docs.nestjs.com/recipes)
2. [Official sample repository](https://github.com/nestjs/nest/tree/master/sample)
3. [Techniques](https://docs.nestjs.com/techniques) and protocol-specific docs for Kafka, GraphQL, and gRPC
