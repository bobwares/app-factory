# ADR: Extend the Domain Pattern Library with Strategic and Tactical DDD Building Blocks

## Status
Accepted

## Context

The existing pattern library under `design/patterns` covered many architectural styles, integration choices, and workflow patterns, but it was still missing several foundational Domain-Driven Design concepts that other documents already assumed.

The user asked to create prioritized backlog items 2 through 5 using `docs/pattern-template.md`, which corresponded to:

1. **Bounded Context Pattern**
2. **Context Map Pattern**
3. **Domain Event Pattern**
4. **Repository Pattern**

This turn needed to decide where these documents belong in the taxonomy and whether to treat them as domain-level patterns versus data or integration patterns.

## Decision

Add four new documents under `design/patterns/Domain Architecture Patterns/`:

- `Bounded Context Pattern.md`
- `Context Map Pattern.md`
- `Domain Event Pattern.md`
- `Repository Pattern.md`

Also update `design/patterns/High Level Architecture Patterns List.md` to register all four patterns under **Domain Architecture Patterns**.

Classify them this way because:

- **Bounded Context** and **Context Map** are strategic DDD boundary-definition patterns.
- **Domain Event** is a core domain-modeling pattern, even when it later drives integration.
- **Repository** is a domain-facing persistence abstraction that supports aggregates and domain-centric design rather than a raw data-storage pattern.

## Consequences

- The pattern library now covers several foundational DDD concepts that were previously implicit but undocumented.
- The domain pattern category now connects more cleanly to existing documents such as **Aggregate**, **Service Layer**, **Ports and Adapters**, **CQRS**, and **Anti-Corruption Layer**.
- Future pattern additions can build on these new documents instead of re-explaining basic DDD strategic and tactical concepts in other files.
