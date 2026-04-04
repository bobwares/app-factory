# AppFactory Agentic Pipeline Scan Notes

## Paths Inspected

- `/Users/bobware/coding-agents-config`
- `/Users/bobware/gallery/app-factory`
- `/Users/bobware/gallery/customer-app`
- `/Users/bobware/.claude/CLAUDE.md`
- `/Users/bobware/.codex/AGENTS.md`
- `./.claude/skills/implement-tech-stack/SKILL.md`
- `./.claude/skills/list-tech-stacks/SKILL.md`

Other gallery projects exist under `/Users/bobware/gallery/`, including `order-app`, `todo-app`, `orders-system`, and others. Because the user explicitly named `/Users/bobware/gallery/customer-app`, that repository was treated as the relevant customer app for this scan.

## Key Files Discovered

### Agent Configuration

- `/Users/bobware/coding-agents-config/CLAUDE.md`
- `/Users/bobware/coding-agents-config/README.md`
- `/Users/bobware/coding-agents-config/hooks/branch-guard.sh`
- `/Users/bobware/coding-agents-config/skills/session-start/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/task-init/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/turn-init/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/turn-end/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/project-init/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-prd/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-ddd/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-dsl/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-plan/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-implementation/SKILL.md`
- `/Users/bobware/coding-agents-config/skills/app-from-dsl/SKILL.md`

### AppFactory

- `/Users/bobware/gallery/app-factory/README.md`
- `/Users/bobware/gallery/app-factory/docs/App Factory Overview.md`
- `/Users/bobware/gallery/app-factory/docs/App Factory Workflow.md`
- `/Users/bobware/gallery/app-factory/tech-stack-profiles/README.md`
- `/Users/bobware/gallery/app-factory/tech-stack-profiles/backend/container-typescript-nestjs.yaml`
- `/Users/bobware/gallery/app-factory/tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml`
- `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/README.md`
- `/Users/bobware/gallery/app-factory/projects/customer-profile-app.yaml`
- `/Users/bobware/gallery/app-factory/Makefile`
- `/Users/bobware/gallery/app-factory/.claude/skills/implement-tech-stack/SKILL.md`
- `/Users/bobware/gallery/app-factory/.claude/skills/list-tech-stacks/SKILL.md`

### Customer App

- `/Users/bobware/gallery/customer-app/README.md`
- `/Users/bobware/gallery/customer-app/ai/specs/spec-be-prd.md`
- `/Users/bobware/gallery/customer-app/ai/specs/spec-be-ddd.md`
- `/Users/bobware/gallery/customer-app/ai/specs/dsl-be-ddd.yaml`
- `/Users/bobware/gallery/customer-app/ai/specs/project.dsl.yaml`
- `/Users/bobware/gallery/customer-app/archive/plan-fullstack-customer-user-maintenance-delivery-v1.0.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks_index.csv`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-001/task_summary.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-002/task_summary.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-004/task_summary.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/task_summary.md`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-004/turns/turn-004/manifest.json`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/turns/turn-002/manifest.json`

## Uncertainties

- Whether `customer-app` is intentionally still only in the planning/modeling phase, or whether generated code existed earlier and was later moved or removed.
- Whether current flat `ai/specs/` files are the canonical spec paths, or whether the older `ai/specs/backend/` and `ai/specs/prd/` paths referenced in task summaries are still the intended standard.
- Whether backend DSL should live at `dsl-be-ddd.yaml` or `dls-be-ddd.yaml`.
- Whether the AppFactory sample project YAML and customer-app project DSL stack identifiers are typos or placeholders awaiting normalization.

## Open Questions

- At what exact step should AppFactory copy `tech-stack-implementations/...` into a downstream repo like `customer-app`?
- Which artifact is authoritative for execution:
  - `customer-app/ai/specs/project.dsl.yaml`
  - `customer-app/ai/specs/dsl-be-ddd.yaml`
  - archived plan and prompt files
  - or task-specific files referenced only in manifests and summaries
- Should the customer app already contain `apps/api`, `apps/web`, and `packages/*` if the selected stack is the Turborepo monorepo?
- Is `customer-app` meant to be backend-only at this stage, despite the archived plan targeting a full-stack monorepo?
- Which repo is supposed to own the active prompt library for downstream projects: `ai/prompts/` in the generated project, or archived prompt copies?

## Possible Follow-Up Files To Inspect Next

- `/Users/bobware/gallery/customer-app/.gitignore`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-004/turns/turn-004/execution_trace.json`
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/turns/turn-001/execution_trace.json`
- `/Users/bobware/gallery/customer-app/archive/prompts/task-plan-prompt.md`
- `/Users/bobware/gallery/customer-app/archive/customer-app.dsl.yml`
- `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/apps/api/package.json`
- `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/apps/web/package.json`
- `/Users/bobware/gallery/app-factory/tech-stack-implementations/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo/package.json`
- `/Users/bobware/coding-agents-config/skills/project-init/templates/ai/specs/app-factory-workflow.md`
- `/Users/bobware/coding-agents-config/skills/af-be-build-dsl/templates/domain-dsl-template.yaml`

## Concrete Mismatches Observed

- `/Users/bobware/gallery/customer-app/ai/specs/project.dsl.yaml` references `container-typescript-nestjs_nextjs-hybrid-container-node__turbo-monorepo`, but the actual AppFactory stack profile is `/Users/bobware/gallery/app-factory/tech-stack-profiles/stacks/container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo.yaml`.
- `/Users/bobware/gallery/app-factory/projects/customer-profile-app.yaml` repeats the same stack-id mismatch.
- `/Users/bobware/gallery/customer-app/README.md` refers to `ai/prompts/`, but that directory is missing.
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-004/task_summary.md` and related manifests reference `ai/specs/backend/...` files that are not present in the current filesystem.
- `/Users/bobware/gallery/customer-app/ai/agentic-pipeline/tasks/task-005/task_summary.md` references `ai/app-dsl/domain/...` files that are also not present now.
