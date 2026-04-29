# ADR - Turn 9: Repo-Level Agent Instructions

- **Date**: 2026-03-28T21:25:20Z
- **Agent**: AI Coding Agent (GPT-5)
- **Status**: Accepted

---

No major architectural decision made this turn — added a root `AGENTS.md` that loads repo-local skills before deferring to the root agent instructions.

## Minor Decisions

### Local Skill Loading
- **Decision**: Load each repo-local `SKILL.md` from `./.claude/skills/*/SKILL.md`
- **Rationale**: Keeps project-specific skills discoverable without hard-coding individual skill names

### Upstream Deferral Target
- **Decision**: Defer to `~/.codex/AGENTS.md`
- **Rationale**: It is the active root agent instruction file for this environment and already forwards to the shared Claude/Codex bootstrap instructions
