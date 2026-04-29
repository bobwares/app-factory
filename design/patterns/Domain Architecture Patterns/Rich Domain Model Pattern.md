**The Rich Domain Model Pattern** is a high-level architectural pattern that encapsulates both data and behavior within domain objects, allowing them to enforce business rules, invariants, and logic directly inside the model.

### Core Idea
Domain entities, aggregates, and value objects are designed as rich, intelligent objects that contain not only state but also the business logic and rules that govern that state. Behavior is colocated with the data it operates on, following the object-oriented principle of “tell, don’t ask.”

- Entities and aggregates expose methods that express business intent (e.g., `order.Place()`, `customer.ApplyDiscount()`).
- Business rules and invariants are enforced inside the domain objects.
- Domain objects are self-validating and protect their own consistency.
- The model reflects the Ubiquitous Language directly in code.

### Why It Exists (High-Level Benefits)
- **Encapsulation** — Business rules stay close to the data they govern, reducing scattered logic.
- **Maintainability** — Changes in business rules are localized within domain objects.
- **Expressiveness** — Code becomes more readable and aligned with how the business thinks.
- **Consistency** — Invariants are protected at the source, preventing invalid states.
- **Testability** — Core business logic can be tested independently of infrastructure.

### DDD Signals for Selecting This Pattern
Use the **Rich Domain Model Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain contains complex business rules, policies, and invariants.
- Stakeholders use a rich Ubiquitous Language full of verbs and actions.
- You frequently encounter scenarios where data and behavior belong together.
- Simple CRUD operations are insufficient — significant logic is required when state changes.
- Multiple operations must maintain consistency within an aggregate.
- The team wants the domain model to act as the single source of truth for business logic.

### Relationship to Other Patterns
- Direct opposite of **Anemic Domain Model (Anti-Pattern)**.
- Works best with **Domain-Centric Architecture**, **Aggregate Pattern**, and **Ports & Adapters**.
- Often combined with **CQRS** (rich model on the write side) and **Event Sourcing**.
- Complements **Service Layer Pattern** for coordinating multiple domain objects.

### Simple High-Level Example (Conceptual)
```text
Rich Domain Object:
class Order {
    private List<OrderLine> lines;
    private Money total;
    private OrderStatus status;

    public void Place() { ... }           // enforces invariants
    public void AddItem(Product, Quantity) { ... }
    public void ApplyDiscount(Discount) { ... }
    public void Cancel() { ... }
}
```

Business logic lives inside the `Order` aggregate, not in external services.

### References
- [Anemic Domain Model — Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html) — The seminal article contrasting it with Rich Domain Model.
- [Rich Domain Model — Microsoft Architecture Guide](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-model-layer)
- [Implementing a Rich Domain Model — Vaughn Vernon](https://kalele.io/implementing-a-rich-domain-model/)
- [Rich vs Anemic Domain Models — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/rich-vs-anemic-domain-models/)
- [Domain-Driven Design: Tackling Complexity in the Heart of Software — Eric Evans](https://www.domainlanguage.com/ddd/) — Foundational book reference.
- [Why You Should Prefer Rich Domain Models — Dev.to](https://dev.to/gonzao/rich-domain-model-2k2h) — Practical advantages and implementation tips.