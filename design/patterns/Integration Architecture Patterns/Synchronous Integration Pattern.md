**The Synchronous Integration Pattern** is a high-level architectural pattern that enables direct, real-time communication between systems or services where the caller waits for the receiver to complete processing and return a response.

### Core Idea
One system (the client) sends a request to another system (the provider) and blocks until a response is received. The interaction is request-reply style, typically over HTTP, gRPC, or similar synchronous protocols. Both systems must be available at the same time for the integration to succeed.

- Communication is **blocking** and **immediate**.
- The caller receives either success with data or an error synchronously.
- The integration is point-to-point and explicit.
- Suitable for operations that require immediate confirmation or result.

### Why It Exists (High-Level Benefits)
- **Simplicity** — Easy to understand, implement, and debug.
- **Immediate Feedback** — The caller knows the outcome right away.
- **Strong Consistency** — Enables straightforward transactional flows across systems when needed.
- **Predictable Behavior** — Clear request-response contract.
- **Familiarity** — Aligns with standard API calling patterns.

### DDD Signals for Selecting This Pattern
Use the **Synchronous Integration Pattern** when the following signals appear in your Domain-Driven Design work:

- The business process requires **immediate confirmation** or result before proceeding (e.g., “reserve seat”, “validate payment”, “check availability”).
- Operations are short-running and latency is acceptable.
- Strong consistency or real-time validation across bounded contexts is needed.
- Stakeholders describe interactions as direct actions with expected immediate replies.
- The integration is between a small number of services where availability is high.
- Downstream systems must be called as part of a single logical transaction.

### Relationship to Other Patterns
- Natural counterpart to **Event-Driven Integration Pattern** (asynchronous).
- Often used with **Request/Response API Pattern**, **Command Interface Pattern**, and **External System Adapter Pattern**.
- Frequently combined with **Anti-Corruption Layer** when integrating with external or legacy systems.
- Works with **Saga Pattern** for distributed transactions that require synchronous steps.
- Contrasts with **Message-Based Interface Pattern** and **Event Notification Interface Pattern**.

### Simple High-Level Example (Conceptual)
```text
Synchronous Integration:

Order Service → Inventory Service
  Request:  ReserveInventoryCommand { OrderId, Items }
  Response: ReservationResult { Success: true, ReservedItems: [...] }

Order Service → Payment Service  
  Request:  ProcessPaymentCommand { OrderId, Amount }
  Response: PaymentConfirmation { TransactionId, Status }
```

The Order Service waits for each response before continuing.

### References
- [Synchronous Request-Reply Pattern — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/synchronous-request-reply)
- [Integration Patterns: Synchronous vs Asynchronous — Microservices.io](https://microservices.io/patterns/integration/synchronous.html)
- [Synchronous vs Asynchronous Communication in Microservices — Martin Fowler](https://martinfowler.com/articles/microservices.html#CommunicationStyles)
- [When to Use Synchronous Integration — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/synchronous-vs-asynchronous-integration/)
- [Synchronous Integration in Distributed Systems — InfoQ](https://www.infoq.com/articles/synchronous-asynchronous-microservices/)
- [Request-Reply Pattern — Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html)