---
name: list-tech-stacks
description: List all available tech-stack-profiles organized by category. Optionally filter by category (backend, ui, persistence, iac, stacks).
---

# List Tech Stack Profiles

Display available tech-stack-profiles from `tech-stack-profiles/` organized by category.

## Usage

```
/list-tech-stacks [category]
```

**Arguments:**
- `category` (optional): Filter to specific category. Valid values: `backend`, `ui`, `persistence`, `iac`, `stacks`, `all`

## Execution Steps

### Step 1: Locate Profiles Directory

```bash
PROFILES_DIR="./tech-stack-profiles"
if [ ! -d "$PROFILES_DIR" ]; then
  echo "Error: tech-stack-profiles directory not found"
  exit 1
fi
```

### Step 2: List Profiles by Category

For each category directory, list all `.yaml` files and extract key metadata.

**Categories to scan:**
- `backend/` - Backend service profiles
- `ui/` - Frontend/UI profiles
- `persistence/` - Database/storage profiles
- `iac/` - Infrastructure-as-code profiles
- `stacks/` - Combined backend+UI stack profiles

### Step 3: Extract Profile Summary

For each profile file, extract and display:

| Field | YAML Path | Example |
|-------|-----------|---------|
| ID | `profile.id` | `container-typescript-nestjs` |
| Category | `profile.category` | `backend` |
| Platform | `profile.platform` | `container` |
| Language | `profile.language` | `typescript` |
| Framework | `profile.framework` | `nestjs` |

### Step 4: Display Output

Format output as a categorized table:

```
═══════════════════════════════════════════════════════════════════════
  TECH STACK PROFILES
═══════════════════════════════════════════════════════════════════════

## Backend (5 profiles)

| ID | Platform | Language | Framework |
|----|----------|----------|-----------|
| container-java-springboot | container | java | springboot |
| container-python-fastapi | container | python | fastapi |
| container-typescript-nestjs | container | typescript | nestjs |
| serverless-python-lambda | serverless | python | lambda |
| serverless-typescript-lambda | serverless | typescript | lambda |

## UI (3 profiles)

| ID | Framework | Bundler | Delivery |
|----|-----------|---------|----------|
| angular-spa-container-nginx | angular | esbuild | container |
| nextjs-hybrid-container-node | nextjs | turbopack | container |
| react-spa-container-nginx | react | vite | container |

## Persistence (3 profiles)

| ID | Engine | Model |
|----|--------|-------|
| dynamodb-single-table | dynamodb | single-table |
| kafka-event-stream | kafka | event-stream |
| postgresql-service | postgresql | relational |

## IaC (8 profiles)

| ID | Tool | Platform |
|----|------|----------|
| aws-cdk-ecs-fargate-typescript | cdk | aws |
| aws-cdk-serverless-typescript | cdk | aws |
| aws-sam-serverless | sam | aws |
| docker-compose-local-dev | docker-compose | local |
| helm-kubernetes-packaging | helm | kubernetes |
| terraform-aws-ecs-fargate | terraform | aws |
| terraform-aws-ecs-ui | terraform | aws |
| terraform-aws-serverless | terraform | aws |
| terraform-kubernetes | terraform | kubernetes |

## Stacks (11 profiles)

| ID | Backend | UI |
|----|---------|-----|
| container-java-springboot__angular-spa-container-nginx | container-java-springboot | angular-spa-container-nginx |
| container-java-springboot__react-spa-container-nginx | container-java-springboot | react-spa-container-nginx |
| container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo | container-typescript-nestjs | nextjs-hybrid-container-node |
...

═══════════════════════════════════════════════════════════════════════
  Total: 30 profiles across 5 categories
═══════════════════════════════════════════════════════════════════════
```

## Filtering by Category

If a category argument is provided, only display that category:

```
/list-tech-stacks backend
```

Output:
```
═══════════════════════════════════════════════════════════════════════
  TECH STACK PROFILES — Backend
═══════════════════════════════════════════════════════════════════════

| ID | Platform | Language | Framework |
|----|----------|----------|-----------|
| container-java-springboot | container | java | springboot |
| container-python-fastapi | container | python | fastapi |
| container-typescript-nestjs | container | typescript | nestjs |
| serverless-python-lambda | serverless | python | lambda |
| serverless-typescript-lambda | serverless | typescript | lambda |

═══════════════════════════════════════════════════════════════════════
  5 backend profiles
═══════════════════════════════════════════════════════════════════════
```

## Profile Details

For detailed view of a single profile, user should read the YAML file directly:

```bash
cat tech-stack-profiles/backend/container-typescript-nestjs.yaml
```

## Implementation Notes

- Use `yq` or YAML parsing to extract fields if available
- Fall back to grep/sed for basic field extraction
- Sort profiles alphabetically within each category
- Count totals per category and overall
