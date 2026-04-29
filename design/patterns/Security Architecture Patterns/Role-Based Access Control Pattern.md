**The Role-Based Access Control (RBAC) Pattern** is a high-level architectural pattern that grants or denies access to resources and operations based on the roles assigned to users or systems rather than checking permissions individually for each user.

### Core Idea
Users are assigned one or more roles (e.g., Administrator, Manager, Editor, Viewer). Each role is granted a collection of permissions. When a user attempts an action, the system checks whether any of the user’s roles have the required permission. This decouples users from permissions and makes access management scalable.

- Roles represent job functions or responsibilities in the domain.
- Permissions are tied to operations (e.g., `Order.Create`, `Customer.View`, `Report.Approve`).
- Roles can be hierarchical or composable.
- Authorization decisions are centralized and consistent.

### Why It Exists (High-Level Benefits)
- **Simplicity & Maintainability** — Easier to manage permissions at the role level than per user.
- **Scalability** — Adding or removing users does not require changing permissions.
- **Business Alignment** — Roles map naturally to organizational structure and Ubiquitous Language.
- **Auditability** — Clear mapping between roles and allowed actions.
- **Compliance** — Supports regulatory requirements for access control (least privilege, segregation of duties).
- **Reduced Errors** — Minimizes the risk of granting excessive individual permissions.

### DDD Signals for Selecting This Pattern
Use the **Role-Based Access Control (RBAC) Pattern** when the following signals appear in your Domain-Driven Design work:

- Access rules are closely tied to job functions or organizational roles in the Ubiquitous Language.
- Different user types have distinct sets of capabilities within the same bounded context.
- You need to enforce **segregation of duties** (e.g., someone who creates an order cannot also approve it).
- Authorization logic appears repeatedly across use cases.
- Stakeholders describe security in terms of roles (“Only managers can approve refunds”).
- The system has multiple user personas with varying levels of access.

### Relationship to Other Patterns
- Often used together with **Policy-Based Access Control Pattern** (RBAC for coarse-grained, policies for fine-grained rules).
- Complements **Secured Application Pattern** and **Zero-Trust Security Pattern**.
- Works well with **Domain-Centric Architecture** by keeping authorization checks close to the domain.
- Integrates with **Command Interface Pattern** and **Query Interface Pattern** for operation-level authorization.
- Can be enforced at the **Service Layer** or within **Aggregate** boundaries.

### Simple High-Level Example (Conceptual)
```text
Roles:
  - CustomerSupport → CanViewOrder, CanUpdateOrderStatus
  - OrderManager   → CanViewOrder, CanApproveOrder, CanCancelOrder
  - Administrator  → All permissions

Authorization Check:
  User "alice" has Role "OrderManager"
  → alice.CanExecute(ApproveOrderCommand) → Allowed
```

### References
- [Role-Based Access Control — Microsoft Azure](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
- [RBAC Pattern — NIST Standard](https://csrc.nist.gov/projects/role-based-access-control)
- [Role-Based Access Control — Martin Fowler](https://martinfowler.com/bliki/RoleBasedAccessControl.html)
- [RBAC in Domain-Driven Design — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/role-based-access-control-in-ddd/)
- [Implementing RBAC in Microservices — InfoQ](https://www.infoq.com/articles/rbac-microservices/)
- [RBAC vs ABAC — OWASP Access Control Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)