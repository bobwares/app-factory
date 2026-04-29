**The Request/Response API Pattern** is a high-level architectural pattern that defines a synchronous interaction style where a client sends a request to a service and waits for a response before continuing.

### Core Idea
The client initiates a call with input data and blocks until the service processes the request and returns a result. This creates a direct, point-to-point, request-driven conversation between components.

- The interaction is **synchronous** — the caller waits for completion.
- The response typically includes both success/failure status and the requested data or outcome.
- It provides an immediate and predictable interaction model.
- The interface clearly declares available operations and expected input/output shapes.

### Why It Exists (High-Level Benefits)
- **Simplicity** — Easy to understand, implement, and debug.
- **Immediate Feedback** — The caller knows the outcome right away.
- **Strong Contract** — Explicit input and output definitions make integration straightforward.
- **Suitable for Transactional Operations** — Ideal when the caller needs confirmation before proceeding.
- **Broad Compatibility** — Works well across most programming languages, frameworks, and integration scenarios.

### DDD Signals for Selecting This Pattern
Use the **Request/Response API Pattern** when the following signals appear in your Domain-Driven Design work:

- Stakeholders describe interactions in terms of direct actions (e.g., “submit order”, “update profile”, “check availability”).
- The business process requires **immediate confirmation** or result before the next step can proceed.
- Operations are typically short-running and expected to complete quickly.
- The domain language includes clear request-and-result phrases.
- Consumers (UIs, other services, or external systems) need synchronous replies.
- Consistency or validation feedback must be provided in real time.

### Relationship to Other Patterns
- Natural counterpart to **Command Interface Pattern** and **Query Interface Pattern**.
- Often used together with **CRUD Interface Pattern** in simpler applications.
- Contrasts with **Message-Based Interface Pattern** and **Event Notification Interface Pattern** (asynchronous styles).
- Frequently combined with **Synchronous Integration Pattern** and **External System Adapter Pattern**.

### Simple High-Level Example (Conceptual)
```text
Request/Response Interface:
  - SubmitOrder(OrderRequest) → OrderConfirmation
  - GetCustomerDetails(CustomerId) → CustomerProfile
  - ReserveInventory(ReservationRequest) → ReservationResult
```

The caller sends the request and receives the response in the same synchronous interaction.

### References
- [Synchronous Request-Reply Pattern — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/synchronous-request-reply)
- [Request-Reply Pattern — Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html)
- [Request/Response in Microservices — Microservices.io](https://microservices.io/patterns/integration/synchronous.html)
- [Synchronous vs Asynchronous Communication — Martin Fowler](https://martinfowler.com/articles/microservices.html)
- [API Design Patterns — Request/Response — InfoQ](https://www.infoq.com/articles/api-design-patterns/)
- [When to Use Request/Response — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/synchronous-communication/)