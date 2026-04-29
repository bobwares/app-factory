# ADR: Define Immediate Implementation Pattern Mapping for Request/Response APIs

## Status
Accepted

## Context

The repository contains high-level architecture pattern documents under `design/patterns`, but it does not yet define how those patterns decompose into the next level of implementation patterns.

The user asked for a new document under `design/implementation` that shows, for each high-level pattern, the next-level patterns used to implement it, starting with the **Request/Response API Pattern** as a test run.

To produce a useful first version, this turn needed to decide:

1. What qualifies as an immediate implementation pattern versus a deeper supporting pattern.
2. How to represent patterns that are always present versus patterns that are only used in some contexts.

## Decision

Create a single expandable document at `design/implementation/High Level Pattern Implementation Map.md` and define the first section for **Request/Response API Pattern**.

Use four classifications:

- **Core** for direct decomposition patterns
- **Common** for typical structural support
- **Conditional** for context-driven patterns
- **Specialization** for narrower variants of the high-level pattern

For **Request/Response API Pattern**, treat these as the immediate next-level implementation patterns:

- **Command Interface Pattern**
- **Query Interface Pattern**
- **Service Layer Pattern**
- **Ports and Adapters Pattern**
- **Secured Application Pattern**
- **Synchronous Integration Pattern**
- **External System Adapter Pattern**
- **CRUD Interface Pattern**
- **Layered Architecture Pattern**

Do not treat patterns such as **RBAC**, **Aggregate**, or **CRUD Data Model** as immediate next-level implementers. They sit one level further down beneath the security, domain, or persistence structures used by the API.

## Consequences

- The repo now has a clear format for expanding implementation-pattern mappings across the rest of the high-level pattern catalog.
- The first mapping distinguishes direct implementers from deeper supporting patterns, which should reduce ambiguity as more sections are added.
- Future additions can extend the same document pattern-by-pattern without redesigning the format.
