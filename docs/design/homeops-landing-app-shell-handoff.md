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

## Session End - 2026-08-10

### Session state

- Branch: `main`.
- HEAD: `a04f09d` (`feat(web): adopt Mantine and finish responsive landing shell`), aligned with `origin/main`.
- The post-auth routing work is uncommitted and unverified.
- Pre-existing excluded artifacts remain untracked: `.impeccable/critique/` and the two design-reference images.

### Work started after the checkpoint commit

- Simplified the root index route so `/` renders the existing `LandingComponent` directly.
- Added `(post-auth)/today.tsx`; TanStack generated a public `/today` path while retaining `/(post-auth)/today` as the internal route ID.
- Sketched `PostAuthShell` with an `Outlet` and a scrollable main-content region.
- TanStack regenerated `routeTree.gen.ts` for the new Today route.

### Decisions and rationale

- Keep `/` as the public landing page.
- Give Today its own canonical `/today` route.
- Once Clerk exists, authenticated visits to `/` should redirect to `/today`.
- Use `(post-auth)` only as an organizational route group; it does not create a component hierarchy.
- Add an underscore-prefixed authenticated pathless layout to own the auth guard and `PostAuthShell` without adding a URL segment.

### Partial work and known review items

- `PostAuthShell` is not yet wired into the route tree; `/today` currently remains a direct child of the root route.
- The file is currently named `postAuthShelll.tsx` with three trailing `l` characters and should be corrected by the developer.
- `index.tsx` still imports `Link` after removing the temporary Today component; this is likely unused.
- `apps/web/.tanstack/tmp/` contains generated temporary files and should be reviewed rather than committed automatically.
- No lint, build, browser review, or commit was run after these post-auth changes.

### First action next session

Create the smallest underscore-prefixed authenticated pathless route that renders `PostAuthShell` and an `Outlet`, then nest the Today route beneath it so `/today` renders through the shell. While doing that, correct the shell filename typo and remove the stale `Link` import before running the start-of-session review.

## Session Start - 2026-08-30

### Baseline and continuity

- Branch: `main`; HEAD: `3903b15d751743fa41f9f346456f9151798c434d` (`feat(web): add Today task mapping boundary`).
- The August 10 handoff is outdated. The approved August 26 Today Tasks and Projects design and task-foundation plan now define the current slice.
- Recent commits define the Today task projection (`1874735`) and add the mock task mapping boundary (`3903b15`). The Today route loads projections and currently renders task titles.
- No tracked code changes were pending at startup. Untracked items are `.impeccable/critique/`, `apps/web/.tanstack/`, and nine design-reference PNGs under `docs/design/assets/`; left untouched and excluded from commit scope.
- The foundation plan's unchecked boxes and placeholder starting-point description have not caught up with these commits. Calendar-date grouping is still absent from the Today feature.

### Verification

- `npm.cmd run lint` in `apps/web`: passed.
- `npm.cmd run build` in `apps/web`: passed, including TypeScript; Vite reported a plugin-timing advisory.
- `git diff --check`: passed before this documentation update.
- No automated test script is configured; fixed-date acceptance checks remain part of the foundation plan, with automated tests explicitly deferred.
- No application code was changed and no commit was created during startup.

### Today's objective and first action

Continue Milestone 3 in `docs/superpowers/plans/2026-08-26-today-task-foundation.md`: implement pure calendar-date placement of task projections into `For today` and `Upcoming`, with an explicit reference date.

First, write expected placements for a small fixed-date example set: overdue, due today, scheduled today without a deadline, a future date within thirty days, and day thirty-one. Then implement placement without React or the system clock. Blocked tasks retain their date-based placement, and each task appears at most once.

Stable ordering and duplicate handling follow in Milestone 4. Responsive task rows and the Projects panel remain later slices; the visual design itself was approved August 26.

## Session End - 2026-08-30

### State and work completed

- Branch: `main`; HEAD remains `3903b15d751743fa41f9f346456f9151798c434d`. No commits were created today.
- Developer added `TodayTasksModel` with two non-null task arrays and an untracked `features/today/task-grouper.ts` module.
- The Today route now calls the grouping boundary with a fixed reference date and renders both groups, with initial heading/action markup.
- Developer added comparison and date-addition helpers in `shared/calendar-date.ts`. The grouper now imports only CalendarDate helpers and has no direct Day.js dependency.
- Grouping checks nullable due and scheduled dates and uses an inclusive thirty-day horizon. Comparator direction was corrected after the checkpoint; placement still needs scenario verification.
- Modified application files: `apps/web/src/features/today/types.ts`, `apps/web/src/routes/_postAuth/today.tsx`, and `apps/web/src/shared/calendar-date.ts`; new file: `apps/web/src/features/today/task-grouper.ts`.
- This handoff is modified. Pre-existing generated directories and design-reference PNGs remain untouched and untracked.

### Decisions

- Shared CalendarDate helpers own general date operations; Today owns null handling, date horizons, and task placement policy.
- User accepted a single-column Today layout: For today, Upcoming, then a separate Projects section. Project summaries remain separate from task grouping. The August 26 design spec and north-star assets have not yet been updated to reflect the desktop layout decision.
- Finish the task-foundation slice before continuing visual design. Current plain lists are sufficient for inspecting the grouping work.

### Quick inspection findings for next session

- Comparator direction corrected by the developer after the checkpoint: `isBefore(date1, date2)` and `isAfter(date1, date2)` now compare date1 against date2, matching grouper usage. Comments were updated too. Confirmed by source inspection only; runtime verification remains deferred.
- Policy amended after the checkpoint: `showOnTodayPanel` may use on-or-before placement for both due and scheduled dates. User approved carrying unfinished past scheduled tasks into Today. Only past due dates earn the `Overdue` label; past plans use `Planned yesterday` or a planned-date label. The earlier finding that past scheduled-only tasks should be excluded is withdrawn.
- Date comparisons still omit explicit `day` granularity.
- Stable ordering, duplicate identity handling, and the full fixed-date acceptance set remain outstanding. Day-30 inclusion is intended but not verified in the latest implementation.

### Verification and first action next session

- Startup lint/build passed before today's code changes. An intermediate TypeScript check identified reducer errors; the developer subsequently added the accumulator return and explicit accumulator type.
- An intermediate in-memory execution of the then-saved loader returned four projections and grouped two into Today and one into Upcoming; this predates the new CalendarDate helpers and does not validate the latest code.
- No fresh end-of-day tests, build, lint, browser review, or commit was performed.
- First action: exercise fixed-date placement cases against the corrected helpers: yesterday, today, tomorrow, day 30, day 31, null dates, and an unfinished past plan with a later deadline. Keep shared on-or-before placement for due and scheduled dates under the amended policy; distinguish their timing labels in the later interface slice. Review explicit day granularity, then finish ordering/deduplication before reviewing and committing the slice.
- The approved past-plan carry-forward policy is recorded in the August 26 design spec and foundation plan, including acceptance scenarios. This documentation amendment changes no application code and does not verify the current implementation.

## Session Start - 2026-09-19

### Baseline and continuity

- Branch: `main`; starting HEAD: `19cce6fc261ca74dbf04eececabc6b6a091d1092` (`feat(web): make Today content responsive`). Local tracking information shows five commits ahead of `origin/main`; no fetch or push was performed.
- The August 30 session handoff is outdated. The September 3 Today interface plan records loading/failure acceptance on September 13 and responsive acceptance on September 15. Current work is Milestone 6, task completion.
- Pre-existing tracked edits: `apps/web/src/features/tasks/api/mock-task-api.ts`, `apps/web/src/routes/_postAuth/today.tsx`, and an independent landing benefit-strip maximum-width change in `apps/web/src/routes/(pre-auth)/-landing.tsx`.
- Pre-existing untracked items: `.impeccable/critique/`, `apps/web/.tanstack/`, ten reference PNGs under `docs/design/assets/`, and `docs/design/homeops-today-paused-task-row.html`. These remain untouched and outside commit scope.

### Current developer-authored work

- The mock completion operation changes the source task's status, capability, and completion date; the normal fetch now returns only open, unarchived tasks.
- Today awaits completion and synchronous router invalidation. Each row has a saving guard, disabled pending checkbox, task-specific accessible name, saving status, and completion-error feedback.
- Completion now uses the primary action color and inverse icon foreground. The checkbox is controlled, so it no longer independently toggles as if it offered Undo.
- `undoCompleteTask` exists at the mock API boundary but has no UI caller. Task details and Add task still depend on a real task destination; `/tasks` is a placeholder.
- The September 18 critique predates several of these corrections. Its stale-completion, missing-guard, unnamed-checkbox, and missing-catch findings should not be repeated as descriptions of the current source.

### Review finding and first action

- A successful completion followed by a failed Today reload is not handled by the row's refresh-error catch. A fresh in-memory check against the installed TanStack Router confirmed that `router.invalidate({ sync: true })` resolves while the route match enters `error` state when its loader fails.
- The route error component then owns the failure UI and currently says `Your tasks haven't changed`, which can be false after a successful mutation. The row-local `Task completed, but the list couldn't refresh` message does not cover this loader-failure path.
- Today's recommended objective: finish truthful completion/reload failure handling before further interaction work. First, exercise a successful completion followed by a failed fetch, then a successful retry. Decide how the route-level failure UI should describe that outcome without claiming the mutation was rolled back; the developer implements the correction.
- After that correction, verify the full completion interaction in the browser, including pending keyboard behavior, task/count removal, mutation failure, and reload recovery. Decide Undo scope separately; its API helper alone is not a completed interaction.

### Verification and commit state

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, including TypeScript and production bundling. Vite emitted a non-blocking plugin-timing advisory.
- `git diff --check`: passed before this handoff update, with the existing Today CRLF conversion warning.
- In-memory execution of the existing source modules confirmed: completing an eligible fixture changes its status to completed and reduces the projection count from four to three; duplicate completion rejects; the blocked fixture rejects; API Undo restores the task and projection count to four. These checks ran in an isolated Node process and did not alter repository fixtures or the running app.
- A separate installed-router diagnostic confirmed the loader-failure/invalidation behavior described above. This is not browser or screen-reader acceptance; no browser interaction review was run at startup.
- No automated test command is configured in the web package. The diagnostic checks did not add test files.
- Only this handoff was edited by the agent. No application code was changed, no files were staged, and no commit was created because completion failure handling remains unfinished and the landing edit is a separate scope.

### Follow-up: reload error wording corrected

- Clarified the startup finding: the existing router error component and retry already handle loader failure. Correcting the inaccurate claim about unchanged tasks requires a copy change, not a new failure experience or a functional refactor.
- The developer changed the error detail to `Try again to refresh the list.` and removed the optional `didComplete` bookkeeping and unreachable loader-failure message from the row handler. The completion catch still reports mutation failure, and the router still owns loader failure.
- Source review and fresh lint passed after these edits. This resolves the identified wording issue; browser completion/retry acceptance remains outstanding. No application code was edited by the agent and no commit was created.

### Follow-up: successful completion confirmed in the browser

- The developer confirmed that completing a task removes its row and decreases the group count. The successful completion browser check is now accepted.
- Remaining interaction checks include pending keyboard behavior, mutation failure, and reload failure followed by successful retry. The next focused check is keyboard completion: activate an eligible checkbox with Space and confirm it remains disabled during saving, then the task disappears after completion.

### Follow-up: keyboard completion confirmed

- The developer confirmed keyboard activation with Space, the disabled checkbox during saving, and removal of the task after completion.
- Remaining checks are mutation failure/recovery and reload failure followed by successful retry. Next, temporarily reject completion before mutating the source; confirm the row and count remain, an error is shown, and the checkbox becomes usable again. Restore normal completion behavior and confirm retry succeeds.

### Follow-up: failure checks deferred; next slice recommended

- The developer explicitly chose to move on without adding temporary fail-once code. Mutation failure/recovery and post-completion reload failure/retry browser checks are deferred, not recorded as passed. Do not keep requiring these manual simulations before further development.
- Source inspection confirms normal `completeTask` behavior is restored: the simulated throw is removed, and the status/capability/date updates and successful return are active.
- Recommended next slice, pending developer uptake: offer a completion confirmation with an Undo action that calls the existing `undoCompleteTask` helper and refreshes Today. This would make accidental completion recoverable without expanding into task creation or details. The helper exists, but the user-facing Undo integration has not been implemented or verified.

### Follow-up: notification and Undo implementation checkpoint

- The developer mounted Mantine Notifications inside MantineProvider and added shared Notification theme defaults in `apps/web/src/main.tsx`. Individual completion notices retain their success icon/color and use custom message JSX for the two-line text and Undo button.
- The current Today handler creates a notification ID, shows the completion notice, and reloads Today. Undo calls the existing API helper, hides that notification after mutation success, and reloads Today. Its callback now returns `Promise<void>` rather than the value returned by `notifications.hide`.
- Fresh lint failed on two items in `today.tsx`: unused `TaskApiDto` import at line 16 and async reassignment of the render-scoped `notificationId` at line 222 (`react-hooks/immutability`). The production build stopped at the unused-import TypeScript error. Whitespace validation passed with existing CRLF conversion warnings.
- Recommended correction: remove the stale import; create `const notificationId` inside the completion-success callback and pass that ID explicitly to `handleUndo` instead of mutating a render-scoped variable. The developer retains code authorship.
- The custom notice still invokes `onUndo` directly from the button; local Undo pending/error handling has not yet been implemented. Browser Undo acceptance has not been explicitly confirmed. Previously deferred failure simulations remain deferred.
- No application code was changed by the agent and no commit was created. This is an in-progress checkpoint, not a completed Milestone 6 claim.

### Follow-up: checkpoint checks passing

- The developer removed the unused `TaskApiDto` import and now creates a local `const notificationId` inside the completion-success callback, passing it explicitly to `handleUndo`.
- Fresh lint, TypeScript/production build, and whitespace validation passed after these fixes. Undo pending/error feedback remains the next functional step; deferred failure simulations remain deferred. No commit was created.

## Session Start - 2026-09-20

### Baseline and continuity

- Objective: finish and verify the Milestone 6 completion/Undo interaction. Milestone 5 remains complete; task details, Add task, and project navigation remain separate unfinished integrations.
- Branch: `main`; starting HEAD: `19cce6fc261ca74dbf04eececabc6b6a091d1092` (`feat(web): make Today content responsive`). Five commits ahead of the cached `origin/main` reference; no fetch or push performed.
- Pre-existing tracked changes: completion/Undo in `apps/web/src/features/tasks/api/mock-task-api.ts` and `apps/web/src/routes/_postAuth/today.tsx`, notification setup in `apps/web/src/main.tsx`, the independent landing maximum-width edit, and this handoff's September 19 entries.
- Pre-existing untracked items remain critique output, generated `.tanstack` files, ten design reference PNGs, and the paused-task-row HTML. They remain outside the completion slice.
- The latest continuity record is the September 19 section of this tracked handoff. The September 18 local handoff predates the truthful reload-error copy, notification integration, and the developer's decision to defer forced-failure browser simulations. Those simulations remain deferred and are not prerequisites to further development.

### Changes since the last checkpoint

- The developer has added local Undo pending/error state: repeated activation is guarded, the button is disabled and says `Undoing...` while pending, errors are exposed with `role="alert"`, and a retry clears the previous error.
- Successful Undo restores the mock task, hides its completion notification, and refreshes Today. The mock Undo helper now validates completed status before restoring open status, capability, and a null completion date.
- These are source-review observations. No fresh browser acceptance or runtime mutation diagnostics were performed at this startup; normal completion and keyboard completion retain the developer acceptance recorded September 19.

### Verification and first action

- Fresh `npm.cmd run lint`: passed.
- Fresh `npm.cmd run build`: TypeScript and production build passed.
- Fresh `git diff --check`: failed on trailing whitespace at `apps/web/src/features/tasks/api/mock-task-api.ts:173`.
- First correction: remove the spaces from that blank line. Then exercise one normal completion/Undo round trip in the browser: the row and count decrease after completion; Undo becomes disabled while pending; the row and count return and the notification closes after success. Include keyboard activation of Undo.
- Browser Undo acceptance, light/mobile/reduced-motion checks, and the previously noted unexplained groceries capability remain open. Deferred failure simulations are not recorded as passed.
- Only this handoff was edited by the agent. No production or test code was authored, no files were staged, and no commit was created because whitespace validation fails and Undo browser acceptance remains unconfirmed.

### Follow-up: completion and Undo accepted

- The developer confirmed the requested normal completion/Undo browser check, including pending disablement, task/count restoration, notification dismissal, and keyboard activation.
- The developer removed the trailing whitespace in the mock API. Fresh lint, TypeScript/production build, and whitespace checks now pass.
- The reviewed checkpoint is `feat(web): add Today completion and Undo`, covering the mock API, Today interaction, notification setup, and this handoff. The independent landing edit and untracked reference/generated files are outside its scope. No production or test code was authored by the agent.
- This accepts the normal completion/Undo interaction with the mock source, not all of Milestone 6. Forced-failure simulations remain deferred. Light/mobile/reduced-motion acceptance and the unexplained groceries capability remain open.
- Recommended next focused check: inspect the completion notice at 390px in light and dark themes, including a long task title, and confirm the text and Undo action remain usable without overflow.
