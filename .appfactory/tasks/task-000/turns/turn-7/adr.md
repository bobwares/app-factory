# ADR - Turn 7: Local Claude Skill Structure

- **Date**: 2026-03-28T21:20:00Z
- **Agent**: AI Coding Agent (Claude Opus 4.5)
- **Status**: Accepted

---

No major architectural decision made this turn — implemented a local Claude skill for listing tech-stack-profiles following the existing skill structure pattern from `~/.claude/skills/`.

## Minor Decisions

### Skill Location
- **Decision**: Place skill in `.claude/skills/list-tech-stacks/` (project-local)
- **Rationale**: This skill is specific to this project's tech-stack-profiles directory structure

### Helper Script
- **Decision**: Include a standalone shell script for profile listing
- **Rationale**: Allows the skill to be used both interactively via Claude and directly via CLI
