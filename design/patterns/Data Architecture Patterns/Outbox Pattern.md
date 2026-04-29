**The Outbox Pattern** is a high-level architectural pattern that ensures reliable delivery of messages or domain events by storing them in the same database transaction as the business data changes, preventing loss of messages due to failures.

### Core Idea
When a service needs to update its database and publish an event/message, it writes both the business data and the outgoing message into the same local database transaction (usually in an “Outbox” table). A separate background process (or poller) later reads the outbox table, publishes the message to a message broker or event bus, and marks it as processed.

- Guarantees **atomicity** between state change and notification.
- Messages are durably stored until successfully sent.
- Decouples the business transaction from external communication.
- Handles retries, failures, and duplicates gracefully.

### Why It Exists (High-Level Benefits)
- **Reliability** — Ensures messages are never lost even if the service crashes after saving data.
- **Transactional Integrity** — Maintains the “all or nothing” guarantee across database and messaging.
- **Simplicity** — Avoids complex distributed transactions (2PC).
- **Resilience** — Supports retries and idempotency for message delivery.
- **Auditability** — The outbox table naturally serves as a log of outgoing events.

### DDD Signals for Selecting This Pattern
Use the **Outbox Pattern** when the following signals appear in your Domain-Driven Design work:

- You need to publish **domain events** after changing aggregates but cannot afford to lose them.
- You are using a relational database and a separate message broker.
- Business processes require that “if the order was saved, the OrderPlaced event must be published.”
- You want to avoid distributed transactions or the risk of partial failures.
- You are implementing **CQRS + Event Sourcing** or **Event-Driven Integration**.
- Cross-service communication must be reliable and consistent with local state changes.

### Relationship to Other Patterns
- Essential companion to **Event Sourcing**, **CQRS**, and **Event Notification Interface Pattern**.
- Works with **Database per Service Pattern** and **Message-Based Interface Pattern**.
- Often used alongside **Anti-Corruption Layer** when integrating with external systems.
- Complements **Saga Pattern** and **Event Choreography** for reliable event publishing.

### Simple High-Level Example (Conceptual)
```text
Database Transaction:
  1. UPDATE Orders SET Status = 'Placed' WHERE Id = 12345
  2. INSERT INTO Outbox (MessageId, Type, Payload, Created) 
     VALUES (..., 'OrderPlaced', '{OrderId:12345, ...}', ...)

Background Outbox Processor:
  - Reads unprocessed messages from Outbox table
  - Publishes to Message Broker / Event Bus
  - Marks message as "Processed" (or deletes it)
```

If the transaction fails, no message is written. If publishing fails later, the message stays in the outbox for retry.

### References
- [Outbox Pattern — Microservices.io](https://microservices.io/patterns/data/outbox.html)
- [The Outbox Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/outbox)
- [Reliable Event Publishing with the Outbox Pattern — Jimmy Bogard](https://www.jimmybogard.com/reliable-event-publishing-with-the-outbox-pattern/)
- [Implementing the Outbox Pattern — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/outbox-pattern/)
- [Outbox Pattern in Event-Driven Architectures — Vaughn Vernon](https://kalele.io/outbox-pattern/)
- [Transactional Outbox Pattern Explained — Confluent](https://www.confluent.io/blog/transactional-outbox-pattern/)