# Pull Request — Turn 14

**Date:** 2026-03-29
**Branch:** `turn/T14`

## Summary

Extract the Serverless Land pattern catalog into a local markdown reference

- Fetch the live Serverless Land patterns bundle and resolve the bundled pattern metadata
- Generate a markdown table with URL, pattern name, and description for 976 patterns
- Record turn-14 provenance artifacts and update turns_index.csv

## Execution Context

| Field        | Value |
|--------------|-------|
| Turn Start   | 2026-03-29T03:32:54Z |
| Turn End     | 2026-03-29T03:48:20Z |
| Elapsed      | 15m 26s |
| Input Prompt | Extract all Serverless Land patterns into docs/aws-patterns.md |

## Pattern Reference

| Field        | Value |
|--------------|-------|
| Pattern Name | N/A |
| Pattern Path | N/A |

## Task Execution

| Task | Agent |
|------|-------|
| Inspect Serverless Land site structure and bundled content map | codex |
| Extract pattern URLs, titles, and descriptions from bundled modules | codex |
| Generate markdown output and turn provenance artifacts | codex |

## Skills & Agents

| Field | Value |
|-------|-------|
| Skills Executed | session-start, turn-init, branch-guard, turn-end |
| Agents Executed | codex |

## Files Changed

### AI Pipeline Artifacts

| File |
|------|
| ai/agentic-pipeline/turns/turn-14/turn_context.md |
| ai/agentic-pipeline/turns/turn-14/execution_trace.json |
| ai/agentic-pipeline/turns/turn-14/pull_request.md |
| ai/agentic-pipeline/turns/turn-14/adr.md |
| ai/agentic-pipeline/turns/turn-14/manifest.json |

### Source Files Added

| Task | Description | File Path |
|------|-------------|-----------|
| Serverless Land catalog export | Markdown table of pattern URL, name, and description | docs/aws-patterns.md |

## Validation

- Verified the generated file contains 976 data rows with 976 unique pattern URLs
- Spot-checked the beginning and end of the generated table for formatting correctness
- No project test suite was run because the task only generated documentation output
