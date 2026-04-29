# AppFactory Provenance Specification

## Overview

The `provenance.json` file is an **immutable record** created at project initialization that captures the origin and lineage of an AppFactory project. It answers the question: "Where did this project come from?"

## File Location

```
<project-root>/.appfactory/provenance.json
```

## When Created

The file is created once by `af-project-init` and never modified afterward.

## Schema

```json
{
  "schemaVersion": "1.0.0",
  "recordedAt": "<ISO 8601 timestamp>",
  "project": {
    "id": "<project-id>",
    "name": "<human-readable name>",
    "description": "<project description>",
    "projectYamlPath": "projects/<project-id>.yaml"
  },
  "appFactory": {
    "repositoryPath": "<absolute path to AppFactory>",
    "commit": "<git commit hash>",
    "stackProfileRefs": [
      "<stack profile reference>"
    ],
    "resolvedProfilePaths": [
      "tech-stack-profiles/<path>.yaml"
    ],
    "resolvedImplementationPaths": [
      "tech-stack-implementations/<path>"
    ]
  },
  "generator": {
    "skill": "af-project-init",
    "skillRepositoryPath": "<absolute path to skill repo>",
    "skillRepositoryCommit": "<git commit hash>"
  }
}
```

## Field Reference

### Root Fields

| Field | Type | Description |
|-------|------|-------------|
| `schemaVersion` | string | Provenance schema version (currently `1.0.0`) |
| `recordedAt` | ISO 8601 | Timestamp when the project was initialized |

### project

Identity information from the source project YAML.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Project identifier (e.g., `customer-profile-app`) |
| `name` | string | Human-readable project name |
| `description` | string | Project description |
| `projectYamlPath` | string | Relative path to source YAML in AppFactory |

### appFactory

Records which AppFactory version and stack were used.

| Field | Type | Description |
|-------|------|-------------|
| `repositoryPath` | string | Absolute path to AppFactory at creation time |
| `commit` | string | Git commit hash of AppFactory when project was created |
| `stackProfileRefs` | array | Stack profile references from project YAML |
| `resolvedProfilePaths` | array | Resolved paths to profile YAML files |
| `resolvedImplementationPaths` | array | Resolved paths to implementation directories that were copied |

### generator

Records which skill and version created the project.

| Field | Type | Description |
|-------|------|-------------|
| `skill` | string | Skill name that generated the project |
| `skillRepositoryPath` | string | Absolute path to the skill repository |
| `skillRepositoryCommit` | string | Git commit hash of the skill repo |

## Example

```json
{
  "schemaVersion": "1.0.0",
  "recordedAt": "2026-04-06T10:00:00Z",
  "project": {
    "id": "customer-profile-app",
    "name": "Customer Service App",
    "description": "Full Service Customer Maintenance application.",
    "projectYamlPath": "projects/customer-profile-app.yaml"
  },
  "appFactory": {
    "repositoryPath": "/Users/bobware/gallery/app-factory",
    "commit": "3c3c3c1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    "stackProfileRefs": [
      "stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo"
    ],
    "resolvedProfilePaths": [
      "tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml"
    ],
    "resolvedImplementationPaths": [
      "tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo"
    ]
  },
  "generator": {
    "skill": "af-project-init",
    "skillRepositoryPath": "/Users/bobware/coding-agents-config",
    "skillRepositoryCommit": "a700f11b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f"
  }
}
```

## Purpose

The provenance file enables:

1. **Reproducibility** — Know exactly which AppFactory commit and stack were used
2. **Debugging** — Trace issues back to specific versions
3. **Upgrades** — Compare current AppFactory to the version used at creation
4. **Audit** — Record who/what created the project and when

## Relationship to state.yaml

Both files live in `.appfactory/` but serve different purposes:

| Aspect | `provenance.json` | `state.yaml` |
|--------|-------------------|--------------|
| **Mutability** | Immutable (write once at init) | Mutable (updated by each skill) |
| **Purpose** | "Where did this come from?" | "Where are we now?" |
| **Created by** | `af-project-init` only | `af-project-init`, updated by all af-* skills |
| **Contains** | Git commits, source paths, versions | Workflow status, artifact status, runtime vars |
| **Use case** | Reproducibility, audit | Orchestration, resume, progress tracking |

### Directory Structure

```
.appfactory/
├── provenance.json    # Immutable: creation-time lineage
└── state.yaml         # Mutable: workflow state
```

## Reading Provenance

### Shell

```bash
# Get AppFactory commit used
jq -r '.appFactory.commit' .appfactory/provenance.json

# Get stack profile
jq -r '.appFactory.stackProfileRefs[0]' .appfactory/provenance.json

# Get creation timestamp
jq -r '.recordedAt' .appfactory/provenance.json
```

### Checking for Drift

Compare the AppFactory commit at creation to current:

```bash
PROVENANCE_COMMIT=$(jq -r '.appFactory.commit' .appfactory/provenance.json)
CURRENT_COMMIT=$(git -C ~/gallery/app-factory rev-parse HEAD)

if [[ "$PROVENANCE_COMMIT" != "$CURRENT_COMMIT" ]]; then
  echo "AppFactory has changed since project creation"
  echo "Created with: $PROVENANCE_COMMIT"
  echo "Current:      $CURRENT_COMMIT"
fi
```

## Immutability Guarantee

The provenance file must never be modified after creation. If regeneration is needed (e.g., stack upgrade), create a new provenance record with a different schema or append to a history array in a future schema version.
