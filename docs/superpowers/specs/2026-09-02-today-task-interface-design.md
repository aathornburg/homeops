# Today Task Interface Design

## Status

Approved visually on 2026-09-02. The responsive Due/Planned timing treatment was amended and approved on 2026-09-03.

This design supersedes the Today-page Projects panel and the task-row badge treatment in `2026-08-26-today-tasks-projects-design.md`. It does not change that document's task qualification, grouping, ordering, lifecycle, or thirty-day horizon rules.

## Purpose

Define Today as a calm, task-only daily work surface. The page should answer one question quickly: **What household work needs attention now or soon?**

Projects remain a separate product area with enough room for status, next tasks, dates, ownership, categories, waiting reasons, and premium behavior. Today may show a task's project association as supporting context, but it does not preview or summarize projects.

## Product Boundary

- **Today** shows qualifying tasks in `For today` and `Upcoming`.
- **Tasks** owns broader task browsing and management.
- **Projects** owns project health, planning, lifecycle, and entitlement behavior.
- **Calendar** owns calendar-oriented planning.
- A project reaches Today only through a real qualifying task.
- A waiting project appears on Today only when the household creates a qualifying follow-up task.

Today must not contain a Projects panel, Projects tab, project placeholder, waiting-project indicator, upgrade promotion, or project-level empty state. Projects may appear in primary navigation as its own destination.

## Visual Direction

The approved north star uses the HomeOps dark visual language:

- `Night Worktop` for the page canvas.
- Deep green-black panels and borders for structure.
- Mint for primary actions and active navigation.
- Warm ochre for the `For today` and `Upcoming` section symbols.
- Project violet only for the Projects destination or an explicitly premium project feature, not for task-row decoration.
- Fraunces for the HomeOps wordmark, page title, and group headings.
- Nunito Sans for tasks, metadata, controls, and timing.

The content column is intentionally spacious and should use the available page width up to approximately 980 pixels. It must not surrender width to a secondary Today rail. Groups use restrained bordered list containers rather than independent cards for every task.

### Monochrome task-row rule

Task rows use one neutral palette. Status is communicated through words, typography, placement, and familiar symbols rather than through multiple semantic text colors, chips, or row-background colors.

- Task titles use primary text.
- Metadata, project context, assignee, secondary dates, and blocker explanations use secondary or quiet neutral text.
- Desktop timing uses stable `Due` and `Planned` columns. The fact responsible for the task's Today placement receives stronger neutral emphasis; any other timing fact remains visible in a quieter neutral treatment.
- `Blocked` is plain inline text beside the title, supported by a lock in the completion position.
- Overdue, due, planned, and blocked rows share the same neutral surface.
- Mint, ochre, violet, red, and blue must not compete inside the task list as a collection of status colors.

Color is not required to understand any task state.

## Page Composition

### App shell

Desktop uses the established HomeOps shell:

- Wordmark at the top left.
- Household selector and search in the top bar.
- Household avatar at the top right.
- Primary navigation in the left sidebar.
- `Today` is the active destination.
- `Projects` is a peer navigation destination, not content inside Today.

### Page header

- Title: `Today`.
- Show the household-local date when available; use the browser-local date until household timezone support exists.
- `Add task` is the only primary page action.
- Render `Add task` only when it has a working destination.

### For today

Show the already-defined ordered collection of incomplete tasks that are overdue, due today, or planned on or before today.

The heading includes a sun symbol and task count. Do not add explanatory prose above the list; the task rows should begin quickly after the page header.

### Upcoming

Show the already-defined chronological collection of qualifying future tasks. The heading includes a calendar symbol, task count, and the text `Next 30 days` when the existing thirty-day horizon is active.

The section follows `For today` in the same content column with clear vertical separation.

## Task Row Anatomy

Every task row has three desktop regions:

1. A completion control.
2. A flexible title-and-context region.
3. A stable timing region divided into `Due` and `Planned` columns.

### Completion control

- An actionable task shows an empty checkbox-style control.
- A blocked task shows a lock in the same position.
- Completion is unavailable while blocked.
- The control requires a visible keyboard focus state and an accessible name.

### Title and context

- The task title is the strongest row text.
- The next line may show project or category context, assignee, and blocker reason.
- Separate compact metadata with centered dots.
- Show project association only when present.
- Project context may navigate to the owning project when that destination is available.
- A blocked task shows `Blocked` as neutral inline text beside its title and the concise blocker reason in metadata.

### Timing hierarchy

Preserve both due and planned timing facts when both exist. Rank one as primary so the row still communicates why the task appears where it does; do not hide the other fact behind a count, tooltip, popover, or task-detail interaction.

Primary timing follows the same obligation-before-intention hierarchy used by Today ordering:

- An overdue deadline is primary.
- A deadline on the reference date is primary.
- Otherwise, a qualifying plan on or before the reference date is primary.
- In Upcoming, the nearer relevant date is primary.

On desktop:

- Each task group shows `Due` and `Planned` once as shared column headers aligned with every row.
- A row places each available fact in its corresponding column; an absent fact leaves that column visually empty without placeholder copy.
- Show the relative meaning first and its calendar date beneath it.
- Use stronger neutral typography for the primary fact and quieter neutral typography for the secondary fact.
- Do not outline individual timing cells or render them as chips.

Timing wording includes:

- A past deadline shows `Overdue` with the due date beneath it.
- A deadline or plan on the reference date shows `Today` with its date beneath it in the appropriate column.
- A carried-forward plan shows `Yesterday` or the appropriate relative/past-date wording with its date beneath it.
- An upcoming deadline or plan uses concise relative wording such as `In 5 days` with its date beneath it.

The timing columns remain in consistent horizontal positions so a household member can compare Due and Planned facts down the list without reading every row.

## Interaction Behavior

- Selecting a task row opens its task details.
- Selecting the completion control completes an eligible task without requiring the detail view.
- Selecting project context opens the project when project navigation exists.
- Completing a task removes it from Today when it no longer qualifies.
- Blocked tasks do not expose an enabled completion action.
- Hover may raise a row from its neutral surface slightly, but must not introduce a new status color.
- All interactive elements require visible focus states and keyboard operation.

## Responsive Behavior

At narrow widths:

- Replace the desktop sidebar with the established bottom navigation.
- Keep `Today`, `Tasks`, `Calendar`, `House Binder`, and `Projects` as top-level destinations.
- Reduce the `Add task` button to its labeled accessible icon form.
- Remove the shared desktop timing headers. Each task becomes self-contained and repeats its timing meaning as left-aligned natural-language lines beneath the title metadata.
- Keep the primary timing line stronger and the secondary timing line quieter. Example: `Overdue · due Aug 29`, followed by `Planned today · Sep 3`.
- Keep blocker reasons readable and allow them to wrap.
- Preserve the single-column order: page header, `For today`, then `Upcoming`.
- Do not introduce a project summary after the task lists on mobile.

The mobile layout must remain usable at 390 pixels wide without horizontal scrolling or clipped text.

## Loading, Empty, and Error States

- Use neutral skeleton rows that match the final task-row geometry while loading.
- If both collections are empty, replace both sections with one calm empty state confirming that nothing needs attention in the current Today horizon.
- If only one collection is empty, omit that empty group and show the populated group normally.
- A task-source failure replaces the task region with plain-language failure copy and a working retry action.
- Do not show stale counts when task content is unavailable.
- Loading, empty, and error states must not introduce project content.

## Component Boundaries

The interface can be decomposed into focused presentation units:

- `TodayPageHeader`: title, local date, and working add action.
- `TodayTaskGroup`: heading, symbol, count, optional horizon label, and list.
- `TodayTaskRow`: completion state, title, context, blocker treatment, and timing.
- `TodayTaskEmptyState`: one shared state for an empty Today horizon.
- `TodayTaskErrorState`: task-region error and retry.

The existing Today route model remains the input boundary. Presentation components consume the grouped `todayTasks` and `upcomingTasks` collections and do not reimplement lifecycle or visibility filtering already owned by the backend/query boundary.

## Data Flow

```text
Backend-filtered task response
  -> Today task projection
  -> existing deterministic grouping
  -> ranked Due/Planned presentation facts
  -> TodayTaskGroup
  -> TodayTaskRow
```

The frontend formats qualifying task facts for presentation. It does not duplicate backend filtering for completed, cancelled, archived, or unauthorized records.

## Delivery Scope

The follow-on Today interface slice includes:

- The responsive task-only page composition.
- `For today` and `Upcoming` list presentation.
- Monochrome task rows and plain-text timing hierarchy.
- Project/category context and assignee metadata when present.
- Blocked presentation and disabled completion affordance.
- Loading, empty, and task-source error states.
- Working task navigation and completion only when their destinations exist.

The slice excludes:

- A Projects panel, Projects tab, or project placeholder on Today.
- Project health, waiting-state, entitlement, or upgrade UI.
- Frontend lifecycle filtering that duplicates backend query behavior.
- Calendar events or notifications as Today grouping sources.
- Nonfunctional controls.

## Verification

Before the interface slice is considered complete:

- Verify overdue, due-today, planned-today, carried-forward plan, and upcoming timing text against fixed reference dates.
- Verify a task with both due and planned dates shows both facts, with exactly one ranked as primary.
- Verify desktop `Due` and `Planned` headers align with their row values, appear once per group, and leave missing facts blank without placeholder copy.
- Verify mobile rows replace shared headers with self-contained, left-aligned natural-language timing lines.
- Verify blocked tasks remain in their date-qualified group, show blocker context, and cannot be completed.
- Verify project-associated and non-project task rows both align correctly.
- Verify a single empty state when both groups are empty and omission of an individually empty group.
- Verify loading and retry states without project content.
- Verify keyboard navigation, visible focus, accessible names, and that no state depends on color.
- Verify desktop and 390-pixel mobile layouts without clipping or horizontal scrolling.
- Run lint, type checking when available, the production build, and `git diff --check`.

## Superseded Today UI Decisions

This design replaces:

- A Projects summary beside or below Today tasks.
- Tasks/Projects tabs within Today.
- A reserved project-panel placeholder.
- Project waiting indicators on Today.
- Multiple semantic timing chips on each task row.
- A single timing column that hides a task's other applicable timing fact.
- Count bubbles, hover-only timing details, and timing disclosure popovers.
- Secondary timing mixed into project, category, assignee, or blocker metadata.
- Status-specific task text colors.
- Status-specific task-row background colors.

Projects remains part of the HomeOps product and primary navigation, but it receives its own dedicated page.
