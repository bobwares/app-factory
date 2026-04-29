# Pattern Selection Example: Healthcare Claim Processing

## 1. Purpose

This document provides a **concrete pattern selection walkthrough** for a healthcare claim processing system using the App Factory model.

It demonstrates how:

```text
PRD → DDD → AAP → AIP → TSP → DP
```

results in a complete, governed system definition.

---

## 2. Business Scenario

A claims processor:

* Enters a healthcare claim for a customer
* System checks insurance coverage
* Calculates deductible vs insurer responsibility
* Updates year-to-date totals
* Sends Explanation of Benefits (EOB)
* Sends payment to provider

---

## 3. PRD Signals

| Signal                     | Description                            |
| -------------------------- | -------------------------------------- |
| State-changing user action | Claims processor submits a claim       |
| Financial calculation      | Deductible, insurer responsibility     |
| Policy-based decisioning   | Coverage rules determine outcomes      |
| Asynchronous side effects  | Email + payment                        |
| External integrations      | Payment provider, email system         |
| Sensitive data             | Healthcare + financial                 |
| Auditability               | Claim decisions must be traceable      |
| Operational visibility     | Failures must be diagnosable           |
| Production deployment      | Requires CI/CD and deployment strategy |

---

## 4. DDD Signals

| DDD Element                        | Description                         |
| ---------------------------------- | ----------------------------------- |
| **Aggregate: Claim**               | Lifecycle and adjudication state    |
| **Aggregate: Policy**              | Coverage rules and YTD totals       |
| **Command: CreateClaim**           | Entry point for claim submission    |
| **Domain Service: CoveragePolicy** | Coverage and deductible calculation |
| **Domain Event: ClaimAdjudicated** | Downstream trigger                  |
| **Integration Events**             | EOB email, provider payment         |
| **Outbound Ports**                 | Payment provider, email system      |
| **Actors**                         | Claims processor                    |
| **Sensitive Data**                 | Healthcare + financial              |
| **Workflow**                       | Multi-step process                  |

---

## 5. Selected Application Architecture Patterns (AAP)

| Pattern                          | Reason                                      |
| -------------------------------- | ------------------------------------------- |
| **Request/Response API**         | User submits claim and expects response     |
| **CRUD**                         | Claim is a manageable business object       |
| **Event-Driven Architecture**    | Notifications and payments are asynchronous |
| **Policy-Based Decisioning**     | Coverage and deductible logic               |
| **Observable Service**           | Must be diagnosable in production           |
| **Secured Business Application** | Sensitive data + controlled access          |

---

## 6. Selected Application Implementation Patterns (AIP)

### Interface

* command_endpoint
* input_validation_boundary
* error_handling_boundary

### Application Service

* application_service
* command_handler

### Domain Coordination

* aggregate_root
* domain_service
* policy_evaluation
* domain_event

### Persistence

* repository
* transactional_boundary
* optimistic_concurrency
* audit_trail

### Integration

* external_service_adapter
* retry_policy
* timeout_policy
* circuit_breaker

### Messaging

* event_publishing
* event_consumption
* transactional_outbox
* dead_letter_handling

### Security

* authentication_boundary
* authorization_policy
* role_based_access
* data_protection_boundary

### Observability

* structured_logging
* metrics_collection
* distributed_tracing
* health_visibility

### Reliability

* idempotency_boundary
* compensation

---

## 7. Selected Technology Stack Patterns (TSP) — Java Spring

### API Layer

* REST controller
* request DTO
* response DTO
* validation annotations
* exception handler

### Service Layer

* service component
* dependency injection

### Persistence

* JPA entity
* JPA repository
* migration scripts

### Messaging

* Kafka producer
* Kafka consumer

### Integration

* WebClient / RestClient
* adapter component

### Security

* OAuth2 resource server
* method security

### Observability

* Actuator
* Micrometer
* OpenTelemetry

### Resilience

* Retry
* Circuit breaker
* Timeout

---

## 8. Selected Delivery Patterns (DP)

### CI / Quality

* CI pipeline
* unit test gate
* integration test gate
* security scan gate

### Artifact

* container image build
* artifact publishing
* SBOM generation

### Database

* migration gate
* rollback migration

### Deployment

* rolling deployment
* rollback strategy

### Environment

* environment promotion
* secrets injection

### Governance

* release approval

### Operational Readiness

* smoke test
* health check gate

---

## 9. End-to-End Pattern Flow

```text
CreateClaim (PRD)
  → Claim Aggregate (DDD)
  → CRUD + Request/Response API (AAP)
  → Command Endpoint + Application Service (AIP)
  → Spring REST Controller + Service (TSP)
  → CI Pipeline + Rolling Deployment (DP)
```

---

## 10. Key Observations

### 10.1 Separation of Concerns

* **AAP** defines system shape
* **AIP** defines logical implementation
* **TSP** defines framework realization
* **DP** defines delivery and operation

---

### 10.2 Governance

Every layer is:

* explicitly selected
* traceable
* reproducible
* replaceable

---

### 10.3 Portability

Only **TSP changes** when switching stacks:

```text
Spring → NestJS → Serverless
```

AAP and AIP remain unchanged.

---

## 11. Outcome

This selection produces:

* consistent architecture
* governed implementation
* production-ready system
* traceability from business intent to deployment

---

## 12. Download

Copy this document and save as:

```
healthcare-claim-pattern-selection.md
```
