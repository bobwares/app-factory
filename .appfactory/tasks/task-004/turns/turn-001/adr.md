# ADR: Add validation checks to af-project-init

## Status

Accepted

## Context

The `af-project-init` skill was allowing project initialization to proceed without proper validation, leading to confusing failures or unintended behavior when:
- The project YAML didn't exist in the projects directory
- The GitHub repository already existed
- The project directory already existed on disk

## Decision

Add three sequential validation checks at the start of `init-appfactory-project.sh`:

1. **Check 1**: Project YAML must exist in `projects/` directory - exit 1 if not found
2. **Check 2**: GitHub repository must NOT already exist - exit 1 if it does
3. **Check 3**: Project directory must NOT already exist on disk - exit 1 if it does

All checks run before any project creation work begins.

## Consequences

- Projects cannot be initialized without a valid YAML definition file
- Duplicate GitHub repositories are caught early with a clear error
- Existing local directories are protected from being overwritten
- Dead code removed (the old warning fallback for missing YAML)
