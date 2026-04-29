**The Saga Pattern** is a high-level architectural pattern for managing long-running, distributed business transactions that span multiple services or bounded contexts without using traditional distributed locks or two-phase commit (2PC).

### Core Idea
A Saga breaks a large distributed transaction into a series of smaller, local transactions. Each step is executed by a different service, and if any step fails, compensating transactions are triggered to undo the work already completed, bringing the system back to a consistent state.

- The saga maintains the overall business process state.
- It supports two coordination styles: **Orchestration** (central coordinator) and **Choreography** (event-driven, decentralized).
- Each participating service performs its local transaction and publishes an event.
- Compensation logic is explicitly defined for rollback scenarios.
- Achieves **eventual consistency** rather than immediate strong consistency.

### Why It Exists (High-Level Benefits)
- **Distributed Transaction Management** — Handles consistency across service boundaries without tight coupling.
- **Resilience** — Services remain independent and can fail without locking the entire system.
- **Scalability** — Supports long-running processes that can take hours or days.
- **Flexibility** — Easy to add, remove, or modify steps in the business process.
- **Maintainability** — Business process logic is explicit and visible.

### DDD Signals for Selecting This Pattern
Use the **Saga Pattern** when the following signals appear in your Domain-Driven Design work:

- A single business operation spans multiple bounded contexts or aggregates.
- You need to coordinate work across services while maintaining loose coupling.
- Strong immediate consistency is not required — eventual consistency is acceptable.
- Business processes are long-running (e.g., order fulfillment, loan approval, travel booking).
- You have scenarios that require complex compensation or rollback logic.
- Stakeholders describe end-to-end processes that involve multiple teams or systems.

### Relationship to Other Patterns
- Closely related to **Workflow Orchestration Pattern** (orchestrated sagas) and **Event Choreography Pattern** (choreographed sagas).
- Frequently used with **Event-Driven Integration**, **Outbox Pattern**, and **CQRS**.
- Works well with **Database per Service** and **Event Sourcing**.
- Alternative to distributed transactions in **Microservices Architecture**.

### Simple High-Level Example (Conceptual)
```text
Order Saga:

1. Order Service: Create Pending Order → Publish OrderCreated
2. Inventory Service: Reserve Items → Publish ItemsReserved
3. Payment Service: Process Payment → Publish PaymentSucceeded
4. Shipping Service: Ship Order → Publish OrderShipped

If Payment Fails:
   → Compensation: Inventory Service → ReleaseReservation
   → Compensation: Order Service → Cancel Order
```

The saga ensures that either all steps complete successfully or the system is properly compensated.

### References
- [Saga Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Saga Pattern — Microservices.io](https://microservices.io/patterns/data/saga.html)
- [Sagas — Martin Fowler](https://martinfowler.com/articles/saga.html)
- [Orchestration vs Choreography — Chris Richardson](https://microservices.io/patterns/data/saga.html)
- [Implementing Sagas — Vaughn Vernon](https://kalele.io/sagas/)
- [Reliable Sagas with the Outbox Pattern — Jimmy Bogard](https://www.jimmybogard.com/reliable-sagas-with-outbox/)