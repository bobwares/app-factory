**The Modular Monolith Pattern** is a high-level architectural pattern that structures a single deployable application as a set of loosely coupled, independently developed and maintainable modules while keeping the system as one cohesive runtime unit.

### Core Idea
The application is still a single monolithic deployment, but it is internally organized into well-defined modules (usually aligned with bounded contexts or major business capabilities). Each module has its own domain model, interfaces, and sometimes its own database schema, with clear boundaries and explicit contracts between modules.

- Modules communicate through published interfaces or events rather than direct database sharing.
- Strong physical and logical boundaries are enforced between modules.
- The system is deployed and scaled as one unit, but developed and evolved as multiple modules.
- Supports independent team ownership of modules.

### Why It Exists (High-Level Benefits)
- **Maintainability** — Large codebases remain organized and easier to work with.
- **Team Autonomy** — Different teams can work on different modules with minimal coordination.
- **Evolutionary Path** — Natural stepping stone toward microservices if needed later.
- **Simpler Operations** — Retains the deployment and runtime simplicity of a monolith.
- **Strong Consistency** — Easier to manage transactions and data consistency than in distributed systems.
- **Reduced Distributed Complexity** — Avoids the overhead of network calls and eventual consistency during early growth.

### DDD Signals for Selecting This Pattern
Use the **Modular Monolith Pattern** when the following signals appear in your Domain-Driven Design work:

- You have multiple clear bounded contexts within a single application.
- Multiple teams need to work on the same codebase without stepping on each other.
- The domain has grown too large for a traditional monolith but is not yet ready for full microservices.
- You want strong DDD practices (Aggregates, Ubiquitous Language per module) without distributed system costs.
- Business requires high consistency across certain parts of the system.
- You want to avoid the operational complexity of microservices while still gaining modularity.

### Relationship to Other Patterns
- Evolution of the classic **Monolithic Architecture Pattern**.
- Works excellently with **Domain-Centric Architecture**, **Ports & Adapters**, and **Rich Domain Model** per module.
- Often combined with **CQRS**, **Event-Driven Integration** (within the monolith), and **Service Layer Pattern**.
- Serves as a strong foundation before applying the **Strangler Fig Pattern** for migration to microservices.
- Complements **Database per Service** (or schema-per-module) and **Aggregate Pattern**.

### Simple High-Level Example (Conceptual)
```text
Modular Monolith Application

├── Order Module (Bounded Context)
│     ├── Domain (Aggregates, Events)
│     ├── Application Services
│     └── Interfaces (published contracts)

├── Customer Module (Bounded Context)
│     ├── Domain
│     └── Application Services

├── Inventory Module
│     └── ...

Shared Kernel + Integration Events between modules
Single Deployment + Single Process
```

Modules are loosely coupled but run together.

### References
- [Modular Monolith Architecture — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/modular-monolith)
- [Modular Monolith — Simon Brown (C4 Model)](https://simonbrown.je/)
- [Monolith to Modular Monolith — Martin Fowler](https://martinfowler.com/articles/modular-monoliths.html)
- [Building Modular Monoliths — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/modular-monolith/)
- [The Modular Monolith — Chris Richardson](https://microservices.io/patterns/monolithic.html#modularmonolith)
- [Modular Monoliths — Jimmy Bogard & Domain-Driven Design](https://www.jimmybogard.com/)