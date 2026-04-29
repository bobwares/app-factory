**The Command Interface Pattern** is a high-level architectural pattern that defines a dedicated interface for expressing intent to change the state of a system through explicit commands.

### Core Idea
Commands represent a request to perform an action that modifies the system's state. They encapsulate the intention (“what the user wants to do”) rather than exposing internal operations.

- Commands are **write-oriented** and expected to produce side effects.
- They typically follow a “do something” naming convention (e.g., `PlaceOrder`, `ActivateAccount`, `CancelReservation`).
- A command is usually processed once and should be idempotent when possible.
- The interface clearly declares available commands and their required input data.

### Why It Exists (High-Level Benefits)
- **Clear Intent** — Makes business actions explicit and understandable by both developers and domain experts.
- **Separation of Concerns** — Isolates write logic from read logic.
- **Auditability & Traceability** — Commands form a natural log of user or system intentions.
- **Testability** — Command handlers can be tested independently.
- **Scalability** — Command processing can be queued, distributed, or scaled separately from queries.

### DDD Signals for Selecting This Pattern
Use the **Command Interface Pattern** when the following signals appear in your Domain-Driven Design work:

- Ubiquitous language contains many action-oriented verbs (“place order”, “approve claim”, “assign task”, “cancel reservation”).
- Business processes involve **state-changing operations** with clear intent.
- Stakeholders discuss “what should happen” rather than “what should I see”.
- You need to enforce **business rules and invariants** before allowing state changes.
- Multiple actors or systems need to trigger the same business action.
- You want to keep a clean record of user intentions (audit trail or event sourcing).

### Relationship to Other Patterns
- Natural counterpart to the **Query Interface Pattern** (reads).
- Often used together with **CQRS Pattern**, **Rich Domain Model**, and **Aggregate Pattern**.
- Works well with **Request/Response API Pattern** (when immediate feedback is needed) or **Message-Based Interface Pattern** (when asynchronous).
- Frequently paired with **Saga Pattern** or **Event Sourcing** for complex state changes.

### Simple High-Level Example (Conceptual)
```text
Command Interface:
  - PlaceOrder(PlaceOrderCommand) → CommandResult
  - ActivateCustomer(ActivateCustomerCommand) → CommandResult
  - CancelReservation(CancelReservationCommand) → CommandResult
```

Each command explicitly expresses the desired business action and carries the necessary data to perform it.

### References
- [Command Pattern — Refactoring.Guru](https://refactoring.guru/design-patterns/command)
- [Commands in CQRS — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Command Query Separation — Martin Fowler](https://martinfowler.com/bliki/CommandQuerySeparation.html)
- [Application Services and Commands in DDD — Vaughn Vernon](https://kalele.io/)
- [Implementing Commands in Domain-Driven Design — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/commands-in-ddd/)
- [CQRS Commands — Jimmy Bogard](https://www.jimmybogard.com/)