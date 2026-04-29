**The Resilience Pattern** is a high-level architectural pattern that designs a system to withstand and recover from failures, errors, and unexpected conditions while continuing to provide acceptable service.

### Core Idea
Resilience is achieved by applying defensive techniques that prevent failures from cascading, limit their impact, and enable graceful degradation or automatic recovery. The system assumes that failures will occur (hardware, network, dependent services, etc.) and is built to handle them proactively rather than reacting after the fact.

- Focuses on fault tolerance, fault isolation, and graceful degradation.
- Includes strategies such as retries, timeouts, circuit breakers, bulkheads, fallbacks, and rate limiting.
- Protects critical business operations from partial or transient failures.
- Emphasizes designing for failure rather than trying to prevent all failures.

### Why It Exists (High-Level Benefits)
- **Improved Availability** — The system continues operating even when parts fail.
- **Fault Isolation** — Prevents a single failure from bringing down the entire application.
- **Better User Experience** — Users see degraded but functional service instead of complete outages.
- **Reduced Operational Impact** — Fewer severe incidents and faster recovery.
- **Scalability Support** — Enables reliable operation in distributed and cloud-native environments.
- **Confidence** — Supports aggressive scaling and adoption of modern architectures.

### DDD Signals for Selecting This Pattern
Use the **Resilience Pattern** when the following signals appear in your Domain-Driven Design work:

- The bounded context depends on external services, third-party APIs, or other bounded contexts.
- Business operations must continue even if downstream systems are slow or unavailable.
- You have long-running processes or distributed workflows (Sagas, Orchestrations).
- Stakeholders require high reliability and fault tolerance.
- The system operates in unstable network conditions or cloud environments.
- You are implementing **Microservices**, **Event-Driven**, or **High Availability** architectures.

### Relationship to Other Patterns
- Foundational pattern that supports **High Availability Pattern** and **Self-Healing Pattern**.
- Works closely with **Observable Service Pattern** (to detect issues) and **Circuit Breaker** strategies.
- Complements **Saga Pattern**, **Workflow Orchestration**, and **External System Adapter**.
- Enhances **Event-Driven Integration** and **Database per Service** architectures.
- Pairs with **Zero-Trust Security Pattern** for resilient and secure systems.

### Simple High-Level Example (Conceptual)
```text
Resilience Strategies in Order Service:

• Retry + Exponential Backoff when calling Inventory Service
• Circuit Breaker → Stop calling Payment Service if it fails repeatedly
• Bulkhead → Separate thread pools for different downstream calls
• Timeout → Fail fast after 3 seconds instead of hanging
• Fallback → Use cached data or default behavior if service is down
• Graceful Degradation → Allow order placement with limited features
```

### References
- [Resiliency Patterns — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/category/resiliency)
- [Resilience Patterns — AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Circuit Breaker, Retry, Bulkhead — Martin Fowler](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Resilience in Microservices — Chris Richardson](https://microservices.io/patterns/resilience/)
- [Building Resilient Systems — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/resilience-patterns/)
- [Cloud Native Resilience Patterns — Netflix OSS & Hystrix Legacy](https://github.com/Netflix)