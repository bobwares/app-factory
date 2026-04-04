# App Factory Overview

## Metadata Header

| Field | Value |
|---|---|
| **Document Name** | `App Factory Overview.md` |
| **Title** | **App Factory Overview** |
| **Version** | `1.1.0` |
| **Status** | `Draft` |
| **Owner** | **Architecture / Product / App Factory** |
| **Scope** | **Overview of the App Factory model, workflow, and delivery architecture** |
| **Primary Use** | **Explain how App Factory combines factory assets and coding agent configuration to produce governed application products** |
| **Location** | `docs/App Factory Overview.md` |
| **Last Updated** | `2026-04-02` |
| **Related Artifacts** | **PRD**, **DDD**, **DSL**, **Task Plan**, **Coding Agent Config**, **Tech Stack Profiles**, **Implementation Templates** |

## Build Enterprise Applications with Conformity, Speed, and Control

**App Factory** is a structured system for **AI-driven application generation**.

It is not just a template repository, and it is not just a DSL. It is a delivery model that connects architecture inputs, approved implementation stacks, and coding agent execution so new applications start from a governed baseline instead of a blank page.

The goal is straightforward: reduce variance at the start of delivery so the applications produced by different teams still look like they belong to the same platform.

## What App Factory Is

### A Controlled Starting Point for Generation

App Factory provides approved stack profiles, implementation baselines, documentation patterns, and generation inputs that coding agents can use without having to invent structure from scratch.

That means a new project begins with:

- approved tech stacks
- expected folder structures
- observability and operational patterns
- testing and validation expectations
- generation-oriented documentation

### A Bridge Between Architecture and Delivery

App Factory closes the gap between the documents people write and the systems teams need to ship.

It creates a traceable path from:

1. business intent
2. product definition
3. domain design
4. tech stack selection
5. DSL specification
6. task planning
7. coding agent execution

## Why This Matters

Most enterprise delivery problems do not come from the inability to write code. They come from inconsistent starts.

When every team chooses its own structure, conventions, logging strategy, testing posture, and deployment shape, the organization ends up maintaining many unrelated systems instead of one coherent platform.

App Factory addresses that problem by creating a **golden path** with controlled flexibility. Teams can choose among approved options, but they do so inside a system that still preserves standards, governance, and reuse.

## The Core Inputs

App Factory works best when five inputs are defined before generation begins.

### Product Requirements

The **PRD** defines what the application must do, who it serves, which workflows matter, and what success looks like.

### Domain Design

The **DDD or domain design document** defines the business language, entities, rules, workflows, boundaries, and invariants that shape the system.

### Target Tech Stack

The selected tech stack identifies the approved implementation baseline the application will inherit.

Examples might include:

- **Next.js + NestJS**
- **Angular + Spring Boot**
- **Python backend + Next.js frontend**
- **Monorepo or multi-repo delivery**

### Application DSL

The **DSL** is the structured system description that turns the PRD and domain design into implementation-ready definitions for UI, APIs, workflows, validation, integration points, and infrastructure intent.

### Task Plan

The **task plan** converts the selected stack and DSL into execution units that a coding agent orchestrator can route to individual coding agents.

## Delivery Architecture

The App Factory works with the coding agent config to produce application products.

The architecture is:

```text
PRD + Domain Design + Target Tech Stack + DSL + Task Plan
                          |
                          v
                    App Factory
        approved stacks, templates, patterns, docs
                          |
                          v
                Coding Agent Configuration
      orchestrator, skills, guardrails, review rules,
            task/turn tracking, validation policy
                          |
                          v
                 Application Products
   generated code, tests, ADRs, docs, deployable systems
```

### What App Factory Provides

App Factory provides the reusable assets:

- tech stack profiles
- implementation templates
- reference patterns
- DSL conventions
- documentation prompts
- repository standards

### What the Coding Agent Config Provides

The coding agent configuration provides the execution behavior:

- orchestration rules
- skill activation
- branch and turn workflow
- governance checks
- traceability artifacts
- review and refinement loops

### What the Output Looks Like

When those two layers work together, the output is not just code. The output is an application product with implementation, tests, decision records, and supporting delivery artifacts produced inside an expected operating model.

## What This Repository Contains

This repository is both a factory asset library and a generation context source.

It contains:

- approved stack profiles under `tech-stack-profiles/`
- implementation baselines under `tech-stack-implementations/`
- prompts that guide planning and documentation
- documentation that explains architecture and workflow
- agentic pipeline artifacts used to track task and turn execution

## How to Use App Factory

### The Practical Workflow

1. **Write the PRD**
2. **Create the domain design**
3. **Choose the target tech stack**
4. **Describe the application in the DSL**
5. **Generate Task Plan**
6. **Pass the plan to the coding agent orchestrator**
7. **Coding Agents act on individual tasks to generate the application**
8. **Review and refine**
9. **Feed improvements back into the factory**

This workflow matters because it separates intent, design, structure, and execution into explicit stages. That improves traceability and gives coding agents better inputs than a single free-form prompt ever could.

## Why the Workflow Produces Better Results

### Better AI Outcomes

Coding agents perform better when the problem is constrained by:

- a known stack
- known conventions
- a clear domain model
- a precise DSL
- explicit task boundaries

### Faster Delivery

Teams spend less time rebuilding scaffolding and more time on application-specific behavior.

### Better Governance

Standards are pushed into the workflow itself instead of being checked only after code already exists.

### Lower Operational Risk

Applications begin from implementation baselines that already account for structure, testing, observability, and operational readiness.

## What App Factory Is Not

### Not a Toy Generator

The goal is not to produce disposable demos. The goal is to produce serious starting points for enterprise delivery.

### Not Just a UI DSL

The DSL is broader than screens and forms. It describes application behavior, service boundaries, workflows, validation, and infrastructure intent.

### Not a Replacement for Product or Architecture Work

App Factory does not remove the need for good requirements or domain design. It depends on them.

### Not a Single-Stack Mandate

The purpose is not to force one framework on every team. The purpose is to support multiple approved choices while preserving conformity.

## A Simple Mental Model

Think of App Factory as a production line for software foundations.

The application-specific ideas still come from the product team, architects, and domain experts. App Factory standardizes how those ideas are translated into generation-ready inputs and how coding agents turn those inputs into governed application products.

That is the value of the model: stronger starts, better reuse, clearer execution, and more consistent systems over time.
