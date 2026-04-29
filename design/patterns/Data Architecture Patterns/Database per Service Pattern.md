**The Database per Service Pattern** is a high-level architectural pattern that assigns each service (or bounded context) its own dedicated database, allowing independent data management, schema evolution, and technology choices.

### Core Idea
Instead of sharing a single database across the entire application, each service owns and controls its own data store. Services communicate only through well-defined interfaces (APIs or events), never by directly accessing another service’s database.

- Each service has complete autonomy over its data model and persistence technology.
- Data duplication is acceptable and often necessary.
- Strong consistency is enforced only within a service’s own database.
- Cross-service data consistency is achieved through events or eventual consistency mechanisms.

### Why It Exists (High-Level Benefits)
- **Independent Evolution** — Services can change their schema or database technology without affecting others.
- **Loose Coupling** — Eliminates hidden dependencies caused by shared databases.
- **Scalability** — Each service’s data store can be scaled independently.
- **Fault Isolation** — A failure or performance issue in one database does not impact other services.
- **Technology Freedom** — Allows **Polyglot Persistence** (different databases for different needs).

### DDD Signals for Selecting This Pattern
Use the **Database per Service Pattern** when the following signals appear in your Domain-Driven Design work:

- You have clear **Bounded Contexts** with distinct Ubiquitous Languages and data needs.
- Different parts of the system have very different data access patterns or consistency requirements.
- Teams want to move and deploy independently without coordination on database changes.
- You are experiencing pain from shared database coupling (deadlocks, schema conflicts, tight coupling).
- You are designing or migrating toward a **Microservices Architecture**.
- Aggregates and consistency boundaries align naturally with service boundaries.

### Relationship to Other Patterns
- Enables true autonomy in **Microservices Architecture**.
- Works best with **Domain-Centric Architecture**, **Ports & Adapters**, and **CQRS**.
- Often paired with **Event-Driven Integration**, **Outbox Pattern**, and **Anti-Corruption Layer**.
- Contrasts with **Shared Database Pattern** (which creates tight coupling).
- Complements **Polyglot Persistence** and **Event Sourcing**.

### Simple High-Level Example (Conceptual)
```text
Order Service                  → Owns: Orders DB (PostgreSQL)
    └── Order Aggregate

Inventory Service             → Owns: Inventory DB (Cassandra)
    └── Stock Aggregate

Customer Service              → Owns: Customers DB (MongoDB)
    └── Customer Aggregate

Communication: Services publish domain events instead of direct DB access.
```

### References
- [Database per Service Pattern — Microservices.io](https://microservices.io/patterns/data/database-per-service.html)
- [Decomposing Monoliths: Database per Service — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/database-per-service)
- [Shared Database vs Database per Service — Martin Fowler](https://martinfowler.com/articles/microservices.html#Databases)
- [Database per Service in Microservices — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/database-per-service/)
- [Polyglot Persistence and Database per Service — Vaughn Vernon](https://kalele.io/polyglot-persistence/)
- [When to Use Database per Service — InfoQ](https://www.infoq.com/articles/microservices-data-management/)