# Today Cross-Feature Action Hub Design

## Purpose

Define the target-state Today experience before incremental frontend implementation. Today is the canonical post-auth landing page and answers one question: **What needs attention next?**

The design preserves the visual direction in `docs/design/assets/homeops-today-dark-warm-concept.png` while establishing boundaries that can accommodate Tasks, Projects, House Binder, Calendar, and Notifications without redesigning the page as each feature arrives.

## Approved Direction

- Today is a cross-feature action hub, not a passive household dashboard or full planning workspace.
- Urgency determines placement; feature ownership is shown through a subtle source badge and destination link.
- The main column contains `Needs attention today` and `Due soon`.
- The secondary rail contains `Blocked` and `Coming up`.
- Only actionable records appear. Passive Binder information, general activity history, and informational notifications remain with their owning features.
- Today does not own domain records, status rules, permissions, or complex workflows.
- The complete target structure is designed now and delivered through feature-owned slices.

## User Outcome

A household member can open HomeOps, understand what requires attention, take the most obvious safe action, and reach the owning feature for more involved work without scanning every area of the application.

Examples include:

- Completing a task due today.
- Opening a blocked task to understand its dependency or waiting reason.
- Reviewing a project step that requires a decision.
- Opening a future Binder action only after House Binder defines a genuine attention signal.
- Acknowledging or opening an actionable notification.

## Information Architecture

### Page header

- Page title: `Today`.
- Date rendered in the household timezone once that setting exists; frontend mock data uses the browser's local timezone until then.
- A task-specific `Add task` action appears only when task creation has a valid working destination. Do not render a nonfunctional control during the read-only slice.

### Main column

#### Needs attention today

Contains actionable items that are overdue or due on the current household date. It is the primary visual region.

#### Due soon

Contains actionable, unblocked items due after today and within the next seven calendar days. The seven-day boundary is part of the Today presentation policy, not a domain status.

### Secondary rail

#### Blocked

Contains blocked or waiting items regardless of due date. Blocked placement takes precedence over Today or Due Soon placement so an item appears only once.

#### Coming up

Contains calendar events and actionable work scheduled or due more than seven and no more than thirty calendar days from today. It includes a route to the full Calendar. Items already displayed in another Today section do not repeat here.

## Attention Item Contract

Today consumes a normalized display contract rather than importing feature-domain models directly. The conceptual `AttentionItem` includes:

- Stable item identity.
- Owning feature and owning record identity.
- Title and concise context.
- Destination route.
- Due date or time when relevant.
- Urgency and priority hints.
- Blocked or waiting status and a short reason when available.
- Assignee presentation when relevant and permitted.
- Optional primary action descriptor.
- Optional secondary action descriptors.

The contract is a Today-facing view model, not a shared domain model. Each feature maps its authoritative records into this contract through a feature-owned adapter.

## Ownership and Data Flow

```text
Tasks / Projects / House Binder / Notifications / Calendar
                         |
              feature-owned adapters
                         |
              Today attention aggregator
                         |
            urgency sections and shared rows
```

Feature owners remain responsible for:

- Record lifecycle and persistence.
- Status calculation and action eligibility.
- Authorization and household scoping.
- Validation and error semantics.
- Destination routes and complex workflows.

Today is responsible for:

- Accepting display-ready attention items.
- Filtering inactive items.
- Applying section precedence and date windows.
- Stable sorting and de-duplication.
- Shared row presentation and responsive composition.

The backend eventually owns authoritative task status, dependency blocking, recurrence, household permissions, and other business rules. Frontend mock adapters must use the same Today-facing contract so query-backed data can replace them without redesigning the page.

## Grouping and Sorting Rules

1. Exclude completed, archived, dismissed, unauthorized, and non-actionable items.
2. Place blocked and waiting items in `Blocked` regardless of due date.
3. Place remaining overdue and due-today items in `Needs attention today`.
4. Place remaining items due within the next seven calendar days in `Due soon`.
5. Place calendar events and remaining items scheduled or due eight through thirty calendar days away in `Coming up`.
6. Do not display one item in more than one section.
7. Within a section, sort by overdue severity, explicit priority, due date/time, then stable title and identity ordering.

Items beyond thirty days remain available in Calendar or their owning feature. An undated item appears only when its owning feature explicitly marks it as requiring attention now.

## Row and Interaction Model

- Clicking the row title or body opens the owning feature's detail destination.
- The leading control performs the single obvious primary action when one exists, such as completing a task.
- A stable overflow menu contains eligible secondary actions such as edit, reschedule, reassign, or snooze.
- Complex forms and multi-step workflows remain in the owning feature's detail or planning experience.
- Source badges communicate context without dominating urgency.
- Status uses text and icons as well as color.
- Completed items may remain briefly with a completed treatment before leaving the active list; the owning feature controls the actual mutation and rollback behavior.
- Actions unavailable because of permissions are omitted. A readable destination remains when the record itself is still visible.

## Component Boundaries

- `TodayPage` owns page composition, date context, and section placement.
- `AttentionSection` owns a section heading, count, states, and its ordered item list.
- `AttentionItemRow` owns shared row layout, focus behavior, source presentation, and action slots.
- Feature adapters own mapping from domain records to `AttentionItem`.
- The Today aggregator owns precedence, date grouping, sorting, and de-duplication.

These names describe responsibilities rather than prescribing exact filenames. Components should remain small enough that source-specific behavior can change without modifying the shared row internals.

## Responsive Composition

- Wide desktop: main urgency column plus secondary Blocked/Coming Up rail, following the approved warm concept.
- Tablet: retain two columns while the main list and rail preserve readable titles and 44-pixel actions.
- Phone: use one column in this order: Needs attention, Blocked, Due soon, Coming up.
- Do not hide an urgency section merely to preserve the desktop layout.
- Row actions maintain at least 44-by-44-pixel touch targets.
- Overflow actions prevent secondary controls from crowding narrow rows.

## States and Failure Handling

### Loading

Use section-shaped skeleton rows rather than a page-centered spinner.

### Nothing needs attention today

Present a positive empty state while preserving populated Due Soon and Coming Up sections. Suggested copy: `Nothing needs attention today.`

### Everything is blocked

Explain that progress depends on a decision, dependency, delivery, contractor, weather condition, or another waiting reason. Preserve routes to the owning records.

### Partial source failure

Render successful sources and show a compact source-specific error with retry. One unavailable feature must not blank the entire Today page.

### Action pending and failure

Disable only the affected action while it is pending. On failure, restore the previous row state, retain context, announce the failure, and offer retry.

### Permission change

Remove actions that are no longer allowed. Remove the item only when the user no longer has permission to view its owning record.

## Accessibility

- Support keyboard access for row destinations, primary actions, overflow menus, and retry controls.
- Preserve visible focus states and at least 44-pixel touch targets.
- Do not communicate urgency, source, completion, or blocked state through color alone.
- Provide descriptive accessible names that include the action and item title.
- Announce completion, rollback, and failure outcomes through an appropriate live region.
- Keep DOM and visual reading order aligned, especially in the phone composition.
- Preserve heading hierarchy for Today and all four sections.

## Security and Authorization Boundaries

- Today is a presentation and aggregation surface, not an authorization boundary.
- Feature adapters must provide only records already filtered to the active household and current user's permissions.
- The backend must re-authorize every mutation when persistent APIs exist.
- Client-side action hiding is a user-experience aid and never enforcement.
- Error messages must not reveal records from another household or feature context.

## Verification Expectations

Unit-level verification should cover:

- Section precedence, including blocked items that are also overdue.
- Today, seven-day, and thirty-day date boundaries.
- Stable sorting.
- Cross-source de-duplication.
- Undated attention items.
- Exclusion of inactive or unauthorized items.

Component and interaction verification should cover:

- Default, loading, empty, everything-blocked, partial-failure, pending, and rollback states.
- Primary and overflow actions.
- Keyboard order, accessible names, live announcements, and visible focus.
- Desktop, tablet, and phone compositions.
- No duplicated item across sections.
- Navigation to the owning feature.

## Delivery Slices

### Slice 1 - Today foundation

- Build the responsive urgency-first composition from the approved concept.
- Add the Today-facing contract, task adapter, aggregator, and shared row presentation.
- Render realistic mock task records across Today, Blocked, Due Soon, and Coming Up.
- Include default, loading, empty, and error presentations.
- Keep records read-only except for navigation to existing working destinations.
- Omit controls whose workflows do not yet exist.

Observable outcome: a household member can open a polished, realistic Today landing page and understand what requires attention without encountering nonfunctional controls.

### Slice 2 - Task actions

- Add mock-session completion with pending and rollback behavior.
- Connect task creation, detail, edit, reschedule, and assignment as those task-owned workflows become available.
- Keep complex actions outside the Today row.

Observable outcome: a household member can complete obvious task actions from Today and reach task-owned workflows for everything else.

### Slice 3 - Planning signals

- Add dependency-derived blocked and waiting presentation.
- Add project actions through a project-owned adapter.
- Expand Coming Up through Calendar without duplicating urgency rows.

Observable outcome: Today reflects actionable planning constraints across tasks and projects.

### Slice 4 - Household intelligence

- Add House Binder items only after Binder defines genuine attention signals.
- Add actionable notifications while leaving passive messages in the notification center.
- Apply household membership and role-based permissions without changing the Today composition.

Observable outcome: Today becomes a permission-aware cross-feature action hub while retaining the established hierarchy.

### Slice 5 - Persistent aggregation

- Replace mock adapters with query-backed feature adapters.
- Use backend-authoritative status, recurrence, dependencies, household scope, and permissions.
- Preserve the Today-facing contract and layout.

Observable outcome: the action hub is driven by persistent, authoritative application data without a frontend redesign.

## Deferred Scope

- Implementing task creation, edit, reschedule, assignment, or recurrence inside Slice 1.
- Implementing Projects, Binder attention signals, Notifications, or backend aggregation before their owning roadmap slices.
- Passive household metrics, activity feeds, documents, weather, or informational cards on Today.
- User-configurable dashboard widgets or section ordering.
- A second independent Today business-rule model on the client after backend rules exist.

These capabilities can enter through the approved boundaries when their owning features justify them; they are not requirements for the first implementation slice.
