**The Process Manager Pattern** is a high-level architectural pattern that defines a centralized component responsible for coordinating and managing the state of a long-running business process across multiple steps and participants.

### Core Idea
The Process Manager (also known as a Process Orchestrator) maintains the current state of a business process and controls its progression. It decides what step should happen next, sends commands to participating services, waits for outcomes (usually via events), handles exceptions, timeouts, and compensations, and moves the process forward or backward as needed.

- It keeps explicit process state (e.g., “OrderProcessing”, “PaymentPending”, “Completed”).
- It knows the overall flow and rules of the business process.
- It uses commands to tell services what to do and events to learn what happened.
- Unlike a simple orchestrator, it often manages multiple concurrent process instances.

### Why It Exists (High-Level Benefits)
- **Clear Process Control** — The end-to-end business workflow is explicit and manageable.
- **State Management** — Persists process state reliably for long-running operations.
- **Error Handling & Recovery** — Centralized place for retries, timeouts, and compensation logic.
- **Visibility & Monitoring** — Provides a single source of truth for process status and history.
- **Maintainability** — Business process changes are localized in one component.

### DDD Signals for Selecting This Pattern
Use the **Process Manager Pattern** when the following signals appear in your Domain-Driven Design work:

- A business process is long-running and spans multiple bounded contexts or aggregates.
- The process has complex branching, conditional logic, or parallel activities.
- You need strong control and traceability over the entire workflow.
- Stakeholders describe the process as a defined sequence with specific rules and outcomes.
- The process requires persistence of intermediate state and recovery after failures.
- You need to support timeouts, deadlines, or human-in-the-loop steps.

### Relationship to Other Patterns
- A more stateful and sophisticated version of **Workflow Orchestration Pattern**.
- Often used to implement **Saga Pattern** (orchestrated style).
- Works with **Command Interface Pattern**, **Event Notification Interface Pattern**, and **Event-Driven Integration**.
- Complements **CQRS** (process manager on the write side) and **Read Model / Projection Pattern**.
- Alternative to **Event Choreography Pattern** when centralized control is preferred.

### Simple High-Level Example (Conceptual)
```text
OrderFulfillmentProcessManager:

Process Instance ID: ORD-98765
Current State: AwaitingPayment

On OrderCreatedEvent:
   → Send ReserveInventoryCommand
   → Transition to InventoryReserved

On PaymentSucceededEvent:
   → Send ShipOrderCommand
   → Transition to OrderShipped

On Timeout or Failure:
   → Execute Compensation Commands
   → Transition to Cancelled
```

The Process Manager persists its state and drives the entire workflow.

### References
- [Process Manager Pattern — Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html)
- [Process Manager vs Saga — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Orchestration and Process Manager in DDD — Vaughn Vernon](https://kalele.io/)
- [Implementing Process Managers — Jimmy Bogard](https://www.jimmybogard.com/)
- [Workflow Patterns — Camunda Documentation](https://camunda.com/)
- [Process Manager in Microservices — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/process-manager-pattern/)