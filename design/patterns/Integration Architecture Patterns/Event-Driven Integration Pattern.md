**The Event-Driven Integration Pattern** is a high-level architectural pattern that enables loose coupling between systems and services by communicating through the production and consumption of events rather than direct calls.

### Core Idea
Services publish events when something important happens in their domain. Other services subscribe to those events and react accordingly without the publisher knowing who the consumers are. Communication is asynchronous, one-way, and decoupled in both time and space.

- Events represent **facts** that have already occurred.
- Publishers emit events; subscribers react independently.
- No direct dependency or synchronous call between producer and consumer.
- Integration happens through an event broker, message bus, or event stream.

### Why It Exists (High-Level Benefits)
- **Loose Coupling** — Services evolve independently without breaking each other.
- **Temporal Decoupling** — Systems do not need to be available at the same time.
- **Scalability** — Easy to add new consumers or scale processing.
- **Resilience** — Failures in one service do not immediately affect others.
- **Flexibility & Extensibility** — New functionality can be added by subscribing to existing events.
- **Business Alignment** — Naturally reflects “when this happens, do that” business processes.

### DDD Signals for Selecting This Pattern
Use the **Event-Driven Integration Pattern** when the following signals appear in your Domain-Driven Design work:

- Business processes span multiple bounded contexts or services.
- Ubiquitous language contains many “when… then…” or “after… do…” statements.
- You need to react to occurrences in other parts of the system without tight coupling.
- Real-time or near-real-time reactions are valuable but not strictly synchronous.
- You want to support future or unknown consumers of domain changes.
- High autonomy and independent deployability of services are important.

### Relationship to Other Patterns
- Core pattern of **Event-Driven Architecture**.
- Works with **Event Notification Interface Pattern**, **Message-Based Interface Pattern**, and **Event Choreography**.
- Frequently used together with **CQRS**, **Event Sourcing**, **Outbox Pattern**, and **Saga Pattern**.
- Natural complement to **Database per Service** and **Polyglot Persistence**.
- Contrasts with **Synchronous Integration Pattern**.

### Simple High-Level Example (Conceptual)
```text
Order Service publishes: OrderPlacedEvent { OrderId, CustomerId, Items, Total }

→ Inventory Service reacts → Reserves stock
→ Notification Service reacts → Sends confirmation email
→ Analytics Service reacts → Updates sales metrics
→ Loyalty Service reacts → Awards points
```

No direct calls — only events flowing through the system.

### References
- [Event-Driven Architecture Pattern — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-driven-architecture)
- [Event-Driven Integration — Martin Fowler](https://martinfowler.com/articles/201701-event-driven.html)
- [Event-Driven Architecture — Microservices.io](https://microservices.io/patterns/data/event-driven.html)
- [What is Event-Driven Integration? — Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventDrivenIntegration.html)
- [Event-Driven vs Request-Driven — Jimmy Bogard](https://www.jimmybogard.com/event-driven-vs-request-driven/)
- [Building Event-Driven Systems — Confluent](https://www.confluent.io/learn/event-driven-architecture/)