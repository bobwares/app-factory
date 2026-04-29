**The Policy-Based Access Control Pattern** is a high-level architectural pattern that makes authorization decisions by evaluating dynamic, expressive policies rather than static roles or simple permission lists.

### Core Idea
Access control logic is externalized into explicit, evaluable policies. These policies consider multiple attributes (user, resource, action, context, time, location, etc.) at runtime to decide whether an operation is allowed. Policies are declarative and can be changed without modifying application code.

- Policies are first-class domain concepts.
- Decisions are made by a policy evaluation engine or service.
- Supports fine-grained, contextual, and dynamic rules.
- Can combine multiple attributes and conditions (e.g., “If user is in role X AND order belongs to their region AND amount < Y, then allow”).

### Why It Exists (High-Level Benefits)
- **Flexibility** — Business rules around authorization can change quickly without code changes.
- **Expressiveness** — Supports complex, real-world access scenarios that roles alone cannot handle.
- **Centralized Logic** — Authorization rules are defined in one place and consistent across the system.
- **Auditability & Compliance** — Policies can be reviewed, versioned, and audited easily.
- **Reusability** — The same policies can be applied across multiple bounded contexts or applications.

### DDD Signals for Selecting This Pattern
Use the **Policy-Based Access Control Pattern** when the following signals appear in your Domain-Driven Design work:

- Authorization rules are complex and depend on multiple contextual factors.
- Business stakeholders frequently change access rules (pricing tiers, regional restrictions, approval limits, etc.).
- Access decisions need to consider attributes of the user, the resource, the action, and the environment.
- You need fine-grained control beyond what simple roles can provide.
- Compliance or regulatory requirements demand auditable and configurable authorization logic.
- Different bounded contexts have sophisticated but varying authorization needs.

### Relationship to Other Patterns
- Often used together with **Role-Based Access Control (RBAC)** (RBAC for coarse-grained, policies for fine-grained).
- Complements **Secured Application Pattern** and **Zero-Trust Security Pattern**.
- Works well with **Policy-Based Decisioning Pattern** (same philosophy applied to business vs security decisions).
- Integrates naturally with **Domain-Centric Architecture** and **Command/Query Interface Patterns**.
- Can be enforced at the **Service Layer** or inside **Aggregates**.

### Simple High-Level Example (Conceptual)
```text
Policy: ApproveRefundPolicy

Inputs: User, Order, RefundRequest

Rule:
  IF User.HasPermission("Refund.Approve")
     AND Order.Region == User.Region
     AND Order.Amount <= User.MaxRefundLimit
     AND Order.Status == "Delivered"
  THEN Allow
  ELSE Deny
```

Policies are evaluated at runtime for each operation.

### References
- [Policy-Based Access Control — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-based-access-control)
- [Attribute-Based Access Control (ABAC) / Policy-Based — NIST](https://csrc.nist.gov/projects/attribute-based-access-control)
- [Policy-Based Authorization in DDD — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/policy-based-authorization/)
- [Policy-Based Access Control Explained — OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [When to Use Policy-Based Access Control — InfoQ](https://www.infoq.com/articles/policy-based-access-control/)
- [Policy and Claim-Based Authorization — Jimmy Bogard](https://www.jimmybogard.com/policy-based-authorization/)