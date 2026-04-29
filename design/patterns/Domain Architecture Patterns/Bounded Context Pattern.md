**The Bounded Context Pattern** is a high-level architectural pattern that defines an explicit semantic and structural boundary within which a particular domain model and ubiquitous language are valid.

### Core Idea
Large systems rarely support one perfectly unified model across every business capability, team, and workflow. The Bounded Context Pattern accepts that different parts of the business will model similar concepts differently and makes those boundaries explicit instead of hiding them.

- A bounded context contains a coherent domain model, language, rules, and behavior that are internally consistent.
- Terms such as `Customer`, `Order`, or `Product` may exist in multiple contexts but carry different meanings.
- The boundary is not only conceptual; it usually influences code structure, ownership, APIs, data storage, and deployment boundaries.
- Integration across contexts is explicit and usually requires translation rather than direct model sharing.

### Why It Exists (High-Level Benefits)
- **Conceptual Integrity** — Keeps one model consistent inside one boundary instead of forcing false global uniformity.
- **Clear Ownership** — Makes it obvious which team and codebase own a business capability.
- **Reduced Coupling** — Prevents unrelated parts of the system from depending on each other's internal model decisions.
- **Safer Evolution** — Lets one part of the system change language, rules, and data shape without destabilizing everything else.
- **Better Alignment** — Encourages software structure to follow real business capabilities and organizational boundaries.

### DDD Signals for Selecting This Pattern
Use the **Bounded Context Pattern** when the following signals appear in your Domain-Driven Design work:

- The same business term means different things in different parts of the organization.
- One large shared model is becoming inconsistent, bloated, or politically difficult to maintain.
- Different teams need to move at different speeds or make different trade-offs.
- Distinct business capabilities have different workflows, invariants, or reporting needs.
- Integrations require translation because one model does not cleanly fit another.
- You are decomposing a monolith, defining module boundaries, or identifying microservice candidates.

### Relationship to Other Patterns
- Foundation for the **Context Map Pattern**, which documents how bounded contexts relate to one another.
- Often realized with **Domain-Centric Architecture Pattern**, **Ports and Adapters Pattern**, and **Aggregate Pattern** inside each context.
- Commonly aligned with **Database per Service Pattern** and **Microservices Architecture Pattern** when contexts become independently deployed services.
- Also useful inside a **Modular Monolith Pattern**, where contexts become explicit modules rather than separate services.
- Often protected at the edges with **Anti-Corruption Layer Pattern** when models cannot be shared directly.

### Simple High-Level Example (Conceptual)
```text
Commerce Platform

- Catalog Context
  Product = merchandising information, descriptions, categories

- Pricing Context
  Product = priceable item, discounts, tax rules, price lists

- Ordering Context
  Product = purchasable line item in an order

The term "Product" exists in all three contexts, but each model has its own rules,
attributes, and workflows.
```

### References
- [Bounded Context - Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)
- [Use Domain Analysis to Model Microservices - Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)
- [Identifying Domain-Model Boundaries for Each Microservice - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/identify-microservice-domain-model-boundaries)
- Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software*
- Vlad Khononov, *Learning Domain-Driven Design*
