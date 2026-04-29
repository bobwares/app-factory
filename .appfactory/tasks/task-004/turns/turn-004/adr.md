# ADR: Create CLAUDE.md and Architecture Pattern Documentation

## Status
Accepted

## Context
1. App Factory lacked a CLAUDE.md file to provide AI coding agents with project context.
2. The `design/Interface Architecture Patterns.md` index defined 7 pattern categories, but only Interface Architecture Patterns had individual files. Six categories needed pattern documentation.

## Decision

### Part 1: CLAUDE.md
Created `CLAUDE.md` at repository root with:
- Quick reference table for key asset locations
- Repository purpose and relationship to `coding-agents-config`
- Directory structure overview
- Supported tech stacks (backend, frontend, persistence, combined)
- Common capabilities across all stacks
- Generation pipeline overview
- Key skills reference
- Architecture patterns summary (30 patterns, 7 categories)
- Working instructions for adding stacks, implementations, and project definitions
- Build commands for common operations

### Part 2: Architecture Pattern Files
Created 21 pattern files across 6 new directories under `design/patterns/`:

| Category | Files Created |
|----------|---------------|
| Domain Architecture Patterns | 4 |
| Data Architecture Patterns | 4 |
| Integration Architecture Patterns | 3 |
| Workflow Architecture Patterns | 3 |
| Security Architecture Patterns | 4 |
| Operational Architecture Patterns | 3 |

Each file follows the established format:
- Opening definition
- Core Idea
- Why It Exists (Benefits)
- DDD Signals for Selection
- Relationship to Other Patterns
- Conceptual Example

## Consequences
- AI agents have immediate context when working in this repo
- All 7 pattern categories now have individual documentation
- DDD signals enable pattern selection during generation pipeline
- Cross-references aid navigation between related patterns
