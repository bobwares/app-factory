# ADR - Turn 4: NestJS Backend Architecture Decisions

- **Date**: 2026-03-28T19:27:34Z
- **Agent**: AI Coding Agent (Claude Opus 4.5)
- **Status**: Accepted

---

## Decision 1: Fastify over Express

**Context**: NestJS supports both Express and Fastify as HTTP adapters. The tech stack profile specifies Fastify.

**Decision**: Use `@nestjs/platform-fastify` as the HTTP adapter.

**Rationale**:
- Fastify offers better performance benchmarks than Express
- Native async/await support aligns with NestJS patterns
- Built-in schema validation capabilities
- Better TypeScript integration

**Consequences**:
- Some Express middleware may not be directly compatible
- Fastify-specific request/response types required in guards and interceptors

---

## Decision 2: OpenTelemetry SDK Early Initialization

**Context**: OpenTelemetry requires SDK initialization before any other imports to properly instrument libraries.

**Decision**: Create a separate `tracing.ts` module imported first in `main.ts` before NestJS bootstrap.

**Rationale**:
- Auto-instrumentation hooks must be registered before instrumented libraries load
- Separating tracing setup improves testability (can mock or skip in tests)
- Clear initialization order documented in entry point

**Consequences**:
- Import order in main.ts is critical and must be maintained
- Tracing module cannot use other application services

---

## Decision 3: AsyncLocalStorage for Correlation ID Propagation

**Context**: Correlation IDs must be accessible throughout request lifecycle without explicit passing.

**Decision**: Use Node.js `AsyncLocalStorage` to store correlation ID, accessible via middleware and interceptors.

**Rationale**:
- Native Node.js API, no external dependencies
- Automatic propagation through async boundaries
- Compatible with OpenTelemetry trace context

**Consequences**:
- Slightly more complex than passing through request object
- Must ensure middleware runs before any service that needs correlation ID
