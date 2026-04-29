**The Sensitive Data System Pattern** is a high-level architectural pattern that applies special design, security, and handling practices to any system or bounded context that processes, stores, or transmits sensitive or regulated data.

### Core Idea
The entire architecture is explicitly designed around the protection, classification, and controlled handling of sensitive information (personal data, financial data, health records, credentials, etc.). This includes data minimization, encryption, strict access controls, auditing, and isolation strategies from the very beginning of the design.

- Sensitive data is clearly identified and classified.
- Special protections (encryption at rest/transit, tokenization, anonymization) are applied systematically.
- Access is minimized and heavily audited.
- The system enforces strict boundaries and segregation for sensitive data flows.
- Compliance and privacy requirements are treated as first-class architectural constraints.

### Why It Exists (High-Level Benefits)
- **Risk Reduction** — Dramatically lowers the chance and impact of data breaches.
- **Regulatory Compliance** — Makes it easier to meet standards such as GDPR, HIPAA, PCI-DSS, or SOC 2.
- **Trust** — Builds confidence with users, customers, and regulators.
- **Focused Security** — Allows applying stronger, more expensive controls only where truly needed.
- **Data Minimization** — Reduces the volume of sensitive data stored or processed.
- **Clear Accountability** — Makes data handling policies explicit and auditable.

### DDD Signals for Selecting This Pattern
Use the **Sensitive Data System Pattern** when the following signals appear in your Domain-Driven Design work:

- The bounded context handles personal identifiable information (PII), financial data, health data, or trade secrets.
- Privacy or regulatory compliance is a major business or legal requirement.
- Stakeholders frequently mention concerns about data leaks, consent, or “right to be forgotten.”
- Different types of data within the same context have varying sensitivity levels.
- You need strong auditability and traceability for all access to certain data.
- The domain includes concepts like consent, data retention policies, or anonymization.

### Relationship to Other Patterns
- Strongly complements **Secured Application Pattern**, **Zero-Trust Security Pattern**, and **Policy-Based Access Control**.
- Works with **Domain-Centric Architecture** by treating sensitive data handling as part of the domain model.
- Often combined with **Anti-Corruption Layer** when integrating with external systems that also handle sensitive data.
- Pairs well with **Auditable System Pattern** and **Event Sourcing** for complete audit trails.
- Influences **Database per Service** and **Polyglot Persistence** decisions regarding encryption and storage choices.

### Simple High-Level Example (Conceptual)
```text
Sensitive Data System - Payment Context

- All cardholder data is tokenized or encrypted at entry point
- Payment Aggregate never stores raw card numbers
- Access to sensitive operations requires elevated policy evaluation
- Every read/write of sensitive data is audited with immutable logs
- Personal data has automatic retention & deletion policies
- Consent management is part of the domain model
```

### References
- [Sensitive Data Management — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/sensitive-data)
- [Data Privacy and Protection Patterns — OWASP](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Handling Sensitive Data in Domain-Driven Design — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/sensitive-data-in-ddd/)
- [Protecting Sensitive Data in Microservices — InfoQ](https://www.infoq.com/articles/protecting-sensitive-data-microservices/)
- [GDPR & Sensitive Data Architecture Patterns — European Data Protection Board Guidelines](https://edpb.europa.eu/)
- [PCI-DSS and Sensitive Data Handling Patterns — PCI Security Standards Council](https://www.pcisecuritystandards.org/)