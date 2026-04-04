# AppFactory Agentic Pipeline Overview

## Purpose

The observed ecosystem appears to be trying to turn application delivery into a governed, repeatable AI-assisted pipeline. In the current filesystem, that pipeline is split across three layers:

- `coding-agents-config` supplies the agent runtime rules, reusable skills, task/turn tracking model, hooks, templates, and setup scripts.
- `app-factory` supplies the reusable factory assets: tech stack profile YAMLs, concrete implementation baselines, workflow docs, prompts, and repo-local helper skills for stack discovery and implementation.
- `customer-app` shows what a consumer project looks like after entering the pipeline: PRD, DDD, DSL, archived prompts/templates, and task/turn records. In its current state, it shows strong planning artifacts but not a materialized application codebase.

At a high level, the pipeline goal is: define the product and domain clearly, choose an approved stack, turn the design into structured DSL and plans, then let coding agents execute work inside a tracked governance model.

## Repositories and Projects Reviewed

### 1. `coding-agents-config`

- Path: `/Users/bobware/coding-agents-config`
- What it appears to contain:
  - Global agent loader files: `AGENTS.md`, `CLAUDE.md`, `README.md`
  - Shared skill library under `skills/`
  - Setup and enforcement assets under `scripts/`, `hooks/`, and `templates/`
  - Its own `ai/agentic-pipeline/` history and `tasks_index.csv`
  - A nested `agentic-pipeline-config/` package with a copy of the turn/task instructions
- Why it matters:
  - This repo defines the execution contract for agent work. `CLAUDE.md` requires `session-start`, `task-init` or `turn-init`, and `turn-end`, and forbids writing on `main` or `master`.
  - The reusable skills define the pipeline stages: `project-init`, `af-be-build-prd`, `af-be-build-ddd`, `af-be-build-dsl`, `af-be-build-plan`, `af-be-build-implementation`, and `app-from-dsl`.
  - The repo is also the source of the `~/.claude` symlinks described in `README.md`, so it acts as the central agent configuration project.

### 2. `app-factory`

- Path: `/Users/bobware/gallery/app-factory`
- What it appears to contain:
  - Factory documentation in `docs/`, especially `App Factory Overview.md` and `App Factory Workflow.md`
  - Tech stack taxonomy in `tech-stack-profiles/`
  - Concrete reusable baselines in `tech-stack-implementations/`
  - Repo-local helper skills in `./.claude/skills/implement-tech-stack/` and `./.claude/skills/list-tech-stacks/`
  - Prompt files in `prompts/` and `ai/prompts/`
  - A sample project definition in `projects/customer-profile-app.yaml`
  - Its own `ai/agentic-pipeline/` task/turn history
- Why it matters:
  - This is the asset library that the coding agent pipeline is meant to consume.
  - It defines the approved stack options and the baseline implementation shape for those stacks.
  - It also shows the factory repo itself being evolved through the same task/turn governance model that it expects downstream projects to use.

### 3. `customer-app`

- Path: `/Users/bobware/gallery/customer-app`
- What it appears to contain:
  - A lightweight project README
  - Current spec artifacts in `ai/specs/`, notably `spec-be-prd.md`, `spec-be-ddd.md`, `dsl-be-ddd.yaml`, and `project.dsl.yaml`
  - Agentic pipeline history in `ai/agentic-pipeline/`
  - Archived prompts, templates, PRDs, DDDs, and plan files under `archive/`
- Why it matters:
  - This is the best available example of how a customer project enters and progresses through the pipeline.
  - It shows the planning and documentation stages in practice.
  - It also reveals where the current pipeline is incomplete or drifting, because the repository currently lacks a normal generated app code layout such as `apps/`, `app/`, or `src/`.

## Pipeline Architecture

The observed architecture has five main layers.

### 1. Configuration and Agent Setup

The configuration layer lives in `/Users/bobware/coding-agents-config`.

- `README.md` describes symlinking `skills/`, `hooks/`, `templates/`, `scripts/`, `CLAUDE.md`, and `settings.json` into `~/.claude`.
- `CLAUDE.md` defines the branch gate, task/turn lifecycle, required artifacts, and commit-message pattern.
- `skills/session-start/`, `skills/task-init/`, `skills/turn-init/`, and `skills/turn-end/` implement the core execution protocol.
- `hooks/branch-guard.sh` exists to block edits on `main` or `master`.

This layer is the operating system for the agentic pipeline.

### 2. Skills, Templates, Prompts, and Orchestration Assets

The same config repo also contains the staged build skills.

- `skills/project-init/` scaffolds a new AppFactory project.
- `skills/af-be-build-prd/`, `skills/af-be-build-ddd/`, `skills/af-be-build-dsl/`, and `skills/af-be-build-plan/` define the requirements-to-plan path.
- `skills/af-be-build-implementation/` defines the implementation-copy and codegen step from a selected AppFactory implementation plus a backend DSL.
- `skills/app-from-dsl/` defines a more direct DSL-to-code orchestrator for a monorepo pattern with NestJS, Prisma, Next.js, HTTP test files, and related child skills.
- `skills/project-init/templates/` and the `af-be-build-*` template folders provide reusable markdown and YAML templates.

This layer is the generation procedure library.

### 3. Project Scaffolding

The scaffold model is defined most explicitly in `skills/project-init/SKILL.md`.

- It creates a new repo with `README.md`, `.gitignore`, `ai/prompts/`, and `ai/specs/`.
- It expects a multi-stage authoring flow across shared, backend, frontend, plan, and template artifacts.
- It initializes Git and tries to publish a repo through GitHub if `gh` is authenticated.

The `customer-app` repo partly reflects this scaffold, but not perfectly. It has `ai/specs/` and task artifacts, but `ai/prompts/` is currently missing and many prompt/template assets are instead under `archive/`.

### 4. Planning and Execution Flow

The intended flow appears repeatedly across the repos.

- `app-factory/docs/App Factory Workflow.md` documents the long-form workflow from business scope to implementation and review.
- `app-factory/docs/App Factory Overview.md` documents the shorter practical path: PRD, domain design, tech stack, DSL, task plan, coding agent execution, review, feedback.
- The `af-be-build-*` skills in `coding-agents-config` encode the same sequence in procedural form.
- `customer-app` task history shows that the project has actually been worked through a similar sequence:
  - task 001: PRD-to-DDD
  - task 002: DDD plus implementation plan
  - task 004: AppFactory scaffold adoption plus DDD v2.3 regeneration
  - task 005: DSL generation and review preparation

This layer converts specs into agent-executable work.

### 5. Generated Application Output

The output layer is represented clearly in AppFactory, but only partially in the customer app.

- `app-factory/tech-stack-implementations/` contains the concrete baselines that should be copied into target projects.
- The monorepo stack `container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo` includes `apps/api`, `apps/web`, `packages/config`, `packages/types`, `packages/ui`, `pnpm-workspace.yaml`, `turbo.json`, Docker Compose, Prometheus, and OpenTelemetry configuration.
- `af-be-build-implementation/SKILL.md` says implementation should start by copying one of these baselines into the target repo and then generating domain code from the DSL.

In the current `customer-app` filesystem, that copy/materialization step is not visible.

## Observed Workflow

Based on the actual files, the likely workflow is:

1. Agent session and branch setup is enforced first.
   Evidence:
   - `/Users/bobware/coding-agents-config/CLAUDE.md`
   - `/Users/bobware/coding-agents-config/skills/session-start/SKILL.md`
   - `/Users/bobware/coding-agents-config/skills/task-init/SKILL.md`
   - `/Users/bobware/coding-agents-config/skills/turn-init/SKILL.md`
   - `/Users/bobware/coding-agents-config/skills/turn-end/SKILL.md`

2. A new project is scaffolded with AppFactory-oriented prompts and spec folders.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/project-init/SKILL.md`
   - `/Users/bobware/gallery/customer-app/README.md`
   - `/Users/bobware/gallery/customer-app/archive/templates/`

3. Product requirements are written first.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/af-be-build-prd/SKILL.md`
   - `/Users/bobware/gallery/customer-app/ai/specs/spec-be-prd.md`
   - older PRD versions in `/Users/bobware/gallery/customer-app/archive/`

4. A backend DDD is generated from the PRD.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/af-be-build-ddd/SKILL.md`
   - `/Users/bobware/gallery/customer-app/ai/specs/spec-be-ddd.md`
   - task records under `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-001/` and `task-004/`

5. A DSL YAML is generated from the DDD for downstream planning and generation.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/af-be-build-dsl/SKILL.md`
   - `/Users/bobware/gallery/customer-app/ai/specs/dsl-be-ddd.yaml`
   - task records under `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/`

6. A tech stack is selected from AppFactory profiles.
   Evidence:
   - `/Users/bobware/gallery/app-factory/tech-stack-profiles/README.md`
   - `/Users/bobware/gallery/app-factory/tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml`
   - `/Users/bobware/gallery/app-factory/.claude/skills/list-tech-stacks/SKILL.md`
   - `/Users/bobware/gallery/app-factory/.claude/skills/implement-tech-stack/SKILL.md`
   - `/Users/bobware/gallery/app-factory/Makefile`

7. A backend or full-stack plan is generated against that selected stack.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/af-be-build-plan/SKILL.md`
   - `/Users/bobware/gallery/customer-app/archive/plan-fullstack-customer-user-maintenance-delivery-v1.0.md`

8. The implementation stage is supposed to copy an AppFactory baseline into the target repo and then generate feature code.
   Evidence:
   - `/Users/bobware/coding-agents-config/skills/af-be-build-implementation/SKILL.md`
   - `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/README.md`
   - `/Users/bobware/coding-agents-config/skills/app-from-dsl/SKILL.md`

9. Every coding prompt is recorded as a turn inside a task branch, with task summaries, manifests, ADRs, and PR metadata.
   Evidence:
   - `ai/agentic-pipeline/tasks_index.csv` exists in all three repos
   - each repo has `task-XXX/turns/turn-XXX/turn_context.md`, `execution_trace.json`, `adr.md`, and `manifest.json`

The observed customer-app state suggests the workflow has reliably produced planning artifacts through step 7, but not a visible implementation workspace for step 8 in the current checkout.

## Key Conventions and Standards

### Directory Structure

- Agent execution state is stored under `ai/agentic-pipeline/tasks/task-XXX/turns/turn-XXX/`.
- AppFactory stack definitions live under `tech-stack-profiles/{backend,ui,persistence,iac,stacks}/`.
- AppFactory concrete baselines live under `tech-stack-implementations/{backend,ui,persistence,stacks,...}/`.
- Project planning/spec artifacts are expected under `ai/specs/`, with additional prompts/templates in scaffolded repos.

### Naming Patterns

- Task branches use `task/TXXX`.
- Task folders use `task-XXX`.
- Turn folders use `turn-XXX`.
- Stack profile naming follows the pattern documented in `tech-stack-profiles/README.md`:
  - backend: `<platform>-<language>-<framework>`
  - ui: `<framework>-<delivery-shape>`
  - persistence: `<engine>-<pattern>`
  - iac: `<tool>-<platform>`
  - stack: `<backend>__<ui>[__<workspace-shape>]`

### Turn and Session Artifacts

The task/turn model is one of the most stable parts of the ecosystem.

- Required task files: `task_context.md`, `task_status.json`, `task_summary.md`, `pull_request.md`
- Required turn files: `turn_context.md`, `execution_trace.json`, `adr.md`, `manifest.json`
- Registry file: `ai/agentic-pipeline/tasks_index.csv`

### Templates and Reuse

- `coding-agents-config/skills/project-init/templates/` contains the reusable spec template set.
- `coding-agents-config/skills/af-be-build-*/templates/` provide stage-specific document and YAML templates.
- `customer-app/archive/templates/` appears to preserve a copied or earlier version of the template set.

### Governance and ADR Patterns

- `CLAUDE.md` makes turn tracking mandatory.
- `governance-context.md` requires metadata headers on many source and infrastructure file types, semantic version bumps, and a standardized commit message shape.
- `adr-context.md` requires exactly one `adr.md` per turn.
- The AppFactory monorepo implementation files appear to follow the metadata-header convention. The stack identifier appears in file headers under files such as `apps/api/src/main.ts`, `apps/web/app/layout.tsx`, and `packages/ui/src/button.tsx`.

### DSL and Schema-Driven Generation

- The ecosystem uses multiple structured YAML artifacts:
  - stack profiles in `app-factory/tech-stack-profiles/*.yaml`
  - project-level DSL in `customer-app/ai/specs/project.dsl.yaml`
  - backend domain DSL in `customer-app/ai/specs/dsl-be-ddd.yaml`
- `dsl-model-interpreter` and `app-from-dsl` show that the intended generation model is schema-driven rather than prompt-only.

### Testing, Docs, and Validation Expectations

- AppFactory stack baselines include health endpoints, Docker Compose, observability config, and framework-appropriate test tooling.
- `af-be-build-plan` explicitly requires verification steps and quality gates.
- `app-from-dsl` expects generated HTTP request files, backend tests, frontend tests, and validation commands.

## Customer App Findings

### What Was Generated

At the current filesystem state, the observable generated outputs in `customer-app` are primarily planning and governance artifacts:

- `ai/specs/spec-be-prd.md`
- `ai/specs/spec-be-ddd.md`
- `ai/specs/dsl-be-ddd.yaml`
- `ai/specs/project.dsl.yaml`
- `ai/agentic-pipeline/tasks/...`
- archived PRDs, DDDs, prompts, templates, and an implementation plan under `archive/`

### What Architectural Patterns It Follows

The repository follows the pipeline’s documentation-first and governance-first pattern:

- staged artifact progression from PRD to DDD to DSL
- task/turn provenance tracking in `ai/agentic-pipeline/`
- versioned and iterative spec evolution
- intended targeting of a NestJS + Next.js + Turborepo stack, as shown in the archived implementation plan

### What Appears to Come from AppFactory Versus Custom Implementation

Likely AppFactory-derived:

- the task/turn governance layout
- the scaffold concepts in `README.md`
- the template/prompt set preserved under `archive/prompts/` and `archive/templates/`
- the chosen target stack concept referencing the AppFactory monorepo stack

Likely project-specific:

- the customer/user maintenance PRD content
- the domain model in `spec-be-ddd.md`
- the domain DSL in `dsl-be-ddd.yaml`
- the detailed implementation plan for the customer domain

### Signs of Pipeline Success

- Multiple task branches were tracked to PR-ready or PR-open status in `ai/agentic-pipeline/tasks_index.csv`.
- The project has a concrete PRD, DDD, DSL, and plan rather than only free-form notes.
- The archived plan maps the customer domain to a specific AppFactory stack and an implementation order.
- Task summaries and manifests show a disciplined review/closeout model rather than ad hoc edits.

### Signs of Incompleteness, Drift, or Manual Edits

Several concrete inconsistencies are visible:

- No `apps/`, `app/`, or `src/` directory exists at the repo root, so a copied/generated runtime application is not currently visible.
- `README.md` says the project contains `ai/prompts/`, but `/Users/bobware/gallery/customer-app/ai/prompts` does not exist.
- task summaries and manifests reference paths that do not exist now, including:
  - `ai/specs/backend/...`
  - `ai/specs/prd/...`
  - `ai/app-dsl/domain/...`
- Current canonical-looking files are flat under `ai/specs/`, which suggests path churn or incomplete reorganization.
- `project.dsl.yaml` references `container-typescript-nestjs_nextjs-hybrid-container-node__turbo-monorepo`, but the actual AppFactory stack profile on disk is `container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo`.
- `app-factory/projects/customer-profile-app.yaml` repeats the same stack-id typo.
- `af-be-build-dsl/SKILL.md` names its default output `ai/specs/dls-be-ddd.yaml`, while the observed customer-app file is `ai/specs/dsl-be-ddd.yaml`.

The most conservative interpretation is that the customer-app repo currently reflects a partially executed pipeline where the documentation/modeling stages are more mature than the implementation-materialization stage, and where some manual renaming or reorganization has happened between turns.

## Relationship Between the Three Projects

The three projects appear to form a layered system.

- `coding-agents-config` is the execution layer.
  - It defines how the agent behaves, how turns are tracked, and which staged skills exist.
- `app-factory` is the asset layer.
  - It defines which stacks are allowed, what their YAML profiles look like, and what the concrete baseline implementations contain.
- `customer-app` is the consumer layer.
  - It uses the planning and governance model from the config repo and appears intended to consume the stack assets from AppFactory.

In short:

- `coding-agents-config` tells agents how to work.
- `app-factory` tells agents what reusable assets they are allowed to apply.
- `customer-app` shows how a downstream project is supposed to be driven through that process.

## Current State Assessment

### What Is Already Well-Defined

- The task/turn governance model is explicit and consistently represented.
- The staged authoring model from PRD to DDD to DSL to plan is explicit in both docs and skills.
- The AppFactory stack taxonomy is clear, especially in `tech-stack-profiles/README.md`.
- At least one concrete full-stack baseline is real and substantial: the NestJS + Next.js Turborepo implementation under `tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/`.

### What Is Partially Defined

- The handoff from planning artifacts to generated project code is defined procedurally in skills, but not fully demonstrated in the current `customer-app` filesystem.
- The canonical project scaffold is partly stable and partly drifting. `project-init` describes one shape, while `customer-app` currently shows a different one.
- The role of backend-only DSL versus broader project/application DSL is present but not fully normalized.

### What Is Missing or Ambiguous

- The authoritative customer-app runtime code layout is missing from the current checkout.
- Canonical file paths are not yet stable across repos and turns.
- The exact boundary between archived artifacts and active canonical artifacts is unclear.
- The exact implementation trigger is unclear. There is an implementation skill and AppFactory baselines, but no observed completed copy/materialization into `customer-app`.
- Stack-id naming is not yet cleanly normalized across the sample project YAML, the customer project DSL, and the actual stack profile file.

### What Would Need to Be Clarified Before Formal Modeling

- Which spec paths are canonical now:
  - `ai/specs/spec-be-prd.md` and `ai/specs/spec-be-ddd.md`
  - or versioned/backend subfolders referenced by older task artifacts
- Whether backend DSL should live at `ai/specs/dsl-be-ddd.yaml`, `ai/specs/dls-be-ddd.yaml`, or another path
- Whether the target generated app should be a monorepo with `apps/api` and `apps/web`, and if so, at what step that scaffold is copied into the customer project
- Whether the customer project is intentionally still in the planning/modeling phase, or whether generated code was expected to be present already
- Which artifact set should be treated as authoritative for future automation: current flat `ai/specs/` files, archived files, or task-summary references

## Recommended Next Modeling Inputs for ChatGPT

The most useful next files to bring into ChatGPT are:

- `/Users/bobware/coding-agents-config/CLAUDE.md`
- `/Users/bobware/coding-agents-config/skills/project-init/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-prd/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-ddd/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-dsl/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-plan/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-implementation/SKILL.md`
- `/Users/bobware/gallery/app-factory/docs/App Factory Workflow.md`
- `/Users/bobware/gallery/app-factory/tech-stack-profiles/README.md`
- `/Users/bobware/gallery/app-factory/tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml`
- `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/README.md`
- `/Users/bobware/gallery/customer-app/ai/specs/spec-be-prd.md`
- `/Users/bobware/gallery/customer-app/ai/specs/spec-be-ddd.md`
- `/Users/bobware/gallery/customer-app/ai/specs/dsl-be-ddd.yaml`
- `/Users/bobware/gallery/customer-app/archive/plan-fullstack-customer-user-maintenance-delivery-v1.0.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-004/task_summary.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/task_summary.md`

## Executive Summary

The current AppFactory ecosystem is best understood as a three-layer pipeline. `coding-agents-config` defines the agent operating model and task/turn governance, `app-factory` defines the approved stack profiles and reusable implementation baselines, and `customer-app` shows how a downstream project moves through PRD, DDD, DSL, planning, and review. The strongest, most mature parts of the system today are the governance model and the planning/modeling workflow. The weakest part, based on the current filesystem, is the final materialization of generated application code into the customer project: the customer repo currently contains rich specs and task history, but no visible `apps/`, `app/`, or `src/` implementation layout. There are also clear naming and path inconsistencies that should be normalized before formal modeling.
