# Today - Milestone 2 responsive reference

These artifacts capture the approved Today-page direction for Milestone 2. They are visual targets, not literal pixel measurements; implementation should use the existing HomeOps tokens and content-driven breakpoints.

## Artifacts

- [Desktop](assets/homeops-today-milestone-2-desktop.png) - 1547 x 1017
- [Tablet](assets/homeops-today-milestone-2-tablet.png) - 1086 x 1448
- [Mobile](assets/homeops-today-milestone-2-mobile.png) - 852 x 1846

## Shared contract

- Preserve the warm, dark HomeOps shell, Fraunces display headings, Nunito Sans UI text, and mint/teal primary action.
- Today contains task groups, not a Projects content panel. Projects remains a primary navigation destination.
- Show Due and Planned independently. Do not render placeholders for missing values.
- Emphasize the timing fact that determines placement; keep the other fact visible but quieter.
- Keep each group as one bordered list surface with divided rows rather than a stack of independent cards.
- Milestone 2 may include approved shell components for unfinished destinations and controls, including Add task and completion affordances, so their layout and responsive treatment can be designed. Their working behavior is explicitly outside this slice and remains deferred to the interaction milestone.

## Desktop

- Use the full sidebar and top utility bar.
- Align the right edge of both task lists with the Add Task button.
- Keep the Due/Planned rail compact at the far right; reclaimed width belongs to task content.
- Give every task row its own inset vertical separator before the timing rail. The separator spans roughly 80-90% of that row and breaks between rows.
- Keep shared Due and Planned headers aligned over their columns.

## Tablet

- Collapse the sidebar to a persistent icon rail while keeping the top utility bar.
- Retain aligned Due and Planned columns because the content still fits without truncating task meaning.
- Maintain touch-friendly rows and controls of at least 44 x 44 CSS pixels.
- Preserve one per-row inset separator between task content/assignee and the complete timing rail; do not divide Due from Planned with a second rule.

## Mobile

- Remove the sidebar and desktop search field. Use a compact top bar and persistent bottom navigation.
- Navigation destinations are Today, Tasks, Calendar, Projects, and More.
- Place the mint/teal Add Task action directly below the page heading and date.
- Remove desktop timing headers and vertical separators.
- Reflow timing into each task row as concise natural language, including both facts when both exist, for example `Due today Sep 5 / Planned today Sep 5`.
- Omit missing timing facts entirely rather than rendering dashes or empty labeled slots.
- Keep completion, overflow, navigation, and primary-action targets at least 44 x 44 CSS pixels.

## Suggested content-driven ranges

- Mobile: up to 767px
- Tablet: 768-1023px
- Desktop: 1024px and above, with a content max-width so the timing rail does not drift away from the task body on very wide screens
