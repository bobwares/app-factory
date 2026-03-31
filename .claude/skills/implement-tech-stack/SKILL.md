---
name: implement-tech-stack
description: Validate a tech stack name from its final path segment, resolve the matching tech stack profile under ./tech-stack-profiles, preview the exact implement command, and require confirmation before execution.
context: fork
---

# Implement Tech Stack

## Purpose

Use this skill to implement a tech stack profile into its matching implementation directory.

The input is only the final path segment, such as:

`serverless-typescript-lambda`

This skill treats `./tech-stack-profiles` as the constant source root and discovers the category directory automatically, for example `backend`, `persistence`, or `serverless-patterns`.

## Input Rules

Accept exactly one required input value.

The input must be the final path segment only, not a full path.

### Valid

- `serverless-typescript-lambda`
- `postgres-prisma`
- `event-driven-saga`

### Invalid

- `backend/serverless-typescript-lambda`
- `@tech-stack-profiles/backend/serverless-typescript-lambda`
- `./tech-stack-implementations/backend/serverless-typescript-lambda`
- `serverless typescript lambda`

## Constants

Use these constants exactly:

- Source root: `./tech-stack-profiles`
- Target root: `./tech-stack-implementations`

## Resolution Rules

Given input `<stack-name>`, search for matching source directories using this pattern:

`./tech-stack-profiles/*/<stack-name>`

The `*` segment is the category directory.

Examples:

- `./tech-stack-profiles/backend/serverless-typescript-lambda`
- `./tech-stack-profiles/persistence/postgres-prisma`
- `./tech-stack-profiles/serverless-patterns/event-driven-saga`

If exactly one match is found, derive:

- Category: `<category>`
- Source profile reference: `@tech-stack-profiles/<category>/<stack-name>`
- Source profile path: `./tech-stack-profiles/<category>/<stack-name>`
- Target category path: `./tech-stack-implementations/<category>`
- Target implementation path: `./tech-stack-implementations/<category>/<stack-name>`

The command to execute is:

`implement @tech-stack-profiles/<category>/<stack-name> under ./tech-stack-implementations/<category>/<stack-name>`

## Validation

Perform validation in this exact order.

### 1. Source Root Check

Check that this directory exists:

`./tech-stack-profiles`

If it does not exist, stop immediately and respond with:

`Error: source root path not found: ./tech-stack-profiles`

### 2. Target Root Check

Check that this directory exists:

`./tech-stack-implementations`

If it does not exist, stop immediately and respond with:

`Error: target root path not found: ./tech-stack-implementations`

### 3. Missing Input

If no input is provided, stop immediately and respond with:

`Error: missing required input. Provide only the tech stack name, for example: serverless-typescript-lambda`

### 4. Invalid Format

If the input contains `/`, `\`, whitespace, starts with `@`, starts with `.`, or does not match the pattern `^[a-z0-9][a-z0-9-]*$`, stop immediately and respond with:

`Error: invalid input. Provide only the final path segment using lowercase letters, numbers, and hyphens. Example: serverless-typescript-lambda`

### 5. Matching Source Profile Discovery

Search for directories matching:

`./tech-stack-profiles/*/<stack-name>`

#### If no matches are found

Stop immediately and respond with:

`Error: no tech stack profile found for '<stack-name>' under ./tech-stack-profiles/*/<stack-name>`

#### If more than one match is found

Stop immediately and respond with:

`Error: multiple tech stack profiles matched '<stack-name>'. Provide a unique final path segment or rename the conflicting directories.`

Then list each matching path on its own line.

### 6. Resolved Source Path Check

After resolving the unique match, verify that this directory exists:

`./tech-stack-profiles/<category>/<stack-name>`

If it does not exist, stop immediately and respond with:

`Error: source tech stack profile not found: ./tech-stack-profiles/<category>/<stack-name>`

### 7. Target Category Path Check

Check that this directory exists:

`./tech-stack-implementations/<category>`

If it does not exist, stop immediately and respond with:

`Error: target category path not found: ./tech-stack-implementations/<category>`

Do not create missing directories automatically.

## Pre-Execution Confirmation

If validation succeeds, do not execute yet.

First present exactly what will be executed in a compact summary:

- Input: `<stack-name>`
- Category: `<category>`
- Source: `@tech-stack-profiles/<category>/<stack-name>`
- Source path: `./tech-stack-profiles/<category>/<stack-name>`
- Target path: `./tech-stack-implementations/<category>/<stack-name>`
- Command: `implement @tech-stack-profiles/<category>/<stack-name> under ./tech-stack-implementations/<category>/<stack-name>`

Then ask exactly:

`Proceed with this implementation? Reply yes to continue or no to stop.`

## Confirmation Handling

### Yes

Only if the user explicitly replies `yes`, continue to execution.

### No or Anything Else

If the user replies `no`, cancels, or gives any response other than an explicit `yes`, stop immediately and respond with:

`Cancelled. Nothing was executed.`

## Execution

After explicit confirmation, execute exactly:

`implement @tech-stack-profiles/<category>/<stack-name> under ./tech-stack-implementations/<category>/<stack-name>`

## Post-Execution Output

After execution completes, report:

1. The command that was executed
2. Whether execution succeeded or failed
3. The resolved source path and target path
4. Any files created or changed
5. Any errors exactly as encountered

## Usage Example

A typical invocation is:

`/implement-tech-stack serverless-typescript-lambda`

If the unique match is:

`./tech-stack-profiles/backend/serverless-typescript-lambda`

Then the skill must present:

- Input: `serverless-typescript-lambda`
- Category: `backend`
- Source: `@tech-stack-profiles/backend/serverless-typescript-lambda`
- Source path: `./tech-stack-profiles/backend/serverless-typescript-lambda`
- Target path: `./tech-stack-implementations/backend/serverless-typescript-lambda`
- Command: `implement @tech-stack-profiles/backend/serverless-typescript-lambda under ./tech-stack-implementations/backend/serverless-typescript-lambda`

Then it must ask for confirmation before execution.
