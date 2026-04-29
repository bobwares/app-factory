**The Repository Pattern** is a high-level architectural pattern that mediates between the domain model and persistence infrastructure by exposing a collection-like interface for loading and saving aggregate roots without leaking storage details into the domain.

### Core Idea
A repository presents persisted aggregates as if they were part of an in-memory collection. The domain and application layers depend on repository abstractions, while the infrastructure layer implements them using a database, ORM, document store, or other persistence technology.

- Repositories are typically defined around aggregate roots, not arbitrary tables.
- They encapsulate persistence concerns such as retrieval, storage, and query composition needed by the write model.
- The domain model depends on interfaces; adapters provide the concrete implementation.
- In CQRS-oriented systems, repositories usually belong to the command side, while read models can use specialized query paths.

### Why It Exists (High-Level Benefits)
- **Persistence Isolation** — Keeps the domain model free from database and ORM concerns.
- **Testability** — Makes application and domain logic easier to test with substitutes or fakes.
- **Consistency Discipline** — Encourages aggregate boundaries to be loaded and saved through one explicit path.
- **Reduced Duplication** — Centralizes persistence access logic instead of scattering it across services.
- **Infrastructure Flexibility** — Makes it easier to change storage implementations without rewriting domain logic.

### DDD Signals for Selecting This Pattern
Use the **Repository Pattern** when the following signals appear in your Domain-Driven Design work:

- Domain or application services are starting to contain raw persistence or ORM code.
- Multiple write use cases need to load and save the same aggregate type.
- Query logic for aggregate retrieval is duplicated across handlers or services.
- You want the domain model to depend on abstractions instead of storage technology.
- Aggregate consistency rules are important enough that updates should flow through a controlled write path.
- You are using **Rich Domain Model Pattern** and need persistence that does not flatten the domain into CRUD scripts.

### Relationship to Other Patterns
- Closely tied to **Aggregate Pattern**, because repositories usually load and save aggregate roots.
- Commonly used with **Rich Domain Model Pattern**, **Service Layer Pattern**, and **Ports and Adapters Pattern**.
- Supports **Domain-Centric Architecture Pattern** by keeping infrastructure dependencies pointed outward.
- Often used on the command side of **CQRS Pattern**, while the query side may use **Read Model Projection Pattern** or direct query models instead.
- Contrasts with table-centric CRUD access and with **Anemic Domain Model Pattern** implementations that treat persistence as the primary design driver.

### Simple High-Level Example (Conceptual)
```text
Repository Interface
  - OrderRepository.GetById(orderId) -> Order Aggregate
  - OrderRepository.Save(order)

Application Flow
  1. Load Order aggregate from repository
  2. Execute domain behavior: order.cancel()
  3. Save updated aggregate through repository
```

### References
- [Repository - Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html)
- [Design the Infrastructure Persistence Layer - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [CRUD Pattern, Repository Pattern, and Layered Architecture](https://fitech101.aalto.fi/en/courses/web-software-development-v1/part-3/7-crud-repository-layered-architecture)
- Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software*
- Martin Fowler, *Patterns of Enterprise Application Architecture*
