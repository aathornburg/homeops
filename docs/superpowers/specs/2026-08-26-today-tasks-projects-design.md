# Today Tasks and Projects Design

## Status

Approved on 2026-08-26. This design supersedes the cross-feature `AttentionItem` model and four-panel grouping rules in the earlier Today designs where they conflict.

Amended on 2026-08-30: unfinished tasks scheduled before the reference date carry forward into `For today`. A past scheduled date is an unfinished plan, not an overdue deadline.

## Purpose

Define Today as a task-led work surface with a separate Projects summary. The page distinguishes deadline pressure from intentionally planned work without forcing projects, calendar events, or notifications into task-shaped urgency groups.

## User Outcome

On sign-in, a household member can see the concrete tasks that matter today, scan upcoming work, and understand whether each active project has a next action or is waiting on something external.

## Information Architecture

### Page header

- Title: `Today`.
- Show the current household-local date when that setting exists; use the browser-local calendar date for frontend mock data until then.
- `Add task` remains the single primary page action and appears only when it has a valid working destination.

### Main task column

#### For today

One ordered list contains incomplete tasks that are:

- Overdue.
- Due on the reference date.
- Intentionally scheduled on or before the reference date and still incomplete.

Rows distinguish obligation from intention with plain-language timing badges such as `Overdue`, `Due today`, `Planned today`, and `Planned yesterday` or `Planned Aug 28`. Only a past due date earns the `Overdue` label. A due date on or before the reference date takes display precedence over the scheduled-date treatment. Project association is supporting context, not a separate Today source.

An unfinished past plan stays visible until completed, rescheduled, or otherwise excluded by task lifecycle or visibility rules. Carrying it forward does not rewrite its scheduled date. A past scheduled date also qualifies a task with a future deadline for `For today`; show the later deadline as secondary context rather than duplicating the task in `Upcoming`.

A blocked task remains in this list when its due or scheduled date qualifies it. The row shows a `Blocked` chip and concise blocker context when available, and does not offer completion while the task remains blocked. Blocking alone does not place an undated and unscheduled task on Today.

#### Upcoming

One chronological list replaces the separate `Due soon` and `Coming up` groups. It contains incomplete tasks not already placed in `For today`, with a future due or scheduled date inside the established thirty-day Today horizon. A qualifying blocked task remains in chronological position and uses the same row-level blocked treatment as `For today`.

The row's primary timing treatment reflects the next relevant date. When both a scheduled date and a later deadline matter, the row shows the nearer plan as the primary badge and the deadline as secondary metadata.

Tasks with only future dates beyond the Today horizon remain in Tasks or Calendar. Undated and unscheduled tasks remain in their owning task or project context.

### Projects panel

The secondary panel shows current projects independently from the task lists.

- An active project shows its next actionable task when one exists.
- A waiting project shows a `Waiting` state and a concise user-supplied reason.
- Waiting is an explicit project lifecycle state, not a fabricated task and not a Today grouping.
- A waiting project does not require an actionable next task.
- Returning a project to active allows the user to choose or confirm its next task.
- Completed or archived projects do not appear in the Today panel.
- `View all` navigates to the Projects area.

There is no separate Blocked panel. Future task dependencies may determine that a task is blocked, but blocking is row-level context rather than a placement rule. A blocked task appears only when its due or scheduled date already qualifies it for `For today` or `Upcoming`.

## Domain Boundaries

### Tasks

Tasks represent concrete work. A task may be:

- Deadline-driven through a due date.
- Intentionally planned through a scheduled date.
- Undated and unscheduled in a backlog or project plan.
- Associated with a project.

Project work reaches the Today task lists through project-associated tasks. HomeOps does not need a separate actionable `ProjectStep` model when a step has task behavior.

### Projects

Projects group tasks toward an outcome and communicate overall momentum. Their sequencing does not imply that each task has a due date.

The initial relevant lifecycle states are:

- `Active`: work can proceed, optionally with a next actionable task.
- `Waiting`: progress depends on an external event or condition; a short reason explains what is awaited.
- `Completed`: the outcome is finished and no longer appears on Today.

For example, after completing `Request contractor estimate`, the user may put `Repair loose siding` into `Waiting` with the reason `Contractor has not returned the estimate`. When the estimate arrives, the project returns to `Active` and `Review contractor estimate` becomes the next task.

If the household wants a reminder during a waiting period, it creates a real scheduled or due task such as `Follow up with contractor Friday`.

### Calendar and notifications

Calendar events do not enter Today task lists merely because they are scheduled. Notifications remain in the notification experience unless they result in a concrete task. These features may link to relevant tasks or projects without becoming Today grouping sources.

## View Models and Data Flow

Today does not need one cross-feature `AttentionItem` abstraction.

```text
Task records -> Today task projection -> For today / Upcoming

Project records -> Today project summary -> Projects panel
```

The task projection contains only the task facts required for Today presentation and ordering, including identity, title, destination, due date, scheduled date, priority when used, blocked state and concise blocker context, completion eligibility, and optional project context.

The project summary contains project identity, title, destination, lifecycle state, next actionable task when active, and waiting reason when waiting.

Task and project policies remain with their owning features. Today owns page composition and ordering within its two task horizons.

## Ordering

### For today

Order by:

1. Overdue tasks.
2. Tasks due today.
3. Tasks planned on or before today without an overdue or due-today deadline.
4. Priority when present.
5. Stable title and identity tie-breakers.

### Upcoming

Order by the nearest relevant calendar date, followed by priority when present, then stable title and identity tie-breakers.

Identical inputs and reference dates must produce identical output. Grouping must not mutate source records.

## Project Entitlements

Today is a product surface, not a subscription-marketing surface.

- When projects exist, the panel shows their summaries without inline upgrade promotion.
- When no projects exist, the panel shows a restrained empty state with `Start a project`.
- Project rows, `View all`, and the empty-state action route to the Projects area.
- The Projects area owns entitlement checks, project marketing, upgrade messaging, creation, and management.
- Premium members can create and manage projects.
- Free members without projects see the Projects value proposition and upgrade path after entering the Projects area.
- Former premium members retain read-only access to existing project data and summaries. Creating, editing, and changing project state require renewed premium access.
- Existing household project data must never be hidden or deleted because a subscription ended.

## States and Responsive Behavior

- Task and project regions load independently so one source does not suppress the other.
- Use skeleton rows for loading.
- A source-specific failure stays within its region and offers a retry without replacing successful content elsewhere.
- If no task qualifies for either list, show one calm task empty state rather than two empty containers.
- If no projects exist, show the project empty state and `Start a project` action.
- On narrower viewports, place the Projects panel after the task lists in a single reading column.
- All controls require visible focus states, keyboard access, and non-color text labels.

## Delivery Boundaries

### First task slice

- Define the Today task projection.
- Preserve separate due and scheduled date semantics.
- Group task projections into deterministic `For today` and `Upcoming` lists using an explicit reference calendar date.
- Preserve qualifying blocked tasks in their date-based collection without making blocking a placement rule.
- Keep the logic pure and independent of React and the system clock.

### Follow-on interface slice

- Build the responsive task lists and timing treatments.
- Show blocked state and concise blocker context on qualifying task rows, with completion unavailable while blocked.
- Add mock-session completion behavior when Tasks owns a working completion action.
- Add task-region loading, empty, and error states.

### Projects slice

- Add the project summary contract and panel.
- Add explicit active, waiting, and completed lifecycle behavior.
- Add the Projects empty state and navigation.
- Add entitlement-aware Projects-area behavior, including former-premium read-only access.

No slice should introduce nonfunctional controls or speculative calendar and notification adapters.

## Verification

The grouping boundary should remain straightforward to unit test even while automated unit tests are deferred from the immediate developer sequence.

Before a production-facing slice is considered complete:

- Manually verify representative overdue, due-today, planned-today, unfinished past-plan, and upcoming scenarios with a fixed reference date. Include past plans with no deadline and with a later deadline; both belong in `For today` without being labeled overdue solely for their scheduled date.
- Verify a task with both scheduled and due dates presents the intended timing hierarchy.
- Verify a blocked task with a qualifying date remains in its chronological collection, while an undated and unscheduled blocked task remains absent.
- Verify active and waiting project summaries communicate the correct information.
- Verify the free, premium, and former-premium project paths.
- Run lint, type checking, the production build, and `git diff --check`.
- Add automated coverage before the grouping and entitlement behavior becomes persistence-backed or business-critical.

## Superseded Decisions

This design replaces these earlier assumptions:

- Today as a general cross-feature action hub.
- Calendar events and notifications as direct Today grouping sources.
- A generic cross-feature `AttentionItem` contract.
- Separate `Blocked`, `Due soon`, and `Coming up` panels.
- Blocked placement taking precedence over time-based task placement.
- Project steps as a separate actionable source when project-associated tasks already model the work.
