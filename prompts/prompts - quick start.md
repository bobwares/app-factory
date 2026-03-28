# App Factory Interactive Planning Prompt v1

## Objective

You want a **guided front-end prompt** for the **App Factory** process that moves from:

1. **Requirements discovery**
2. **PRD creation**
3. **DDD / domain design**
4. **DSL definition**
5. **Coding-agent execution**

The right first deliverable is not the full PRD. It is a **structured intake and orchestration prompt** that keeps the session on track, asks the right questions in sequence, and produces the correct artifacts at each stage.

## App Factory Flow

### Phase 1: Idea Intake

Purpose:

* Capture the business problem
* Identify users and goals
* Bound the scope
* Define success before design starts

Primary output:

* **Idea Brief**
* **Initial scope statement**
* **Open questions list**

### Phase 2: PRD

Purpose:

* Convert the idea into a product definition
* Define actors, use cases, workflows, constraints, and success criteria
* Establish what is in scope and out of scope

Primary output:

* **PRD**

### Phase 3: Domain-Driven Design

Purpose:

* Identify bounded contexts
* Define aggregates, entities, value objects, domain services, events, and policies
* Establish ubiquitous language

Primary output:

* **DDD document**

### Phase 4: DSL Design

Purpose:

* Translate PRD + DDD into executable definitions for:

    * system structure
    * UI
    * APIs
    * workflows
    * validation
    * integration points
    * infrastructure intent

Primary output:

* **DSL files**
* Usually `system.yml` plus supporting YAML files

### Phase 5: Coding Agent Execution

Purpose:

* Feed the DSL and standards into the coding agent
* Generate or update the application
* Produce tests, ADRs, turn artifacts, and implementation outputs

Primary output:

* **Generated application artifacts**
* **Tests**
* **Governance artifacts**
* **Execution trace / turn outputs**

## Step-by-Step Track

## Step 1: Create the Idea Brief

### What to answer

1. What problem are we solving?
2. Who experiences the problem?
3. Why does this matter now?
4. What is the desired business outcome?
5. What would success look like in 30, 60, and 90 days?
6. What is explicitly out of scope?

### Output

* One-page **Idea Brief**
* Initial assumptions
* Risks and unknowns

## Step 2: Create the PRD

### What to answer

1. Who are the actors and users?
2. What are the main user journeys?
3. What capabilities must exist in v1?
4. What rules, validations, and constraints apply?
5. What integrations are required?
6. What reporting, audit, security, and compliance needs exist?
7. What are the non-functional requirements?
8. What are the acceptance criteria?

### Output

* Structured **PRD**
* Prioritized feature list
* Functional and non-functional requirements
* Acceptance criteria

## Step 3: Create the DDD Model

### What to answer

1. What are the bounded contexts?
2. What is the ubiquitous language?
3. What are the aggregates?
4. What are the entities and value objects?
5. What business rules belong in the domain?
6. What domain events occur?
7. Where are external systems involved?
8. What cross-context relationships exist?

### Output

* **DDD document**
* Context map
* Aggregate definitions
* Domain rules and events

## Step 4: Create the DSL

### What to answer

1. What systems and components exist?
2. What pages, forms, widgets, and workflows are needed?
3. What APIs, commands, queries, and events are required?
4. What validation rules must be encoded?
5. What infrastructure targets are needed?
6. What coding standards and generation constraints apply?

### Output

* **DSL YAML**
* UI definitions
* API definitions
* Validation rules
* Infrastructure intent
* Generation directives

## Step 5: Execute Through the Coding Agent

### What to answer

1. What repo or project structure should be used?
2. What target stack profiles apply?
3. What governance rules must be enforced?
4. What tests are mandatory?
5. What deliverables must be created each turn?

### Output

* Final **execution prompt**
* Repo generation plan
* Agent instructions
* Validation and testing checklist

## Structure of the Interactive Prompt

### Design Goal

The prompt should behave like a **facilitator**. It should:

* Ask one section at a time
* Keep the user focused
* Summarize answers before moving on
* Track assumptions and unresolved questions
* Produce a concrete artifact after each phase
* Prevent skipping foundational decisions

### Required Behaviors

The interactive prompt should:

1. Start with the **idea and business problem**
2. Ask targeted questions in small batches
3. Summarize the answers after each batch
4. Show:

    * confirmed facts
    * assumptions
    * unresolved questions
    * risks
5. Move to the next phase only when the current phase is coherent
6. Generate artifacts incrementally:

    * Idea Brief
    * PRD
    * DDD
    * DSL
    * coding-agent execution prompt

## First Draft of the Interactive Prompt

### Prompt

```text
You are the App Factory Discovery Facilitator.

Your job is to guide me step by step from raw idea to implementation-ready App Factory artifacts.

We will work in this sequence:

1. Idea Brief
2. PRD
3. Domain-Driven Design
4. DSL Definition
5. Coding Agent Execution Prompt

Your operating rules:

1. Be interactive.
2. Ask only the questions needed for the current phase.
3. Ask questions in small batches, not all at once.
4. After each batch, summarize:
   - Confirmed facts
   - Assumptions
   - Open questions
   - Risks
5. Do not skip ahead unless the current phase is sufficiently clear.
6. When a phase is complete, generate its draft artifact before moving to the next phase.
7. Keep all outputs structured and reusable for later App Factory steps.
8. When useful, suggest options or patterns, but clearly label them as recommendations.
9. Where information is missing, identify the gap explicitly instead of inventing detail.
10. Optimize for eventual translation into PRD, DDD, DSL YAML, and coding-agent prompts.

For each phase, use this method:

Phase method:
- Ask discovery questions
- Summarize my answers
- Identify missing decisions
- Produce the draft artifact
- Ask whether to continue to the next phase

Artifact expectations:

Idea Brief:
- Product name
- Problem statement
- Target users
- Business goal
- Core value proposition
- Scope summary
- Risks
- Open questions

PRD:
- Overview
- Goals and non-goals
- Actors
- User journeys
- Functional requirements
- Non-functional requirements
- Business rules
- Acceptance criteria
- Dependencies
- Risks and assumptions

DDD:
- Ubiquitous language
- Bounded contexts
- Context map
- Aggregates
- Entities
- Value objects
- Domain services
- Domain events
- Policies
- External systems

DSL:
- System definition
- Components
- UI pages
- Forms
- Widgets
- Validation rules
- APIs
- Workflows
- Integrations
- Infrastructure intent
- Target stack profile mappings

Coding Agent Execution Prompt:
- Goal
- Inputs
- Required artifacts
- Repo conventions
- Governance requirements
- Test requirements
- Output expectations

Start with Phase 1: Idea Brief.

First, ask me the minimum set of high-value questions needed to define:
- the problem
- the users
- the business outcome
- the initial scope

Do not generate the PRD yet.
```

## Recommended Expansion for the Next Revision

### Add Phase-Specific Question Banks

For the next version, each phase should include a controlled question bank.

#### Idea Brief question bank

* What is the application called?
* What business problem does it solve?
* Who are the primary users?
* Who are the secondary users?
* What pain exists in the current process?
* What value will the application create?
* What is the smallest viable version?

#### PRD question bank

* What are the top 3 user goals?
* What tasks must each actor complete?
* What data must be captured?
* What validations are mandatory?
* What audit and reporting needs exist?
* What are the response-time and scale expectations?
* What compliance or security constraints exist?

#### DDD question bank

* What business capabilities exist?
* Where are the natural boundaries in the domain?
* What objects have identity?
* What objects are immutable values?
* What business events matter?
* What invariants must always hold?
* What workflows cross bounded contexts?

#### DSL question bank

* What pages exist?
* What components and widgets are reusable?
* What APIs and events must be declared?
* What workflows require orchestration?
* What platform targets apply?
* What test rules should be generated?

## Suggested Artifact Chain

### Sequence

| Step | Artifact                             | Purpose                           |
| ---- | ------------------------------------ | --------------------------------- |
| 1    | `idea-brief.md`                      | Capture business intent and scope |
| 2    | `prd.md`                             | Define product requirements       |
| 3    | `ddd.md`                             | Define the domain model           |
| 4    | `system.yml` and supporting DSL YAML | Define implementation structure   |
| 5    | `execution-prompt.md`                | Drive coding-agent generation     |

## Why This Prompt Structure Works

### Benefits

* It prevents jumping directly into code
* It separates **product thinking** from **domain modeling**
* It gives the DSL a clear source of truth
* It makes the coding-agent input more deterministic
* It creates a reusable App Factory workflow instead of a one-off conversation

## Next Draft Direction

### What to build next

The next iteration should expand this into a **full facilitator prompt pack** with:

1. A master orchestrator prompt
2. A dedicated **Idea Brief** prompt
3. A dedicated **PRD** prompt
4. A dedicated **DDD** prompt
5. A dedicated **DSL authoring** prompt
6. A dedicated **coding-agent handoff** prompt

That is the cleaner architecture, because each prompt can be optimized for one artifact while the orchestrator controls progression.

## Recommended Next Action

### Best next step

The next deliverable should be **v2 of this prompt**, where I turn this into a production-ready interactive prompt with:

* stronger question sequencing
* explicit artifact templates
* stop/go gates between phases
* App Factory-specific output sections

If you want, I will write that next as the **full orchestrator prompt**.
