# AppFactory Project State Specification

## Overview

This document specifies the **AppFactory Project State Object**, a structured YAML file that tracks document artifacts, workflow status, and runtime variables for AppFactory projects.

The state object enables:

1. Workflow orchestration across af-* skills
2. Resume capability for interrupted workflows
3. Artifact discovery and validation
4. Execution history and audit trail

## File Location

```
<project-root>/.appfactory/state.yaml
```

The state file lives alongside the existing `provenance.json` in the `.appfactory/` directory.

## AppFactory Workflow Pipeline

The af-* skills form a linear pipeline with dependencies:

```
af-project-init
       │
       ▼
af-be-build-prd
       │
       ▼
af-be-build-ddd
       │
       ▼
af-be-build-dsl
       │
       ▼
af-be-build-plan
       │
       ▼
af-be-build-implementation
```

Each stage produces artifacts in `ai/specs/` and updates the state object.

## State Object Schema

### Complete Structure

```yaml
version: 1
kind: appfactory-project-state

# Project identity (from source YAML)
project:
  id: string                    # Project identifier (e.g., "customer-profile-app")
  name: string                  # Human-readable name
  description: string           # Project description
  source_yaml: string           # Path to source project YAML

# Tech stack selection
stack:
  profile: string               # Stack profile reference
  profile_path: string          # Resolved profile path
  implementation_path: string   # Resolved implementation path

# Document pointers with status
artifacts:
  prd:
    path: string                # Relative path to PRD
    status: enum                # null | draft | review | approved
    created_at: timestamp       # ISO 8601 timestamp
    updated_at: timestamp       # ISO 8601 timestamp
  ddd:
    path: string
    status: enum
    created_at: timestamp
    updated_at: timestamp
  dsl:
    path: string
    status: enum
    created_at: timestamp
    updated_at: timestamp
  plan:
    path: string
    status: enum
    created_at: timestamp
    updated_at: timestamp
  implementation_manifest:
    path: string
    status: enum                # null | generated
    created_at: timestamp

# Workflow stage tracking
workflow:
  current_stage: enum           # init | prd | ddd | dsl | plan | implementation | complete
  stages:
    <stage_name>:
      status: enum              # pending | in_progress | complete | failed
      completed_at: timestamp
      skill_invocation: string  # Skill that executes this stage
      requires: array           # Prerequisite stages

# Runtime variables for agent use
runtime:
  target_directory: string      # Absolute path to generated project
  app_factory_home: string      # Absolute path to AppFactory
  bounded_contexts: array       # Populated after DSL generation
  turn_recommendation: enum     # null | single_turn | multi_turn

# Execution history
history:
  - timestamp: timestamp
    stage: string
    action: string
    agent: string
```

### Section Details

#### project

Contains identity information copied from the source project YAML at `~/gallery/app-factory/projects/<projectId>.yaml`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique project identifier |
| `name` | string | Human-readable project name |
| `description` | string | Project description |
| `source_yaml` | string | Absolute path to source project YAML |

#### stack

Contains resolved tech stack information.

| Field | Type | Description |
|-------|------|-------------|
| `profile` | string | Stack profile reference from project YAML |
| `profile_path` | string | Resolved absolute path to profile YAML |
| `implementation_path` | string | Resolved absolute path to implementation directory |

#### artifacts

Pointers to generated specification documents with status tracking.

| Artifact | Default Path | Producing Skill |
|----------|--------------|-----------------|
| `prd` | `ai/specs/spec-be-prd.md` | `af-be-build-prd` |
| `ddd` | `ai/specs/spec-be-ddd.md` | `af-be-build-ddd` |
| `dsl` | `ai/specs/dsl-be-ddd.yaml` | `af-be-build-dsl` |
| `plan` | `ai/specs/spec-be-plan.md` | `af-be-build-plan` |
| `implementation_manifest` | `ai/specs/implementation-manifest.yaml` | `af-be-build-implementation` |

**Artifact Status Values:**

| Status | Meaning |
|--------|---------|
| `null` | Not yet created |
| `draft` | Initial generation complete |
| `review` | Under human review |
| `approved` | Approved for downstream consumption |
| `generated` | Machine-generated (for manifests) |

#### workflow

Tracks overall workflow progress and individual stage status.

**Stage Status Values:**

| Status | Meaning |
|--------|---------|
| `pending` | Not yet started |
| `in_progress` | Currently executing |
| `complete` | Successfully finished |
| `failed` | Execution failed |

**Stage Dependency Map:**

| Stage | Skill | Requires |
|-------|-------|----------|
| `init` | `af-project-init` | — |
| `prd` | `af-be-build-prd` | `init` |
| `ddd` | `af-be-build-ddd` | `prd` |
| `dsl` | `af-be-build-dsl` | `ddd` |
| `plan` | `af-be-build-plan` | `dsl` |
| `implementation` | `af-be-build-implementation` | `plan` |

#### runtime

Mutable variables used by skills during execution.

| Field | Type | Description |
|-------|------|-------------|
| `target_directory` | string | Absolute path to the generated project |
| `app_factory_home` | string | Absolute path to AppFactory (`~/gallery/app-factory`) |
| `bounded_contexts` | array | List of context names extracted from DSL |
| `turn_recommendation` | enum | Execution strategy from planning stage |

#### history

Append-only log of workflow events for audit purposes.

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | ISO 8601 | When the event occurred |
| `stage` | string | Which stage was affected |
| `action` | string | What happened (created, started, completed, failed) |
| `agent` | string | Which agent/model performed the action |

## Example State File

```yaml
version: 1
kind: appfactory-project-state

project:
  id: "customer-profile-app"
  name: "Customer Service App"
  description: "Full Service Customer Maintenance application."
  source_yaml: "/Users/bobware/gallery/app-factory/projects/customer-profile-app.yaml"

stack:
  profile: "stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo"
  profile_path: "/Users/bobware/gallery/app-factory/tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml"
  implementation_path: "/Users/bobware/gallery/app-factory/tech-stack-implementations/backend/container-typescript-nestjs"

artifacts:
  prd:
    path: "ai/specs/spec-be-prd.md"
    status: approved
    created_at: "2026-04-06T10:15:00Z"
    updated_at: "2026-04-06T11:30:00Z"
  ddd:
    path: "ai/specs/spec-be-ddd.md"
    status: draft
    created_at: "2026-04-06T12:00:00Z"
    updated_at: "2026-04-06T12:00:00Z"
  dsl:
    path: "ai/specs/dsl-be-ddd.yaml"
    status: null
    created_at: null
    updated_at: null
  plan:
    path: "ai/specs/spec-be-plan.md"
    status: null
    created_at: null
    updated_at: null
  implementation_manifest:
    path: "ai/specs/implementation-manifest.yaml"
    status: null
    created_at: null

workflow:
  current_stage: ddd
  stages:
    init:
      status: complete
      completed_at: "2026-04-06T10:00:00Z"
      skill_invocation: "af-project-init"
      requires: []
    prd:
      status: complete
      completed_at: "2026-04-06T11:30:00Z"
      skill_invocation: "af-be-build-prd"
      requires: [init]
    ddd:
      status: in_progress
      completed_at: null
      skill_invocation: "af-be-build-ddd"
      requires: [prd]
    dsl:
      status: pending
      completed_at: null
      skill_invocation: "af-be-build-dsl"
      requires: [ddd]
    plan:
      status: pending
      completed_at: null
      skill_invocation: "af-be-build-plan"
      requires: [dsl]
    implementation:
      status: pending
      completed_at: null
      skill_invocation: "af-be-build-implementation"
      requires: [plan]

runtime:
  target_directory: "/Users/bobware/generated-apps/customer-profile-app"
  app_factory_home: "/Users/bobware/gallery/app-factory"
  bounded_contexts: []
  turn_recommendation: null

history:
  - timestamp: "2026-04-06T10:00:00Z"
    stage: init
    action: completed
    agent: claude-opus-4.5
  - timestamp: "2026-04-06T10:15:00Z"
    stage: prd
    action: started
    agent: claude-opus-4.5
  - timestamp: "2026-04-06T11:30:00Z"
    stage: prd
    action: completed
    agent: claude-opus-4.5
  - timestamp: "2026-04-06T12:00:00Z"
    stage: ddd
    action: started
    agent: claude-opus-4.5
```

## Skill Integration Pattern

Each af-* skill must follow this integration pattern:

### On Skill Start

```
1. Read .appfactory/state.yaml
2. Validate prerequisites:
   - Check workflow.stages.<stage>.requires are all complete
   - Abort with clear message if prerequisites missing
3. Update state:
   - workflow.stages.<stage>.status = "in_progress"
   - Append history entry with action: "started"
4. Write state.yaml
```

### On Skill Success

```
1. Update state:
   - workflow.stages.<stage>.status = "complete"
   - workflow.stages.<stage>.completed_at = <now>
   - workflow.current_stage = <next_stage>
   - artifacts.<artifact>.status = "draft"
   - artifacts.<artifact>.created_at = <now>
   - Append history entry with action: "completed"
2. Write state.yaml
```

### On Skill Failure

```
1. Update state:
   - workflow.stages.<stage>.status = "failed"
   - Append history entry with action: "failed"
2. Write state.yaml
3. Report failure to user
```

## Relationship to provenance.json

The existing `.appfactory/provenance.json` captures **immutable provenance** at project creation:

- Source project YAML path
- Stack references at creation time
- AppFactory commit hash

The new `state.yaml` captures **mutable workflow state**:

- Current workflow progress
- Artifact status changes
- Execution history

Both files coexist in `.appfactory/`:

```
.appfactory/
├── provenance.json    # Immutable: creation-time provenance
└── state.yaml         # Mutable: workflow state
```

## Benefits

| Concern | How State Object Addresses It |
|---------|-------------------------------|
| Document discovery | `artifacts.*` with canonical paths |
| Status tracking | `artifacts.*.status` for approval workflow |
| Workflow orchestration | `workflow.stages` with dependency graph |
| Resume capability | Agent reads state and continues from `current_stage` |
| Runtime context | `runtime.*` for agent-accessible variables |
| Audit trail | `history` array for execution log |
| Multi-session support | State persists across Claude Code sessions |

## Future Extensions

Potential additions for future versions:

1. **Validation checksums** — SHA256 of artifacts for change detection
2. **Branch tracking** — Git branch associated with workflow
3. **Multi-target support** — Frontend/backend/shared artifact sets
4. **Rollback markers** — Points where workflow can safely restart
5. **Agent preferences** — Model selection per stage
