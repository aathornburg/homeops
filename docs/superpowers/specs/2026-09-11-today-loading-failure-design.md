# Today Loading and Failure Design

## Status

Approved in conversation on 2026-09-11 as the design for Milestone 4 of the Today task interface plan.

This specification narrows and clarifies the loading and failure requirements in `2026-09-02-today-task-interface-design.md`. It does not change Today task qualification, grouping, ordering, timing presentation, empty-state behavior, or responsive scope.

## Purpose

Keep the Today page calm and truthful while its task data is pending or unavailable. A household member should never mistake loading or failure for having no work to do.

## Scope

Milestone 4 adds:

- A route-owned pending state.
- A route-owned failure state.
- A real retry operation.
- A development-only manual response harness at the mock task-source boundary.
- Manual verification for pending, success, empty, partial-empty, failure, and retry outcomes.

Automated test infrastructure, responsive restructuring, task mutation, and production network behavior remain outside this milestone.

## State Ownership and Page Structure

The Today route owns pending, success, and failure as mutually exclusive states. A shared page shell keeps the Today heading, browser-local date treatment, and existing Add task shell action visually stable while the route state changes.

The content beneath that shell is the task region:

- Pending renders only the loading presentation.
- Success renders the presentation model already produced by the loader.
- Failure renders only the failure presentation.

Counts, task groups, group-level empty messages, and the complete empty state require successful loader data. They must not render during pending or failure. No stale task or project content remains visible behind either state.

The successful data flow remains unchanged: the task source supplies task projections, the Today grouping boundary establishes membership and order using the reference date, and the presenter derives display facts. Pending and failure handling must not duplicate or bypass those responsibilities.

## Pending Presentation

Pending keeps the page identity visible and replaces the task region with neutral skeletons shaped like the final lists.

- Show `For today` and `Upcoming` headings without task counts or Due/Planned column labels.
- Show three skeleton rows beneath `For today` and two beneath `Upcoming`.
- Each skeleton row approximates the final completion, title/context, assignee, Due, and Planned geometry.
- Use the existing neutral surface and border language. Skeletons must not imply task status through color.
- Use restrained animation only as a loading cue. Disable that animation when the user prefers reduced motion.
- Expose one meaningful loading announcement for the task region while hiding decorative skeleton shapes from assistive technology.

The skeleton geometry should reserve approximately the same vertical and horizontal space as ordinary task rows so the resolved page does not make a large layout jump.

## Failure Presentation

Failure replaces the entire task region with one quiet inline panel.

- Heading: `We couldn’t load today’s tasks`
- Supporting copy: `Your tasks haven’t changed. Check your connection and try again.`
- Action: `Try again`
- Use a restrained error symbol and surface treatment consistent with the HomeOps visual language.
- Announce the failure accessibly without repeatedly interrupting the user.

The failure panel must not show task counts, task rows, group headings, empty-state reassurance, or source error details.

## Retry Behavior

`Try again` initiates a real route reload or invalidation that executes the Today loader again. It must not merely dismiss the error or swap local presentation state.

After activation, the route returns to pending while the new attempt is unresolved. A successful attempt then renders normal grouped content. If the source fails again, the failure panel remains the truthful outcome and retry remains available.

The action requires a visible focus state, keyboard operation, and an accessible name.

## Manual Response Harness

The mock task API contains a clearly labeled development-only set of response alternatives. The developer selects exactly one by commenting or uncommenting the adjacent return behavior.

The alternatives are:

- **Normal:** resolve the complete mock task collection.
- **Empty:** resolve an empty collection.
- **Partial-empty:** resolve data that leaves exactly one Today group empty.
- **Pending:** return a promise that intentionally never settles.
- **Failure:** reject with a representative task-source error.
- **Retry:** reject the first call, then resolve the normal collection on the next call within the same application session.

The harness belongs at the mock source boundary so route and presentation code exercise the same data path used by the normal response. It must not add URL controls, visible debug controls, or conditional behavior to the production interface.

The normal response is the committed default. Before committing Milestone 4, review the harness directly and confirm that every non-normal alternative is commented out.

## Manual Verification

Exercise each response alternative deliberately:

1. Pending shows skeleton groups without counts, timing headers, task content, or false empty-state copy.
2. Normal success renders both populated groups.
3. Empty success renders the existing complete empty state.
4. Partial-empty success renders the existing acknowledgement for only the empty group.
5. Failure replaces the full task region with the approved message and retry action.
6. Retry produces the sequence failure → pending → normal grouped content, proving that the loader executes again.
7. Reduced-motion mode removes skeleton animation without hiding the loading structure.
8. Keyboard focus reaches and visibly identifies `Try again`.

Run the repository lint, production build, and whitespace checks after restoring the normal mock response.

## Acceptance Criteria

- Pending never flashes or implies the complete empty state.
- Loading skeletons closely approximate final task-row geometry.
- Failure content replaces all task-derived content and does not expose technical error details.
- Retry executes the loader again and can return the route to normal content.
- Pending and failure remain understandable without color.
- Assistive technology receives a useful loading or failure announcement without reading decorative skeleton shapes.
- The normal mock response is active in the delivered change.
- Milestone 4 does not introduce automated test infrastructure, responsive Milestone 5 work, or Milestone 6 task interactions.
