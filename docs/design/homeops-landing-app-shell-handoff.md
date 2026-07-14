# HomeOps Landing Page and App Shell Handoff

## Purpose

This document captures the approved design direction for the first HomeOps implementation pass. It is meant as a self-implementation guide: build the React code yourself, but use this as the product, visual, and interaction contract.

## Approved Direction

Use **Direction A - Warm Landing** as the primary north star.

Carry forward:
- Cozy, photo-led landing page with a real clipboard/kitchen-counter feeling.
- Fraunces for the HomeOps wordmark and landing-page hero moments.
- Nunito Sans for everyday app UI.
- A friendly landing page that feels like a natural progression from a classic todo app.
- A practical authenticated shell that can grow into a calm household console.

Borrow from Direction B:
- Keep the upgrade CTA visible in the authenticated toolbar or right-side panel.
- Use a compact **HomeOps Plus** / premium callout for project planning.

Do not carry forward:
- A default Projects item in the left nav.
- A dense enterprise dashboard feel.
- Vite starter styling, Inter, purple gradients, glass cards, or generic SaaS hero metrics.

## Assets

Reference assets:
- Palette board: [homeops-palette-fraunces-nunito.png](./assets/homeops-palette-fraunces-nunito.png)
- Mock directions: [homeops-mock-directions.png](./assets/homeops-mock-directions.png)
- Landing hero image: [homeops-landing-clipboard-hero.png](./assets/homeops-landing-clipboard-hero.png)

App-ready asset:
- [landing-clipboard-hero.png](../../apps/web/src/assets/homeops/landing-clipboard-hero.png)

Use the hero image as a landing-page visual, not as UI. Keep all app text, task rows, buttons, and navigation as semantic HTML/CSS.

## Product Scope

Build two connected experiences:
- Public landing page before login.
- Mock-authenticated app shell after login.

Auth is local React state for this pass:
- `Start free` and `Log in` can enter the authenticated shell.
- `Sign out` returns to the landing page.
- Do not add real auth, backend sessions, persistence, or protected routing yet.

## Landing Page

Primary job:
- Explain that HomeOps is a free way to manage chores, home maintenance, errands, and shared household responsibility.
- Make the product feel approachable to non-technical household members.
- Invite users into the app with `Start free`.

Suggested sections:
- Hero: `Keep the house running, together.`
- Supporting copy: `Track chores, maintenance, and shared household work in one calm place.`
- Primary CTA: `Start free`
- Secondary CTA: `Log in`
- Trust/value line: `Free to get started. No credit card.`
- Preview strip: a few realistic tasks such as HVAC filter, kitchen counters, crawlspace after rain.
- Feature band: everyone in the loop, never miss what matters, peace of mind at home.

Visual notes:
- Use the clipboard hero image.
- Keep the hero cozy and spacious.
- Let Fraunces appear in the wordmark and main headline.
- Avoid a generic grid of icon cards.

## Authenticated App Shell

Primary job:
- Help the household understand what needs attention today.
- Show due-soon and blocked work clearly.
- Establish navigation and density for future features.

Default nav:
- Today
- Tasks
- Calendar
- Household
- Notes or Settings, depending on what you want to stub first

Do not include Projects in the default left nav. Projects are premium.

Toolbar:
- Household selector, for example `Anderson Household`
- Search icon/button
- Notifications icon/button
- User/avatar menu
- Visible premium CTA such as `Upgrade for projects` or `HomeOps Plus`

Main dashboard:
- Page title: `Today`
- Date line
- Summary cards or compact stats: due today, due soon, blocked, completed
- Task list preview with realistic seeded tasks
- Due Soon section
- Blocked section
- Household panel or invite callout
- HomeOps Plus panel calling out project planning

## Premium Projects Rule

Projects are a future premium feature. Treat them as an upgrade path, not default navigation.

Allowed:
- Premium callout panel: `Plan bigger home projects with HomeOps Plus.`
- Toolbar CTA: `Upgrade for projects`
- A locked preview card or short marketing line.

Avoid:
- Projects as a default nav destination.
- Making project planning look required for the free chore/maintenance core.
- Using Project Violet for ordinary chores.

## Starter Data

Use realistic seed data:
- Change HVAC filter
- Wipe kitchen counters
- Check crawlspace after rain
- Buy potting soil
- Book annual HVAC tune-up
- Service mower
- Invite household member

Suggested statuses:
- Ready today
- Due soon
- Blocked
- Waiting
- Done

Suggested household areas:
- Kitchen
- Home
- Outdoor
- Maintenance

## States To Design

Include at least lightweight treatments for:
- Default dashboard
- Empty task state: `No tasks for today. Add one chore or maintenance reminder to get started.`
- Loading state: skeleton rows, not a centered spinner
- Error state: `We couldn't load household tasks. Try again.`
- Mobile state: bottom navigation or compact top navigation

## Implementation Notes For Learning

Suggested component breakdown:
- `App`
- `LandingPage`
- `AppShell`
- `DashboardPage`
- `TaskRow`
- `StatusChip`
- `HouseholdSelector`
- `PremiumCallout`
- `EmptyState`
- `LoadingRows`
- `ErrorState`

Keep state simple:
- `isAuthenticated`
- `tasks`
- optional `viewState` for `ready`, `loading`, `empty`, `error`

This is a good pass to practice:
- React component composition
- Props for repeated UI
- Mapping arrays into rows/cards
- Conditional rendering for mock auth and UI states
- Accessible buttons, landmarks, headings, and labels
- Responsive CSS without adding a router or state library yet

## Accessibility

Use:
- Real `button` elements for actions.
- Real links only for navigation destinations.
- `header`, `main`, `nav`, `section`, and meaningful headings.
- Visible focus states.
- `alt` text for the clipboard hero image, such as `Clipboard with a weekly household checklist on a kitchen counter`.
- `aria-label` on icon-only controls.

Do not rely on color alone for task status. Pair status color with readable status text.

## Visual Tokens

Use the tokens in [DESIGN.md](../../DESIGN.md).

Key reminders:
- Household Green: primary actions, active navigation, ready/selected states.
- Clipboard Ochre: due-soon and maintenance emphasis.
- Project Violet: premium project-planning only.
- Fraunces: landing/brand accent only.
- Nunito Sans: app UI, body, labels, controls.

## Suggested First Build Order

1. Replace the Vite starter with a simple mock-auth switch.
2. Build static `LandingPage`.
3. Build static `AppShell` with seeded data.
4. Extract `TaskRow`, `StatusChip`, and `PremiumCallout`.
5. Add empty/loading/error state toggles in code so the UI states are easy to inspect.
6. Make the layout responsive.
7. Run build and inspect in the browser at mobile and desktop widths.
