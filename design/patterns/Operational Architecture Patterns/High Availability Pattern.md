**The High Availability Pattern** is a high-level architectural pattern that designs a system to remain operational and accessible for a very high percentage of time (typically 99.9% or higher, known as “three nines” or more), minimizing planned and unplanned downtime.

### Core Idea
The system is built with redundancy, fault tolerance, and automated recovery mechanisms so that the failure of any single component does not bring the entire service down. It continuously monitors health and automatically redirects traffic away from failing parts.

- Eliminates single points of failure through redundancy (multiple instances, data replicas, etc.).
- Implements automated failover and recovery.
- Uses load balancing and traffic routing to healthy nodes.
- Includes health checks, circuit breakers, and graceful degradation.
- Supports zero-downtime deployments and rolling updates.

### Why It Exists (High-Level Benefits)
- **Business Continuity** — Keeps critical operations running with minimal interruption.
- **User Trust** — Provides consistent availability expected by modern users and SLAs.
- **Fault Tolerance** — Reduces the blast radius of failures.
- **Scalability Support** — Makes horizontal scaling more effective and reliable.
- **Regulatory Compliance** — Helps meet uptime requirements in finance, healthcare, e-commerce, etc.
- **Resilience** — Enables the system to survive infrastructure, network, or regional failures.

### DDD Signals for Selecting This Pattern
Use the **High Availability Pattern** when the following signals appear in your Domain-Driven Design work:

- The bounded context is mission-critical or revenue-generating (e.g., ordering, payments, booking).
- Stakeholders specify strict uptime SLAs (99.9%, 99.99%, etc.).
- The domain involves real-time or time-sensitive operations.
- The system must survive infrastructure outages or cloud region failures.
- You are designing for global or 24/7 usage.
- Business processes cannot tolerate significant downtime.

### Relationship to Other Patterns
- Complements **Resilience Pattern**, **Self-Healing Pattern**, and **Observable Service Pattern**.
- Works with **Microservices Architecture**, **Database per Service**, and **Event-Driven Integration**.
- Often combined with **CQRS** and **Event Sourcing** for highly available read models.
- Enhances **Workflow Orchestration** and **Saga Pattern** by ensuring process continuity.
- Pairs with **Zero-Trust Security Pattern** for secure, always-available systems.

### Simple High-Level Example (Conceptual)
```text
High Availability Setup for Order Service:

• Multiple instances across 3 availability zones
• Load Balancer routes traffic only to healthy instances
• Database with multi-region replication + automatic failover
• Health checks every 10 seconds
• Circuit Breaker + Retry policies on downstream calls
• Zero-downtime deployment using blue-green strategy

Result: If one instance or zone fails → traffic is instantly redirected.
```

### References
- [High Availability Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/high-availability)
- [Designing for High Availability — AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [High Availability Strategies — Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/)
- [Achieving High Availability in Microservices — Chris Richardson](https://microservices.io/patterns/availability/)
- [High Availability and Disaster Recovery — Google Cloud](https://cloud.google.com/architecture/high-availability)
- [Building Highly Available Systems — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/high-availability-patterns/)