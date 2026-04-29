**The Event Choreography Pattern** is a high-level architectural pattern in which multiple services coordinate a complex business process through the exchange of events, without a central orchestrator controlling the flow.

### Core Idea
Each service reacts to domain events published by other services and performs its own local transaction, then publishes new events. The overall workflow emerges from the decentralized collaboration of services through events. There is no single component that knows the entire process — the process is defined by the event flow.

- Services are **autonomous** and react only to events they are interested in.
- Coordination is **implicit** and driven by publish-subscribe semantics.
- Each participant is responsible for its own success or compensation.
- The process flows through a chain or network of events.

### Why It Exists (High-Level Benefits)
- **Loose Coupling** — Services have no direct knowledge of each other.
- **High Autonomy** — Teams can evolve their services independently.
- **Scalability** — Easy to add new participants or steps without changing existing services.
- **Resilience** — No single point of failure (no central orchestrator).
- **Flexibility** — New functionality can be added by listening to existing events.

### DDD Signals for Selecting This Pattern
Use the **Event Choreography Pattern** when the following signals appear in your Domain-Driven Design work:

- Business processes are naturally event-driven (“when this happens, that should happen”).
- You want maximum decoupling between bounded contexts or services.
- Different teams own different parts of the process and want full autonomy.
- The process is relatively straightforward with limited complex decision logic.
- You prefer decentralized control over centralized orchestration.
- Long-running processes should not depend on a single component’s availability.

### Relationship to Other Patterns
- Counterpart to **Workflow Orchestration Pattern** (decentralized vs centralized).
- Often used together with **Saga Pattern** (choreographed sagas).
- Relies heavily on **Event Notification Interface Pattern** and **Event-Driven Integration**.
- Complements **CQRS**, **Event Sourcing**, and **Outbox Pattern**.
- Works best in **Event-Driven Architecture** and **Microservices**.

### Simple High-Level Example (Conceptual)
```text
Event Choreography Flow:

Order Service → Publishes OrderPlacedEvent
    ↓
Inventory Service (listens) → Reserves stock → Publishes ItemsReservedEvent
    ↓
Payment Service (listens) → Processes payment → Publishes PaymentSucceededEvent
    ↓
Shipping Service (listens) → Ships order → Publishes OrderShippedEvent
    ↓
Notification Service (listens) → Sends confirmation
```

If Payment fails → PaymentFailedEvent → triggers compensation events from previous services.

### References
- [Event Choreography vs Orchestration — Martin Fowler](https://martinfowler.com/articles/saga.html)
- [Choreography Pattern — Microservices.io](https://microservices.io/patterns/data/saga.html)
- [Event-Driven Choreography — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-driven-architecture)
- [Choreography vs Orchestration — Jimmy Bogard](https://www.jimmybogard.com/orchestration-vs-choreography/)
- [Implementing Choreographed Sagas — Vaughn Vernon](https://kalele.io/sagas/)
- [Event Choreography in Practice — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/event-choreography/)