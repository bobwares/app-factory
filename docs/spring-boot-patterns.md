# Java / Spring Boot Pattern Resources

Checked on 2026-03-29.

There is no exact Spring equivalent to Serverless Land. The closest official resource is Spring Guides, backed by Spring reference docs and a handful of canonical sample apps.

## Closest Equivalent

| Resource | Best for | Notes |
| --- | --- | --- |
| [Spring Guides](https://spring.io/guides/) | Official pattern and example discovery | This is the nearest thing to a curated pattern catalog. The site is organized by categories such as REST APIs, Data Access, Security, Messaging, Batch Processing, Microservices, Testing, and GraphQL. |
| [Spring Initializr](https://start.spring.io/) | Project bootstrapping | Not a pattern catalog, but it is the fastest way to start the examples from the guides with the right Spring Boot dependencies. |
| [Spring Projects GitHub org](https://github.com/spring-projects) | Official codebases and samples | Useful when you want a real repository instead of a tutorial. |

## Best Official Starting Points by Pattern

| Pattern area | Recommended starting point | Why it is useful |
| --- | --- | --- |
| Basic REST API | [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/) | Smallest official Spring Boot REST example. Good first stop for controllers, JSON serialization, and executable jars. |
| Richer REST design | [Building REST services with Spring](https://spring.io/guides/tutorials/rest/) | Better than the tiny REST guide when you want resource modeling, API evolution, and hypermedia-aware design. |
| Hypermedia / HATEOAS | [Building a Hypermedia-Driven RESTful Web Service](https://spring.io/guides/gs/rest-hateoas/) | Official example for HATEOAS-style APIs. |
| Reactive HTTP APIs | [Building a Reactive RESTful Web Service](https://spring.io/guides/gs/reactive-rest-service/) | Best entry point for WebFlux-style APIs. |
| Web security | [Securing a Web Application](https://spring.io/guides/gs/securing-web/) | Official starter for login, route protection, and Spring Security wiring. |
| Security deep dive | [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html) | Use this after the basic guide for real production security patterns and architecture. |
| RabbitMQ messaging | [Messaging with RabbitMQ](https://spring.io/guides/gs/messaging-rabbitmq/) | Official pub/sub-style messaging example using Spring Boot. |
| Kafka messaging | [Spring for Apache Kafka Project Page](https://spring.io/projects/spring-kafka) | Good overview of the Kafka integration and feature set from the Spring team. |
| Kafka reference | [Spring Kafka Reference](https://docs.spring.io/spring-kafka/reference/index.html) | Use this for listener containers, transactions, retries, testing, and operational details. |
| Batch processing | [Creating a Batch Service](https://spring.io/guides/gs/batch-processing) | Official starter for CSV import, transformation, and persistence. |
| Batch architecture and patterns | [Spring Batch Reference](https://docs.spring.io/spring-batch/docs/current/reference/html/index.html) | Includes architecture, scaling, testing, and common batch patterns. |
| GraphQL | [Spring for GraphQL Reference](https://docs.spring.io/spring-graphql/reference/index.html) | Best current official entry point for GraphQL APIs with Spring Boot. |

## Sample Apps Worth Bookmarking

| Sample | Link | Why it matters |
| --- | --- | --- |
| Canonical Spring sample app | [spring-projects/spring-petclinic](https://github.com/spring-projects/spring-petclinic) | The classic full-stack Spring sample. Good for structure, testing, data access, and production-ish application shape. |
| Petclinic variant collection | [spring-petclinic community org](https://github.com/spring-petclinic) | Community-maintained variants that show REST, microservices, Kotlin, Spring Data JDBC, and more. |

## Recommended Browsing Order

1. Start at [Spring Guides](https://spring.io/guides/) and filter by the category you care about.
2. Use [Spring Initializr](https://start.spring.io/) to bootstrap a local project with the same dependencies.
3. Move to the relevant reference doc once you outgrow the getting-started example.
4. Use Petclinic when you want to study a larger real-world project structure instead of a focused guide.

## Practical Take

If you want the closest Spring experience to Serverless Land, use this stack in order:

1. [Spring Guides](https://spring.io/guides/)
2. [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html), [Spring GraphQL Reference](https://docs.spring.io/spring-graphql/reference/index.html), [Spring Kafka Reference](https://docs.spring.io/spring-kafka/reference/index.html), and [Spring Batch Reference](https://docs.spring.io/spring-batch/docs/current/reference/html/index.html) for deeper patterns
3. [spring-projects/spring-petclinic](https://github.com/spring-projects/spring-petclinic) for an end-to-end sample application
