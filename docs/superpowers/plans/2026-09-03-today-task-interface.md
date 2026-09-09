# Today Task Interface Implementation Plan

> **Developer-authored plan:** This is intentionally an outcome-and-acceptance guide. It contains no implementation code, exact filenames, line numbers, prescribed component signatures, or drop-in tests. The developer chooses the structure and writes every line.

**Goal:** Turn the existing grouped Today task data into the approved responsive, task-only daily work surface without duplicating task business rules. Milestone 2 intentionally includes approved visual shell controls; the functionally completed interface does not retain nonworking controls.

**Architecture:** Preserve the existing load, projection, and deterministic grouping boundaries as the source of Today membership and order. Add a presentation boundary that derives display wording from one explicit reference calendar date, then render the page as focused header, group, row, empty, loading, and error responsibilities. Milestone 2 renders approved Add task and completion shell components to establish the design; completion, task details, add-task navigation, project navigation, and shell navigation remain capability-gated integrations that must work before functional completion.

**Tech Stack:** React 19, TypeScript 6, TanStack Router, Mantine, Tailwind CSS, Lucide icons, the existing semantic color tokens, and repository lint/type/build tooling.

---

## Confirmed Starting Point

- The approved design is `docs/superpowers/specs/2026-09-02-today-task-interface-design.md`.
- The Today loader already maps backend-shaped mock tasks into a Today projection and groups them into deterministic `For today` and `Upcoming` collections.
- The current Today route renders only headings and task titles.
- The projection already carries stable identity, title, a generic task destination, due date, scheduled date, optional project context, assignee context, blocked context, and completion eligibility.
- The current mock source resolves immediately and has no mutation behavior.
- There is no task-detail route, add-task route, project route, or completion operation yet.
- The current responsive shell collapses to a drawer; it does not yet provide the bottom navigation described by the design.
- The web package has no automated test command. Fixed-date acceptance evidence is therefore required until test infrastructure is deliberately introduced.

## Delivery Decisions

- Today presentation consumes the existing grouped collections and does not reimplement qualification, lifecycle filtering, deduplication, or ordering.
- One reference calendar date drives grouping, the page date, and all timing wording for a render. Do not independently read the clock in multiple presentation units.
- Milestone 2 is a design-fleshing slice and may render approved shell components whose working destination or operation is outside the slice, including Add task and completion affordances. Their presence establishes layout and visual behavior only; functional integration remains explicitly deferred to the capability gates in Milestone 6.
- Missing category data is not invented. Show project and assignee context already present in the projection; add category context only when the task boundary genuinely supplies it.
- The Today content slice does not absorb the separate mobile-shell or Projects-destination work merely to match a mockup.

## Milestone 1: Establish the Presentation Contract

### Outcome

The interface can describe every approved row state consistently while preserving the existing business-rule boundary.

### Checklist

- [ ] Choose how the page and its presentation responsibilities receive the same explicit reference calendar date used for grouping.
- [ ] Define the display facts needed by the header, groups, and rows without copying full task-domain records into presentation state.
- [ ] Derive one primary timing statement per task from due date, scheduled date, collection membership, and the reference date.
- [ ] Preserve a later deadline as secondary metadata when a planned date is the primary statement.
- [ ] Keep blocked wording and blocker explanation separate from date placement.
- [ ] Keep presentation formatting pure: it may describe supplied facts but must not decide whether a task belongs in Today.
- [ ] Decide how browser-local date formatting will later be replaced by household-local formatting without changing grouping semantics.

### Acceptance

- Overdue, due-today, planned-today, carried-forward plan, future due, and future planned tasks each produce the approved wording.
- A task planned before a later deadline has exactly one primary timing statement and retains the deadline as secondary context.
- A due-and-planned task does not present competing primary timing messages.
- The same task facts and reference date always produce the same display facts.
- Crossing midnight cannot make the page heading, grouping, and row wording disagree within one render.

## Milestone 2: Build the Read-Only Page Composition

### Outcome

The Today page presents a spacious, task-only hierarchy that works with the existing shell and grouped data.

### Checklist

- [ ] Create the page header with the Today title and formatted local date.
- [ ] Include the approved Add task shell component so its placement and responsive treatment can be designed; defer its real add-task destination to Milestone 6.
- [ ] Present `For today` and `Upcoming` in one content column with the approved symbols, counts, and thirty-day label.
- [ ] When one group is empty, retain its heading and symbol and replace its list with the approved compact acknowledgement; retain `Next 30 days` for an empty Upcoming group, and omit its count and Due/Planned headers.
- [ ] Replace both empty groups with one shared sparked-check state containing the approved reassurance copy and no additional Add task action. Keep the illustration decorative and hidden from assistive technology.
- [ ] Constrain the content to the approved readable maximum while allowing it to use available space below that maximum.
- [ ] Use the existing semantic theme and typography rather than introducing page-specific palette values.
- [ ] Keep Projects summaries, tabs, placeholders, waiting indicators, and upgrade content out of Today.

### Acceptance

- Populated groups preserve the collection order supplied by the grouping boundary.
- Counts match rendered rows and do not remain visible when task content is unavailable.
- One empty group produces one compact acknowledgement beneath its heading while the populated group remains normal.
- Two empty groups produce exactly one shared state with the quiet green check, restrained ochre sparks, `Nothing needs attention`, and `You’re clear for today and the next 30 days.`
- The page has a clear title-to-group hierarchy without explanatory copy delaying the first task.

## Milestone 3: Deliver the Task Row Information Hierarchy

### Outcome

Each row communicates the task, context, timing, and blocked state in a stable scan pattern without relying on color.

### Checklist

- [ ] Give the task title the strongest row emphasis.
- [ ] Show available project and assignee context as quiet metadata; omit absent context cleanly.
- [ ] Show `Blocked` as neutral inline wording and include the concise blocker explanation when available.
- [ ] Place one primary timing statement in a stable desktop region and keep secondary dates in metadata.
- [ ] Use one neutral row palette for overdue, due, planned, and blocked states.
- [ ] Reserve familiar lock treatment for blocked work without exposing an enabled completion action.
- [ ] Include the approved checkbox/lock shell treatment so row composition and states can be designed; defer completion behavior and enabled-state semantics to Milestone 6.
- [ ] Preserve readable wrapping for long titles, project names, assignees, and blocker explanations.

### Acceptance

- Overdue and blocked status remain understandable with color removed.
- Rows with and without project context align coherently.
- Primary dates scan vertically without forcing metadata into a chip collection.
- A missing blocker explanation does not leave broken punctuation or empty metadata.
- Long content wraps without colliding with the timing region.

## Milestone 4: Add Loading and Failure Behavior

### Outcome

The task region remains calm and truthful while data is pending or unavailable.

### Checklist

- [ ] Connect the route's pending behavior to neutral skeleton rows shaped like the final list.
- [ ] Connect task-source failures to plain-language failure content within the task region.
- [ ] Expose retry only when it invokes a real reload attempt.
- [ ] Ensure loading and error states do not show stale task counts, empty-state confirmation, or project content.
- [ ] Establish a repeatable way to exercise pending, success, empty, partial-empty, and failure outcomes without leaving debug behavior in the delivered slice.

### Acceptance

- Pending content does not flash a false empty state.
- Failure content replaces the task region and offers a working retry.
- A successful retry returns to normal grouped content.
- Skeletons approximate final row geometry closely enough to avoid a large layout jump.

## Milestone 5: Make the Today Content Responsive

### Outcome

The Today content itself remains usable from desktop through a 390-pixel viewport, independent of the separate app-shell navigation decision.

### Checklist

- [ ] Keep a single content order at every width: header, `For today`, then `Upcoming`.
- [ ] Change rows from a desktop timing column to stacked timing beneath task context at narrow widths.
- [ ] Preserve readable blocker explanations and touch spacing at narrow widths.
- [ ] Prevent horizontal scrolling, clipped text, and timing overlap.
- [ ] Reduce the add action to an accessible labeled-icon form only after a working add destination exists.
- [ ] Record bottom navigation and the Projects destination as separate shell dependencies; do not silently implement them inside the Today content slice.

### Acceptance

- Desktop uses the approved stable timing column and spacious content width.
- The page remains usable at 390 pixels with no horizontal overflow.
- Task title, context, blocker reason, and timing remain readable when stacked.
- Keyboard focus remains visible at every responsive layout.

## Milestone 6: Integrate Only Real Interactions

### Outcome

Every interactive affordance on Today has a working destination or operation and correct accessibility behavior.

The shell components introduced while fleshing out Milestone 2 are visual scaffolding, not completed integrations. This milestone converts them into working controls and validates their behavior.

### Capability Gates

#### Task details

- [ ] Confirm whether the task destination opens actual task details rather than only a generic placeholder.
- [ ] Make the row interactive only after that destination works.
- [ ] Keep nested row actions keyboard-operable without accidental double activation.

#### Completion

- [ ] Establish a real completion operation that updates the source and causes a completed task to leave Today.
- [ ] Enable completion only when the task capability permits it and the task is not blocked.
- [ ] Provide an accessible name and visible focus state.
- [ ] Prevent blocked tasks from exposing an enabled completion action.
- [ ] If the operation is not part of this slice, omit the interactive completion control and record it as deferred rather than simulating success locally.

#### Add task and project navigation

- [ ] Render Add task only after its destination works.
- [ ] Make project context a link only after a project destination works.
- [ ] Keep both as plain or omitted presentation until those dependencies exist.

### Acceptance

- No element looks actionable while doing nothing.
- Completing an eligible task removes it when it no longer qualifies.
- Blocked work cannot be completed from Today.
- Row, completion, retry, add, and project interactions—when present—work by keyboard and expose meaningful accessible names.

## Milestone 7: Verify the Interface Slice

### Outcome

The interface matches the approved behavior, remains within scope, and is ready for review as developer-authored work.

### Fixed-Date Scenario Set

- [ ] Overdue task with a visible due date.
- [ ] Due-today task.
- [ ] Planned-today task.
- [ ] Carried-forward plan from yesterday and from an earlier date.
- [ ] Planned task with a later secondary deadline.
- [ ] Upcoming due and planned tasks.
- [ ] Blocked task with and without blocker explanation.
- [ ] Project-associated and non-project tasks.
- [ ] Long title and long blocker explanation.
- [ ] Only `For today` populated.
- [ ] Only `Upcoming` populated.
- [ ] Both groups empty.
- [ ] Pending source, failed source, and successful retry.
- [ ] Desktop, tablet, and 390-pixel mobile layouts.
- [ ] Keyboard traversal, visible focus, accessible names, and color-independent meaning.

### Repository Gates

- [ ] Run lint.
- [ ] Run the TypeScript and production build gate.
- [ ] Run whitespace validation.
- [ ] Inspect the complete diff for generated files, unrelated landing work, project summaries, fake controls, duplicated grouping rules, and speculative refactoring.
- [ ] Record any still-manual timing and state scenarios as an explicit automated-test backlog.
- [ ] Request review before committing the completed slice.

### Acceptance

- The fixed-date wording agrees with the existing grouping semantics.
- Loading, empty, partial-empty, success, and failure states have been exercised.
- Desktop and 390-pixel mobile checks show no clipping or horizontal scrolling.
- The interface does not depend on color alone and all shipped interactions are keyboard-operable.
- Lint, type checking, production build, and whitespace validation pass.
- The diff contains only the intended Today interface responsibilities and explicitly approved dependencies.

## Dependencies, Risks, and Open Decisions

### Dependencies

- Task details must exist before the row can promise detail navigation.
- A completion operation must exist before the checkbox-style action can ship.
- Add-task and project destinations must exist before their controls can ship.
- Bottom navigation and a Projects destination require a separate app-shell slice.

### Risks

- Reading the current date separately in grouping and presentation could produce midnight inconsistencies.
- Styling task status with existing semantic colors would violate the approved monochrome rule even though those tokens are available.
- Building shell navigation during this slice would expand a focused Today change into cross-application navigation work.
- Simulating completion only in rendered state would hide the absence of a source mutation and create misleading behavior.
- The lack of automated tests makes timing wording, empty/error states, and responsive regressions easier to miss.

### Open Decisions

- Whether to introduce automated UI/unit test infrastructure in this slice or continue with durable manual acceptance evidence.
- Whether completion is a prerequisite for the first visual delivery or a clearly deferred follow-up.
- Whether task details, add task, Projects routing, and bottom navigation should be separate slices before or after the read-only Today surface.

## Recommended First Deliverable

Complete Milestone 1 and the design-focused portion of Milestone 2: establish a single reference-date presentation contract, verify the timing wording against fixed dates, and render the page header plus truthful group/empty composition. Include approved shell components needed to flesh out the design while keeping their real mutations and destinations explicitly deferred to Milestone 6.

Stop for review before task-row styling or interaction work. That checkpoint lets the developer validate the presentation boundary and page hierarchy before responsive and capability-gated concerns multiply the surface area.
