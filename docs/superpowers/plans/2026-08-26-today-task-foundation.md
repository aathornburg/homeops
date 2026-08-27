# Today Task Foundation Implementation Plan

> **Developer-authored plan:** This is intentionally an outcome-and-acceptance checklist. It contains no implementation code, function signatures, exact filenames, line numbers, or drop-in tests. The developer chooses the structure and writes every line.

**Goal:** Produce a pure, deterministic task projection and grouping boundary that separates deadline-driven work from intentionally planned work and returns the `For today` and `Upcoming` collections described in the approved design.

**Architecture:** Tasks retain ownership of task lifecycle and actionability. Today consumes a small task-facing projection and owns date-horizon placement and ordering. The boundary receives an explicit reference calendar date and remains independent of React, route state, and the system clock.

**Tech Stack:** TypeScript 6, the existing React/Vite application, and repository lint/type/build tooling.

---

## Scope

### Included

- A Today-facing task projection.
- Separate due-date and scheduled-date semantics.
- A task-to-Today mapping boundary for realistic mock task records.
- Row-level blocked facts without blocked-based placement.
- Pure placement into `For today` and `Upcoming`.
- Deterministic ordering and duplicate handling.
- Fixed-date manual acceptance checks.

### Deferred

- React route composition and visual task rows.
- Completion and other mutations.
- The Projects panel and project lifecycle summaries.
- Project entitlement and upgrade behavior.
- Calendar and notification integration.
- Persistence and backend rules.
- Automated unit tests, per the current development sequence.

## Existing Starting Point

- The Today route remains a placeholder.
- Empty Today-feature and shared-type stubs currently exist as untracked developer work.
- No established task-domain module or automated test command currently exists.
- The approved design is `docs/superpowers/specs/2026-08-26-today-tasks-projects-design.md`.

The developer should decide whether each empty stub still represents the right ownership boundary. A Today-specific projection should not move into a generic shared area merely because multiple Today components may eventually consume it.

## Milestone 1: Establish the Task Projection Boundary

### Outcome

Today can receive all task facts needed for placement and later presentation without consuming a complete task-domain object or a generic cross-feature `AttentionItem`.

### Checklist

- [ ] Choose the Today-feature location and naming for the task projection.
- [ ] Keep stable identity, task destination, title, and optional project context available for later rows.
- [ ] Represent due date and scheduled date as separate optional calendar-date concepts.
- [ ] Preserve blocked state, concise blocker context, actionability, and completion eligibility without embedding handlers or React state.
- [ ] Retain normalized priority only if it will participate in the approved ordering.
- [ ] Exclude project lifecycle state, calendar-event fields, notification fields, rendered components, handlers, and precomputed section names.
- [ ] Resolve the empty generic shared-type stub: remove it later if it has no justified cross-feature responsibility, or leave it untouched until such a responsibility exists.

### Acceptance

- The projection can represent an overdue chore, a due-today chore, an undated task planned for today, and a project-associated task without changing shape.
- Due and scheduled dates remain distinguishable.
- Nothing in the projection decides its Today section.
- Nothing in the projection depends on React or the current time.

## Milestone 2: Define the Mock Task Mapping Boundary

### Outcome

Realistic mock task records can be translated into the Today projection while task-specific lifecycle meaning remains outside the grouping logic.

### Checklist

- [ ] Decide the smallest mock task representation needed for this slice.
- [ ] Map stable identity, display facts, destination, due date, scheduled date, priority when retained, and optional project context.
- [ ] Carry visible, incomplete tasks, including blocked tasks that may qualify through due or scheduled dates.
- [ ] Keep cancelled, completed, archived, and unauthorized tasks out of the Today input.
- [ ] Map blocked state and concise blocker context without assigning a Today section.
- [ ] Ensure an undated task can enter Today through an intentional scheduled date rather than a vague `requires attention` flag.
- [ ] Keep project waiting state out of the task mapping; project summaries own that concern in a later slice.

### Acceptance

- Mapping a task never assigns `For today` or `Upcoming`.
- A project-associated task remains a task rather than becoming a separate project-step source.
- Calendar events and notifications cannot accidentally enter through the task mapping.
- Repeating the mapping over unchanged records produces stable identities and equivalent output.

## Milestone 3: Implement Calendar-Date Placement

### Outcome

A caller can provide task projections and a chosen reference calendar date and receive deterministic `For today` and `Upcoming` collections.

### Checklist

- [ ] Accept the reference date from the caller; do not read the system clock inside the grouping boundary.
- [ ] Use calendar-day comparison rather than elapsed-hour arithmetic.
- [ ] Place overdue tasks in `For today`.
- [ ] Place tasks due on the reference date in `For today`.
- [ ] Place tasks scheduled on the reference date in `For today` when they are not already represented by a stronger deadline treatment.
- [ ] Place future due or scheduled tasks within thirty calendar days in `Upcoming`.
- [ ] Keep a blocked task in its date-based collection when its due or scheduled date qualifies it.
- [ ] Do not place a task merely because it is blocked.
- [ ] Omit tasks beyond thirty days and tasks with neither a qualifying due nor scheduled date.
- [ ] Ensure a task appears in at most one collection.
- [ ] Return both collections even when one or both are empty.
- [ ] Do not mutate the input collection or its task projections.

### Acceptance

- Deadline and planning semantics influence placement without being collapsed into one date.
- A task that is both due and scheduled today appears once in `For today` and retains deadline precedence.
- A task scheduled before its later deadline appears according to the nearer relevant date.
- A qualifying blocked task stays in its chronological collection, while an undated and unscheduled blocked task remains absent.
- Thirty-day inclusion and thirty-one-day exclusion are unambiguous.
- Identical inputs and reference dates produce identical placement.

## Milestone 4: Apply Stable Ordering and Identity Rules

### Outcome

Both collections remain predictable across renders and future data-source changes.

### Checklist

- [ ] Remove repeated stable task identities deterministically before placement, retaining the first occurrence unless implementation evidence justifies revisiting that rule.
- [ ] Order `For today` by overdue tasks, then due-today tasks, then planned-today tasks without a current deadline.
- [ ] Apply normalized priority within the approved timing order when priority is retained.
- [ ] Use deterministic title and stable-identity tie-breakers.
- [ ] Order `Upcoming` by the nearest relevant calendar date before priority and stable tie-breakers.
- [ ] Preserve input order only where all approved comparison keys are genuinely equal.

### Acceptance

- Sorting communicates obligation before intention in `For today`.
- `Upcoming` scans chronologically whether the next date represents a plan or a deadline.
- Duplicate records never create duplicate rows.
- Reordering unrelated source data does not change results when approved comparison keys determine the order.

## Milestone 5: Exercise a Fixed-Date Scenario Set

### Outcome

The developer has manually challenged the grouping behavior before connecting it to UI, while automated unit tests remain deferred.

Use one fixed reference date and reason through at least these scenarios:

- [ ] Empty input.
- [ ] Overdue task.
- [ ] Due-today task.
- [ ] Planned-today task with no deadline.
- [ ] Task both due and planned today.
- [ ] Task planned today with a later deadline.
- [ ] Future due task at one and thirty days.
- [ ] Future scheduled task at one and thirty days.
- [ ] Future task at thirty-one days.
- [ ] Undated and unscheduled task.
- [ ] Blocked task due today.
- [ ] Blocked task scheduled in the future.
- [ ] Blocked task with neither a due nor scheduled date.
- [ ] Completed, cancelled, archived, and unauthorized task records.
- [ ] Duplicate stable task identity.
- [ ] Priority, date, title, and identity ordering ties.
- [ ] Input records remaining unchanged after grouping.

### Acceptance

- Each scenario has an explicit expected collection or exclusion reason recorded in developer notes or the eventual automated-test backlog.
- Any ambiguity discovered during manual reasoning is resolved in the design before UI work begins.
- Deferred automated coverage is captured as follow-up work rather than silently forgotten.

## Milestone 6: Verify and Review the Slice

### Outcome

The task foundation is type-safe, repository-clean, and ready for the separate interface plan.

### Checklist

- [ ] Run repository lint and resolve developer-authored findings.
- [ ] Run the TypeScript and production build gate.
- [ ] Run whitespace validation.
- [ ] Inspect the complete diff for accidental route markup, project behavior, entitlement behavior, generated files, and unrelated refactoring.
- [ ] Confirm the Today task projection and grouping boundary remain independent of React and the system clock.
- [ ] Record automated unit tests as deferred work before declaring the business rules persistence-ready.
- [ ] Request a code review before committing the completed slice.

### Acceptance

- Lint, type checking, production build, and whitespace validation pass.
- Only the intended task-projection, mock-mapping, and grouping responsibilities changed.
- No nonfunctional interface controls or speculative cross-feature adapters entered the slice.
- The follow-on interface slice can consume both collections without importing task-domain records or reimplementing placement rules.

## Recommended Starting Action

Begin with Milestone 1 only. Decide the Today task projection's ownership and express due and scheduled dates as separate facts. Stop there for a quick review before writing mapping or grouping behavior.
