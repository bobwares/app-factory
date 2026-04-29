**The Anemic Domain Model (Anti-Pattern)** is a common architectural mistake where domain objects contain only data (properties/getters/setters) with little or no business logic, while all behavior and rules are placed in external services or procedures.

### Core Idea
Domain entities and value objects become simple data containers (“bags of getters and setters”). Complex business logic, validation, and rules are moved outside the model into application services, domain services, or procedural code. This results in a domain model that is technically present but lacks real behavior.

- Objects primarily hold state with minimal methods.
- Business rules are scattered across services and application layers.
- The model is passive and does not enforce its own invariants.
- Logic is often implemented using “tell me your data so I can decide” instead of rich object behavior.

### Why It Exists (High-Level Drawbacks)
Although it feels simple and familiar, the Anemic Domain Model creates significant long-term problems:
- **Loss of Encapsulation** — Business rules become scattered and duplicated.
- **Procedural Code** — Leads to “transaction script” style programming inside services.
- **Poor Maintainability** — Changes in business logic require hunting through multiple service classes.
- **Weak Ubiquitous Language** — The domain model no longer expresses real business concepts.
- **Increased Complexity** — As the system grows, coordination between anemic objects and services becomes harder.

### DDD Signals Indicating This Anti-Pattern
Watch for these warning signs in your Domain-Driven Design efforts:

- Domain objects are mostly data structures with many getters/setters and almost no methods.
- Most business logic lives in application services or “manager”/“helper” classes.
- Developers frequently say “the entity is just data” or “logic belongs in the service”.
- Aggregates do not protect their own invariants — validation happens outside.
- Rich Ubiquitous Language exists in discussions but disappears in the code.
- You see many private methods in services operating on multiple domain objects.

### Relationship to Other Patterns
- Direct opposite of **Rich Domain Model Pattern**.
- Often appears together with **CRUD Interface Pattern**, **CRUD Data Model Pattern**, and **Layered Architecture**.
- Works poorly with **Domain-Centric Architecture**, **Ports & Adapters**, and **Aggregate Pattern**.
- Frequently evolves into **Service Layer** bloat and makes **CQRS** or **Event Sourcing** harder to implement cleanly.

### Simple High-Level Example (Conceptual)
```text
Anemic Domain Object (Anti-Pattern):
class Order {
    public List<OrderLine> Lines { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; }
    // No behavior — just data
}

OrderService {                  // Logic lives here
    public void PlaceOrder(Order order) { ... }
    public void AddItem(Order order, Product p, int qty) { ... }
    public void ApplyDiscount(Order order, Discount d) { ... }
}
```

Business logic is outside the `Order` object.

### References
- [Anemic Domain Model — Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html) — The original and most authoritative article.
- [Rich vs Anemic Domain Models — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/rich-vs-anemic-domain-models/)
- [Why Anemic Domain Model is an Anti-Pattern — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-model-layer)
- [The Anemic Domain Model Anti-Pattern — Vladimir Khorikov](https://enterprisecraftsmanship.com/posts/anemic-domain-model/)
- [Anemic Domain Model Considered Harmful — Jimmy Bogard](https://www.jimmybogard.com/anemic-domain-model-considered-harmful/)
- [DDD and Anemic Domain Model — Vaughn Vernon](https://kalele.io/ddd-and-anemic-domain-model/)