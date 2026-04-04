Act as a senior technical writer and repository analyst.

Your task is to inspect the AI Agentic Pipeline directory in this repository, parse every turn from `turn-1` through the latest turn, review all documents and artifacts in each turn, and produce a complete summary of the development lifecycle.

Write the final output to:

`docs/development-summary.md`

### Scope

Analyze the full AI Agentic Pipeline history, including all turn directories and any related index or manifest files. Process the turns in chronological order, starting at the earliest turn and continuing through the most recent turn.

Focus on reconstructing how the project evolved over time.

### What to Review

Review all relevant files under the AI Agentic Pipeline area, including but not limited to:

- turn folders such as `turn-*`
- manifests
- ADRs
- session context files
- execution traces
- prompts
- plans
- summaries
- generated documentation
- pull request notes
- status or result files
- any lifecycle or governance artifacts
- turn index files such as CSV or markdown summaries

### Goals

Create a development lifecycle summary that explains:

1. How the project evolved from the first turn to the latest turn
2. Major phases of work
3. Key architectural and implementation decisions
4. Important changes in workflow, governance, tooling, or conventions
5. Repeated patterns across turns
6. Significant problems, rework, or course corrections
7. Deliverables and artifacts that were consistently produced
8. Gaps, inconsistencies, or missing documentation where relevant

### Output Requirements

Create `docs/development-summary.md` as a clean, well-structured markdown document.

Use this structure:

# Development Lifecycle Summary

## Overview

Provide a concise summary of the project lifecycle across all turns.

## Chronological Evolution

For each major phase, describe:
- the approximate turn range
- the main objectives
- the major outputs
- the decisions made
- the impact on subsequent turns

## Development Patterns

Summarize recurring patterns such as:
- planning and execution flow
- governance and ADR usage
- testing and validation behavior
- artifact generation
- branching, revisions, or iteration loops
- use of templates, DSLs, or skills

## Key Decisions and Turning Points

Describe the most important decisions or shifts in direction and why they mattered.

## Issues, Rework, and Risks

Document recurring issues, incomplete work, conflicting patterns, or process risks that appear across turns.

## Current State

Summarize the apparent current maturity of the project based on the latest turns.

## Recommendations

Provide concrete recommendations for improving the development lifecycle, documentation quality, traceability, and repeatability.

### Writing Standards

- Write in a professional technical writing style
- Be precise and evidence-based
- Synthesize across turns instead of merely listing files
- Do not dump raw notes
- Do not omit meaningful lifecycle changes
- Prefer chronological clarity over exhaustive detail
- Highlight trends and evolution, not just isolated facts

### Execution Rules

- Discover the pipeline directory from the repo if needed, but prioritize the canonical AI Agentic Pipeline path
- Process turns in numeric order
- Read the files before summarizing
- Infer lifecycle phases only from evidence in the repository
- Do not invent missing facts
- If some turns are incomplete or malformed, note that explicitly
- Overwrite `docs/development-summary.md` with the final result

When finished, provide a short terminal summary stating:
- how many turns were processed
- the output file path
- any notable gaps in the source material