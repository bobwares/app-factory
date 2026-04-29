**The Event Sourcing Pattern** is a high-level architectural pattern that persists the state of a domain object as a sequence of immutable domain events rather than storing the current state directly.

### Core Idea
Every change to an aggregate or entity is recorded as a domain event. The current state is derived at any time by replaying the sequence of events from the beginning (or from a snapshot). The event log becomes the single source of truth.

- Events represent **facts** that have happened (“OrderPlaced”, “PaymentReceived”, “ItemShipped”).
- Events are immutable and append-only.
- State is reconstructed by replaying events (event replay).
- Supports point-in-time reconstruction and auditability.

### Why It Exists (High-Level Benefits)
- **Full Audit Trail** — Complete history of all changes is preserved.
- **Temporal Queries** — You can reconstruct state as it was at any point in time.
- **High Auditability & Compliance** — Naturally supports regulatory and forensic requirements.
- **Loose Coupling** — Events enable powerful integration with other systems.
- **Scalability & Resilience** — Event stores are append-only and easy to replicate.
- **Business Insight** — Events become valuable data for analytics and reporting.

### DDD Signals for Selecting This Pattern
Use the **Event Sourcing Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain requires a complete **audit history** of changes.
- Business stakeholders frequently ask “what happened?” or “what was the state on date X?”.
- You have complex state transitions with many business rules.
- Temporal reasoning or “time travel” is valuable to the business.
- You are already using or considering **CQRS** and need a reliable way to synchronize read models.
- High-value or regulated processes where traceability is mandatory.

### Relationship to Other Patterns
- Frequently used together with **CQRS** (write side stores events, read side uses projections).
- Works best with **Rich Domain Model** and **Aggregate Pattern** (aggregates produce events).
- Complements **Event Notification Interface Pattern**, **Outbox Pattern**, and **Read Model / Projection Pattern**.
- Enables **Event-Driven Architecture** and **Event Choreography**.
- Can replace or enhance traditional **CRUD Data Model Pattern**.

### Simple High-Level Example (Conceptual)
```text
Event Stream for Order #12345:

1. OrderPlacedEvent      { OrderId:12345, CustomerId:789, Items:..., Total:299.99, Date:2025-04-01 }
2. PaymentReceivedEvent  { OrderId:12345, Amount:299.99, Method:CreditCard }
3. OrderShippedEvent     { OrderId:12345, TrackingNumber:XYZ789, Date:2025-04-03 }
4. OrderDeliveredEvent   { OrderId:12345, DeliveryDate:2025-04-05 }

Current State = Replay(all events) → Order object in Delivered status
State on 2025-04-02 = Replay(events 1-2) → Order in Paid status
```

### References
- [Event Sourcing Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [Event Sourcing — Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Event Sourcing and CQRS — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/event-sourcing)
- [Introduction to Event Sourcing — Vaughn Vernon](https://kalele.io/event-sourcing/)
- [Event Sourcing Basics — Greg Young](https://www.youtube.com/watch?v=8JMh1D9fKkE) (classic explanation)
- [Why Use Event Sourcing? — Jimmy Bogard](https://www.jimmybogard.com/why-use-event-sourcing/)