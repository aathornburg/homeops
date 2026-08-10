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

## Session Checkpoint - 2026-08-05

### Session state

- Branch: `main`
- HEAD: `6551902`
- Objective: make the image-led landing hero responsive while keeping one shared image composition per color scheme across desktop and mobile.

### Work completed

- Generated and selected `hero-responsive-light.png` and `hero-responsive-dark.png` as the intended light/dark hero pair.
- Iterated on the clipboard artwork so it contains subtle lines near the top instead of competing with the semantic page copy.
- Reworked the landing-page markup so the benefit strip is no longer constrained by the hero copy column.
- Reached a desktop composition that currently feels good.
- Shifted the responsive work to an incremental mentoring workflow so each layout decision is understood and implemented by the developer rather than copied wholesale.

### Current working tree

- Modified: `.gitignore`
- Modified: `apps/web/src/routes/(pre-auth)/-landing.tsx`
- Untracked hero candidates remain in `apps/web/public/`, including the selected responsive light/dark pair and earlier desktop/mobile variants.
- Untracked design asset: `docs/design/assets/homeops-landing-clipboard-hero-dark.png`

These files were not reviewed, staged, committed, or cleaned up at the end of the session.

### Decisions

- Use one hero image per color scheme, not separate desktop and mobile artwork.
- Keep the hero image, copy, CTAs, and benefit strip layered within the hero at every viewport size.
- Let CSS cropping and positioning adapt the shared image as space changes.
- Use content-driven breakpoints based on the first visible layout failure rather than selecting a device breakpoint in advance.

### Incomplete work and current diagnosis

- The first visible failure while narrowing the desktop layout occurs around `1215px`: the hero image begins to look stretched or zoomed.
- The current image has `h-full` with automatic width, so it should preserve its intrinsic aspect ratio. The leading hypothesis is that copy or benefit text wraps at that width, increases the content-driven hero height, and causes the image to scale proportionally.
- This hypothesis has not yet been confirmed in the browser.

### Verification

- Desktop appearance was evaluated interactively by the developer.
- No build, typecheck, tests, or fresh end-of-session review were run.

### First action next session

Resize slowly across approximately `1215px` and observe whether the heading, supporting copy, or a benefit label gains a line at the same moment the image changes. Confirm whether the hero's rendered height increases before choosing an image-sizing correction.

## Session Start - 2026-08-06

### Baseline

- Branch: `main`
- HEAD: `6551902`
- Repository state matches the 2026-08-05 checkpoint; no commits or unexpected drift occurred overnight.
- Pre-existing work remains unstaged: `.gitignore`, the landing component, the tracked design handoff, and seven untracked image assets.

### Review and verification

- `npm.cmd run build`: passed.
- `npm.cmd run lint`: passed.
- The selected responsive hero pair is referenced by the landing component.
- Four earlier desktop/mobile hero candidates and one duplicated design asset remain untracked, so commit scope is not yet unambiguous.
- The landing change remains intentionally incomplete because the apparent image zoom around `1215px` has not been diagnosed.

### Today's objective

Confirm what changes at approximately `1215px`, then let the developer implement the smallest responsive correction with an understood reason.

### First action

Resize across `1215px` while watching the heading, supporting copy, benefit labels, and hero container height. Determine whether the image is being geometrically distorted or is scaling proportionally because its content-driven parent becomes taller.

## Session End - 2026-08-06

### Session state

- Branch: `main`
- HEAD: `6551902`
- The landing work, handoff, `.gitignore`, and generated hero assets remain unstaged and uncommitted.

### Work completed

- Confirmed that the three-line heading around `1215px` is acceptable and should not be prevented.
- Changed the image layer so its wrapper fills the hero and the image fills that wrapper with aspect-ratio-preserving cover behavior.
- Confirmed the shared hero image now behaves acceptably down to approximately `700px`.
- Changed the benefit strip from a one-row flex layout to Grid: four columns at wide widths and a deliberate 2x2 layout below `1100px`.
- Identified that the remaining separator problem comes from the existing right-border selector, which still encodes a one-row layout.

### Decisions and rationale

- Keep one light image and one dark image across viewport sizes.
- Accept controlled cropping rather than distortion or uncovered hero space.
- Allow the hero heading to wrap naturally to three lines.
- Keep Grid as the benefit strip's layout model at all widths and change its column count responsively.
- Prefer separators generated by a one-pixel grid gap over breakpoint-specific positional borders: the grid paints the separator color and each child paints the panel surface.

### Verification

- The production build and ESLint passed at the beginning of the session.
- No fresh build, lint, or full responsive review was run after today's landing-page edits.

### Incomplete work

- Make the internal separators look intentional in both the four-column and 2x2 strip layouts.
- The current `[&>*:not(:last-child)]:border-r-1` rule creates incorrect edges in a 2x2 grid and should be reconsidered by the developer.
- Header responsiveness remains a later, separate task.
- Older generated hero candidates still need an explicit keep/remove decision before committing.

### First action next session

Experiment with the grid-gap separator model: remove the child right-border assumption, use a one-pixel gap that exposes the separator-colored grid underneath, give each benefit item its panel background, and ensure the outer rounding clips the child surfaces cleanly. Compare that crisp cross against simple whitespace before choosing the final treatment.

## Session Start - 2026-08-07

### Baseline

- Branch: `main`, aligned with `origin/main`.
- Starting HEAD: `6551902eaba893aba4cd8f976eeae4a468aa1051` (`Updated gitignore and added marketing content`).
- Pre-existing tracked changes: `.gitignore`, the landing component, this design handoff, and deletion of the three legacy hero images.
- Pre-existing untracked assets: the selected responsive light/dark hero pair and `docs/design/assets/homeops-landing-clipboard-hero-dark.png`.
- The older desktop/mobile hero candidates were removed during the startup review; only the selected responsive pair remains under `apps/web/public/`.

### Review and verification

- Confirmed in the running app that the hero image uses aspect-ratio-preserving cover behavior and does not create horizontal overflow at `1215px`.
- Confirmed the benefit strip remains four columns at `1100px` and changes to a 2x2 grid at `1099px`.
- Confirmed the carried-over separator defect: the one-row right-border selector remains active in the 2x2 layout and cannot create correct internal separators.
- Confirmed a broader mobile issue at `375px`: the current hero/header composition overflows horizontally. This remains separate from today's separator task.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; TypeScript and Vite completed with 1,887 modules transformed.
- `git diff --check`: passed, with only the existing `.gitignore` line-ending warning.
- Only `hero-responsive-light.png` and `hero-responsive-dark.png` are referenced by application code; the deleted legacy hero files are no longer referenced.
- No new security-sensitive path was introduced by the current diff: it contains static JSX, local image references, and CSS utility changes only.

### Today's objective

Finish the benefit-strip separator treatment at desktop and 2x2 widths, then perform a fresh responsive review without expanding into the separate mobile header/hero task.

### First action

Replace the child right-border model with the planned one-pixel grid-gap separator model: put the separator color on the grid, give each benefit item the panel surface, and clip the child surfaces with the rounded outer container. Compare that treatment with whitespace-only separation before choosing one.

## Session End - 2026-08-07

### Session state

- Branch: `main`
- HEAD: `6551902eaba893aba4cd8f976eeae4a468aa1051`
- The landing work, `.gitignore`, this handoff, legacy hero deletions, responsive hero pair, and design reference asset remain unstaged and uncommitted.

### Work completed

- Extracted the repeated benefit markup into a local `BenefitItem` component.
- Replaced positional item-border rules with decorative vertical and horizontal divider elements owned by each benefit item.
- Shortened both divider directions to 80% so the separators do not span the full item width or height.
- Centered the dividers inside the grid gap and used the grid container's clipping to hide dividers on outer edges.
- Confirmed the approach scales with additional evenly divided benefit items without per-item or breakpoint-specific divider selectors.
- Removed the older unused generated hero candidates; the selected responsive light/dark pair remains under `apps/web/public/`.

### Decisions and rationale

- Keep `BenefitItem` as the only extracted component; a separate strip component does not yet provide enough value.
- Let every item render both potential divider directions, then rely on `overflow-hidden` at the rounded grid boundary to remove outside lines.
- Keep a four-column wide layout and an evenly divided 2x2 layout below `1100px`.
- Prefer explicit decorative elements over pseudo-element utility strings because the markup is easier to read and extend.

### Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; TypeScript and Vite completed with 1,887 modules transformed.
- `git diff --check`: passed, with only existing line-ending warnings.
- Browser inspection passed at `1200px` and `1099px`: the intended internal dividers remain visible, outside dividers are clipped, and no horizontal page overflow was introduced at those widths.
- No security-sensitive pattern was found in the landing-page change.

### Incomplete work and open questions

- The broader header/hero composition still overflows horizontally around `375px`; this remains a separate responsive task.
- Decide whether `docs/design/assets/homeops-landing-clipboard-hero-dark.png` belongs in the eventual commit.
- No files were staged or committed during this session.

### First action next session

Run the start-of-session review, resolve whether the untracked design reference asset belongs in commit scope, and commit the completed hero and benefit-strip work before beginning the separate mobile header/hero correction.

## Session Checkpoint - 2026-08-10

### Session state and completed objective

- Branch: `main`, starting from `6551902eaba893aba4cd8f976eeae4a468aa1051`.
- Completed the accumulated landing-page responsive work and Mantine adoption slice.
- Added the selected responsive light/dark hero pair and removed the superseded public hero files.
- Added Mantine and its PostCSS setup, mounted `MantineProvider`, and documented the hybrid Mantine/Tailwind decision in ADR 0004.
- Replaced the desktop-only pre-auth navigation with a non-overlapping `900px` desktop/mobile breakpoint.
- Added the approved Option A mobile Drawer: visible `Menu` title, accessible open/close labels, top navigation, bottom-anchored account actions, 47px button targets, and reassurance copy.
- Confirmed the Drawer composition at `390x800` and `390x568`; the short viewport does not overlap or require scrolling.

### Decisions and rationale

- Use Mantine for generic controls and interaction primitives, Tailwind for page layout and the custom marketing surface, and local components for HomeOps product concepts.
- Keep the mobile Drawer approximately `xs` width rather than full-screen so the dimmed landing page remains visible as context.
- Treat `900px` as an exact boundary: desktop at `900px` and above, mobile below `900px`.
- Defer real Log in and Start free behavior until Clerk is introduced. During post-auth shell development, navigate directly to `/today` rather than adding temporary authentication infrastructure.
- Do not begin Clerk, TanStack Query, forms, Redux, or backend work as part of the next slice.

### Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; Vite transformed 2,684 modules and produced the production bundle.
- `git diff --check`: passed with only existing CRLF conversion warnings.
- Security review found no secrets, unsafe HTML, external redirect inputs, network calls, or user-data handling in this UI-only slice.

### Deliberately excluded from this checkpoint

- `.impeccable/critique/` is generated review output and is not part of the application slice.
- `docs/design/assets/homeops-landing-clipboard-hero-dark.png` and `docs/design/assets/homeops-today-dark-warm-concept.png` remain unreferenced design artifacts and are not included without an explicit keep decision.

### Next slice: static post-auth app shell

Outcome: a directly accessible `/today` page rendered inside a reusable post-auth layout, using hardcoded household tasks and no authentication dependency.

Acceptance criteria:

- `/today` renders successfully and survives a browser refresh.
- A shared post-auth shell owns global header/navigation and the main-content region.
- The `Today` route owns its page heading, date/context, and task-specific content.
- The page displays three to five realistic hardcoded household tasks.
- Pre-auth and post-auth layouts remain separate.
- No Clerk, API, TanStack Query, forms, Redux, or premature responsive polish is added.

### First action next session

Before writing JSX, decide and write down the ownership boundary: the post-auth layout owns the global header, navigation, and route outlet; the `Today` page owns the heading and task sections. Then create the smallest TanStack Router structure that can render `/today` inside that shell.
