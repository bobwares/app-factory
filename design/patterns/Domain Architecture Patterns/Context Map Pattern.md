**The Context Map Pattern** is a high-level architectural pattern that documents the bounded contexts in a system and makes their relationships, dependencies, and integration boundaries explicit.

### Core Idea
A context map is the strategic picture of how multiple bounded contexts fit together. It does not describe one internal domain model in detail; it shows where models begin and end, who owns them, and how information moves between them.

- The map identifies each bounded context and the boundary around it.
- It captures upstream and downstream relationships, integration points, and translation responsibilities.
- It helps teams reason about contracts, ownership, autonomy, and coupling before implementation details take over.
- The map is a living design artifact, not a one-time diagram.

### Why It Exists (High-Level Benefits)
- **System Clarity** — Makes the large-scale domain landscape understandable.
- **Explicit Coupling** — Reveals where dependencies exist and whether they are healthy or accidental.
- **Better Integration Decisions** — Helps teams choose between direct APIs, events, adapters, or translation layers.
- **Organizational Alignment** — Clarifies team boundaries and who negotiates which contracts.
- **Migration Support** — Useful when carving bounded contexts out of a monolith or modernizing legacy systems.

### DDD Signals for Selecting This Pattern
Use the **Context Map Pattern** when the following signals appear in your Domain-Driven Design work:

- Multiple bounded contexts already exist or are emerging, but their relationships are unclear.
- Teams repeatedly argue about ownership of shared concepts or integration contracts.
- The system includes legacy modules, vendor systems, or external platforms that affect the domain.
- Model translation is happening implicitly in code, meetings, or spreadsheets instead of being designed deliberately.
- You are planning a monolith decomposition, platform integration, or domain-driven reorganization.
- Downstream teams need protection from upstream model churn.

### Relationship to Other Patterns
- Built directly on the **Bounded Context Pattern** and used to show how contexts interact.
- Frequently leads to **Anti-Corruption Layer Pattern** when one context must translate another context's model.
- Helps decide whether integration should use **Synchronous Integration Pattern** or **Event-Driven Integration Pattern**.
- Often influences the use of **External System Adapter Pattern** for third-party or legacy dependencies.
- Useful during **Strangler Fig Pattern** migrations to show old and new context boundaries side by side.

### Simple High-Level Example (Conceptual)
```text
Context Map

Catalog Context ---> Ordering Context ---> Fulfillment Context
        |                  |                       |
        |                  |                       +--> Shipping Provider (external adapter)
        |                  |
        |                  +--> Payments Context
        |
        +--> Search Context

Relationships:
- Ordering consumes catalog product snapshots
- Ordering publishes order events
- Fulfillment uses an anti-corruption layer for the shipping provider
```

### References
- [Bounded Context - Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)
- [Use Domain Analysis to Model Microservices - Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)
- [Identifying Domain-Model Boundaries for Each Microservice - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/identify-microservice-domain-model-boundaries)
- [Strategic Domain Driven Design with Context Mapping - InfoQ](https://www.infoq.com/articles/ddd-contextmapping/)
- Vaughn Vernon, *Implementing Domain-Driven Design*
