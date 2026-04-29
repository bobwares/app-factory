**The Strangler Fig Pattern** is a high-level architectural pattern for incrementally migrating or modernizing a legacy system by gradually replacing its components with new implementations while keeping the system fully operational.

### Core Idea
The new system is built alongside the old one, slowly “strangling” it over time. New features and replaced parts are routed to the new system, while legacy parts continue to run until they are eventually fully replaced. The name comes from the strangler fig tree, which grows around and eventually replaces its host tree.

- New functionality is implemented in the modern system.
- A facade or router directs requests to either the new or old system.
- Over time, more and more functionality moves to the new system.
- The legacy system is gradually decommissioned once everything is migrated.

### Why It Exists (High-Level Benefits)
- **Low Risk** — The system remains operational throughout the migration.
- **Incremental Progress** — Delivers value continuously rather than in a big-bang rewrite.
- **Safe Modernization** — Allows experimentation and learning during migration.
- **Parallel Operation** — Old and new systems can coexist and be compared.
- **Controlled Cutover** — Easy to roll back or switch traffic gradually.

### DDD Signals for Selecting This Pattern
Use the **Strangler Fig Pattern** when the following signals appear in your Domain-Driven Design work:

- You are modernizing a large, complex legacy system using DDD and modern architecture.
- A complete rewrite in one go is too risky or impractical.
- Different bounded contexts can be migrated independently.
- You want to introduce **Domain-Centric Architecture**, **CQRS**, or **Microservices** gradually.
- Business wants new capabilities while the old system still runs.
- Legacy code is difficult to maintain but critical to operations.

### Relationship to Other Patterns
- Often used with **Anti-Corruption Layer Pattern** to protect new domain models.
- Works well with **Ports & Adapters** and **Domain-Centric Architecture** in the new system.
- Complements **Event-Driven Integration** and **Database per Service** during transition.
- Frequently combined with **Facade** or routing layers for traffic management.
- Helps transition from **Layered Architecture** or **CRUD** toward richer patterns.

### Simple High-Level Example (Conceptual)
```text
Legacy Monolith
   ├── Feature A (Old)
   ├── Feature B (Old)
   └── Feature C (Old)

Strangler Fig (New System)
   ├── Feature A (New) ← Router sends traffic here
   ├── Feature B (Old) ← Still using legacy
   └── Feature C (New) ← Recently migrated

Router / Facade decides where each request goes.
Over time: Old features shrink → New features grow.
```

Eventually the legacy system is fully strangled and can be retired.

### References
- [Strangler Fig Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [Strangler Fig Application — Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Modernization Using the Strangler Fig Pattern — AWS](https://aws.amazon.com/blogs/architecture/modernizing-applications-with-the-strangler-fig-pattern/)
- [Strangler Pattern in Microservices Migration — Microservices.io](https://microservices.io/patterns/refactoring/strangler-application.html)
- [Practical Guide to Strangler Fig — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/strangler-fig-pattern/)
- [Legacy Modernization with Strangler Fig — InfoQ](https://www.infoq.com/articles/strangler-fig-pattern/)