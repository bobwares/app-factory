# AppFactory State Integration Guide

## Overview

This document describes how af-* skills read and update the `.appfactory/state.yaml` file during execution.

## Integration Options

### Option A: Shared Shell Utility (Recommended)

A single `af-state.sh` script provides read/write operations that all skills source.

### Option B: Inline YAML Manipulation

Each skill uses `yq` commands directly.

### Option C: State Management Skill

A dedicated skill handles all state operations, invoked by other skills.

---

## Option A: Shared Shell Utility

### Location

```
~/gallery/app-factory/scripts/af-state.sh
```

### Usage in Skills

```bash
source "$APP_FACTORY_HOME/scripts/af-state.sh"

# Read current stage
current=$(af_state_get "workflow.current_stage")

# Check if prerequisite complete
if af_state_stage_complete "prd"; then
  # proceed
fi

# Update stage status
af_state_stage_start "ddd"

# On completion
af_state_stage_complete "ddd"
af_state_artifact_update "ddd" "draft" "ai/specs/spec-be-ddd.md"
```

### Script Implementation

```bash
#!/usr/bin/env bash
# af-state.sh - AppFactory state management utilities

set -euo pipefail

# Resolve state file path
_af_state_file() {
  local project_root="${AF_PROJECT_ROOT:-.}"
  echo "$project_root/.appfactory/state.yaml"
}

# Check if state file exists
af_state_exists() {
  [[ -f "$(_af_state_file)" ]]
}

# Initialize state file from project YAML
af_state_init() {
  local project_id="$1"
  local project_yaml="$APP_FACTORY_HOME/projects/${project_id}.yaml"
  local state_file="$(_af_state_file)"
  local now
  now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Extract project info
  local name description profile
  name=$(yq -r '.project.name' "$project_yaml")
  description=$(yq -r '.project.description' "$project_yaml")
  profile=$(yq -r '.tech_stack_profiles[0]' "$project_yaml")

  mkdir -p "$(dirname "$state_file")"

  cat > "$state_file" <<EOF
version: 1
kind: appfactory-project-state

project:
  id: "$project_id"
  name: "$name"
  description: "$description"
  source_yaml: "$project_yaml"

stack:
  profile: "$profile"
  profile_path: null
  implementation_path: null

artifacts:
  prd:
    path: "ai/specs/spec-be-prd.md"
    status: null
    created_at: null
    updated_at: null
  ddd:
    path: "ai/specs/spec-be-ddd.md"
    status: null
    created_at: null
    updated_at: null
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
  current_stage: init
  stages:
    init:
      status: in_progress
      completed_at: null
      skill_invocation: "af-project-init"
      requires: []
    prd:
      status: pending
      completed_at: null
      skill_invocation: "af-be-build-prd"
      requires: [init]
    ddd:
      status: pending
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
  target_directory: "${AF_PROJECT_ROOT:-$(pwd)}"
  app_factory_home: "$APP_FACTORY_HOME"
  bounded_contexts: []
  turn_recommendation: null

history:
  - timestamp: "$now"
    stage: init
    action: started
    agent: "${AF_AGENT:-claude}"
EOF

  echo "State initialized: $state_file"
}

# Get a value from state
af_state_get() {
  local path="$1"
  yq -r ".$path" "$(_af_state_file)"
}

# Set a value in state
af_state_set() {
  local path="$1"
  local value="$2"
  local state_file="$(_af_state_file)"
  yq -i ".$path = \"$value\"" "$state_file"
}

# Set a value (preserving type for null/bool)
af_state_set_raw() {
  local path="$1"
  local value="$2"
  local state_file="$(_af_state_file)"
  yq -i ".$path = $value" "$state_file"
}

# Check if a stage is complete
af_state_stage_complete() {
  local stage="$1"
  local status
  status=$(af_state_get "workflow.stages.$stage.status")
  [[ "$status" == "complete" ]]
}

# Check if all prerequisites for a stage are complete
af_state_prereqs_met() {
  local stage="$1"
  local state_file="$(_af_state_file)"
  local requires
  requires=$(yq -r ".workflow.stages.$stage.requires[]" "$state_file" 2>/dev/null || true)

  for req in $requires; do
    if ! af_state_stage_complete "$req"; then
      echo "Prerequisite not met: $req"
      return 1
    fi
  done
  return 0
}

# Mark stage as started
af_state_stage_start() {
  local stage="$1"
  local state_file="$(_af_state_file)"
  local now
  now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Check prerequisites
  if ! af_state_prereqs_met "$stage"; then
    echo "ERROR: Prerequisites not met for stage: $stage"
    return 1
  fi

  # Update stage status
  yq -i ".workflow.stages.$stage.status = \"in_progress\"" "$state_file"
  yq -i ".workflow.current_stage = \"$stage\"" "$state_file"

  # Append history
  yq -i ".history += [{\"timestamp\": \"$now\", \"stage\": \"$stage\", \"action\": \"started\", \"agent\": \"${AF_AGENT:-claude}\"}]" "$state_file"

  echo "Stage started: $stage"
}

# Mark stage as complete
af_state_stage_done() {
  local stage="$1"
  local state_file="$(_af_state_file)"
  local now
  now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Update stage status
  yq -i ".workflow.stages.$stage.status = \"complete\"" "$state_file"
  yq -i ".workflow.stages.$stage.completed_at = \"$now\"" "$state_file"

  # Append history
  yq -i ".history += [{\"timestamp\": \"$now\", \"stage\": \"$stage\", \"action\": \"completed\", \"agent\": \"${AF_AGENT:-claude}\"}]" "$state_file"

  echo "Stage completed: $stage"
}

# Mark stage as failed
af_state_stage_fail() {
  local stage="$1"
  local reason="${2:-unknown}"
  local state_file="$(_af_state_file)"
  local now
  now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Update stage status
  yq -i ".workflow.stages.$stage.status = \"failed\"" "$state_file"

  # Append history
  yq -i ".history += [{\"timestamp\": \"$now\", \"stage\": \"$stage\", \"action\": \"failed\", \"agent\": \"${AF_AGENT:-claude}\", \"reason\": \"$reason\"}]" "$state_file"

  echo "Stage failed: $stage - $reason"
}

# Update artifact status
af_state_artifact_update() {
  local artifact="$1"
  local status="$2"
  local path="${3:-}"
  local state_file="$(_af_state_file)"
  local now
  now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  yq -i ".artifacts.$artifact.status = \"$status\"" "$state_file"
  yq -i ".artifacts.$artifact.updated_at = \"$now\"" "$state_file"

  if [[ -z $(af_state_get "artifacts.$artifact.created_at") || $(af_state_get "artifacts.$artifact.created_at") == "null" ]]; then
    yq -i ".artifacts.$artifact.created_at = \"$now\"" "$state_file"
  fi

  if [[ -n "$path" ]]; then
    yq -i ".artifacts.$artifact.path = \"$path\"" "$state_file"
  fi

  echo "Artifact updated: $artifact -> $status"
}

# Set runtime variable
af_state_runtime_set() {
  local key="$1"
  local value="$2"
  af_state_set "runtime.$key" "$value"
}

# Get current workflow stage
af_state_current_stage() {
  af_state_get "workflow.current_stage"
}

# Print state summary
af_state_summary() {
  local state_file="$(_af_state_file)"
  echo "=== AppFactory State Summary ==="
  echo "Project: $(af_state_get 'project.id')"
  echo "Current Stage: $(af_state_get 'workflow.current_stage')"
  echo ""
  echo "Stages:"
  for stage in init prd ddd dsl plan implementation; do
    local status
    status=$(af_state_get "workflow.stages.$stage.status")
    printf "  %-15s %s\n" "$stage:" "$status"
  done
  echo ""
  echo "Artifacts:"
  for artifact in prd ddd dsl plan implementation_manifest; do
    local status
    status=$(af_state_get "artifacts.$artifact.status")
    printf "  %-25s %s\n" "$artifact:" "$status"
  done
}
```

---

## Skill Integration Examples

### af-project-init Integration

```bash
# In af-project-init execution

export APP_FACTORY_HOME="$HOME/gallery/app-factory"
export AF_PROJECT_ROOT="$HOME/generated-apps/$PROJECT_ID"
export AF_AGENT="claude-opus-4.5"

source "$APP_FACTORY_HOME/scripts/af-state.sh"

# Initialize state (creates state.yaml)
af_state_init "$PROJECT_ID"

# ... skill logic: create directories, copy scaffold, etc ...

# On success
af_state_stage_done "init"

# On failure
# af_state_stage_fail "init" "Failed to create scaffold"
```

### af-be-build-prd Integration

```bash
# In af-be-build-prd execution

export APP_FACTORY_HOME="$HOME/gallery/app-factory"
export AF_PROJECT_ROOT="$(pwd)"
export AF_AGENT="claude-opus-4.5"

source "$APP_FACTORY_HOME/scripts/af-state.sh"

# Validate state exists
if ! af_state_exists; then
  echo "ERROR: No state.yaml found. Run af-project-init first."
  exit 1
fi

# Check prerequisites and start stage
af_state_stage_start "prd" || exit 1

# ... skill logic: read worksheet, generate PRD, write to ai/specs/spec-be-prd.md ...

# On success
af_state_artifact_update "prd" "draft" "ai/specs/spec-be-prd.md"
af_state_stage_done "prd"

# On failure
# af_state_stage_fail "prd" "Worksheet incomplete"
```

### af-be-build-ddd Integration

```bash
# In af-be-build-ddd execution

source "$APP_FACTORY_HOME/scripts/af-state.sh"

# Validate prerequisites
if ! af_state_exists; then
  echo "ERROR: No state.yaml found."
  exit 1
fi

# Get PRD path from state
prd_path=$(af_state_get "artifacts.prd.path")
prd_status=$(af_state_get "artifacts.prd.status")

if [[ "$prd_status" != "approved" && "$prd_status" != "draft" ]]; then
  echo "ERROR: PRD not ready. Status: $prd_status"
  exit 1
fi

# Start stage (checks prerequisites automatically)
af_state_stage_start "ddd" || exit 1

# ... skill logic: read PRD, generate DDD ...

# On success
af_state_artifact_update "ddd" "draft"
af_state_stage_done "ddd"
```

### af-be-build-dsl Integration

```bash
source "$APP_FACTORY_HOME/scripts/af-state.sh"

af_state_stage_start "dsl" || exit 1

# Get DDD path from state
ddd_path=$(af_state_get "artifacts.ddd.path")

# ... skill logic: read DDD, generate DSL YAML ...

# Extract bounded contexts from generated DSL and store in runtime
# (This makes them available to downstream skills)
contexts=$(yq -r '.bounded_contexts[].name' ai/specs/dsl-be-ddd.yaml | tr '\n' ',' | sed 's/,$//')
af_state_set "runtime.bounded_contexts" "[$contexts]"

af_state_artifact_update "dsl" "draft"
af_state_stage_done "dsl"
```

---

## Claude Code Agent Pattern

When skills are executed by Claude Code (not shell scripts), the agent should:

### 1. Read State at Start

```markdown
## Procedure Step 1: Load State

Read `.appfactory/state.yaml` and extract:
- `workflow.current_stage`
- `workflow.stages.<this_stage>.requires`
- `artifacts.<upstream>.path` for each prerequisite
```

### 2. Validate Prerequisites

```markdown
## Procedure Step 2: Validate Prerequisites

For each stage in `requires`:
- Verify `workflow.stages.<stage>.status == "complete"`
- If not complete, STOP and report missing prerequisite
```

### 3. Update State In-Progress

```markdown
## Procedure Step 3: Mark In-Progress

Update `.appfactory/state.yaml`:
- Set `workflow.stages.<stage>.status` to `"in_progress"`
- Set `workflow.current_stage` to `"<stage>"`
- Append history entry
```

### 4. Execute Skill Logic

```markdown
## Procedure Step 4-N: Execute

[Normal skill procedure]
```

### 5. Update State on Completion

```markdown
## Procedure Final Step: Update State

Update `.appfactory/state.yaml`:
- Set `workflow.stages.<stage>.status` to `"complete"`
- Set `workflow.stages.<stage>.completed_at` to current ISO timestamp
- Set `artifacts.<artifact>.status` to `"draft"`
- Set `artifacts.<artifact>.created_at` to current ISO timestamp
- Append history entry
```

---

## State Queries for Skills

Common queries skills need to perform:

| Query | yq Command |
|-------|------------|
| Get current stage | `yq '.workflow.current_stage' state.yaml` |
| Check stage status | `yq '.workflow.stages.prd.status' state.yaml` |
| Get artifact path | `yq '.artifacts.ddd.path' state.yaml` |
| Get all complete stages | `yq '.workflow.stages | to_entries | map(select(.value.status == "complete")) | .[].key' state.yaml` |
| Get bounded contexts | `yq '.runtime.bounded_contexts[]' state.yaml` |
| Get last history entry | `yq '.history[-1]' state.yaml` |

---

## Error Handling

### Missing State File

```bash
if ! af_state_exists; then
  echo "ERROR: Project not initialized. Run: /af-project-init <projectId>"
  exit 1
fi
```

### Prerequisite Not Met

```bash
if ! af_state_prereqs_met "ddd"; then
  echo "ERROR: Cannot start DDD stage."
  echo "Required: $(yq '.workflow.stages.ddd.requires[]' state.yaml)"
  exit 1
fi
```

### Stage Already Complete

```bash
if af_state_stage_complete "prd"; then
  echo "WARNING: PRD stage already complete. Re-running will overwrite."
  # Optionally prompt for confirmation
fi
```

---

## Dependencies

The shell utility requires:

- `yq` (YAML processor) - https://github.com/mikefarah/yq
- `bash` 4.0+

Install yq:
```bash
brew install yq        # macOS
apt install yq         # Ubuntu/Debian
```
