**The Anti-Corruption Layer Pattern** is a high-level architectural pattern that protects a bounded context from the influence of external systems, legacy code, or foreign models by placing a translation and isolation layer between them.

### Core Idea
The Anti-Corruption Layer (ACL) acts as a protective barrier that translates data, concepts, and protocols from an external system into the language and model of your own bounded context. It prevents “corruption” of your clean domain model by foreign concepts, data structures, or business rules.

- It sits between your domain and the external/legacy system.
- Translates incoming data into your Ubiquitous Language and domain objects.
- Translates outgoing requests from your model to the external system’s format.
- Contains mapping, adaptation, and sometimes caching or resilience logic.
- Can be bidirectional (protecting both sides if needed).

### Why It Exists (High-Level Benefits)
- **Domain Purity** — Keeps your bounded context’s model clean and expressive.
- **Isolation** — External system changes have minimal impact on your domain.
- **Maintainability** — All translation and adaptation logic is in one place.
- **Resilience** — Can add retry, circuit breaker, or fallback logic without polluting the domain.
- **Controlled Integration** — Allows gradual migration or coexistence with legacy systems.

### DDD Signals for Selecting This Pattern
Use the **Anti-Corruption Layer Pattern** when the following signals appear in your Domain-Driven Design work:

- You are integrating with a legacy system, third-party service, or another bounded context whose model conflicts with yours.
- The external model uses different concepts, naming, or rules that could “corrupt” your Ubiquitous Language.
- Direct integration would force awkward compromises in your domain model.
- You need to translate between two significantly different models.
- The external system is unstable, slow, or has poor design.
- You are gradually replacing or strangling a legacy system.

### Relationship to Other Patterns
- Often used together with **External System Adapter Pattern** and **Ports & Adapters**.
- Complements **Strangler Fig Pattern** during legacy modernization.
- Works well with **Domain-Centric Architecture** and **Hexagonal Architecture**.
- Frequently combined with **Outbox Pattern** and **Event-Driven Integration**.
- Helps maintain **Rich Domain Model** integrity when integrating externally.

### Simple High-Level Example (Conceptual)
```text
Your Domain (Clean Model)          Anti-Corruption Layer          Legacy System (Messy Model)

Order Aggregate                     ACL Translator
  PlaceOrder()                   ↔  Converts Order → LegacyOrderFormat
  CalculateTotal()                    Handles legacy quirks & errors
                                      Maps back LegacyResponse → DomainEvent
```

The domain never sees legacy field names, odd status codes, or foreign business rules.

### References
- [Anti-Corruption Layer Pattern — Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)
- [Anti-Corruption Layer — Martin Fowler](https://martinfowler.com/bliki/AntiCorruptionLayer.html)
- [Anti-Corruption Layer in DDD — Vaughn Vernon](https://kalele.io/anti-corruption-layer/)
- [Implementing Anti-Corruption Layer — Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/anti-corruption-layer/)
- [Anti-Corruption Layer Explained — Baeldung](https://www.baeldung.com/ddd-anti-corruption-layer)
- [Strangler Fig + Anti-Corruption Layer — Microsoft Docs](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)