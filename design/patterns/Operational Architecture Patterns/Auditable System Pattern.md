**The Auditable System Pattern** is a high-level architectural pattern that designs a system to systematically record and preserve a complete, tamper-evident history of all significant actions, decisions, and state changes for compliance, accountability, and forensic purposes.

### Core Idea
The system captures who did what, when, why, and with what outcome for all important operations. Audit records are treated as first-class, immutable artifacts. They are generated automatically, stored securely, and made queryable while protecting their integrity.

- Every critical domain operation produces an audit trail.
- Audit logs are immutable and append-only.
- Records include context (user, system, timestamp, reason, before/after state).
- Auditing is built into the architecture rather than added later.
- Supports both technical and business-level auditing.

### Why It Exists (High-Level Benefits)
- **Compliance & Regulatory Support** — Simplifies meeting audit requirements (GDPR, HIPAA, SOX, PCI-DSS, etc.).
- **Accountability** — Clearly identifies who performed which actions.
- **Forensic Analysis** — Enables investigation of incidents and disputes.
- **Business Insight** — Provides historical data for analytics and process improvement.
- **Trust & Transparency** — Increases confidence in the system’s behavior.
- **Disaster Recovery** — Helps reconstruct events after failures.

### DDD Signals for Selecting This Pattern
Use the **Auditable System Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain involves financial transactions, sensitive data, approvals, or regulated processes.
- Stakeholders require strong traceability (“Who changed this order and why?”).
- Compliance or legal teams mandate detailed audit trails.
- Business processes include approvals, reviews, or high-value decisions.
- You are using **Event Sourcing** (which naturally provides strong auditability).
- There is a need for historical reconstruction or point-in-time reporting.

### Relationship to Other Patterns
- Strongly complements **Observable Service Pattern**, **Event Sourcing**, and **Sensitive Data System Pattern**.
- Works well with **Secured Application Pattern** and **Zero-Trust Security Pattern**.
- Often implemented together with **Outbox Pattern** and **CQRS** (audit trail on write side).
- Enhances **Saga Pattern** and **Workflow Orchestration** by tracking process execution.
- Can be supported by **Rich Domain Model** through domain events.

### Simple High-Level Example (Conceptual)
```text
Audit Record Example:

{
  "auditId": "AUD-998877",
  "timestamp": "2025-04-29T14:32:15Z",
  "userId": "alice@company.com",
  "action": "OrderApproved",
  "aggregateId": "ORD-12345",
  "beforeState": { "status": "Pending", "amount": 299.99 },
  "afterState":  { "status": "Approved", "amount": 299.99 },
  "reason": "Customer is premium tier",
  "correlationId": "TRC-ABC123",
  "ipAddress": "...",
  "signature": "..."   // tamper-evident hash
}
```

All changes flow through the audit mechanism automatically.

### References
- [Auditable System Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/audit-log)
- [Audit Logging Pattern — Martin Fowler](https://martinfowler.com/articles/audit-log.html)
- [Auditing in Domain-Driven Design — Vaughn Vernon](https://kalele.io/)
- [Immutable Audit Trails with Event Sourcing — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/audit-logging-in-ddd/)
- [Building Auditable Systems — OWASP](https://owasp.org/www-project-application-security-verification-standard/)
- [Audit Patterns in Microservices — InfoQ](https://www.infoq.com/articles/audit-logging-microservices/)