# Development Lifecycle Summary

## Overview

The AI Agentic Pipeline shows a repository that began as a profile catalog, expanded into runnable reference implementations, then evolved into a more governed and self-describing delivery system with stronger provenance artifacts and a growing documentation corpus. The recorded history covers 14 canonical turn directories from `turn-1` through `turn-17`, with complete turn folders for `1-9` and `13-17`. The lifecycle is not perfectly continuous: `turn-10` through `turn-12` are missing from the canonical pipeline directory, `turn-8` is absent from `turns_index.csv`, and later index rows retain placeholder commit metadata.

Across the retained turns, the project consistently follows a profile-first approach. Tech stack YAMLs drive implementation work, cross-cutting concerns such as observability, authentication, containerization, and local development appear early and repeatedly, and each turn usually emits a standard provenance bundle consisting of `turn_context.md`, `execution_trace.json`, `pull_request.md`, `adr.md`, and `manifest.json`. Over time, those artifacts become more structured and more explicit about validation, provenance, and active patterns.

## Chronological Evolution

### Turns 1-3: Repository Bootstrap and Profile Seeding

- Main objectives: establish the local workspace, seed the tech stack catalog, and create an execution entrypoint for future implementations.
- Major outputs: copied the `tech-stack-profiles/` catalog into the repo, scaffolded a Java 21 / Spring Boot backend from the `container-java-springboot` profile, and added a root `Makefile` that discovers profiles and delegates to implementation-specific startup commands.
- Decisions made: the first substantive architecture work chose Spring Boot 3.2.x, Java 21, OpenTelemetry tracing, Micrometer metrics, structured logging, Docker-based local development, and OAuth2 JWT support. The root `Makefile` established the pattern of resolving work from profile metadata rather than hard-coded stack lists.
- Impact on subsequent turns: this phase created the repository’s foundational operating model. Later turns reuse the profile catalog, the implementation directory structure, and the idea that the repo is a factory for stack-specific scaffolds rather than a single application.

### Turns 4-6: Reference Implementation Expansion

- Main objectives: convert the profile catalog into concrete backend, persistence, and full-stack reference implementations.
- Major outputs: a NestJS backend (`container-typescript-nestjs`), a reusable PostgreSQL persistence service (`postgresql-service`), and a combined FastAPI + React containerized stack (`container-python-fastapi__react-spa-container-nginx`).
- Decisions made: turn 4 selected Fastify over Express for the NestJS implementation and standardized OpenTelemetry, Pino logging, JWT auth, and correlation ID propagation. Turn 5 chose backend-agnostic raw SQL versioned migrations with audit triggers instead of ORM-specific migration systems. Turn 6 defined the full-stack reference pattern around FastAPI, Pydantic v2, structlog, React + Vite, nginx delivery, and a combined observability-aware Docker Compose setup.
- Impact on subsequent turns: this phase established the project’s recurring enterprise baseline: profile-driven scaffolding, container-first local development, explicit observability, and authentication patterns that can be reused across multiple languages and frameworks.

### Turns 7-9: Workflow Hardening and Repository Governance

- Main objectives: make the agent workflow discoverable inside the repo and reduce friction for ongoing stack work.
- Major outputs: a repo-local `list-tech-stacks` skill, a root `.gitignore`, and a root `AGENTS.md` that loads repo-local skills before deferring to the root agent instructions.
- Decisions made: project-specific agent capabilities were moved into `.claude/skills/`, shared ignore rules were centralized at the repo root, and agent bootstrapping became part of repository content rather than an external convention.
- Impact on subsequent turns: the repository became more self-describing. Later turns explicitly record skill usage such as `branch-guard` and `list-tech-stacks`, and the repo’s own instructions began influencing how future pipeline turns are executed.

### Turns 10-12: Missing Canonical Turn Record

- Main objectives: not fully reconstructable from the canonical pipeline directory.
- Major outputs: none available under `ai/agentic-pipeline/turns/`.
- Decisions made: unknown from the retained turn artifacts.
- Impact on subsequent turns: this is the largest break in traceability. The git graph contains refs and commit messages for `turn/T10`, `turn/T11`, and `turn/T12`, which indicates work likely occurred, but those turns are absent from both the canonical turn directory set and `turns_index.csv`. That gap weakens the lifecycle narrative and creates an unverifiable transition between turns 9 and 13.

### Turn 13: Frontend Profile Realization

- Main objectives: implement the `nextjs-hybrid-container-node` UI profile as a production-oriented reference implementation.
- Major outputs: a Next.js 14 App Router application with SSG, SSR, and CSR examples, Tailwind styling, Docker packaging, Vitest unit tests, and Playwright E2E configuration.
- Decisions made: the turn selected the App Router over the Pages Router, adopted hybrid rendering as an explicit teaching pattern, and used standalone build output for container deployment.
- Impact on subsequent turns: turn 13 is the clearest example of the repo acting as an application factory rather than only a pattern registry. It also contains the strongest recorded validation evidence in the retained history, including 20 passing unit tests and a successful Next.js build.

### Turns 14-17: Documentation Expansion and Profile Refinement

- Main objectives: broaden the repo’s documentation value, map external pattern resources, and refine the stack model.
- Major outputs: `docs/aws-patterns.md`, stack-specific resource maps for Spring Boot, NestJS, and Next.js, a Turbo monorepo stack profile combining NestJS and Next.js, and `docs/observability-tools.md`.
- Decisions made: when Serverless Land pattern data was not directly exposed, the process chose to extract it from the deployed client bundle. The profile model was extended with optional `workspace` metadata instead of adding a new profile category, preserving the existing compositional structure. Documentation work increasingly emphasized official or canonical resource hubs and explicit validation notes.
- Impact on subsequent turns: the repo’s center of gravity shifted from generating code to curating reusable knowledge. By the latest recorded turns, the project functions both as a stack implementation factory and as a local reference library for architectures, tooling, and official ecosystem resources.

## Development Patterns

- Planning and execution flow: every retained canonical turn contains the expected artifact set, and execution is usually framed as a small number of named tasks carried out by a single agent. The workflow is strongly turn-oriented even when the artifact schemas vary.
- Governance and ADR usage: architecture-heavy turns use full ADRs with alternatives and rationale, while documentation or housekeeping turns use minimal ADRs. This split is consistent and usually appropriate.
- Testing and validation behavior: validation is strongest when the repo produces executable implementations. Turn 13 records successful tests and build output, turn 6 includes a test plan but not executed results, and turns 14-17 explicitly state that code tests were skipped because the work was documentation or metadata only.
- Artifact generation: `manifest.json` evolves materially over time. Early manifests are simpler and inconsistent, while later manifests include task-level outputs, checksums, prompt hashes, active pattern metadata, and explicit validation statuses.
- Branching and revision loops: work is generally organized on turn-scoped branches, but the evidence also shows follow-up cleanup behavior. Some turns required later commits to backfill or correct lifecycle metadata, and tag naming is inconsistent between `turn/<n>` and `turn/T<n>`.
- Use of templates, DSLs, and skills: the repository consistently treats YAML tech stack profiles as the source model for generation. Later workflow turns add local skills and root agent instructions, making the pipeline itself part of the managed system.
- Cross-cutting implementation conventions: observability, correlation IDs, JWT-based auth, Dockerized local development, and environment-aware behavior appear across Spring Boot, NestJS, FastAPI, and documentation about enterprise tooling. That suggests the project is converging on a reusable enterprise reference architecture rather than isolated examples.

## Key Decisions and Turning Points

- The decision to start from copied tech stack profiles instead of greenfield code made the repo model-driven from the beginning.
- Early implementation turns repeatedly chose observability-first, container-first patterns. That anchored the project around enterprise-ready defaults rather than minimal demos.
- The PostgreSQL turn deliberately avoided ORM-coupled migrations, which preserved reuse across Java, TypeScript, and Python backends.
- The addition of repo-local skills and root `AGENTS.md` turned workflow governance into versioned repository content. This is an important maturity step because future agent behavior can be traced and audited inside the repo itself.
- Turn 13 marked a return from governance work to full implementation and provided the strongest quality signal in the retained history through passing automated tests.
- Turn 16 extended the stack model through optional workspace metadata instead of introducing a new profile taxonomy. That kept the existing composition model intact while allowing monorepo patterns.
- Turns 14-17 show a strategic shift: the project is no longer only generating stacks, it is also curating external pattern and tooling knowledge for future generation work.

## Issues, Rework, and Risks

- The canonical lifecycle record is incomplete. `turn-10` through `turn-12` are missing from `ai/agentic-pipeline/turns/`, even though git metadata shows those turn refs existed.
- `turn-8` has a full turn directory but no row in `turns_index.csv`, so the index cannot be treated as a complete registry without cross-checking the directory tree.
- `turns_index.csv` contains data quality issues. Turn 6 records an end time earlier than its start time, and turns 14-17 retain `pending` commit SHAs.
- Tag naming is inconsistent. Both `turn/<n>` and `turn/T<n>` appear, which complicates automation and makes the provenance model harder to query reliably.
- Manifest and PR schemas changed several times. The richer later format is an improvement, but schema drift reduces comparability across turns and raises the cost of automated analysis.
- Validation rigor is uneven. Some implementation turns describe planned checks without showing executed results, while later documentation turns are explicit about skipped tests. The process does not yet enforce a uniform distinction between planned, executed, and skipped validation.
- Some git history uses generic commit subjects such as `update`, which weakens the audit trail when lifecycle artifacts are already incomplete or out of sync.

## Current State

The repository appears moderately mature as an AI-assisted stack factory. It contains a substantial profile catalog, several concrete backend and frontend reference implementations, local workflow automation for agent execution, and a growing documentation base that now covers external pattern catalogs and observability tooling. The latest retained turns suggest the project is balancing two roles: generating stack implementations and serving as a curated knowledge base for future generation work.

The pipeline process itself is established but not fully hardened. Artifact creation is habitual, ADR usage is disciplined, and recent manifests carry stronger provenance, but the registry is not yet reliable enough to be treated as a single authoritative ledger without reconciliation work.

## Recommendations

- Make `ai/agentic-pipeline/turns/` plus `turns_index.csv` a validated contract. Add an automated check that requires every turn directory to have exactly one index row and every index row to resolve to an existing turn directory.
- Recover or explicitly reconstruct the missing `turn-10` through `turn-12` records. If recovery is not possible, add placeholder directories or a gap note explaining the loss and linking to the relevant git refs.
- Standardize branch and tag naming to one format, preferably aligned with turn numbers only or turn-prefixed branch names only, but not both conventions at once.
- Eliminate `pending` commit values by updating `turns_index.csv` after commit creation in the same workflow step, or by generating the row from git metadata after the commit exists.
- Version the manifest and pull request schemas and keep them stable across turns. If the schema must change, record the schema version explicitly so tooling can interpret older turns correctly.
- Distinguish validation states explicitly as `planned`, `executed`, or `skipped`, and require code-bearing turns to record command-level evidence for at least one successful validation path.
- Add a lifecycle linter that checks timestamp ordering, artifact completeness, tag existence, commit message format, and checksum coverage before a turn is considered complete.
- Continue capturing source provenance for documentation turns. The later documentation work is valuable, but its long-term usefulness depends on consistent source attribution, retrieval dates, and regeneration instructions.
