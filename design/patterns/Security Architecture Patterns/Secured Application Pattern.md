**The Secured Application Pattern** is a high-level architectural pattern that treats security as a foundational, non-negotiable aspect of the system design, embedding protection mechanisms throughout all layers and components rather than adding them as an afterthought.

### Core Idea
Security controls (authentication, authorization, input validation, data protection, auditing, etc.) are designed into the architecture from the beginning. Every layer and major component explicitly considers and implements security boundaries, principles, and practices. The application assumes it will be attacked and is built to resist, detect, and recover from threats.

- Security is a cross-cutting concern applied consistently.
- Follows the **Defense in Depth** principle with multiple layered controls.
- Security requirements are treated with the same importance as functional requirements.
- The architecture minimizes the attack surface and enforces least privilege.

### Why It Exists (High-Level Benefits)
- **Proactive Protection** — Reduces risk by addressing threats early in the design.
- **Consistency** — Security is applied uniformly across the entire system.
- **Maintainability** — Security logic is not scattered or duplicated.
- **Compliance** — Easier to meet regulatory and industry standards.
- **Resilience** — The system can better withstand attacks and limit damage.
- **Trust** — Builds stakeholder and user confidence in the application.

### DDD Signals for Selecting This Pattern
Use the **Secured Application Pattern** when the following signals appear in your Domain-Driven Design work:

- The domain handles sensitive data (personal, financial, health, intellectual property).
- Security and compliance are explicit business requirements or constraints.
- Different bounded contexts have distinct security and access control needs.
- The system is exposed to external users, partners, or the internet.
- Stakeholders frequently mention concerns about data breaches, fraud, or unauthorized access.
- The application must meet regulatory standards (GDPR, HIPAA, PCI-DSS, SOC2, etc.).

### Relationship to Other Patterns
- Complements **Zero-Trust Security Pattern**, **Role-Based Access Control (RBAC)**, and **Policy-Based Access Control**.
- Works with **Domain-Centric Architecture**, **Ports & Adapters**, and **Service Layer** to enforce security boundaries.
- Integrates with **Sensitive Data System Pattern** and **Auditable System Pattern**.
- Enhances **External System Adapter** and **Anti-Corruption Layer** with secure integration practices.

### Simple High-Level Example (Conceptual)
```text
Secured Application Layers:

Presentation / API Layer
  → Authentication + Rate Limiting + Input Validation

Application Layer
  → Authorization Checks (Policy-Based) + Audit Logging

Domain Layer
  → Domain-Driven Security Rules (e.g., Order.CanBeModifiedBy(user))

Infrastructure Layer
  → Encryption at Rest + Secure Communication + Secrets Management
```

Every layer enforces security explicitly.

### References
- [Secure Application Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/secure-application)
- [Secure by Design Principles — OWASP](https://owasp.org/www-project-secure-by-design/)
- [Security Patterns — Microsoft Security Development Lifecycle](https://www.microsoft.com/en-us/securityengineering/sdl)
- [Application Security Architecture Patterns — OWASP](https://cheatsheetseries.owasp.org/)
- [Building Secure Applications — Gartner / NIST Guidelines](https://csrc.nist.gov/publications)
- [Zero Trust + Secured Application Design — Forrester](https://www.forrester.com/blogs/category/zero-trust/)