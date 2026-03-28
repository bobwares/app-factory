# App Factory

## Build Enterprise Applications with Conformity, Speed, and Control

**App Factory** is a structured system for **AI-driven application generation**.

It is not just a repo of starter templates. It is not just a code generator. It is not just a DSL.

It is an **enterprise application creation model**.

The premise is simple: if every team starts from a different stack, a different folder layout, a different logging model, a different testing strategy, and a different interpretation of architecture, the result is predictable. You do not get one platform. You get a collection of unrelated applications that happen to live inside the same company.

**App Factory** is designed to solve that.

It combines:

* **Curated implementation stacks**
* **Architecture and domain inputs**
* **A system-level DSL**
* **AI coding agent workflows**
* **Enterprise guardrails**

The outcome is a repeatable path from idea to implementation, with **less variance**, **better governance**, and **higher confidence** that what gets generated can actually live in production.

---

## Supported Stacks

### Backend Implementations

| Stack | Language | Framework | Runtime | Key Features |
|-------|----------|-----------|---------|--------------|
| `container-java-springboot` | Java 21 | Spring Boot 3.2.x | Docker (Temurin JRE 21) | Maven, Micrometer metrics, Logstash logging |
| `container-typescript-nestjs` | TypeScript | NestJS 10.x | Node.js 22 | Fastify, Vitest, Pino logging, class-validator |
| `container-python-fastapi` | Python 3.12 | FastAPI | Uvicorn | Pydantic v2, pytest, structlog |

### UI/Frontend Implementations

| Stack | Framework | Build Tool | Runtime | Key Features |
|-------|-----------|------------|---------|--------------|
| `react-spa-container-nginx` | React 18 | Vite | nginx (Alpine) | TypeScript, Vitest, Testing Library, SPA routing |

### Persistence Implementations

| Stack | Database | Version | Key Features |
|-------|----------|---------|--------------|
| `postgresql-service` | PostgreSQL | 16 (Alpine) | Versioned migrations, pgAdmin, audit triggers, uuid-ossp |

### Combined Stacks

| Stack | Components | Description |
|-------|------------|-------------|
| `container-python-fastapi__react-spa-container-nginx` | FastAPI + React + nginx | Full-stack with OTEL Collector, Jaeger, Prometheus |

### Common Capabilities Across All Stacks

Every implementation stack includes:

| Capability | Implementation |
|------------|----------------|
| **Observability** | OpenTelemetry tracing with OTLP export |
| **Metrics** | Prometheus-compatible endpoints |
| **Logging** | Structured JSON with correlation ID propagation |
| **Authentication** | OAuth2-JWT with local bypass option |
| **Health Checks** | Liveness and readiness probes |
| **Containerization** | Docker + Docker Compose |
| **Testing** | Framework-appropriate test suites |

---

## Repository Structure

```
app-factory/
├── tech-stack-implementations/
│   ├── backend/
│   │   ├── container-java-springboot/      # Spring Boot 3.2 + Java 21
│   │   ├── container-typescript-nestjs/    # NestJS 10 + Node 22
│   │   └── container-python-fastapi/       # FastAPI + Python 3.12
│   ├── ui/
│   │   └── react-spa-container-nginx/      # React 18 + Vite + nginx
│   ├── persistence/
│   │   └── postgresql-service/             # PostgreSQL 16 + migrations
│   └── stacks/
│       └── container-python-fastapi__react-spa-container-nginx/  # Combined
├── ai/
│   └── agentic-pipeline/                   # AI agent turn tracking
├── prompts/                                # Generation prompts
└── docs/                                   # Architecture documentation
```

---

## What App Factory Is

### A Controlled Starting Point for AI Code Generation

At its core, **App Factory** provides a set of **approved implementation templates** for common enterprise stacks.

These are not empty starters. They are **working, opinionated baselines** with the kinds of things enterprise teams actually need from day one:

* **Telemetry** (OpenTelemetry traces, Prometheus metrics)
* **Structured Logging** (JSON format, correlation IDs)
* **Testing** (Unit tests, framework-specific runners)
* **Authentication** (JWT validation, local bypass)
* **Health Endpoints** (Kubernetes-ready probes)
* **Configuration Conventions** (Environment-based, secrets-safe)
* **Project Structure** (Consistent across stacks)
* **Operational Readiness** (Docker Compose, observability stack)

That means when a new application begins, the team is not starting with a blank page. They are starting from a **known-good foundation**.

### A Bridge Between Architecture and Delivery

App Factory connects several layers that are often disconnected in real software delivery:

1. **Business intent**
2. **Requirements**
3. **Domain design**
4. **System description**
5. **Implementation selection**
6. **AI-assisted code generation**

Instead of jumping from a vague idea directly into code, App Factory creates a defined pipeline that turns architecture into implementation with far less ambiguity.

---

## Why This Matters

### The Enterprise Problem

Most organizations do not fail because they cannot write code. They fail because they cannot produce **consistent systems**.

Without a factory model, application delivery tends to drift into:

* Different frameworks solving the same problem in different ways
* Inconsistent telemetry and operational patterns
* Different naming conventions and directory structures
* Varying test quality
* Duplicated architectural decisions
* Fragile onboarding for new teams
* High maintenance cost over time

The result is architectural sprawl.

### The App Factory Response

App Factory introduces a **golden path**.

It does not eliminate flexibility. It creates **controlled flexibility**.

Teams can still choose among approved stacks, but the choices are deliberate and standardized. The generated applications still reflect the needs of the business domain, but they do so within a governed framework.

That is the difference between **random code generation** and **enterprise-grade generation**.

---

## The Core Model

### The Inputs

App Factory starts with three major inputs.

#### Product Requirements

The **PRD** defines what the application must do.

This is where business goals, actors, workflows, and success criteria are captured.

#### Domain Design

The **DDD or domain design document** defines the business language and structure.

This is where entities, aggregates, workflows, events, business rules, and domain boundaries are clarified.

#### Application DSL

The **DSL** is the final structured system description.

This is the key handoff into implementation.

The DSL is not limited to UI. It can describe the **entire system**, including:

* **Pages and views**
* **Forms and widgets**
* **APIs**
* **Domain operations**
* **Data flows**
* **Service boundaries**
* **Validation behavior**
* **Integration points**
* **Infrastructure concerns**
* **Deployment intent**

The DSL becomes the machine-readable expression of the system to be built.

---

## How It Works

### Step 1: Start with the Approved Stack

A new application begins by selecting one or more **approved implementation templates** from this repository.

Example combinations:

| Use Case | Backend | Frontend | Persistence |
|----------|---------|----------|-------------|
| TypeScript monolith | `container-typescript-nestjs` | `react-spa-container-nginx` | `postgresql-service` |
| Java enterprise | `container-java-springboot` | `react-spa-container-nginx` | `postgresql-service` |
| Python microservice | `container-python-fastapi` | `react-spa-container-nginx` | `postgresql-service` |
| Full-stack starter | `container-python-fastapi__react-spa-container-nginx` | - | - |

Each stack template represents an **enterprise-ready baseline**, not a toy sample.

### Step 2: Define the Product

The product is described in the **PRD**.

This answers questions such as:

* What problem are we solving?
* Who are the users?
* What are the major workflows?
* What are the success criteria?
* What constraints matter?

### Step 3: Define the Domain

The domain design document turns business intent into a structured model.

This identifies:

* **Core entities**
* **Business rules**
* **State transitions**
* **Responsibilities**
* **Bounded contexts**
* **Relationships between concepts**

This is where the application stops being a feature list and becomes a system.

### Step 4: Describe the System in the DSL

The DSL is where the application becomes **precise enough for generation**.

Here the implementation intent becomes concrete:

* What screens exist
* What APIs are needed
* What validation rules apply
* What workflows exist
* What infrastructure profile is required
* What integrations must be wired in
* What tech targets are selected

### Step 5: Combine the DSL with the Stack Template

The selected stack template and the DSL are combined.

This is where App Factory creates leverage.

The stack contributes:

* Structure
* Tooling
* Conventions
* Infrastructure choices
* Operational standards

The DSL contributes:

* Application-specific behavior
* Domain-specific structure
* UI and service requirements
* Business rules

Together, they provide the context needed for the AI coding agent to generate code that is both **specific** and **governed**.

### Step 6: Send It Into the Coding Agent Workflow

The final bundle is passed into the coding agent skills.

Those skills use:

* The selected stack template
* The PRD
* The domain design
* The DSL
* Repository standards
* Enterprise conventions

From there, the coding agent generates or extends the application while staying inside the expected architecture.

### Step 7: Review, Refine, and Evolve

Generation is not the end. It is the beginning of controlled delivery.

Teams can then:

* Review generated artifacts
* Refine the DSL
* Improve the stack templates
* Add new patterns
* Capture architectural decisions
* Re-run with higher quality inputs

Over time, the factory gets stronger because the templates and workflows improve with use.

---

## Quick Start

### Using a Backend Stack

```bash
# Java + Spring Boot
cd tech-stack-implementations/backend/container-java-springboot
docker-compose up --build

# TypeScript + NestJS
cd tech-stack-implementations/backend/container-typescript-nestjs
npm install && npm run start:dev

# Python + FastAPI
cd tech-stack-implementations/backend/container-python-fastapi
docker compose up --build
```

### Using the Full Stack

```bash
# FastAPI + React + Observability
cd tech-stack-implementations/stacks/container-python-fastapi__react-spa-container-nginx
docker compose up --build

# Access services:
# - React UI:      http://localhost:3000
# - FastAPI Docs:  http://localhost:8000/docs
# - Jaeger:        http://localhost:16686
# - Prometheus:    http://localhost:9090
```

### Using PostgreSQL Persistence

```bash
cd tech-stack-implementations/persistence/postgresql-service
cp .env.example .env
make up

# With pgAdmin UI
make up-tools
# Access: http://localhost:5050
```

---

## What Makes This Valuable

### Consistency Without Starting Over Every Time

App Factory reduces the chaos of custom one-off application starts.

Instead of asking every team to reinvent:

* project layout
* observability
* logging
* validation
* linting
* test setup
* deployment structure

the factory supplies a standard baseline.

### Better AI Outcomes

AI coding agents work best when the problem is well-constrained.

App Factory improves generation quality because it gives the agent:

* a known structure
* a known stack
* known conventions
* a defined domain
* a precise DSL
* expected enterprise guardrails

That means fewer random outputs and more predictable implementations.

### Faster Delivery

Teams spend less time on setup and more time on application-specific logic.

They do not need to rebuild the plumbing for every new project.

### Lower Operational Risk

Because telemetry, testing, structure, and platform conventions are part of the starting point, applications are more likely to be production-ready earlier.

### Better Governance

App Factory supports architectural governance without turning delivery into bureaucracy.

It creates a system where standards are built into the process, instead of being checked only after the fact.

---

## Enterprise Benefits

| Benefit | Description |
|---------|-------------|
| **Standardization** | Shared implementation model reduces fragmentation across teams |
| **Acceleration** | Concept to working baseline in minutes, not days |
| **Quality** | Telemetry, testing, linting, structure already in place |
| **Maintainability** | Consistent layouts reduce long-term support cost |
| **Governance** | Architectural rules enforced through templates |
| **Reusability** | Patterns developed once, reused across applications |
| **Onboarding** | New engineers learn one model instead of many |

---

## What App Factory Is Not

### Not a Toy Generator

This is not about producing demo apps or disposable prototypes.

The goal is to generate systems that can serve as serious starting points for enterprise delivery.

### Not Just a UI DSL

The DSL is not limited to screens and forms. It describes the broader application and system behavior.

### Not a Replacement for Architecture

App Factory does not remove the need for product thinking or domain design.

It strengthens them by creating a direct path from those artifacts into implementation.

### Not a Single Stack Mandate

The goal is not to force one framework on every team. The goal is to allow multiple approved choices while preserving conformity.

---

## Example Flow

### From Idea to Generated Application

A team wants to build a new internal order management platform.

They would:

1. Write the **PRD**
2. Define the **domain design**
3. Create the **system DSL**
4. Select a stack such as **NestJS + React + PostgreSQL**
5. Feed all of that into the coding agent workflow
6. Generate the baseline application
7. Review, refine, and continue delivery from a conformant starting point

Instead of debating project scaffolding, telemetry, or code organization from scratch, the team begins with a consistent platform-aligned implementation.

---

## The Vision

### One Factory, Many Applications, Shared Standards

The long-term vision of App Factory is straightforward:

Create a system where new applications can be generated from well-defined business and technical inputs, using approved stack implementations, inside a governed enterprise model, with AI agents accelerating delivery instead of introducing chaos.

That means fewer disconnected apps.
Fewer accidental architectures.
Fewer inconsistent codebases.

And more of what enterprises actually need:

* **conformity**
* **clarity**
* **speed**
* **quality**
* **confidence**

---

## Contributing

To add a new stack implementation:

1. Create a new directory under the appropriate category (`backend/`, `ui/`, `persistence/`)
2. Follow the naming convention: `{container-type}-{language/framework}`
3. Include: Dockerfile, docker-compose.yml, README.md, health endpoints, tests
4. Ensure OpenTelemetry, structured logging, and JWT auth are configured
5. Add the stack to this README

---

## License

See [LICENSE](LICENSE) for details.
