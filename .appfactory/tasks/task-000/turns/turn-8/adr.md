# ADR - Turn 8: Root Gitignore Baseline

- **Date**: 2026-03-28T21:21:30Z
- **Agent**: AI Coding Agent (Codex)
- **Status**: Accepted

---

No major architectural decision made this turn — added a root `.gitignore` to centralize local artifact exclusions for this mixed-language repository.

## Minor Decisions

### Repository-Level Ignore Rules
- **Decision**: Add a single root `.gitignore` covering shared OS, editor, environment, log, and build artifacts
- **Rationale**: This repository contains multiple nested implementation stacks, so common local artifacts are better filtered once at the root

### Preserve Existing Tracked Files
- **Decision**: Do not remove or rewrite already tracked local files as part of this task
- **Rationale**: The request was limited to adding ignore rules, and tracked-file cleanup would be a separate, potentially disruptive change
