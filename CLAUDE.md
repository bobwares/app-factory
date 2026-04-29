# App Factory

AI-driven application generation system with governed tech stacks, architecture patterns, and coding agent workflows.

## Quick Reference

| Asset | Location |
|-------|----------|
| Tech Stack Profiles | `tech-stack-profiles/` |
| Implementation Templates | `tech-stack-implementations/` |
| Architecture Patterns | `patterns/` |
| Project Definitions | `projects/` |
| Documentation | `docs/` |
| Generation Prompts | `prompts/` |

## Repository Purpose

App Factory is the **asset library** for enterprise application generation. It provides:

- Approved tech stack profiles (YAML definitions)
- Concrete implementation baselines (working code templates)
- Architecture patterns (technology-agnostic design patterns)
- DSL conventions and documentation

The coding agent configuration (skills, hooks, task/turn tracking) lives in `coding-agents-config`. This repo supplies the **what**, that repo supplies the **how**.

## Directory Structure

```
app-factory/
├── tech-stack-profiles/       # Stack definitions (YAML)
│   ├── backend/               # Java Spring, NestJS, FastAPI
│   ├── ui/                    # React, Next.js
│   ├── persistence/           # PostgreSQL, etc.
│   ├── stacks/                # Combined full-stack profiles
│   └── iac/                   # Infrastructure profiles
├── tech-stack-implementations/ # Working code baselines
│   ├── backend/
│   ├── ui/
│   ├── persistence/
│   └── stacks/
├── patterns/                  # Architecture pattern library
│   ├── architecture-patterns.md
│   └── architecture-patterns.yaml
├── projects/                  # Project definition files
├── docs/                      # Workflow and architecture docs
├── prompts/                   # Generation prompt templates
└── .appfactory/               # Task/turn tracking artifacts
```

## Supported Tech Stacks

### Backend

| Stack | Language | Framework |
|-------|----------|-----------|
| `container-java-springboot` | Java 21 | Spring Boot 3.2 |
| `container-typescript-nestjs` | TypeScript | NestJS 10 |
| `container-python-fastapi` | Python 3.12 | FastAPI |

### Frontend

| Stack | Framework |
|-------|-----------|
| `react-spa-container-nginx` | React 18 + Vite |

### Persistence

| Stack | Database |
|-------|----------|
| `postgresql-service` | PostgreSQL 16 |

### Combined Stacks

| Stack | Components |
|-------|------------|
| `container-python-fastapi__react-spa-container-nginx` | FastAPI + React + OTEL |

## Common Capabilities

All implementation stacks include:

- OpenTelemetry tracing
- Prometheus metrics endpoint
- Structured JSON logging with correlation IDs
- OAuth2-JWT authentication (with local bypass)
- Health check endpoints (liveness/readiness)
- Docker + Docker Compose
- Framework-appropriate test suites

## Generation Pipeline

```
PRD → DDD → DSL → Pattern Selection → Tech Stack → Generated Code
```

1. **PRD**: Business requirements, actors, workflows
2. **DDD**: Domain model, entities, aggregates, bounded contexts
3. **DSL**: Machine-readable system specification
4. **Pattern Selection**: Architecture patterns from `patterns/`
5. **Tech Stack**: Implementation baseline from `tech-stack-implementations/`
6. **Generated Code**: Application product with tests, ADRs, deployment config

## Key Skills

| Skill | Purpose |
|-------|---------|
| `/list-tech-stacks` | List available tech stack profiles |
| `/implement-tech-stack` | Copy implementation baseline to target project |
| `/af-be-build-prd` | Generate PRD from business requirements |
| `/af-be-build-ddd` | Generate DDD from PRD |
| `/af-be-build-dsl` | Generate DSL from DDD |
| `/af-be-build-plan` | Generate execution plan from DSL |
| `/af-be-build-implementation` | Generate code from plan + stack |

## Architecture Patterns

The `patterns/` directory contains 30 technology-agnostic architecture patterns across 7 categories:

- **API/Interface**: api_endpoint, crud_interface, query_interface, command_interface, input_validation, error_handling_boundary
- **Domain**: aggregate_root, domain_service, application_service, domain_event, command_model, query_model
- **Persistence**: repository_pattern, transactional_boundary, optimistic_concurrency, audit_trail, query_specification
- **Integration**: external_service_call, client_adapter, retry_policy, timeout_policy, circuit_breaker
- **Messaging**: event_publishing, event_consumption, asynchronous_processing, transactional_outbox, idempotent_processing, dead_letter_handling
- **Security**: authentication_boundary, authorization_policy, role_based_access, audit_logging_security, data_protection_boundary
- **Observability**: health_visibility, metrics_collection, distributed_tracing, structured_logging, correlation_propagation

Patterns are selected based on PRD signals and DDD constructs, then mapped to tech stack implementations.

## Working with This Repo

### Adding a New Stack Profile

1. Create YAML under `tech-stack-profiles/{category}/`
2. Follow naming: `{container-type}-{language-framework}.yaml`
3. Include: metadata, capabilities, dependencies, configuration schema

### Adding a New Implementation

1. Create directory under `tech-stack-implementations/{category}/`
2. Include: Dockerfile, docker-compose.yml, README.md, source code, tests
3. Ensure: OTEL tracing, structured logging, JWT auth, health endpoints
4. Add entry to `tech-stack-profiles/` referencing the implementation

### Creating a Project Definition

1. Create YAML under `projects/`
2. Include: project metadata, selected stacks, domain references
3. Reference: PRD, DDD, DSL artifacts

## Build Commands

```bash
# Run a backend stack
cd tech-stack-implementations/backend/container-java-springboot
docker-compose up --build

# Run full stack with observability
cd tech-stack-implementations/stacks/container-python-fastapi__react-spa-container-nginx
docker compose up --build

# PostgreSQL with pgAdmin
cd tech-stack-implementations/persistence/postgresql-service
make up-tools
```

## Related Repositories

| Repo | Purpose |
|------|---------|
| `coding-agents-config` | Agent runtime, skills, hooks, task/turn tracking |
| `customer-app` (example) | Consumer project using App Factory pipeline |

## Conventions

- Stack profiles use YAML with strict schema
- Implementation baselines are working, tested code
- All stacks support Docker deployment
- Observability is mandatory, not optional
- Patterns are technology-agnostic; implementations are stack-specific
