# High-Level Pattern Implementation Map

This document maps each high-level pattern in [`design/patterns`](../patterns/) to the next-level patterns commonly used to implement it.

For this test run, only the **Request/Response API Pattern** is populated.

## Legend

- **Core**: Usually part of the immediate implementation of the high-level pattern
- **Common**: Frequently used structural support for the pattern
- **Conditional**: Used when the surrounding context requires it
- **Specialization**: Narrower variant of the high-level pattern

## Request/Response API Pattern

High-level source: [Request Response API Pattern](../patterns/Interface%20Architecture%20Patterns/Request%20Response%20API%20Pattern.md)

### Implementation Mapping

| Next-level pattern | Classification | Why it directly implements the pattern |
|---|---|---|
| [Command Interface Pattern](../patterns/Interface%20Architecture%20Patterns/Command%20Interface%20Pattern.md) | Core | Implements the synchronous write side of request/response APIs where the caller submits an action and waits for a result. |
| [Query Interface Pattern](../patterns/Interface%20Architecture%20Patterns/Query%20Interface%20Patterns.md) | Core | Implements the synchronous read side of request/response APIs where the caller asks for data and expects an immediate reply. |
| [Service Layer Pattern](../patterns/Domain%20Architecture%20Patterns/Service%20Layer%20Pattern.md) | Common | Provides the application/use-case boundary that receives the request, coordinates the domain work, manages transactions, and returns the response. |
| [Ports and Adapters Pattern](../patterns/Domain%20Architecture%20Patterns/Ports%20and%20Adapters%20Pattern.md) | Common | Treats the API as an inbound adapter and keeps transport details separated from domain/application logic. |
| [Secured Application Pattern](../patterns/Security%20Architecture%20Patterns/Secured%20Application%20Pattern.md) | Common | Most real request/response APIs need authentication, authorization, and secure transport at the interaction boundary. |
| [Synchronous Integration Pattern](../patterns/Integration%20Architecture%20Patterns/Synchronous%20Integration%20Pattern.md) | Conditional | Applies when fulfilling the request requires immediate downstream calls to another service or bounded context. |
| [External System Adapter Pattern](../patterns/Integration%20Architecture%20Patterns/External%20System%20Adapter%20Pattern.md) | Conditional | Applies when the request/response flow must call third-party or legacy systems while keeping those details out of the core model. |
| [CRUD Interface Pattern](../patterns/Interface%20Architecture%20Patterns/CRUD%20Interface%20Pattern.md) | Specialization | A simpler, resource-centric form of request/response used when the API is mostly direct entity management. |
| [Layered Architecture Pattern](../patterns/Domain%20Architecture%20Patterns/Layered%20Architecture%20Pattern.md) | Common | Alternative structural realization for simpler systems that implement request handling through presentation, application, domain, and infrastructure layers. |

### Typical Composition

```text
Request/Response API Pattern
  -> Command Interface Pattern
  -> Query Interface Pattern
  -> Service Layer Pattern
  -> Ports and Adapters Pattern or Layered Architecture Pattern
  -> Secured Application Pattern
  -> Synchronous Integration Pattern (if downstream calls must complete inline)
       -> External System Adapter Pattern (if external/legacy APIs are involved)
  -> CRUD Interface Pattern (only for simple resource-oriented variants)
```

### Notes

- **Command Interface Pattern** and **Query Interface Pattern** are the most direct next-level decomposition of Request/Response because they split the interaction style into synchronous writes and synchronous reads.
- **Service Layer Pattern** is the most common application-level mechanism behind the API boundary.
- **Ports and Adapters Pattern** and **Layered Architecture Pattern** are structural choices, not competing API styles.
- Patterns such as **RBAC**, **Aggregate**, or **CRUD Data Model** are usually one level further down. They support the implementation, but they are not the immediate next-level decomposition of Request/Response itself.
