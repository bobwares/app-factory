# Target Tech Stack Profiles

## Purpose

This package defines a **composable target-tech-stack-profile model** for an AI-powered app factory.

The intent is to keep the DSL modular:

- **backend profiles** define runtime, language, framework, compute platform, and service conventions
- **ui profiles** define SPA framework and delivery/runtime conventions
- **persistence profiles** define primary data-store style and operational defaults
- **iac profiles** define infrastructure-as-code technology and deployment topology
- **stack profiles** compose the above into resolved application targets

## Design Assumptions

### Backend

The backend target space requested is:

- **Serverless**
  - **TypeScript**
  - **Python**
- **Containers**
  - **Java**
  - **TypeScript**
  - **Python**

### UI

The UI target space requested is:

- **React**
- **Angular**

Current default deployment assumption for the UI is **containerized SPA delivery** using **Nginx**.
If you later decide to support static hosting, that should be added as a separate UI delivery profile rather than changing these profiles in place.

### Persistence Defaults

These profiles include sensible default persistence references:

- **Serverless backend stacks** default to **DynamoDB**
- **Container backend stacks** default to **PostgreSQL**

That is a default, not a hard rule. The stack profile composition model allows you to swap persistence later.

### IaC Coverage

The IaC choices included are:

- **AWS SAM**
- **AWS CDK (TypeScript)**
- **Terraform**
- **Helm** for Kubernetes packaging
- **Docker Compose** for local development only

## File Layout

```text
profiles/
  backend/
  ui/
  persistence/
  iac/
  stacks/
```

## Profile Kinds

### Backend profile

Defines:

- compute platform
- language
- framework
- packaging/runtime shape
- observability defaults
- network defaults
- service conventions

### UI profile

Defines:

- framework
- bundler/build tool
- delivery shape
- web server/runtime
- container packaging conventions

### Persistence profile

Defines:

- database model
- engine
- schema strategy
- migration approach
- local-dev assumptions

### IaC profile

Defines:

- IaC tool
- provider/platform
- deployment topology
- expected modules/artifacts
- state/secrets assumptions

### Stack profile

Composes a full solution from references to the other profiles.

## Naming Convention

Use this naming convention for new profiles:

- backend: `<platform>-<language>-<framework>`
- ui: `<framework>-<delivery-shape>`
- persistence: `<engine>-<pattern>`
- iac: `<tool>-<platform>`
- stack: `<backend>__<ui>`

## Recommended Defaults

### Recommended serverless path

- backend: `serverless-typescript-lambda`
- ui: `react-spa-container-nginx`
- persistence: `dynamodb-single-table`
- iac:
  - `aws-sam-serverless`
  - `terraform-aws-ecs-ui`
  - `docker-compose-local-dev`

### Recommended container path

- backend: `container-typescript-nestjs`
- ui: `react-spa-container-nginx`
- persistence: `postgresql-service`
- iac:
  - `terraform-aws-ecs-fargate`
  - `docker-compose-local-dev`

## Notes on Composition

### Mixed topologies

A serverless backend plus a containerized UI is a **mixed topology**.
That means a stack profile can reference **multiple IaC profiles**:

- one for backend/serverless
- one for UI/container delivery
- optionally one for local development

### Future expansion

You will probably add these later:

- `react-spa-static-s3-cloudfront`
- `angular-spa-static-s3-cloudfront`
- `container-java-quarkus`
- `container-python-django`
- `serverless-python-fastapi-mangum`
- `serverless-typescript-nestjs-lambda`
- `aurora-postgres-serverless-v2`
- `eks-multi-service`

## How to Use in the App DSL

Example composition:

```yaml
target:
  stackProfileRef: stack/serverless-typescript-lambda__react-spa-container-nginx
```

Or explicit composition:

```yaml
target:
  backendProfileRef: backend/serverless-typescript-lambda
  uiProfileRef: ui/react-spa-container-nginx
  persistenceProfileRef: persistence/dynamodb-single-table
  iacProfileRefs:
    - iac/aws-sam-serverless
    - iac/terraform-aws-ecs-ui
    - iac/docker-compose-local-dev
```

## Included Stack Profiles

This package includes all requested backend and UI combinations:

- 2 serverless backend choices × 2 UI choices = 4 mixed-topology profiles
- 3 container backend choices × 2 UI choices = 6 container-topology profiles

Total: **10 resolved stack profiles**
