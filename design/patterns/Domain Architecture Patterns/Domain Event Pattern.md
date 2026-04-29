**The Domain Event Pattern** is a high-level architectural pattern that models a meaningful business fact that has already happened inside a bounded context and uses that fact to coordinate reactions without hiding them inside direct procedural calls.

### Core Idea
A domain event represents something important in the language of the business, such as `OrderPlaced`, `ClaimApproved`, or `SubscriptionCancelled`. It is named in the past tense because it records a fact, not a command or request. Domain events are raised by the domain model after a valid state transition and allow other parts of the system to react without tightly coupling everything together.

- Domain events express business-significant facts, not low-level technical callbacks.
- They are immutable once raised.
- They often originate from **Aggregates** or domain services after business rules have been enforced.
- Internal domain events stay inside the bounded context; some may later become external integration events.

### Why It Exists (High-Level Benefits)
- **Explicit Business Signals** — Makes important domain changes visible in the model.
- **Reduced Coupling** — Lets additional reactions happen without hard-wiring every step into one service method.
- **Better Traceability** — Creates a clear record of which business facts triggered downstream behavior.
- **Extensibility** — New policies, handlers, and workflows can react to existing events with minimal disruption.
- **Cleaner Domain Logic** — Keeps side effects from being buried inside application orchestration code.

### DDD Signals for Selecting This Pattern
Use the **Domain Event Pattern** when the following signals appear in your Domain-Driven Design work:

- One business action should trigger several follow-up actions or policies.
- Important business facts need to be visible for audit, notification, or workflow reasons.
- Application services are becoming cluttered with side effects after aggregate changes.
- The ubiquitous language naturally includes statements like "when X happens, Y should follow."
- Cross-aggregate coordination is needed, but direct dependency chains are becoming fragile.
- You may later expose selected domain facts through event-driven integration.

### Relationship to Other Patterns
- Frequently produced by **Aggregate Pattern** and **Rich Domain Model Pattern** implementations.
- Often consumed by **Policy-Based Decisioning Pattern** to trigger follow-up decisions.
- Can feed **Event Notification Interface Pattern**, **Event-Driven Integration Pattern**, and **Saga Pattern** workflows.
- Distinct from **Event Sourcing Pattern**: event sourcing stores events as the system of record, while domain events can exist without event sourcing.
- Often published reliably with the **Outbox Pattern** when selected events must leave the bounded context.

### Simple High-Level Example (Conceptual)
```text
Order Aggregate
  - PlaceOrder() validates business rules
  - Aggregate state changes to Placed
  - Domain event raised: OrderPlaced

Handlers inside the bounded context react:
  - Reserve inventory
  - Start payment workflow
  - Rebuild order summary projection
```

### References
- [Domain Event - Martin Fowler](https://martinfowler.com/eaaDev/DomainEvent.html)
- [Use Tactical DDD to Design Microservices - Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/tactical-domain-driven-design)
- [Domain Events vs. Event Sourcing - Jimmy Bogard](https://www.jimmybogard.com/domain-events-vs-event-sourcing/)
- [Domain Events and Canonical Message Models - Vaughn Vernon](https://kalele.io/domain-events-and-canonical-message-models/)
- Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software*
