**The Domain-Centric Architecture Pattern** is a high-level architectural pattern that places the domain model and business logic at the center of the system, with all other layers depending on it rather than the reverse.

### Core Idea
The domain (entities, aggregates, value objects, and business rules) is the most important and stable part of the application. Outer layers such as presentation, application services, and infrastructure adapt to the domain — never the other way around. Dependencies always point inward toward the domain.

- The domain has no knowledge of databases, UI, or external frameworks.
- Infrastructure and adapters are pushed to the edges.
- The architecture emphasizes business intent over technical concerns.
- Common implementations include Onion Architecture and Clean Architecture.

### Why It Exists (High-Level Benefits)
- **Business Focus** — Keeps the most valuable part (domain logic) protected and stable.
- **Testability** — Domain can be unit-tested without databases, mocks, or frameworks.
- **Flexibility** — Easy to change infrastructure, UI, or external services without affecting core logic.
- **Long-term Maintainability** — Reduces technical debt and coupling to specific technologies.
- **Clear Separation** — Makes business rules explicit and understandable by domain experts.

### DDD Signals for Selecting This Pattern
Use the **Domain-Centric Architecture Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain is complex with rich behavior, invariants, and policies.
- You have a strong **Ubiquitous Language** that should drive the codebase structure.
- The team wants the code to reflect business concepts rather than technical layers.
- You anticipate frequent changes in infrastructure, UI, or integrations.
- Multiple applications or bounded contexts need to share the same domain logic.
- Stakeholders and developers collaborate closely on the model.

### Relationship to Other Patterns
- Foundation for **Ports & Adapters Pattern (Hexagonal Architecture)** and **Clean Architecture**.
- Works best with **Rich Domain Model**, **Aggregate Pattern**, and **Service Layer Pattern**.
- Contrasts with **Layered Architecture Pattern** (where dependencies often point outward).
- Enables **CQRS**, **Event Sourcing**, and **Anti-Corruption Layer** effectively.

### Simple High-Level Example (Conceptual)
```text
Core (Innermost)
  └─ Domain Layer
       ├── Aggregates (Order, Customer)
       ├── Domain Services
       ├── Value Objects & Events

Application Layer (depends on Domain)
  └── Use Cases / Application Services

Adapters (depend inward)
  ├── Infrastructure (DB, External APIs)
  ├── Presentation / API
  └── Persistence Adapters
```

All arrows point toward the Domain.

### References
- [Onion Architecture — Jeffrey Palermo](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Clean Architecture — Robert C. Martin (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Centric Architecture — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#domain-centric-architecture)
- [Hexagonal Architecture — Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [The Clean Architecture — 8th Light](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Centric vs Data-Centric Architectures — InfoQ](https://www.infoq.com/articles/domain-centric-architecture/)