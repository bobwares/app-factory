# Command Query Responsibility Segregation (CQRS) Architectural Pattern

## 1. Pattern Overview

### 1.1 Pattern Name

**Command Query Responsibility Segregation (CQRS)**

### 1.2 Pattern Category

**Architectural Application Pattern (AAP)**

### 1.3 Pattern Type

**Application architecture pattern**

### 1.4 Primary Intent

**Command Query Responsibility Segregation (CQRS)** separates operations that change system state from operations that read system state.

The pattern divides application behavior into two distinct models:

| Model             | Responsibility                   | Primary Operation                                           |
| ----------------- | -------------------------------- | ----------------------------------------------------------- |
| **Command Model** | Handles writes and state changes | `create`, `update`, `delete`, `approve`, `submit`, `cancel` |
| **Query Model**   | Handles reads and projections    | `get`, `list`, `search`, `report`, `summarize`              |

CQRS is used when the write side and read side of a system have materially different requirements for validation, consistency, performance, scalability, security, or data shape.

## 2. Architectural Context

### 2.1 Relationship to Domain-Driven Design (DDD)

CQRS is commonly used with **Domain-Driven Design (DDD)** when the domain model contains meaningful business behavior, invariants, workflows, or lifecycle transitions.

In a DDD-based system, the **command side** usually protects the domain model.

The command side is responsible for:

* Enforcing aggregate invariants.
* Executing domain behavior.
* Persisting valid state transitions.
* Emitting domain events when applicable.

The **query side** is optimized for reading data.

The query side is responsible for:

* Returning view-specific data shapes.
* Supporting dashboards, search screens, reports, and APIs.
* Avoiding unnecessary domain model hydration.
* Scaling independently from command processing.

### 2.2 Position in Pattern Selection

CQRS is an **Architectural Application Pattern (AAP)** because it influences the overall application structure.

It constrains downstream pattern selection across:

| Downstream Layer                             | CQRS Influence                                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Application Implementation Pattern (AIP)** | Determines whether command handlers, query handlers, mediators, application services, or use-case classes are used |
| **Technology Stack Pattern (TSP)**           | Influences framework, database, messaging, caching, and projection technologies                                    |
| **Design Pattern (DP)**                      | Encourages use of patterns such as Repository, Unit of Work, Mediator, Specification, Strategy, and Observer       |

## 3. Problem Statement

### 3.1 Problem

Many applications use the same model for both reads and writes.

This often works for simple CRUD systems, but becomes problematic when:

* Write operations require complex validation and business rules.
* Read operations require denormalized, joined, aggregated, or search-optimized data.
* Read traffic is much higher than write traffic.
* Multiple user interfaces require different view models.
* Reporting queries put pressure on transactional tables.
* Domain models become polluted with read-specific concerns.
* Performance tuning for reads conflicts with correctness requirements for writes.

### 3.2 Core Problem

A single model is being forced to serve two different purposes:

| Concern         | Write Side Needs             | Read Side Needs                          |
| --------------- | ---------------------------- | ---------------------------------------- |
| **Correctness** | Strong invariant enforcement | Usually less strict                      |
| **Shape**       | Domain-oriented              | UI/API-oriented                          |
| **Consistency** | Transactional correctness    | Often eventual consistency is acceptable |
| **Performance** | Safe state transitions       | Fast reads and aggregation               |
| **Security**    | Permission to mutate state   | Permission to view data                  |
| **Scaling**     | Usually lower volume         | Often higher volume                      |

CQRS resolves this by separating the write model from the read model.

## 4. Pattern Intent

### 4.1 Intent

Use CQRS to separate state-changing operations from read-only operations so that each side can be modeled, optimized, secured, tested, and scaled independently.

### 4.2 Resulting Architecture

The system is divided into:

* **Commands**

    * Intent-based requests to change state.
    * Examples: `CreateCustomerCommand`, `ApproveOrderCommand`, `CancelSubscriptionCommand`.

* **Command Handlers**

    * Application-layer handlers that execute commands.
    * Coordinate domain objects, repositories, transactions, and events.

* **Domain Model**

    * Business model responsible for enforcing rules and invariants.
    * Commonly composed of aggregates, entities, value objects, domain services, and domain events.

* **Queries**

    * Requests for data that do not change system state.
    * Examples: `GetCustomerByIdQuery`, `SearchOrdersQuery`, `GetMonthlyRevenueReportQuery`.

* **Query Handlers**

    * Read-side handlers that retrieve and shape data.
    * May query read databases, views, caches, search indexes, or reporting stores.

* **Read Models**

    * Data structures optimized for consumption.
    * May be DTOs, projections, materialized views, denormalized tables, or documents.

## 5. Applicability

### 5.1 Use CQRS When

CQRS is appropriate when:

* The domain has meaningful behavior beyond simple CRUD.
* Reads and writes have different scaling requirements.
* Read models require data shapes very different from write models.
* Complex business rules must be protected on writes.
* The system has multiple read use cases with different projections.
* Reporting or search workloads should not burden transactional tables.
* Event-driven projections are already part of the architecture.
* Auditability and workflow traceability are important.
* Different teams own read and write concerns.

### 5.2 Avoid CQRS When

CQRS is usually unnecessary when:

* The application is a simple CRUD system.
* Reads and writes use the same data shape.
* The domain has minimal business logic.
* Strong consistency is required everywhere and eventual consistency is unacceptable.
* The team lacks operational maturity for multiple models or projection pipelines.
* The added architectural complexity does not solve a real problem.

### 5.3 Decision Rule

Use CQRS when the cost of maintaining one shared read/write model is greater than the cost of maintaining separate command and query models.

## 6. Structural Model

### 6.1 Logical Structure

```text
Client
  |
  |-- Command Request
  |       |
  |       v
  |   Command Handler
  |       |
  |       v
  |   Domain Model
  |       |
  |       v
  |   Write Database
  |       |
  |       v
  |   Domain Events
  |       |
  |       v
  |   Projection Builder
  |       |
  |       v
  |   Read Database / Cache / Search Index
  |
  |-- Query Request
          |
          v
      Query Handler
          |
          v
      Read Model
```

### 6.2 Physical Structure

A CQRS system may be implemented in several physical forms.

| Structure                    | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| **Logical CQRS**             | Commands and queries are separated in code but use the same database                                |
| **Database-Level CQRS**      | Commands write to transactional tables; queries read from views or read-optimized tables            |
| **Event-Driven CQRS**        | Commands emit events that update read-side projections asynchronously                               |
| **Distributed CQRS**         | Command and query sides are separate services with independent deployment and scaling               |
| **CQRS with Event Sourcing** | The write model persists events as the source of truth, and read models are built from those events |

## 7. Behavioral Model

### 7.1 Command Flow

A command represents an intent to change system state.

```text
Submit command
  -> Validate command input
  -> Authorize command
  -> Load aggregate or domain object
  -> Execute domain behavior
  -> Enforce invariants
  -> Persist state change
  -> Emit domain event
  -> Return command result
```

### 7.2 Query Flow

A query retrieves data without changing state.

```text
Submit query
  -> Validate query parameters
  -> Authorize read access
  -> Retrieve read model
  -> Apply filtering, sorting, paging, or aggregation
  -> Return response DTO
```

### 7.3 Command Result

Command handlers should usually return minimal results.

Common command results include:

| Result Type            | Example                           |
| ---------------------- | --------------------------------- |
| **Identifier**         | `customerId`                      |
| **Status**             | `accepted`, `rejected`, `pending` |
| **Version**            | `aggregateVersion`                |
| **Location**           | URL of created resource           |
| **Validation Failure** | Business-rule failure details     |

Command handlers should not return large read models unless the architecture intentionally supports immediate read-after-write behavior.

### 7.4 Query Result

Query handlers return read-optimized data.

Examples:

```ts
type CustomerSummaryDto = {
  id: string;
  name: string;
  status: string;
  openOrderCount: number;
  lifetimeValue: number;
};
```

The query side does not enforce domain invariants. It retrieves and shapes data.

## 8. Command Side Design

### 8.1 Command Characteristics

A command should be:

* **Intent-based**
* **Imperative**
* **Explicit**
* **Business-oriented**
* **Validated before execution**
* **Authorized before mutation**

Good command names:

```text
CreateCustomerCommand
ApproveInvoiceCommand
CancelOrderCommand
DeactivateUserCommand
SubmitClaimCommand
```

Poor command names:

```text
UpdateCustomerCommand
SaveOrderCommand
ModifyRecordCommand
DoActionCommand
```

The better command names express business intent rather than generic data mutation.

### 8.2 Command Handler Responsibilities

A command handler should:

1. Validate the command structure.
2. Check authorization.
3. Load required domain state.
4. Invoke domain behavior.
5. Persist state changes.
6. Publish domain events when required.
7. Return a minimal result.

### 8.3 Command Handler Example

```ts
export class ApproveOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly approvedByUserId: string,
  ) {}
}

export class ApproveOrderHandler {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ApproveOrderCommand): Promise<void> {
    const order = await this.orderRepository.getById(command.orderId);

    order.approve(command.approvedByUserId);

    await this.orderRepository.save(order);

    await this.eventPublisher.publishAll(order.pullDomainEvents());
  }
}
```

## 9. Query Side Design

### 9.1 Query Characteristics

A query should be:

* **Read-only**
* **Side-effect free**
* **Specific to a read use case**
* **Optimized for response shape**
* **Able to support paging, sorting, and filtering**

Good query names:

```text
GetCustomerDetailsQuery
SearchOrdersQuery
GetInvoiceAgingReportQuery
ListActiveSubscriptionsQuery
```

### 9.2 Query Handler Responsibilities

A query handler should:

1. Validate query parameters.
2. Check read authorization.
3. Retrieve read-side data.
4. Apply filtering, paging, sorting, or aggregation.
5. Return a response DTO.

### 9.3 Query Handler Example

```ts
export class GetOrderSummaryQuery {
  constructor(public readonly orderId: string) {}
}

export class GetOrderSummaryHandler {
  constructor(private readonly readDb: ReadDatabase) {}

  async execute(query: GetOrderSummaryQuery): Promise<OrderSummaryDto | null> {
    return this.readDb.orderSummaries.findById(query.orderId);
  }
}
```

## 10. Data Architecture

### 10.1 Shared Database CQRS

In simple implementations, the command and query sides may share one physical database.

```text
Command Side -> Transactional Tables
Query Side   -> Same Database, Different Queries or Views
```

This approach provides a lower-complexity introduction to CQRS.

### 10.2 Separate Read and Write Stores

In more advanced systems, the write side and read side use different stores.

```text
Command Side -> Write Database
Query Side   -> Read Database / Cache / Search Index
```

Examples:

| Side                    | Possible Technology                                                            |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Write Side**          | PostgreSQL, MySQL, SQL Server, Oracle                                          |
| **Read Side**           | PostgreSQL read replica, Elasticsearch, Redis, MongoDB, OpenSearch, ClickHouse |
| **Projection Pipeline** | Kafka, RabbitMQ, SQS, EventBridge, Redis Streams                               |

### 10.3 Projection Model

A **projection** is a read-side representation built from write-side state or events.

Example projection:

```text
OrderPlacedEvent
OrderApprovedEvent
OrderShippedEvent
  -> OrderSummaryProjection
```

The projection may produce:

```ts
type OrderSummaryProjection = {
  orderId: string;
  customerName: string;
  orderStatus: string;
  totalAmount: number;
  placedAt: string;
  approvedAt?: string;
  shippedAt?: string;
};
```

## 11. Consistency Model

### 11.1 Strong Consistency

CQRS can be implemented with strong consistency when commands and queries use the same database transaction or immediately updated views.

This is simpler but limits independent scaling.

### 11.2 Eventual Consistency

In event-driven CQRS, the command side commits state first. The query side is updated later through projections.

```text
Command committed at T1
Event published at T2
Projection updated at T3
Query reflects change at T4
```

This introduces a consistency gap.

### 11.3 Handling Eventual Consistency

Common techniques include:

| Technique                     | Purpose                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| **Read-after-write fallback** | Read directly from command side immediately after mutation  |
| **Client polling**            | Client checks until projection catches up                   |
| **Version token**             | Client waits for a projection to reach a known version      |
| **Optimistic UI**             | UI temporarily reflects expected result                     |
| **Status response**           | Command returns `accepted` or `processing`                  |
| **Outbox pattern**            | Ensures events are reliably published after database commit |

## 12. Security Model

### 12.1 Command Security

Command authorization answers:

```text
Is this user allowed to perform this state-changing action?
```

Examples:

* Can this user approve this invoice?
* Can this user cancel this order?
* Can this user deactivate this account?
* Can this user update this customer’s credit limit?

### 12.2 Query Security

Query authorization answers:

```text
Is this user allowed to view this data?
```

Examples:

* Can this user view this customer profile?
* Can this user list all orders?
* Can this user see revenue data?
* Can this user export this report?

### 12.3 Security Implication

Do not assume that command permission implies query permission, or that query permission implies command permission.

CQRS allows separate authorization policies for mutations and reads.

## 13. Validation Model

### 13.1 Command Validation

Command validation has multiple levels.

| Validation Type              | Example                                       |
| ---------------------------- | --------------------------------------------- |
| **Structural validation**    | Required fields, format, length               |
| **Authorization validation** | User can perform command                      |
| **Business validation**      | Order can only be cancelled before shipment   |
| **Invariant validation**     | Account balance cannot become negative        |
| **Concurrency validation**   | Version must match expected aggregate version |

### 13.2 Query Validation

Query validation is typically lighter.

Examples:

* Page size must be within limit.
* Sort field must be allowed.
* Date range must be valid.
* Search term must meet minimum length.
* User must have access to requested result set.

## 14. Transaction Model

### 14.1 Command Transactions

Commands usually execute within a transaction boundary.

A typical command transaction includes:

```text
Load aggregate
Apply behavior
Persist aggregate
Store outbox event
Commit transaction
```

### 14.2 Query Transactions

Queries generally do not require business transactions.

They may use:

* Read-only transactions.
* Read replicas.
* Cached projections.
* Search indexes.
* Materialized views.

### 14.3 Transaction Boundary Rule

A command should have a clear transactional boundary.

Avoid commands that mutate many unrelated aggregates in one transaction unless the domain explicitly requires it.

## 15. Concurrency Model

### 15.1 Optimistic Concurrency

CQRS commonly uses optimistic concurrency on the command side.

Example:

```text
Command includes expectedVersion = 7
Aggregate currentVersion = 7
Command succeeds
Aggregate version becomes 8
```

If the current version is not `7`, the command fails or retries.

### 15.2 Conflict Handling

Common strategies:

| Strategy                 | Description                        |
| ------------------------ | ---------------------------------- |
| **Reject conflict**      | Return a concurrency error         |
| **Retry command**        | Reload aggregate and retry if safe |
| **Merge changes**        | Merge non-conflicting changes      |
| **User resolution**      | Ask user to resolve conflict       |
| **Compensating command** | Apply a follow-up correction       |

## 16. Integration with Event Sourcing

### 16.1 CQRS Without Event Sourcing

CQRS does not require event sourcing.

The write side may persist current state in normal relational tables.

```text
Command -> Domain Model -> Relational Tables
```

### 16.2 CQRS With Event Sourcing

When combined with event sourcing, the command side stores events instead of only current state.

```text
Command -> Aggregate -> Domain Events -> Event Store
```

The read side is then built from event streams.

```text
Event Store -> Projection Handlers -> Read Models
```

### 16.3 Distinction

| Concept                      | Meaning                                                  |
| ---------------------------- | -------------------------------------------------------- |
| **CQRS**                     | Separates read and write models                          |
| **Event Sourcing**           | Stores state as a sequence of events                     |
| **CQRS with Event Sourcing** | Uses events as source of truth and projections for reads |

CQRS can exist without event sourcing. Event sourcing commonly benefits from CQRS.

## 17. Implementation Patterns

### 17.1 Mediator-Based CQRS

A mediator dispatches commands and queries to handlers.

Example technologies:

| Platform        | Common Tool                                    |
| --------------- | ---------------------------------------------- |
| **.NET**        | MediatR                                        |
| **NestJS**      | `@nestjs/cqrs`                                 |
| **Java Spring** | Custom handlers, Axon Framework, Spring events |
| **Node.js**     | Custom command bus and query bus               |
| **Go**          | Explicit use-case handlers                     |
| **Python**      | Service layer with command/query handlers      |

### 17.2 Application Service CQRS

Instead of a mediator, commands and queries may be exposed through explicit application services.

```text
OrderCommandService
OrderQueryService
```

This is simpler and often sufficient.

### 17.3 Vertical Slice CQRS

Each feature owns its command and query handlers.

```text
features/
  orders/
    commands/
      approve-order.command.ts
      approve-order.handler.ts
    queries/
      get-order-summary.query.ts
      get-order-summary.handler.ts
    projections/
      order-summary.projection.ts
```

This aligns well with modular monoliths and service-oriented systems.

### 17.4 Event-Driven Projection CQRS

Read models are updated by event handlers.

```text
OrderApprovedEvent
  -> UpdateOrderSummaryProjectionHandler
  -> UpdateCustomerActivityProjectionHandler
  -> UpdateRevenueProjectionHandler
```

This supports multiple independent read models.

## 18. API Design

### 18.1 Command Endpoints

Command endpoints should express intent.

Good examples:

```http
POST /orders/{orderId}/approve
POST /orders/{orderId}/cancel
POST /customers/{customerId}/deactivate
POST /invoices/{invoiceId}/submit
```

Less desirable examples:

```http
PUT /orders/{orderId}
PATCH /customers/{customerId}
POST /action
```

Generic updates may still be acceptable for simple CRUD resources, but CQRS favors intent-specific mutation endpoints.

### 18.2 Query Endpoints

Query endpoints should expose read-oriented resources.

Examples:

```http
GET /orders/{orderId}/summary
GET /orders?status=approved&page=1
GET /customers/{customerId}/activity
GET /reports/monthly-revenue
```

### 18.3 API Return Rules

| Operation               | Recommended Return                               |
| ----------------------- | ------------------------------------------------ |
| **Command**             | Minimal result, status, ID, version, or location |
| **Query**               | Full read model or DTO                           |
| **Async command**       | `202 Accepted` with operation status             |
| **Synchronous command** | `200 OK`, `201 Created`, or `204 No Content`     |

## 19. Testing Strategy

### 19.1 Command Testing

Command tests should verify:

* Authorization rules.
* Input validation.
* Business invariants.
* Domain state transitions.
* Persistence behavior.
* Domain events.
* Concurrency handling.
* Transaction rollback behavior.

Example command test:

```text
Given an order is already shipped
When CancelOrderCommand is executed
Then the command is rejected
And the order remains shipped
And no OrderCancelledEvent is emitted
```

### 19.2 Query Testing

Query tests should verify:

* Filtering.
* Sorting.
* Pagination.
* Projection shape.
* Security trimming.
* Null or empty result handling.
* Performance-sensitive query paths.

Example query test:

```text
Given a customer has three active orders
When GetCustomerOrderSummaryQuery is executed
Then the response contains three active orders
And the total order value is correctly calculated
```

### 19.3 Projection Testing

Projection tests should verify:

* Event-to-read-model transformation.
* Idempotency.
* Ordering behavior.
* Rebuild behavior.
* Duplicate event handling.
* Missing event handling.

## 20. Observability Requirements

### 20.1 Command Observability

Command execution should log:

* Command name.
* Correlation ID.
* Actor or user ID.
* Aggregate ID.
* Validation failure.
* Authorization failure.
* Execution duration.
* Domain events emitted.
* Transaction result.

### 20.2 Query Observability

Query execution should log:

* Query name.
* Correlation ID.
* Actor or user ID.
* Filter parameters where safe.
* Result count.
* Execution duration.
* Cache hit or miss.
* Slow query warnings.

### 20.3 Projection Observability

Projection processing should log:

* Event name.
* Event ID.
* Aggregate ID.
* Projection name.
* Projection lag.
* Retry count.
* Dead-letter failures.
* Last processed checkpoint.

## 21. Failure Modes

### 21.1 Common Failure Modes

| Failure Mode               | Description                                       | Mitigation                                      |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| **Projection lag**         | Read model is behind write model                  | Monitor lag, expose status, use version tokens  |
| **Lost events**            | Events are not delivered to projections           | Use outbox pattern and durable messaging        |
| **Duplicate events**       | Same event is processed more than once            | Make projection handlers idempotent             |
| **Over-segmentation**      | Too many handlers for simple use cases            | Apply CQRS only where useful                    |
| **Anemic command model**   | Command side becomes procedural CRUD              | Preserve domain behavior in aggregates          |
| **Read model drift**       | Projection no longer matches domain meaning       | Version projections and rebuild regularly       |
| **Security divergence**    | Command and query permissions become inconsistent | Centralize policy definitions                   |
| **Operational complexity** | Multiple stores and pipelines increase burden     | Start with logical CQRS before distributed CQRS |

## 22. Advantages

### 22.1 Benefits

CQRS provides:

* Clear separation of reads and writes.
* Better alignment with business intent.
* Simpler domain models on the write side.
* Faster and more flexible read models.
* Independent scalability of read and write workloads.
* Better support for reporting and search.
* Cleaner security boundaries.
* Improved testability of commands and queries.
* Better fit for event-driven architectures.
* Stronger auditability when combined with domain events.

## 23. Disadvantages

### 23.1 Costs

CQRS introduces:

* More classes, handlers, and artifacts.
* More architectural decisions.
* Possible duplication between models.
* Eventual consistency concerns.
* Projection maintenance complexity.
* More operational monitoring.
* More difficult debugging across asynchronous flows.
* Risk of overengineering simple CRUD systems.

## 24. Pattern Variants

### 24.1 Simple CQRS

Commands and queries are separated in code only.

```text
Same application
Same database
Separate handlers
```

Best for modular monoliths and medium-complexity applications.

### 24.2 CQRS with Read Projections

Commands update the write model. Queries read from denormalized projections.

```text
Write tables
Projection tables
Query handlers
```

Best for dashboards, reporting, and high-read systems.

### 24.3 CQRS with Event-Driven Projections

Commands emit events. Event handlers update read models asynchronously.

```text
Command -> Event -> Projection
```

Best for systems that can tolerate eventual consistency.

### 24.4 CQRS with Event Sourcing

Commands create events. Events are the source of truth. Projections serve reads.

```text
Command -> Event Store -> Projections
```

Best for audit-heavy systems, workflow systems, and domains where state history is essential.

### 24.5 Distributed CQRS

Command and query sides are independently deployed services.

```text
Command Service
Query Service
Projection Service
```

Best for large systems with independent scaling and ownership needs.

## 25. Example Folder Structure

### 25.1 Modular Monolith Example

```text
src/
  modules/
    orders/
      domain/
        order.aggregate.ts
        order-status.value-object.ts
        events/
          order-approved.event.ts
      application/
        commands/
          approve-order.command.ts
          approve-order.handler.ts
          cancel-order.command.ts
          cancel-order.handler.ts
        queries/
          get-order-summary.query.ts
          get-order-summary.handler.ts
          search-orders.query.ts
          search-orders.handler.ts
      infrastructure/
        repositories/
          order.repository.ts
        projections/
          order-summary.projection.ts
      api/
        order-command.controller.ts
        order-query.controller.ts
```

### 25.2 Distributed Service Example

```text
services/
  order-command-service/
    src/
      commands/
      domain/
      repositories/
      events/

  order-query-service/
    src/
      queries/
      read-models/
      projections/

  order-projection-worker/
    src/
      event-handlers/
      checkpoints/
```

## 26. Example Domain Scenario

### 26.1 Order Approval

An order approval use case has different write and read requirements.

#### 26.1.1 Command Side

The command side must enforce rules:

* Order must exist.
* Order must be in `submitted` status.
* User must have approval permission.
* Order total must be within approval limit.
* Order cannot already be cancelled or shipped.
* Approval must create an audit trail.

Command:

```text
ApproveOrderCommand
```

Domain behavior:

```text
Order.approve(approvedByUserId)
```

Domain event:

```text
OrderApprovedEvent
```

#### 26.1.2 Query Side

The query side may need several read models:

| Read Model                        | Purpose             |
| --------------------------------- | ------------------- |
| **OrderSummaryReadModel**         | Order detail page   |
| **PendingApprovalReadModel**      | Approval queue      |
| **CustomerOrderHistoryReadModel** | Customer profile    |
| **RevenueProjection**             | Financial dashboard |
| **AuditTimelineReadModel**        | Compliance screen   |

Each read model can be shaped differently without changing the write-side domain model.

## 27. Governance Rules

### 27.1 Command Rules

* Commands must represent business intent.
* Commands must not directly expose persistence models.
* Commands must be authorized before mutation.
* Commands must enforce domain invariants through the domain model.
* Commands must execute inside clear transaction boundaries.
* Commands should return minimal results.
* Commands should emit domain events when meaningful business facts occur.

### 27.2 Query Rules

* Queries must not mutate state.
* Queries must return read models or DTOs.
* Queries should not hydrate aggregates unless necessary.
* Queries must enforce read authorization.
* Queries must support paging for collection responses.
* Queries must avoid exposing internal persistence schema accidentally.

### 27.3 Projection Rules

* Projection handlers must be idempotent.
* Projection lag must be observable.
* Projection rebuilds must be supported when practical.
* Projection schemas should be versioned for material changes.
* Projection failures must be retryable or dead-lettered.

## 28. Selection Checklist

### 28.1 CQRS Fit Checklist

Use CQRS when several of the following are true:

| Question                                                    | Yes / No |
| ----------------------------------------------------------- | -------- |
| Does the domain contain meaningful business behavior?       |          |
| Are read models different from write models?                |          |
| Is read traffic significantly higher than write traffic?    |          |
| Are reports, dashboards, or search important?               |          |
| Do writes require strong invariant enforcement?             |          |
| Can the system tolerate eventual consistency in some views? |          |
| Are auditability and traceability important?                |          |
| Will read and write workloads scale differently?            |          |
| Are multiple teams working on different use cases?          |          |

### 28.2 Adoption Guidance

Start with the simplest viable form.

Recommended progression:

1. Separate command and query handlers in code.
2. Keep one database initially.
3. Add read-specific DTOs.
4. Add database views or read tables where needed.
5. Add asynchronous projections only when justified.
6. Add separate read stores only when operationally necessary.
7. Add event sourcing only when historical state reconstruction is required.

## 29. Anti-Patterns

### 29.1 CQRS for Every CRUD Screen

Do not use full CQRS ceremony for simple administrative CRUD unless the separation provides real value.

### 29.2 Commands That Are Just Setters

Avoid commands like:

```text
SetCustomerNameCommand
SetCustomerAddressCommand
SetOrderStatusCommand
```

Prefer intent-based commands:

```text
RenameCustomerCommand
ChangeCustomerBillingAddressCommand
ApproveOrderCommand
CancelOrderCommand
```

### 29.3 Query Side Calling Domain Behavior

The query side should not invoke domain behavior to assemble read models.

If domain behavior is needed, the operation is likely not a query.

### 29.4 Command Side Returning Read Models

Avoid making command handlers responsible for constructing full UI responses.

Use a follow-up query or a read-after-write strategy.

### 29.5 Unobservable Projection Pipeline

If projections are asynchronous, projection lag, failures, retries, and checkpoints must be observable.

## 30. Summary

### 30.1 Architectural Decision Summary

**Command Query Responsibility Segregation (CQRS)** is an architectural pattern that separates write behavior from read behavior.

It is appropriate when:

* The domain model must protect business invariants.
* Read models require different shapes than write models.
* Reads and writes need different scaling, performance, or security strategies.
* Event-driven projections or reporting views are beneficial.
* The system complexity justifies separate models.

It should be avoided when the application is simple CRUD and a shared model is sufficient.

### 30.2 Final Rule

Use CQRS to reduce accidental complexity in complex domains, not to add architectural ceremony to simple systems.
