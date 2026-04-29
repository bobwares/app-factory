**The Read Model / Projection Pattern** is a high-level architectural pattern that maintains one or more specialized, read-optimized data models (views) that are built and updated from the write-side events or data changes.

### Core Idea
Instead of querying the write model (which focuses on consistency and business rules), the system maintains separate read models tailored for specific query needs. These read models are populated through **projections** — processes that listen to domain events or data changes and transform them into the desired read-optimized structures.

- Read models are **denormalized** and purpose-built for fast reads and specific use cases.
- Projections act as the mechanism that keeps read models in sync with the write side.
- Multiple read models can exist for the same data, each optimized differently.
- The write side remains untouched by query concerns.

### Why It Exists (High-Level Benefits)
- **Query Performance** — Read models can be highly optimized for the exact queries they serve.
- **Independent Scaling** — Read models can be scaled, cached, or replicated separately from writes.
- **Simpler Queries** — No complex joins or business logic needed when reading data.
- **Flexibility** — Different views (summaries, reports, search indexes) can coexist easily.
- **Improved User Experience** — Enables fast, responsive UIs and reporting.

### DDD Signals for Selecting This Pattern
Use the **Read Model / Projection Pattern** when the following signals appear in your Domain-Driven Design work:

- Query and reporting needs are significantly different from the write-side domain model.
- You frequently need to combine data from multiple aggregates for a single view.
- Performance or latency issues appear when querying the transactional model.
- Stakeholders require many different views, dashboards, or search capabilities.
- You are using or considering **CQRS** or **Event Sourcing**.
- Read workload is much higher than write workload.

### Relationship to Other Patterns
- Core companion to **CQRS Pattern** (provides the Query side).
- Usually built from **Event Sourcing** events via projections.
- Works with **Query Interface Pattern** to expose the read models.
- Often paired with **Event Notification Interface Pattern** and **Outbox Pattern**.
- Contrasts with **CRUD Data Model Pattern** (single shared model).

### Simple High-Level Example (Conceptual)
```text
Write Side Event: OrderPlaced { OrderId, CustomerId, Items, Total }

Projections build:
  - OrderDetailsReadModel      (for "Get Order Details")
  - CustomerOrderHistoryModel  (for "List Customer Orders")
  - DailySalesReportModel      (for "Sales Dashboard")
  - SearchIndexModel           (for full-text search)
```

Each projection listens to events and updates its own optimized read model.

### References
- [CQRS Pattern — Read Models — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Read Model Pattern — Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- [Projections in Event Sourcing — Vaughn Vernon](https://kalele.io/projections-in-event-sourcing/)
- [Building Read Models with Projections — Jimmy Bogard](https://www.jimmybogard.com/building-read-models-with-projections/)
- [Read Models and Projections in CQRS — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/read-models-projections-cqrs/)
- [Event Sourcing and Read Models — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/apply-cqrs-microservices)