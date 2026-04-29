# ADR: Architecture Pattern Library Structure

## Status
Accepted

## Context
App Factory needs technology-agnostic architecture patterns that exist above implementation layer. Patterns drive system design decisions BEFORE choosing tech stack. Required for PRD → DDD → DSL → Pattern Selection → Tech Stack Implementation pipeline.

## Decision
Created dual-format pattern library:
- `patterns/architecture-patterns.md` — human-readable Markdown
- `patterns/architecture-patterns.yaml` — machine-parseable YAML DSL

30 patterns across 7 categories:
- API/Interface (6): api_endpoint, crud_interface, query_interface, command_interface, input_validation, error_handling_boundary
- Domain (6): aggregate_root, domain_service, application_service, domain_event, command_model, query_model
- Persistence (5): repository_pattern, transactional_boundary, optimistic_concurrency, audit_trail, query_specification
- Integration (4): external_service_call, client_adapter, retry_policy, timeout_policy, circuit_breaker
- Messaging (6): event_publishing, event_consumption, asynchronous_processing, transactional_outbox, idempotent_processing, dead_letter_handling
- Security (5): authentication_boundary, authorization_policy, role_based_access, audit_logging_security, data_protection_boundary
- Observability (5): health_visibility, metrics_collection, distributed_tracing, structured_logging, correlation_propagation

Each pattern includes:
- Trigger conditions (PRD/DDD signals)
- Selection rules (all_of, any_of, not)
- Logical components and interactions
- Dependencies, side effects
- Observability requirements
- Security considerations

## Consequences
- Patterns can be selected automatically based on PRD/DDD analysis
- Tech stack implementations can reference patterns by name
- Machine-readable format enables pattern compiler tooling
- No framework-specific details pollute architecture layer
