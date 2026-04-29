**The Query Interface Pattern** is a high-level architectural pattern that defines a dedicated, read-only contract (interface) for retrieving data from a system without modifying it.

### Core Idea
It separates **querying** (reading data) from **commanding** (writing or changing data). This creates a clear, explicit boundary for all read operations.

- Queries **ask questions** about the state of the system (e.g., “Get order details”, “Find customers by name”, “Get dashboard summary”).
- They **never change** the system state — they are side-effect free.
- The interface acts as a contract that specifies *what* data can be retrieved and in what shape, without exposing how the data is stored or processed.

### Why It Exists (High-Level Benefits)
- **Separation of Concerns** — Keeps read logic independent from write logic (this is the foundation of **CQRS**).
- **Optimized Read Models** — Queries can use simplified, denormalized, or specialized data structures optimized for fast reading.
- **Clear Contracts** — Makes the API surface for reading data explicit and easy to understand/test.
- **Scalability & Maintainability** — You can evolve, scale, cache, or secure read paths independently from write paths.

### DDD Signals for Selecting This Pattern
Use the **Query Interface Pattern** when the following signals appear in your Domain-Driven Design work:

- Different **ubiquitous language** is used for reads versus writes (e.g., stakeholders ask “show me a summary” in ways that don’t match the write-side language).
- Complex or frequent **reporting, searching, or dashboard** needs that do not involve domain rules or transactions.
- Performance or scalability requirements for reads are significantly different from those for writes.
- The read side needs a **different model** (denormalized, projected, or composed) than the rich domain model used for commands.
- Teams frequently struggle with **fat repositories** or domain objects bloated by query methods.
- You have multiple **bounded contexts** where one context needs to query data owned by another without modifying it.

### Relationship to Other Patterns
- It is the natural counterpart to the **Command Interface Pattern** (writes).
- It is most commonly used as part of the **CQRS Pattern**, where you have separate interfaces/models for Commands vs. Queries.
- In simpler systems it can stand alone, but it shines when paired with CQRS, **Read Model / Projection Pattern**, or **Event Sourcing**.

### Simple High-Level Example (Conceptual)
```text
Query Interface:
  - GetOrderById(orderId) → OrderSummary
  - FindCustomersByName(nameFilter) → List<CustomerPreview>
  - GetDashboardStatistics() → DashboardData
```

These methods declare *what* you can ask, without revealing the underlying database, cache, or projection mechanism.

### References
- [CQRS Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [CQRS — Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- [Queries in Domain-Driven Design — Vaughn Vernon](https://kalele.io/)
- [Query Side in CQRS — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/cqrs-pattern/)
- [Command Query Separation — Jimmy Bogard](https://www.jimmybogard.com/)
- [Read Models and Query Interfaces — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/apply-cqrs-microservices)