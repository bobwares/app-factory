**The CQRS (Command Query Responsibility Segregation) Pattern** is a high-level architectural pattern that separates the responsibility of handling commands (writes) from queries (reads) using distinct models, interfaces, and data pathways.

### Core Idea
Instead of using a single model for both reading and writing data, CQRS splits the system into two parts:
- **Command side** (Write model): Handles state-changing operations, enforces business rules, and maintains consistency.
- **Query side** (Read model): Optimizes for fast, efficient reading and reporting, often using denormalized or specialized data structures.

- Commands and Queries use separate interfaces and often separate data stores.
- The two sides are kept in sync through events or projections.
- The pattern can be applied at different scales — from simple class separation to completely separate databases.

### Why It Exists (High-Level Benefits)
- **Independent Optimization** — Write model focuses on consistency and rules; read model focuses on performance and query patterns.
- **Scalability** — Read and write workloads can be scaled independently.
- **Simpler Models** — Each side can evolve without affecting the other.
- **Better Performance** — Read models can be highly optimized (denormalized, cached, indexed differently).
- **Improved Maintainability** — Clear separation reduces complexity in large or complex domains.

### DDD Signals for Selecting This Pattern
Use the **CQRS Pattern** when the following signals appear in your Domain-Driven Design work:

- Read and write operations have significantly different performance, scalability, or consistency requirements.
- The read model needs different shapes or compositions of data than the write model.
- You have complex domain logic on the write side but mostly simple reads or reporting.
- Stakeholders ask for many different views, summaries, or search capabilities.
- The system experiences high read-to-write ratio (many more reads than writes).
- You are already using or considering **Event Sourcing** or **Read Model / Projection Pattern**.

### Relationship to Other Patterns
- Naturally pairs with **Command Interface Pattern** and **Query Interface Pattern**.
- Works excellently with **Rich Domain Model** (write side) and **Read Model / Projection Pattern** (read side).
- Often combined with **Event Sourcing**, **Outbox Pattern**, and **Ports & Adapters**.
- Evolves from or replaces **CRUD Interface Pattern** and **CRUD Data Model Pattern** as complexity grows.

### Simple High-Level Example (Conceptual)
```text
Command Side (Write Model)
  - PlaceOrderCommand → Order Aggregate (Rich Domain)
  - UpdateCustomerCommand → Customer Aggregate

Query Side (Read Model)
  - GetOrderByIdQuery → OrderReadModel (denormalized)
  - SearchOrdersQuery → List<OrderSummaryReadModel>
  - GetDashboardQuery → DashboardReadModel
```

The two sides are synchronized via domain events.

### References
- [CQRS Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [CQRS — Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- [CQRS + Event Sourcing — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/apply-cqrs-microservices)
- [CQRS Pattern Explained — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/cqrs-pattern/)
- [When to Use CQRS — Jimmy Bogard](https://www.jimmybogard.com/cqrs-when-and-why/)
- [CQRS Journey — Microsoft Patterns & Practices](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/jj591573(v=pandp.10))