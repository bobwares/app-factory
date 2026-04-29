**The Shared Database Pattern** is a high-level architectural pattern in which multiple services or bounded contexts share the same database instance and schema, allowing direct data access between them.

### Core Idea
Instead of each service owning its own database, several services connect to a single shared database. They can read and write to common tables, use shared schemas, or even join across data owned by different services. This pattern prioritizes simplicity and strong consistency over autonomy.

- Services communicate through the database (via tables, stored procedures, or direct queries).
- Data models are often shared or tightly coupled.
- Transactions can span multiple services more easily.
- Changes to the database schema can affect multiple services.

### Why It Exists (High-Level Benefits)
- **Simplicity** — Easier to implement joins, transactions, and reporting across data.
- **Strong Consistency** — Supports ACID transactions that span multiple business concepts.
- **Faster Development** — Reduced need for complex inter-service communication.
- **Lower Latency** — Direct data access is faster than API or event calls.
- **Familiarity** — Well-understood by most development teams and traditional architectures.

### DDD Signals for Selecting This Pattern
Use the **Shared Database Pattern** when the following signals appear in your Domain-Driven Design work:

- You are building a **Monolithic** or **Modular Monolith** application.
- Bounded contexts have very high data coupling and frequent joint operations.
- Strong immediate consistency across multiple domain concepts is critical.
- The team size is small and wants to avoid the complexity of distributed data management.
- You have significant reporting or analytical needs that require joining large datasets.
- You are in early stages of a project where speed is more important than long-term autonomy.

### Relationship to Other Patterns
- Direct opposite of **Database per Service Pattern**.
- Commonly used with **CRUD Data Model Pattern**, **Layered Architecture**, and **Anemic Domain Model**.
- Often seen in **Monolithic Architecture** and early **Modular Monolith** designs.
- Can evolve into **Anti-Corruption Layer** or **Strangler Fig Pattern** when moving toward microservices.
- Frequently replaced by **CQRS**, **Event-Driven Integration**, and **Outbox Pattern** as systems grow.

### Simple High-Level Example (Conceptual)
```text
Shared Database (Single PostgreSQL instance):

- Orders Table (owned by Order Service)
- Customers Table (used by Customer + Order services)
- Inventory Table (used by Inventory + Order services)

Order Service directly queries:
  SELECT * FROM Customers 
  JOIN Orders ON ...

Customer Service directly updates Customer table used by other services.
```

### References
- [Shared Database Pattern — Microservices.io](https://microservices.io/patterns/data/shared-database.html)
- [Databases in Microservices — Martin Fowler](https://martinfowler.com/articles/microservices.html#Databases)
- [Shared Database vs Database per Service — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/database-per-service)
- [The Dangers of Shared Databases in Microservices — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/shared-database/)
- [When to Share a Database — Chris Richardson](https://microservices.io/patterns/data/shared-database.html)
- [Monolith vs Microservices Data Management — InfoQ](https://www.infoq.com/articles/microservices-data-management/)

