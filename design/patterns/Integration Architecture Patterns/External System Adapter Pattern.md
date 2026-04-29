**The External System Adapter Pattern** is a high-level architectural pattern that wraps communication with external systems, services, or legacy applications behind a clean, domain-friendly interface so the core domain remains isolated from external technical details and complexities.

### Core Idea
The adapter acts as a translator between the internal domain model and the external system’s protocol, data format, or API. It converts domain requests into the format expected by the external system and translates responses back into domain objects or events.

- The core domain only interacts through a well-defined **port** (interface).
- All external-specific logic (authentication, formatting, error handling, retries) stays inside the adapter.
- External changes affect only the adapter, not the domain logic.
- Can be implemented as inbound (calling external) or outbound (being called by external) adapters.

### Why It Exists (High-Level Benefits)
- **Isolation** — Protects the domain from external system volatility and technology details.
- **Maintainability** — External system changes require updates only in the adapter.
- **Testability** — Easy to mock the adapter during domain testing.
- **Reusability** — The same external system can be integrated with multiple bounded contexts cleanly.
- **Flexibility** — Allows swapping or evolving external systems with minimal impact.

### DDD Signals for Selecting This Pattern
Use the **External System Adapter Pattern** when the following signals appear in your Domain-Driven Design work:

- You need to integrate with legacy systems, third-party APIs, or external services.
- The external system’s data model or protocol differs significantly from your Ubiquitous Language.
- External systems are unstable, slow, or have inconsistent interfaces.
- You want to keep your domain model clean and free from foreign concepts.
- Translation or mapping logic between systems is becoming complex.
- Multiple bounded contexts need to interact with the same external system.

### Relationship to Other Patterns
- Direct implementation of **Ports & Adapters Pattern (Hexagonal Architecture)**.
- Often combined with **Anti-Corruption Layer Pattern** for complex legacy integrations.
- Works with **Domain-Centric Architecture** and **Service Layer Pattern**.
- Frequently used alongside **Synchronous Integration Pattern** or **Event-Driven Integration Pattern**.
- Complements **Outbox Pattern** when publishing events to external systems.

### Simple High-Level Example (Conceptual)
```text
Domain Port: IPaymentGateway

External System Adapter: StripePaymentAdapter implements IPaymentGateway
  - Converts domain PaymentRequest → Stripe API format
  - Handles Stripe-specific errors and retry logic
  - Translates Stripe response → domain PaymentResult

Domain code calls: paymentGateway.ProcessPayment(request)
   (never knows it's talking to Stripe)
```

### References
- [Anti-Corruption Layer & Adapters — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)
- [Ports and Adapters for External Systems — Baeldung](https://www.baeldung.com/hexagonal-architecture-ddd)
- [External System Integration Patterns — Microservices.io](https://microservices.io/patterns/integration/)
- [Integrating with External Systems in DDD — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/integrating-with-external-systems-ddd/)
- [Hexagonal Architecture: Adapters for External Systems — Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Adapter Pattern in Domain-Driven Design — Vaughn Vernon](https://kalele.io/ports-and-adapters-architecture/)