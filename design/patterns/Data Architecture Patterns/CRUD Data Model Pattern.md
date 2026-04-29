**The CRUD Data Model Pattern** is a high-level architectural pattern that structures the persistence model around the basic Create, Read, Update, and Delete operations on domain entities, typically resulting in a data model that closely mirrors database tables or records.

### Core Idea
The data model is designed primarily for straightforward data storage and retrieval. Each entity is represented as a simple data structure with direct mapping to storage (tables, documents, etc.). Behavior is kept minimal, and operations focus on basic data manipulation rather than complex business logic.

- Entities are mostly anemic (data containers with little behavior).
- One-to-one or simple mapping between domain objects and storage structures.
- Emphasis on standard CRUD operations for data lifecycle management.
- Relationships are typically implemented through foreign keys or simple references.
- Optimized for direct data access and basic persistence needs.

### Why It Exists (High-Level Benefits)
- **Simplicity** — Easy to understand, implement, and maintain.
- **Rapid Development** — Accelerates initial application building and prototyping.
- **Familiarity** — Aligns naturally with most ORMs, databases, and developer experience.
- **Straightforward Querying** — Easy to perform reads and basic reporting.
- **Low Ceremony** — Minimal abstraction overhead for simple domains.

### DDD Signals for Selecting This Pattern
Use the **CRUD Data Model Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain is simple with mostly data-driven operations and few business rules.
- Stakeholders primarily talk about managing records (create/update/delete entities).
- Most use cases are basic administrative or back-office data maintenance.
- Rich behavior and complex invariants are minimal or absent.
- The bounded context is more about data storage than sophisticated business logic.
- Speed of delivery and simplicity are prioritized over long-term domain complexity.

### Relationship to Other Patterns
- Frequently paired with **CRUD Interface Pattern** and **Anemic Domain Model (Anti-Pattern)**.
- Natural fit for traditional **Layered Architecture**.
- Often evolves into or is replaced by **CQRS**, **Event Sourcing**, or **Rich Domain Model** as complexity grows.
- Contrasts with **Aggregate Pattern** and **Rich Domain Model** in complex domains.
- Commonly used with **Database per Service** in simpler microservices.

### Simple High-Level Example (Conceptual)
```text
CRUD Data Model:

Customer Table / Entity
  ├── CustomerId (PK)
  ├── Name
  ├── Email
  ├── Address
  ├── Status
  └── CreatedDate

Order Table / Entity
  ├── OrderId (PK)
  ├── CustomerId (FK)
  ├── OrderDate
  ├── TotalAmount
  └── Status
```

Operations are direct: CreateCustomer, GetOrder, UpdateCustomer, DeleteOrder.

### References
- [CRUD Data Model Pattern — Microservices.io](https://microservices.io/patterns/data/crud.html)
- [Anemic Domain Model vs Rich Domain Model — Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html)
- [CRUD Is Not an Architecture — Medium](https://medium.com/@floyd.may/crud-is-not-an-architecture-a00019febbfa)
- [Data Modeling Patterns — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/guide/database/data-modeling)
- [When to Use CRUD vs CQRS — Anar Solutions](https://anarsolutions.com/microservices-development-patterns-crud-vs-cqrs/)
- [Domain-Driven Design and CRUD — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/ddd-and-crud/)