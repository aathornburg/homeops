# Responsive Post-Auth Header Design

## Purpose

Define how the HomeOps post-auth header adapts across phone, tablet, and desktop widths while preserving product identity, global navigation, and one-tap search access.

This design covers header composition and search-launcher presentation only. Search-result behavior, task creation, notifications, account utilities, authentication, and real data access are outside this slice unless explicitly noted.

## Approved Direction

Use an adaptive-roles header rather than forcing one identical arrangement at every width.

The stable product rule is:

> HomeOps always has a visible home, while search receives the most space the current width can support.

The wordmark may move between the persistent sidebar and the header, but it must never require opening navigation to discover which product the user is using.

Visual references:

- Editable artifact: [homeops-responsive-header-views.html](../../design/homeops-responsive-header-views.html)
- Rendered artifact: [homeops-responsive-header-views.png](../../design/assets/homeops-responsive-header-views.png)

## Responsive Composition

### Phone

- Show a three-region header: hamburger on the left, `HomeOps` wordmark centered, and search icon on the right.
- Keep the wordmark geometrically centered in the viewport; neither side control may displace it.
- Render the search launcher as an icon-only button with an accessible name.
- Give interactive controls a minimum 44 by 44 pixel touch target.
- Keep task creation out of the global header. A task-owning page may present its own primary creation action.

### Tablet and Intermediate Widths

- Show a left cluster containing the hamburger and a compact `HomeOps` wordmark.
- Show the full search launcher independently centered in the header.
- Reserve a right-side balancing region even when no utility is present so the left cluster cannot push search off-center.
- Do not add a decorative or speculative right-side control merely to fill the reserved region.

### Desktop

- Keep the navigation sidebar persistent.
- Let the sidebar own the visible `HomeOps` wordmark.
- Remove the hamburger from the header.
- Center the full search launcher within the main-content header region, not across the sidebar-plus-content viewport.
- Future account or notification utilities may occupy the right region only when they have real behavior and product value.

Retain the shell's existing responsive header heights (`60px` at the base width, `70px` from `md`, and `80px` from `lg`) unless browser verification reveals a concrete fit or touch-target failure.

## Breakpoint Contract

Use the existing default Mantine breakpoint vocabulary as the starting contract. The app does not currently override these values:

- Below `sm` (`48em`, 768 pixels at the default root size): phone composition.
- From `sm` through below `lg`: tablet/intermediate composition.
- At `lg` (`75em`, 1200 pixels at the default root size) and above: persistent-sidebar desktop composition.

These are content-driven transition points, not device detection. Validate immediately below and above both boundaries. Move a breakpoint only if the approved content no longer fits without collision, truncation, or loss of usable touch spacing.

The search-presentation breakpoint and navigation-collapse breakpoint remain conceptually independent even if the starting values align with existing Mantine tokens.

## Search Behavior

- The phone icon, tablet/desktop field, and `Ctrl+K` shortcut open the same Mantine Spotlight instance.
- The full launcher uses plain-language placeholder text such as `Search tasks, notes…`.
- The full launcher has a `28rem` maximum width and may shrink with its center region so it remains recognizable without colliding with side controls.
- The phone icon has an accessible name such as `Search tasks and notes`.
- Keyboard focus must be visibly indicated on every launcher presentation.
- Search remains one tap or click away at every supported width.

Search-result mapping, keyword matching, metadata presentation, and navigation are separate implementation concerns. This header design does not change the feature-owned search catalog or move search behavior into the app shell.

## Ownership Boundaries

- The post-auth shell owns responsive header regions, global navigation controls, and placement of the `GlobalSearch` launcher.
- `GlobalSearch` owns the launcher presentation variants and the Spotlight interaction.
- Task-owning routes own task creation actions.
- Feature-owned search data remains outside the layout component.

This boundary keeps responsive composition separate from search-result content and prevents the global shell from accumulating route-specific actions.

## Accessibility and Interaction Requirements

- Use buttons for hamburger and search launchers.
- Preserve visible focus states and WCAG AA contrast.
- Do not rely on hover for essential behavior.
- Keep phone controls at least 44 by 44 pixels.
- Ensure the wordmark does not overlap controls at narrow supported widths.
- Ensure opening and closing navigation does not alter the search launcher's accessible purpose.

## Verification

Verify the completed implementation at minimum at these widths:

- 320 and 375 pixels for narrow-phone fit and touch targets.
- 767 and 768 pixels for the phone-to-tablet transition.
- 1199 and 1200 pixels for the tablet-to-desktop transition using the current `lg` value.
- A wide desktop viewport to confirm the search launcher respects its maximum width.

At each relevant width, verify:

- The product identity is visible without opening navigation.
- The intended header region is geometrically centered.
- No controls collide, wrap unexpectedly, or overflow.
- Hamburger and search controls are keyboard accessible.
- Click/tap and `Ctrl+K` open the same Spotlight.
- The persistent sidebar and drawer states follow the approved composition.

Run the repository-defined lint and production build after implementation. Browser verification is required because static type and lint checks cannot prove visual centering or breakpoint behavior.

## Deferred Work

- Search action navigation, keywords, metadata, and result icons.
- Finished Notes content.
- Notifications and account utilities.
- Task-creation placement on task-owning pages.
- Authentication, server data, and authorization.

These items must not be pulled into the responsive-header implementation merely to make the mockup appear more complete.
