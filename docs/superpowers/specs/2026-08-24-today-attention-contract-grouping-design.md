# Today Attention Contract and Grouping Design

## Purpose

Define the first independently testable delivery slice of the Today action hub: normalize eligible mock tasks into a Today-facing `AttentionItem` contract and group those items into deterministic urgency collections.

This slice establishes Today’s shared currency and presentation policy before route composition or task interactions are implemented. It refines Slice 1 of the parent [Today Cross-Feature Action Hub Design](2026-08-23-today-action-hub-design.md) without changing that design’s target state.

## Observable Outcome

A developer can provide realistic mock task records and a chosen calendar date, then receive four deterministic, correctly ordered Today collections. The result is ready for a later interface slice without importing Task models into Today or duplicating grouping policy in components.

## Scope

### Included

- Define the Today-facing `AttentionItem` contract.
- Define the initial `complete-task` primary-action descriptor.
- Define a task-owned adapter that maps eligible mock task records into `AttentionItem`s.
- Define a pure Today aggregator that accepts `AttentionItem`s and a caller-supplied reference calendar date.
- Return ordered `Needs attention today`, `Blocked`, `Due soon`, and `Coming up` collections.
- Verify the adapter, precedence, date boundaries, duplicate handling, exclusions, stable sorting, and input immutability.

### Excluded

- Today route markup and responsive composition.
- Shared row or section components.
- Completion handlers, pending state, Undo, rollback, or error presentation.
- Add task controls and task-creation routes.
- Project, House Binder, Calendar, and Notification adapters.
- Backend APIs, persistence, authorization enforcement, and household timezone settings.
- Unrelated refactoring.

## Architecture and Ownership

```text
Mock task records
       |
task-owned adapter
       |
AttentionItem[] + reference calendar date
       |
pure Today aggregator
       |
Today | Blocked | Due soon | Coming up
```

Tasks owns:

- Task status and lifecycle meaning.
- Action eligibility.
- Translation from task-domain terminology into the Today contract.
- Exclusion of tasks that are not authorized, visible, or actionable.

Today owns:

- Section precedence.
- Calendar-date windows.
- Duplicate removal by stable Today identity.
- Stable sorting.

The aggregator must not read the system clock, React state, route state, or a feature-domain model. It must not mutate its inputs.

## `AttentionItem` Requirements

An `AttentionItem` contains normalized display and placement facts rather than an owning feature’s domain object.

| Concern | Requirement |
|---|---|
| Identity | A stable Today identity that is unique across sources |
| Ownership | The source feature and source record identity |
| Presentation | A title and optional concise context |
| Destination | A valid source-owned internal route; it becomes record-specific when the owning feature provides that route |
| Timing | An optional ISO 8601 plain calendar date (`YYYY-MM-DD`) and its meaning; the initial task adapter emits due-date timing |
| Priority | An optional normalized `high`, `medium`, or `low` priority used for sorting; absence sorts after `low` |
| Blocking | An optional concise blocked reason; its presence gives Blocked precedence |
| Assignee | Optional display-safe assignee information |
| Immediate attention | An explicit indication that an undated item requires attention now |
| Primary action | An optional declarative action descriptor |

The initial primary-action vocabulary contains only `complete-task`. The descriptor states that completion is an eligible primary action; it does not perform completion.

The contract must not contain:

- Feature-domain objects.
- React components, rendered icons, or other presentation implementation.
- Event handlers or mutation functions.
- Pending, success, or failure state.
- A precomputed Today section.
- A clock or placement logic.

## Task Adapter Requirements

The task adapter must:

- Produce stable source-qualified identities.
- Map task title, concise context, valid source-owned destination, due date, normalized priority, blocked reason, and permitted assignee presentation.
- Represent task dates as calendar dates rather than ambiguous timestamps when time-of-day is not meaningful.
- Emit `complete-task` only for eligible, unblocked tasks.
- Emit no primary action for blocked tasks.
- Exclude completed, cancelled, archived, unauthorized, and otherwise non-actionable tasks.
- Include an undated task only when the task explicitly requires attention now.
- Avoid assigning a Today section.

A blocked task is navigational in this slice. Blocking does not imply that the user can directly unblock it. A future action such as `mark-task-ready` may be introduced only after Tasks defines its semantics and eligibility.

## Aggregator Interface and Date Context

The aggregator accepts:

- A collection of valid `AttentionItem`s.
- An explicit reference calendar date.

The caller initially derives the reference date from the browser’s local date. A future caller may instead provide the household-local date without changing grouping behavior.

The aggregator must use calendar-day comparisons rather than elapsed 24-hour periods. It must return four collections even when every collection is empty.

## Placement Precedence

The aggregator applies these rules in order:

1. Remove repeated items with the same stable Today identity, retaining the first occurrence.
2. Place every blocked item in `Blocked`, regardless of its date.
3. Place remaining overdue and due-today items in `Needs attention today`.
4. Place remaining items due one through seven calendar days after the reference date in `Due soon`.
5. Place remaining items due eight through thirty calendar days after the reference date in `Coming up`.
6. Place an undated item in `Needs attention today` only when it explicitly requires attention now.
7. Omit remaining unblocked items beyond thirty days and undated items without an immediate-attention indication.

An item must appear in at most one returned collection.

This tasks-only slice removes duplicates by identical stable `AttentionItem` identity. When repeated identities carry conflicting data, retaining the first occurrence is deterministic but the conflict remains an adapter programming error. Cross-source correlation is deferred until a second feature adapter introduces a concrete overlap case.

## Stable Sorting

Within each collection, items are ordered by:

1. Overdue items before non-overdue items.
2. Higher normalized priority before lower or absent priority.
3. Earlier applicable date before later or absent dates.
4. Title using a documented deterministic lexical comparison.
5. Stable Today identity as the final tie-breaker.

Identical inputs and reference dates must produce identical ordering.

## Empty and Invalid Input

- Empty input produces four empty collections.
- Absence of a date is valid and follows the undated placement rules.
- Adapters are responsible for producing valid calendar dates and destinations.
- Malformed adapter output is a programming error in this slice, not a user-facing partial-source failure.
- Asynchronous loading, partial-source errors, retries, and error presentation belong to the later interface/data-source slices.

## Verification Requirements

### Task adapter

Tests must demonstrate that the adapter:

- Produces stable source-qualified identities.
- Maps presentation, destination, date, priority, blocking, and assignee facts correctly.
- Emits `complete-task` only for eligible, unblocked tasks.
- Gives blocked tasks no primary action.
- Excludes completed, cancelled, archived, unauthorized, and non-actionable tasks.
- Handles undated tasks according to their explicit immediate-attention indication.
- Does not assign a Today section.

### Aggregator

Tests must use a fixed reference date and cover:

- Empty input.
- Dates before and equal to the reference date.
- One-, seven-, eight-, thirty-, and thirty-one-day boundaries.
- Blocked items at relevant date boundaries.
- Blocked precedence over overdue and due-soon placement.
- Undated items with and without immediate-attention indication.
- Repeated stable identities, including the first-occurrence rule.
- Priority, date, title, and identity sorting ties.
- An item never appearing in multiple collections.
- Identical inputs producing identical outputs.
- Input collections and items remaining unmodified.

### Repository gates

Before the slice is complete:

- Targeted adapter and aggregator tests pass.
- The complete test suite passes.
- Lint passes.
- Type checking and the production build pass.
- `git diff --check` passes.
- No Today route markup, task mutation behavior, or unrelated refactoring enters the change.

## Follow-on Slice

The next slice consumes these collections to build the responsive Today composition, shared sections and rows, UI states, navigation, and mock-session completion behavior. It must preserve this contract and grouping boundary unless implementation evidence requires a documented revision.
