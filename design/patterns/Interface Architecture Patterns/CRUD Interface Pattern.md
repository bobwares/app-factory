**The CRUD Interface Pattern** is a high-level architectural pattern that defines a simple, standardized interface exposing the four fundamental data operations — Create, Read, Update, and Delete — on domain entities or resources.

### Core Idea
The interface provides a uniform set of operations for managing the lifecycle of data without exposing underlying storage or complex business logic. It follows the classic CRUD model, treating data as resources that can be directly manipulated.

- **Create** — Adds new records or entities.
- **Read** — Retrieves one or multiple records.
- **Update** — Modifies existing records.
- **Delete** — Removes records.
- Operations are typically aligned with individual entities or aggregates rather than complex business processes.

### Why It Exists (High-Level Benefits)
- **Simplicity** — Easy to understand, implement, and consume.
- **Consistency** — Provides a predictable and uniform API across the application.
- **Rapid Development** — Accelerates building basic data-driven applications.
- **Familiarity** — Well-known pattern used by databases, ORMs, and many service interfaces.
- **Straightforward Mapping** — Naturally maps to most persistence technologies.

### DDD Signals for Selecting This Pattern
Use the **CRUD Interface Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain is relatively simple with limited or no complex business rules.
- Stakeholders describe requirements primarily in terms of “manage [entity]” (create customers, update orders, delete products, etc.).
- Most operations are basic data maintenance with little workflow or policy enforcement.
- The team needs a quick, low-ceremony interface for administrative or back-office functionality.
- Rich domain behavior and invariants are minimal or absent.
- The bounded context is more data-oriented than behavior-oriented.

### Relationship to Other Patterns
- Often contrasted with **Command Interface Pattern** and **Query Interface Pattern** (which separate intent and reads more explicitly).
- Frequently combined with **CRUD Data Model Pattern** and **Anemic Domain Model**.
- Can evolve into **CQRS** when read and write needs diverge.
- Works well in simpler **Layered Architecture** but is often avoided in favor of **Ports & Adapters** or **Rich Domain Model** in complex domains.

### Simple High-Level Example (Conceptual)
```text
CRUD Interface for Customer:
  - CreateCustomer(CreateCustomerData) → CustomerId
  - GetCustomer(CustomerId) → CustomerDetails
  - UpdateCustomer(CustomerId, UpdateCustomerData) → CustomerDetails
  - DeleteCustomer(CustomerId) → void
```

This pattern provides direct, resource-focused operations for basic entity management.

### References
- [The Hidden Complexity of CRUD](https://www.ashrafmageed.com/the-hidden-complexity-of-crud/) — Excellent discussion on when CRUD becomes problematic in microservices.
- [Wikipedia: Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) — Foundational explanation of CRUD operations.
- [Rethinking CRUD For REST API Designs](https://blog.palantir.com/rethinking-crud-for-rest-api-designs-a2a8287dc2af) — Deep analysis of CRUD limitations and alternatives.
- [CRUD Pattern, Repository Pattern, and Layered Architecture](https://fitech101.aalto.fi/en/courses/web-software-development-v1/part-3/7-crud-repository-layered-architecture) — Practical implementation in layered systems.
- [Microservices Development Patterns: CRUD Vs. CQRS](https://anarsolutions.com/microservices-development-patterns-crud-vs-cqrs/) — Comparison with CQRS and when to use each.
- [CRUD Is Not an Architecture](https://medium.com/@floyd.may/crud-is-not-an-architecture-a00019febbfa) — Thoughtful critique on treating CRUD as an architectural style.