**The Layered Architecture Pattern** is a high-level architectural pattern that organizes an application into distinct horizontal layers, each with specific responsibilities, where each layer depends only on the layer directly below it.

### Core Idea
The system is divided into logical layers (typically Presentation, Application, Domain/Business, and Infrastructure/Persistence). Higher layers call lower layers, but lower layers never depend on higher ones. This separation groups related concerns and controls the direction of dependencies.

- **Presentation Layer** — Handles user interface and external interactions.
- **Application Layer** — Orchestrates use cases and coordinates domain objects.
- **Domain Layer** — Contains business logic and domain model.
- **Infrastructure Layer** — Deals with persistence, external services, and technical concerns.
- Layers enforce separation of concerns and create a unidirectional dependency flow.

### Why It Exists (High-Level Benefits)
- **Separation of Concerns** — Each layer has a single, clear responsibility.
- **Modularity** — Layers can be developed, tested, and maintained relatively independently.
- **Familiarity** — Well-understood and widely used pattern across many technologies.
- **Ease of Development** — Clear structure helps onboard new developers quickly.
- **Technology Isolation** — Infrastructure changes (e.g., switching databases) are mostly contained in the bottom layer.

### DDD Signals for Selecting This Pattern
Use the **Layered Architecture Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain is of moderate complexity and does not require extreme decoupling from infrastructure.
- The team prefers a traditional, straightforward structure that is easy to explain.
- You need clear physical or logical separation between UI, business logic, and data access.
- Most operations follow a straightforward request → business logic → data flow.
- You are building a monolithic or modular monolith application.
- Strong layering enforcement helps control complexity in larger teams.

### Relationship to Other Patterns
- Serves as a foundational pattern that can evolve into **Domain-Centric Architecture** and **Ports & Adapters**.
- Often used with **Service Layer Pattern**, **CRUD Interface Pattern**, and **Anemic Domain Model**.
- Contrasts with **Ports & Adapters Pattern** (stronger decoupling and inversion of dependencies).
- Can coexist with **CQRS** and **Event-Driven** styles but may require additional layers.

### Simple High-Level Example (Conceptual)
```text
Presentation Layer (UI / API Controllers)
        ↓
Application Layer (Use Cases / Application Services)
        ↓
Domain Layer (Entities, Aggregates, Domain Services)
        ↓
Infrastructure Layer (Repositories, Database, External APIs)
```

Dependencies flow strictly downward.

### References
- [Layered Architecture — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/layered-architecture)
- [Layered Architecture Pattern — Martin Fowler](https://martinfowler.com/bliki/LayeredArchitecture.html)
- [The Layered Architecture — Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/architecture/LayeredArchitecture.html)
- [N-Tier / Layered Architecture Explained — Baeldung](https://www.baeldung.com/n-tier-architecture)
- [Clean Architecture vs Layered Architecture — Milan Jovanović](https://www.milanjovanovic.tech/blog/clean-architecture-vs-layered-architecture)
- [Patterns of Enterprise Application Architecture — Layered Architecture — Martin Fowler](https://martinfowler.com/eaaCatalog/layeredArchitecture.html)