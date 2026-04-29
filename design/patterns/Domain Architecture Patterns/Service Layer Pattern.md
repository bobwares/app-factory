**The Service Layer Pattern** is a high-level architectural pattern that defines a thin layer of services sitting above the domain model to coordinate use cases, manage transactions, and provide a clear API for clients while keeping domain logic inside domain objects.

### Core Idea
The Service Layer acts as an orchestrator: it receives requests from the presentation or interface layer, coordinates the necessary domain objects and repositories, manages cross-cutting concerns (such as transactions, security, and logging), and returns results. It does not contain business rules — those stay in the Rich Domain Model.

- Services typically correspond to **use cases** or application-level operations.
- They encapsulate workflow and coordination logic.
- They control transactions and ensure consistency across multiple domain objects.
- The layer provides a clear, coarse-grained interface to the outside world.

### Why It Exists (High-Level Benefits)
- **Clear Use Case Boundaries** — Each service method represents a complete business operation.
- **Transaction Management** — Central place to handle ACID transactions.
- **Separation of Concerns** — Keeps domain objects focused on business rules and state.
- **Reusability** — The same service can be called by different clients (Web API, CLI, messaging, etc.).
- **Maintainability** — Coordination logic is centralized and easier to follow than logic scattered in controllers or UI.

### DDD Signals for Selecting This Pattern
Use the **Service Layer Pattern** when the following signals appear in your Domain-Driven Design work:

- A single business operation involves multiple aggregates or domain objects that must be coordinated.
- You need a clear entry point for application use cases.
- Transaction boundaries span more than one domain object.
- You want to keep domain entities focused purely on business behavior without workflow concerns.
- Multiple external interfaces (API, Batch, Event handlers) need to trigger the same business logic.
- The team needs a well-defined place to apply cross-cutting concerns like authorization or auditing.

### Relationship to Other Patterns
- Works best with **Domain-Centric Architecture**, **Rich Domain Model**, and **Ports & Adapters**.
- Often used on top of **Aggregate Pattern** for orchestration.
- Complements **Command Interface Pattern** and **Query Interface Pattern**.
- Can become bloated when combined with **Anemic Domain Model** (turning services into god classes).
- Frequently paired with **CQRS** (separate command and query services).

### Simple High-Level Example (Conceptual)
```text
Service Layer:

class OrderService {
    PlaceOrder(PlaceOrderCommand cmd) {
        // Transaction scope
        Customer customer = customerRepository.Get(cmd.CustomerId);
        Order order = customer.CreateOrder(cmd.Items);
        order.ApplyDiscounts(...);
        
        orderRepository.Save(order);
        domainEventPublisher.Publish(order.Events);
        
        return order;
    }
}
```

The service orchestrates but does not own the business rules.

### References
- [Service Layer — Martin Fowler](https://martinfowler.com/eaaCatalog/serviceLayer.html) — The original pattern definition.
- [Service Layer Pattern — Microsoft Architecture Guide](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-model-layer#the-application-layer)
- [Implementing the Service Layer in DDD — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/service-layer-in-ddd/)
- [Application Services in Domain-Driven Design — Vaughn Vernon](https://kalele.io/application-services-in-domain-driven-design/)
- [Service Layer vs Application Services — Milan Jovanović](https://www.milanjovanovic.tech/blog/application-services-in-domain-driven-design)
- [When to Use Service Layer in Clean/Hexagonal Architecture — Baeldung](https://www.baeldung.com/service-layer-pattern)