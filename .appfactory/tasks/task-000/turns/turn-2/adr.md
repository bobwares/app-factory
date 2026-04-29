# ADR - Turn 2: Spring Boot Project Structure and Observability Stack

- **Date**: 2026-03-28
- **Time**: 17:28:32 UTC
- **Agent**: AI Coding Agent (Claude Opus 4.5)
- **Status**: Accepted

---

## Context

User requested scaffolding of a Spring Boot backend based on the `container-java-springboot` tech stack profile. This profile specifies Java 21, Spring Boot, containerized deployment to AWS ECS Fargate, OAuth2 JWT authentication, and OpenTelemetry-based observability.

## Decision 1: Spring Boot 3.2.x with Java 21

**Choice**: Use Spring Boot 3.2.4 with Eclipse Temurin JDK/JRE 21.

**Rationale**:
- Profile specifies JVM 21 runtime
- Spring Boot 3.2.x is the current stable line with full Java 21 support
- Eclipse Temurin is the community standard for production JDK images

**Alternatives Considered**:
- Spring Boot 3.3.x (pre-release, less stable)
- Amazon Corretto (vendor-specific)

## Decision 2: Observability Architecture

**Choice**: Micrometer + OpenTelemetry with OTLP export, plus Logstash JSON encoder.

**Rationale**:
- Profile specifies `tracing: opentelemetry` and `metrics: micrometer`
- Micrometer's OTEL bridge provides native Spring Boot integration
- OTLP is the standard protocol for telemetry export
- Logstash encoder provides structured JSON logs compatible with CloudWatch

**Alternatives Considered**:
- AWS X-Ray SDK only (less portable, vendor lock-in)
- Zipkin (older protocol, less adoption)

## Decision 3: Security Configuration

**Choice**: Profile-based security with OAuth2 JWT for production, disabled for local development.

**Rationale**:
- Profile specifies `authModes: [oauth2-jwt, session, iam-via-ingress]`
- Local development needs friction-free testing
- Production requires JWT validation for API endpoints

**Consequences**:
- Local profile bypasses all security (acceptable for dev only)
- Production requires valid JWT issuer configuration

## Decision 4: Correlation ID Propagation

**Choice**: Custom servlet filter with MDC integration for `x-correlation-id`.

**Rationale**:
- Profile specifies `correlationId: x-correlation-id`
- Filter ensures header is captured or generated for every request
- MDC integration enables automatic inclusion in logs and traces

---

## Consequences

- Project is immediately runnable with `docker-compose up`
- Observability is wired but requires OTEL collector for full functionality
- Security requires JWT issuer configuration before production use
- PostgreSQL connection required (via docker-compose or external)
