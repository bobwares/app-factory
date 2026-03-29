# Pull Request — Turn 15

**Date:** 2026-03-29
**Branch:** `turn/T15`

## Summary

Create one stack-specific markdown reference in `docs/` for Spring Boot, NestJS, and Next.js pattern/example discovery

- Add a Spring Boot resource map covering guides, reference docs, and canonical sample apps
- Add a NestJS resource map covering recipes, techniques, and official samples
- Add a Next.js resource map covering templates, App Router guides, and official examples
- Record turn-15 provenance artifacts and update turns_index.csv

## Execution Context

| Field | Value |
|-------|-------|
| Turn Start | 2026-03-29T08:04:54Z |
| Turn End | 2026-03-29T08:11:30Z |
| Elapsed | 6m 36s |
| Input Prompt | Create one document for each of the requested tech stacks in docs/ |

## Pattern Reference

| Field | Value |
|-------|-------|
| Pattern Name | N/A |
| Pattern Path | N/A |

## Task Execution

| Task | Agent |
|------|-------|
| Research the closest official pattern/example resources for Spring Boot | codex |
| Research the closest official pattern/example resources for NestJS | codex |
| Research the closest official pattern/example resources for Next.js | codex |
| Generate the three markdown references and turn provenance artifacts | codex |

## Skills & Agents

| Field | Value |
|-------|-------|
| Skills Executed | session-start, turn-init, branch-guard, turn-end |
| Agents Executed | codex |

## Files Changed

### AI Pipeline Artifacts

| File |
|------|
| ai/agentic-pipeline/turns/turn-15/turn_context.md |
| ai/agentic-pipeline/turns/turn-15/execution_trace.json |
| ai/agentic-pipeline/turns/turn-15/pull_request.md |
| ai/agentic-pipeline/turns/turn-15/adr.md |
| ai/agentic-pipeline/turns/turn-15/manifest.json |

### Source Files Added

| Task | Description | File Path |
|------|-------------|-----------|
| Spring Boot reference | Official Spring Boot pattern/example resource map | docs/spring-boot-patterns.md |
| NestJS reference | Official NestJS pattern/example resource map | docs/nestjs-patterns.md |
| Next.js reference | Official Next.js pattern/example resource map | docs/nextjs-patterns.md |

## Validation

- Verified the three markdown files render as structured reference documents with working-style source links
- Spot-checked the coverage for Spring Boot, NestJS, and Next.js against the current official resource hubs
- No project test suite was run because the task only added documentation files
