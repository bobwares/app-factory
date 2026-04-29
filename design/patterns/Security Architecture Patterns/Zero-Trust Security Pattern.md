**The Zero-Trust Security Pattern** is a high-level architectural pattern that assumes no entity (user, device, service, or network) is inherently trustworthy and requires explicit verification for every access request, regardless of location or previous authentication.

### Core Idea
Zero Trust removes the traditional concept of a trusted internal network perimeter. Every request is authenticated, authorized, and validated based on multiple contextual signals (identity, device health, location, behavior, etc.) before access is granted. Access is granted with the principle of least privilege and is continuously re-evaluated.

- “Never trust, always verify.”
- All access decisions are dynamic and context-aware.
- Micro-segmentation limits lateral movement.
- Security is enforced at every layer and boundary.
- Continuous monitoring and analytics are used to detect anomalies.

### Why It Exists (High-Level Benefits)
- **Stronger Security Posture** — Significantly reduces the impact of breaches by assuming they will happen.
- **Least Privilege Enforcement** — Users and services get only the minimum access needed.
- **Dynamic Access Control** — Decisions adapt to real-time risk and context.
- **Better Visibility** — Continuous verification provides rich audit and monitoring data.
- **Modern Architecture Fit** — Works exceptionally well with cloud, microservices, and remote work environments.
- **Compliance Support** — Helps meet strict regulatory and industry security standards.

### DDD Signals for Selecting This Pattern
Use the **Zero-Trust Security Pattern** when the following signals appear in your Domain-Driven Design work:

- The system handles sensitive or regulated data and must assume external or internal threats.
- Services and bounded contexts are distributed across clouds, on-premise, or hybrid environments.
- Users access the system from various devices, locations, and networks.
- You need fine-grained, context-aware authorization beyond simple roles.
- There is a high risk of lateral movement if one component is compromised.
- Stakeholders emphasize “assume breach” thinking and continuous verification.

### Relationship to Other Patterns
- Enhances **Secured Application Pattern** and **Policy-Based Access Control**.
- Works with **Role-Based Access Control (RBAC)** (Zero Trust adds continuous verification on top).
- Complements **Sensitive Data System Pattern** and **Auditable System Pattern**.
- Integrates well with **Ports & Adapters** and **Anti-Corruption Layer** for secure external integrations.
- Strengthens **Event-Driven** and **Microservices Architectures** through micro-segmentation.

### Simple High-Level Example (Conceptual)
```text
Every Request Evaluation:

1. Authenticate Identity (User + Device + Certificate)
2. Check Context (Location, Time, Device Health, Behavior)
3. Evaluate Dynamic Policy (Role + Attributes + Risk Score)
4. Grant Temporary, Scoped Access (Just-in-Time & Just-Enough)
5. Continuously Monitor Session → Re-verify or Revoke
```

Even internal service-to-service calls must pass Zero Trust checks.

### References
- [Zero Trust Architecture — Microsoft Azure](https://learn.microsoft.com/en-us/security/zero-trust/)
- [Zero Trust Model — NIST Special Publication 800-207](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf)
- [Zero Trust Security Principles — Forrester](https://www.forrester.com/blogs/category/zero-trust/)
- [Implementing Zero Trust in Microservices — InfoQ](https://www.infoq.com/articles/zero-trust-microservices/)
- [Zero Trust for Domain-Driven Systems — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/zero-trust-in-ddd/)
- [Zero Trust Architecture Design — Google BeyondCorp](https://cloud.google.com/beyondcorp)