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

### Follow-up: visual approval and next slice

- Local checkpoint created: `55f2318` (`feat(web): add Today completion and Undo`). Nothing was pushed.
- The developer approved the notification visual check requested above. This is developer-reported acceptance; reduced-motion and forced-failure checks are not newly verified.
- Subsequent developer edits in `today.tsx` vertically center and space the notice content and emphasize `Task completed` with semibold primary text. These presentation changes remain uncommitted.
- Recommended next deliverable: a working task-details destination for Today. The current `/_postAuth/tasks` route still renders placeholder text. Start with a read-only view of one selected task from the existing mock source, with a return path to Today; editing and creation remain later slices. Completion criteria should include opening the correct task, handling a missing task, and keyboard navigation without triggering completion. This is a recommendation, not an approved new implementation plan.
- No application code was authored by the agent. Only this handoff was updated; existing unrelated and untracked work remains in place.

### Task-details direction: design first

- The developer wants to work through the visual design before implementing task details. The next activity is collaborative design exploration, not building the previously recommended read-only view.
- Ground the surface in the existing HomeOps shell, typography, semantic color tokens, and responsive patterns. Decide the content hierarchy and page/panel layout together before implementation.
- Discovery is open on whether the visual design should cover the fuller intended task experience (instructions, notes, future editing) or only current task data and completion capabilities. No layout or new feature scope has been approved yet.

### Task-details scope clarified

- The developer wants the whole intended task experience planned from a UI/UX perspective before selecting an implementation slice. Current mock capabilities must not determine the final experience's scope.
- Open design decision: full page, centered modal, side panel, or another task-opening pattern; also whether compact surfaces should support editing or send users to a separate page.
- Direction under discussion: one task-details experience with a stable link, presented beside the source list when there is enough room and full-screen at narrower widths, with editing available in the same surface and optional expansion for sustained work. This is a recommendation for discussion, not an approved design.

### Task-details interactive comparison

- The developer prefers a local interactive comparison over long explanations or generated images. Built a standalone design prototype using the brainstorming companion server; no production or test files were changed.
- Local URL: `http://localhost:59754/`. Session directory: `.superpowers/brainstorm/2026-09-20-task-details`; current screens: `content/task-options-v2.html` and `content/task-surface-v2.html`. This existing Git-ignored directory holds the prototypes and copied local fonts.
- Controls compare side panel, full page, and centered modal; desktop and 390px mobile frames; light/dark themes; and editing in place versus opening a full-page editor. Sample tasks include a detailed maintenance task, a simple chore, an errand, and paused work.
- Working prototype interactions include task selection, edit/save/cancel, unsaved-change feedback, completion/Undo, task updates, and a small House Binder reference view. Prototype changes are temporary and do not touch the app's data.
- Browser review verified all three desktop layouts, the light mobile layout, title/assignee saving, cancel/unsaved feedback, edit-on-page navigation, and completion/Undo. The mobile document measured 373px content width in its 373px usable viewport (390px frame including scrollbar/border), with no horizontal overflow. The initial samples were restored and the comparison tab left open.
- No layout has been selected or approved. Next: let the developer explore the comparison and use their feedback to refine the full task experience before choosing an implementation slice.
- The companion server runs via Node with `BRAINSTORM_DIR` set to this session directory, bound to `127.0.0.1`. It can stop after 30 minutes of inactivity; inspect `state/server-info` for the active URL before a later iteration.

### Task-details selection and editing context

- The developer prefers the side panel for viewing because it keeps people on Today. Editing still needs refinement: someone returning after an interruption should immediately identify the task open in the panel and whether edits are pending.
- Updated standalone comparison to `content/task-options-v3.html` and `content/task-surface-v3.html`, at the same local URL. The selected row now has an explicit Viewing/Editing label, a directional marker, and the same restrained accent as the panel header and edge. Editing uses the ochre accent with text labels; viewing uses the selection green.
- The task title stays in a pinned panel header during both viewing and editing. A pending title edit keeps the original identity visible until saved. The editor body scrolls independently, with persistent Save/Cancel controls and a live Unsaved changes indicator. Switching away from a dirty draft names the affected task and offers Keep editing or Discard changes.
- Browser checks confirmed named-task navigation protection, live dirty-state updates, stable identity during a pending rename, updated identity after Save, and restored Viewing state. At mobile width, scrolling the editor preserved the header and footer; measured content width equaled its 388px usable viewport. Reviewed desktop dark and mobile light appearances. Initial samples were restored and the tab left open.
- These context cues are a proposed refinement awaiting developer feedback. No production or test code was changed; application implementation remains deferred until the overall experience is agreed.

### Task-details editing color refinement

- The developer likes the stronger task context but wants editing to use a color that fits the theme better than brown. Updated the comparison to `content/task-options-v4.html` and `content/task-surface-v4.html` at the same local URL.
- Viewing and editing now share the household green accent and selected-row wash. Editing and Unsaved changes labels distinguish the state while the row and pinned panel header retain their visual connection.
- Visually checked the green editing state in the browser and left it open for comparison. This refines the prototype only; the full experience and implementation slice remain under discussion.

### Saved side-panel reference

- The developer approved the shared green selection, pinned task identity, and explicit Editing/Unsaved changes cues. They requested a simple artifact to code from, restricted to the side panel; comparison layouts, theme variants, and a large reference bundle are unnecessary.
- Saved `docs/design/homeops-task-details-reference.html`: one standalone HTML file with embedded fonts, sample tasks, viewing, editing, Save/Cancel, unsaved-navigation feedback, completion/Undo, and the existing narrow-screen adaptation. Open it in a browser; no server or package installation is required. Preview changes stay in memory.
- The file preserves the accepted v4 appearance and removes the layout-comparison controls and full-page expansion link. This is a visual/interaction reference, not production code or a finalized feature scope. The developer continues to author the application.
- Verified script syntax and absence of external asset dependencies. The underlying local preview was previously exercised in the browser; direct local-file browser verification was unavailable because the browser tool blocks file URLs. Removed the incomplete larger bundle created before the developer narrowed the request. No application or test files were modified.

### Pause: resume date-label rework next session

- The developer wants to return to the date-label rework tomorrow. They prefer the reference's compact dates beneath each task title over the application's separate right-hand columns; settle this presentation before implementing the side panel.
- Wording remains unresolved. The developer found combinations such as `Overdue Aug 29` and `In 9 days Sep 29` awkward. Latest suggestion, not yet approved: consistently use `Due`/`Planned`, retain `today` where appropriate, and express missed deadlines as `Due Aug 29 (overdue)`. Example with both dates: `Due Aug 29 (overdue) · Planned Sep 22`. A past planned date alone must not imply an overdue deadline.
- First action next session: inspect the current timing presenter and agree on a small set of date-label examples, including overdue plus planned, due today, planned today, and future dates. The developer will implement the changes; no date-label application changes were authored by the agent.
- Subsequent recommended slice: open/read/switch/close a task in the side panel, with green row selection, pinned identity, keyboard focus handling, and narrow-screen adaptation. Editing and richer task sections follow separately.
- Session checkpoint remains on `main` at `55f2318`; no new commit or push. Existing application edits and other untracked design/generated files remain outside this checkpoint. No new tests were run for this planning discussion.

## Session Start - 2026-09-21

### Baseline and continuity

- Objective: resume the compact date-label rework beneath Today task titles before implementing the accepted side-panel direction.
- Branch: `main`; starting HEAD: `55f23186a363171c84bc7c1bed1e7f242869eec2` (`feat(web): add Today completion and Undo`). No newer commits, fetch, or push.
- Pre-existing tracked changes: the independent landing maximum-width edit, Today date-layout and completion-notice presentation edits, and the September 20 follow-ups in this handoff. Untracked critique output, generated `.tanstack` files, ten design PNGs, and the task-details/paused-row HTML references remain in place.
- Repository evidence confirms that date-layout implementation has begun: separate desktop date headings/columns and `TodayTaskTimingFact` have been removed. The timing presenter still generates the old relative labels; wording remains unresolved.
- The developer accepted the side-panel reference's shared green selection, pinned identity, and Editing/Unsaved changes cues. Task-details implementation follows date presentation; the broader task feature scope is still open.

### Review and verification

- Fresh `npm.cmd run build`: failed with TS6196 for the unused `TimingFact` import at `apps/web/src/routes/_postAuth/today.tsx:3`.
- Fresh `npm.cmd run lint`: failed with one error for that same unused import.
- Fresh `git diff --check`: passed, with existing line-ending conversion warnings.
- Source review: due and planned facts are separate grid children, with the separator also a direct grid child (`today.tsx:310-328`). It will occupy its own grid cell rather than separate the dates inline. Put the facts and conditional separator in one wrapping metadata container beneath the title.
- Source review: removing the Due/Planned column headings leaves relative labels such as Today/Tomorrow without a date type. Preserve explicit Due/Planned wording when settling the new labels. The desktop loading skeleton also retains the old five-column layout and should follow the finished row structure.
- No fresh browser checks or runtime mutation tests were performed. Previously accepted completion/Undo behavior and deferred failure simulations retain their recorded status; those simulations are not prerequisites to this slice.

### First action

- Remove the unused `TimingFact` import, then settle a small wording set before continuing the row: overdue plus planned, due today, planned today, future dates, and a past planned date without a deadline. The previous proposal remains unapproved: `Due Aug 29 (overdue) · Planned Sep 22`, with `Due today`/`Planned today` for the current day. A missed planned date must not imply an overdue deadline.
- The developer retains application and test authorship. Only this tracked handoff was edited by the agent. No files were staged and no commit was created because the checks fail and the date rework is incomplete.

### Follow-up: date presentation checks passing

- The developer implemented complete Due/Planned labels in the presenter, with Yesterday/Today/Tomorrow near the reference date and short calendar dates otherwise. Only past due dates receive the Overdue suffix; past planned dates do not.
- TodayTaskRow joins available labels with a separator and renders the shared date container only when text exists. The standalone timing component, primary-date selection, unused formattedDate field, and stale imports are removed. The loading skeleton now places timing beneath the title.
- Fresh lint, TypeScript/production build, and whitespace checks passed after the final cleanup. The production build emitted a non-blocking plugin timing notice. Browser appearance has not been newly verified. No application or test code was authored by the agent, and no commit was created.
- Recommended next step: briefly inspect the date line at desktop and mobile widths, then implement the first read-only task side-panel slice using `docs/design/homeops-task-details-reference.html`. It should open the selected task, show the matching title and existing details, visibly mark the selected row, switch tasks, and close with appropriate keyboard focus restoration. Narrow screens should use the reference's full-screen adaptation. Completion remains a separate action; editing follows later.
- First implementation step for that slice: decide where the selected task ID lives so the list and panel share one selection. Routing versus local state remains an implementation decision; this recommendation does not finalize it.

## Session End - 2026-09-21

- Branch remains `main` at `55f23186a363171c84bc7c1bed1e7f242869eec2`. Uncommitted user work: Today presenter/types, Today rendering and skeleton/notification styling, and the independent landing width edit. This handoff is modified; critique files, generated `.tanstack` files, ten design PNGs, and two HTML references remain untracked. No commit or push was performed.
- Date-label wording and removal of primary/formattedDate were completed and passed build, lint, and whitespace checks earlier today. Subsequently, the developer found awkward mobile wrapping in the joined string and implemented separate spans: below `md`, facts stack without a dot; at `md` and above they use a horizontal wrapping layout with the dot grouped with Planned. Current source contains this final structure. The earlier passing checks do not cover these latest markup changes; no new checks were run at shutdown.
- Next task: the read-only task-details panel, based on `docs/design/homeops-task-details-reference.html`. Recommended Mantine choice is `AppShell.Aside` in the existing authenticated AppShell for desktop, preserving interaction with Today; use a right-positioned `Drawer` with `size="100%"` on narrow screens. Reuse one TaskDetails content component between the presentations. These are recommendations, not an implemented panel.
- First development action tomorrow: review/verify the final date markup, then decide where the selected task ID lives so Today and the panel share one selection. Implement opening, row selection, switching, closing, and keyboard focus handling before editing. Routing versus local selection remains open.
- Reminder preference clarified: when the developer says they are starting dev, restore this handoff and briefly explain where work stands and the next step. They want session-start continuity, not a scheduled alarm. The mistakenly created 9 AM automation `resume-homeops-task-details` was deleted. Do not create timed development reminders unless explicitly requested.
- The developer retains production/test authorship. The agent only updated this handoff at shutdown; no fresh test run, review cycle, staging, or commit was started.

## Session Start - 2026-09-22

### Baseline and review

- Objective: finish the date-presentation checkpoint and resume the first read-only task-details panel slice from the accepted HTML reference.
- Starting branch: `main`; starting HEAD: `55f23186a363171c84bc7c1bed1e7f242869eec2` (`feat(web): add Today completion and Undo`), six commits ahead of the locally recorded `origin/main`. No fetch or push.
- Pre-existing changes matched the previous handoff: Today presenter/types and row/skeleton/notification presentation, the independent landing maximum-width edit, and this handoff. Untracked critique output, generated `.tanstack` files, ten design PNGs, and two HTML references remain in place.
- Reviewed the complete tracked diff and the relevant Today source. The final date markup stacks facts below `md` and uses wrapping inline facts above it, with the separator attached to Planned. Explicit Due/Planned labels preserve both facts; only past deadlines receive Overdue. No blocking issues found in the reviewed Today changes.
- Fresh `npm.cmd run lint`, `npm.cmd run build`, and `git diff --check` passed. The build emitted a non-blocking plugin timing notice. No fresh browser check was performed; final desktop/mobile appearance remains to be inspected. Previously deferred completion/Undo failure simulations retain their status.
- The September 2 design still describes the former date columns and primary timing. The September 20-21 direction and current implementation supersede that timing presentation; grouping and ordering remain unchanged.

### Checkpoint and first action

- Created local commit `e46eaed545e620243580a5ae6247fcb74b887958` (`feat(web): simplify Today task date labels`) for the three reviewed Today files only. `main` is now seven commits ahead of the locally recorded remote. Nothing was pushed.
- The independent landing edit, this handoff, and untracked reference/generated files remain uncommitted. The agent authored no application or test code.
- First action: briefly inspect the final date layout at desktop and mobile widths, then decide where the selected task ID lives so Today and the task-details panel share one selection. Routing versus local selection remains open.
- Continue from `docs/design/homeops-task-details-reference.html`: open the correct task, mark the selected row, switch tasks, close the panel, restore keyboard focus, and adapt to narrow screens. Editing and richer task sections follow later. The prior Mantine Aside/Drawer suggestion remains a recommendation, not an implemented or finalized architecture.

### Session-start guidance preference clarified

- The developer clarified that "remind me where we're at" means re-provide the useful development guidance from the previous session: concrete steps, component recommendations, their rationale, and the immediate coding action. A brief repository/status recap alone does not meet this request. Lead future session starts with that guidance, with verification/checkpoint details secondary.
- Retrieved the original September 21 guidance from Codex task `01a0c616-dcc7-74a1-9f05-58a2fd98c796` (title: `Start development session`). Read the prior conversation when a summary lacks the detail needed to resume.
- Resurfaced sequence: briefly check the date layout; give the selected task ID one owner above the list and panel; start with selection and opening/closing before filling out content; create shared TaskDetails content; present it in the existing authenticated AppShell's Aside on desktop and a right-positioned full-width Drawer on narrow screens. Desktop should keep Today usable for task switching.
- First-slice behavior: selecting a task opens matching details and highlights its row; selecting another updates the panel; closing restores focus to the task that opened it; narrow screens adapt; completion remains independent. Editing follows after this works. Routing versus local selection remains an open decision.

## Session End - 2026-09-22

### Resume instruction from the developer

- When the developer says they are starting dev tomorrow, re-provide essentially the same detailed event-handling guidance below, including the JSX example and explanation of the checkbox interaction. Lead with this concrete development guidance. A generic "resume task details" reminder or Git/checks recap is insufficient. Do not create a timed reminder.
- This session is Codex task `01a0cb00-0565-7ae3-9933-f0d824135251` (`Start development session`). Read its recent conversation if the exact explanation is needed.

### Current implementation and stopping point

- Branch: `main`; HEAD: `e46eaed545e620243580a5ae6247fcb74b887958` (`feat(web): simplify Today task date labels`), the local checkpoint created at session start. No later commit or push.
- User-written changes: `apps/web/src/routes/_postAuth/route.tsx` and `apps/web/src/routes/_postAuth/today.tsx`; new untracked `apps/web/src/features/tasks/task-details.tsx` and `apps/web/src/features/tasks/task-selection-context.ts`.
- `PostAuthShell` now owns `selectedTaskId: string | null`, initially null. `TaskSelectionContext.Provider` wraps the whole AppShell and provides `selectedTaskId`, `selectTask: setSelectedTaskId`, and `closeTask: () => setSelectedTaskId(null)`.
- Aside configuration: width 420, breakpoint `lg`, `collapsed.desktop: selectedTaskId === null`, `collapsed.mobile: true`. TaskDetails currently renders only a placeholder. The shell uses `layout="alt"`, which makes the Aside full viewport height and reduces header width; this differs from a below-header panel and should be considered during visual refinement.
- The shared Context module exports `TaskSelectionContextValue` and `TaskSelectionContext`; the current default is an object with a null ID and no-op actions. Both shell and Today import the same Context object. Context is analogous to sharing access through Angular DI, while React state is owned by the shell.
- Today reads Context once via `useContext` and now passes `selectedTaskId` and `onSelect={selection.selectTask}` to both task groups. The group forwards `onSelect` and computes each row's `isSelected` from ID equality. Group and row use named props types with destructured parameters, so references such as `task` and `onSelect` remain concise.
- Chosen guidance: Context across the shell/routed-page boundary; props for the nearby group/row relationship. Direct row Context consumption is valid too, but explicit row props provide a clearer boundary. Reading Context only in Today does not by itself prevent child renders; memoization could later skip unchanged row props if task/callback references remain stable. No performance optimization was requested or implemented.
- The task-opening click handler and selected appearance are not yet wired. The title/project area is still a div, the completion checkbox has its existing onChange handler, and the row's isSelected/onSelect props await use. This is the exact next coding step.

### Guidance to re-provide at the next dev start

If you put `onClick` on the `<li>`, clicking the checkbox will also reach that handler through event bubbling. It could complete the task and open its details. See [React's event propagation guide](https://react.dev/learn/responding-to-events#event-propagation).

For the current markup, make the title-and-context area a button, with the checkbox remaining beside it. Keep the `<li>` as the layout container. Illustrative replacement for the title/project area:

```tsx
<button
  type="button"
  onClick={() => onSelect(task.task.referenceTaskId)}
  disabled={isSaving}
  className="text-left flex flex-col gap-1 md:gap-0 min-w-0"
>
  <span className="font-semibold text-(--color-text-primary) wrap-anywhere">
    {task.task.title}
  </span>

  {/* Render the optional project text here as a span. */}
</button>
```

Keep the checkbox's existing `onChange` handler. These are two independent controls:

- Checkbox: completes the task.
- Task content button: opens details, including through keyboard activation.

Because they are siblings, clicking the checkbox does not trigger the button. No `stopPropagation()` is needed for this arrangement. Keep the checkbox outside the button; use spans for the title/project text inside the button.

A clickable parent row can instead stop click propagation from the checkbox area, but also needs appropriate keyboard behavior. A real button handles activation naturally. Add hover and visible focus styling to the task-opening button; use `isSelected` for persistent selection styling. The illustrative snippet establishes behavior and retains existing layout classes; it does not yet supply all visual styling.

The click flow is: button calls the row's `onSelect(taskId)` -> that callback is the Context-provided shell setter -> shell selection changes -> `desktop: selectedTaskId === null` becomes false -> Aside opens. The group also recalculates each row's `isSelected`.

First action: implement this separate task-opening control in TodayTaskRow. Then verify task opening, independent completion, keyboard activation, and selection appearance before expanding the placeholder TaskDetails content. Closing/focus restoration, matching task data, and mobile Drawer remain later parts of the read-only panel slice; editing follows afterward.

### Verification and remaining workspace state

- Session-start build, lint, and whitespace checks passed for the date-label checkpoint. A later TypeScript check during the props refactor failed because both group calls lacked new props, selection was unused, and the row still referenced task after changing its parameter to an undestructured props object. Subsequent user edits added group props and restored destructuring; those later edits have not been rechecked. Do not report the new panel/selection work as passing based on the earlier date-label checks.
- No new tests, build, review cycle, staging, or commit at shutdown. No fresh browser validation of the panel interaction. No application or test code was authored by the agent.
- The independent landing width edit, this handoff, prior untracked critique/generated files, ten design PNGs, and two HTML references remain in place alongside the new task files. This handoff was updated to preserve the session and the requested detailed restart guidance.

### Follow-up: lasting session-continuity preference

- At the developer's request, updated the personal skill `C:/Users/alant/.agents/skills/engineering-steward/SKILL.md` so future development sessions preserve and re-provide the paused explanation, concrete steps, and illustrative code at the requested level of detail. Session endings save self-contained resume guidance; session starts surface it and reconcile it with current work. This preference applies across projects using that skill.
- Confirmed the installed skill matches the reviewed update, with metadata and unrelated instructions preserved. The bundled Python validator could not run because PyYAML is unavailable; reviewed the diff, unchanged metadata, and whitespace instead. No application/test code or Git checkpoint was changed by this follow-up.

## Session Start - 2026-09-23

### Baseline and continuity

- Objective: resume the separate task-opening button in TodayTaskRow, then add selected-row appearance before expanding task details.
- Starting branch: `main`; HEAD: `e46eaed545e620243580a5ae6247fcb74b887958` (`feat(web): simplify Today task date labels`), seven commits ahead of the locally recorded `origin/main`. No fetch or push.
- The repository matches the September 22 stopping point: PostAuthShell owns selection and provides it through Context; Today passes selection/callback props through both groups to rows; the row's title/project area is still a div; TaskDetails remains a placeholder; the desktop Aside is configured and the mobile Drawer is not implemented.
- Pre-existing tracked changes: the independent landing maximum-width edit, shell selection/Aside work, Today selection props, and this handoff. New task files: `apps/web/src/features/tasks/task-details.tsx` and `apps/web/src/features/tasks/task-selection-context.ts`. The existing untracked critique output, three generated `.tanstack/tmp` files, ten design PNGs, and two HTML references remain outside this slice.

### Review and verification

- Reviewed the application diff and the two new task files against the saved guidance. The immediate blocker is unfinished wiring rather than drift from the agreed approach.
- Fresh `npm.cmd run lint` failed with two unused-variable errors: `isSelected` and `onSelect` in `today.tsx` at lines 218-219.
- Fresh `npm.cmd run build` stopped during TypeScript checking with TS6133 for those same two props; Vite bundling did not run.
- `git diff --check` passed, with the existing LF-to-CRLF notices. No browser interaction checks were performed. Previously deferred completion/Undo failure simulations remain deferred.
- No commit was created because the selection work is incomplete and checks fail. No application or test code was changed by the agent.

### Resume guidance and immediate first action

- Re-provide the September 22 event-handling explanation and JSX example: replace the title/project div in `apps/web/src/routes/_postAuth/today.tsx` with a native button calling `onSelect(task.task.referenceTaskId)`, disabled during saving, with spans inside it. Keep the checkbox beside it with its existing completion handler and the li as the layout container.
- A checkbox click bubbles to ancestors, so putting the task-opening handler on the li would also open details when completing a task. Sibling checkbox/button controls avoid that interaction without stopPropagation. Native button activation also supports the keyboard.
- Add hover and visible focus styling to the button, then use `isSelected` for persistent row selection styling. The saved JSX demonstrates behavior/layout, not the complete styling.
- Selection flow: button calls onSelect -> shell state changes through the Context-provided setter -> desktop Aside opens -> group ID comparison updates isSelected. First verify desktop opening, task switching/selection appearance, independent completion, and keyboard activation.
- Then continue matching task content, closing/focus restoration, and a full-width mobile Drawer sharing TaskDetails content. Editing follows later. Preserve the detailed September 22 guidance when resuming again.

### Follow-up: preferred task-row interaction direction

- The developer explored hover/pressed/focus treatments and structural alternatives. The main concern was inconsistent click affordances: an obviously linked project felt disconnected from a title and avatar whose interactivity was unclear. Additional underlines, outlined controls, and directional cues on each separate item did not resolve the desired experience.
- Preferred direction after comparison: the simple task-first row (option A in the latest comparison). Treat the central area between checkbox and assignee as one task-opening button, including title, project context, and dates. Project and date text inside that button are informational, not separate navigation or editing controls.
- Keep completion as a separate sibling checkbox. Keep the assignee informational for the first slice; an avatar action has not been selected. Use one coherent hover/focus treatment for the task button and persistent selection styling when its details are open.
- Potential future enhancement: a kebab menu on the right for quick management such as deleting a task, changing assignee, or opening its project. This is future scope, not a request to implement those operations now. When added, the menu trigger will be a sibling of the task button, with its own accessible name and focus state.
- Next coding action remains developer-authored: assemble the central task content into the native task-opening button and wire onSelect; then use isSelected for selection styling. This supersedes the earlier suggestion to make the project a separate row link. Preserve the existing checkbox handler and event-separation explanation.
- Latest comparison source: `C:/Users/alant/.codex/visualizations/2026/09/23/01a0d03d-2f9a-7022-a8d3-5618d9fef1e7/homeops-task-first-options.html`. This is a design reference, not application implementation. No production/test code was changed during the design exploration.

### Follow-up: row interaction implemented; next step is panel closing

- The developer refined the chosen direction to whole-row hover and a task-opening target extending across the row, including the informational assignee and blank space around the checkbox. This supersedes the central-area-only target above.
- TodayTaskRow now uses a native button with an absolutely positioned, stretched `::after` on a `relative isolate` li. The checkbox remains a sibling, with its wrapper conditionally `relative z-[2]` when completion is available. The saving overlay remains above both at z-10. A future menu would likewise be a separate elevated sibling control.
- The developer wired onSelect, selected/unselected hover backgrounds, and the button's visible keyboard focus outline. A quoted className accidentally contained a literal template expression, so the checkbox wrapper did not receive its positioning/z-index classes; the li also lacked hover classes. Both source issues are now corrected, and the developer reports the interaction is sorted. No agent browser verification was performed.
- Fresh web lint and production build both passed after these changes on September 23. The build emitted a plugin-timing advisory but completed successfully. No application/test code was authored by the agent and no commit was created.
- Immediate next developer action: finish the panel's open/switch/close loop. In `apps/web/src/features/tasks/task-details.tsx`, read `closeTask` through `useContext(TaskSelectionContext)` and connect it to a native `type="button"` Close control. The existing shell callback sets selectedTaskId to null, which closes the Aside and clears the selected-row appearance; no second open-state variable is needed.
- After closing works, resolve the selected ID to task data and show read-only content. TaskDetails still renders a placeholder and declares an unused TodayTaskPresentationModel props type. Decide its data contract before filling it out so shared task details are not unnecessarily coupled to Today-specific presentation data. Focus restoration and the mobile Drawer remain subsequent work; task editing and the kebab menu remain future scope.
- Small markup cleanup remains: use spans for title/project text inside the native button. Preserve the repository-specific examples and explanation when resuming; the old instruction to wire onSelect is now completed.

## Session End - 2026-09-23

- Developer requested continuing tomorrow at the task-data architecture discussion. No scheduled reminder was requested.
- The developer added a Close button in TaskDetails using useContext(TaskSelectionContext).closeTask and confirmed it works. Opening, selection, whole-row hover, independent checkbox interaction, and closing are now reported working. TaskDetails still has placeholder content and an unused TodayTaskPresentationModel props type.
- Latest checks: web lint and production build passed before the Close button addition; the addition was subsequently inspected but not rechecked. No fresh verification, review, commit, or push at shutdown. The agent only updated this handoff; all application changes remain developer-authored.
- Workspace remains on main with the shell/Today changes, independent landing-width edit, handoff, two untracked task component/context files, and previously listed generated/design artifacts. Preserve unrelated files and do not stage indiscriminately.

### Resume guidance: selected task data and shared caching

Lead next session with this architectural explanation and the concrete next step, not the earlier instructions to wire row selection or Close; those are completed. The developer wants to understand the typical/right design before further step-by-step implementation.

- Selection context answers which task is selected. A shared server-data cache owns task data, loading, errors, and freshness. Today-specific grouping and date labels remain in the existing presentation functions.
- Current source flow: `features/today/load-today-tasks.ts` calls fetchIncompleteTasks from `features/tasks/api/mock-task-api.ts`, maps DTOs through mapTaskApiDtoToTaskModel, then converts the models to TodayTaskProjection. Today's route further groups/presents that data. The original TaskModel objects are not currently retained in shared storage accessible to the shell's TaskDetails.
- Initial advice to fetch by ID directly was too quick to assume another request. Reusing already-loaded complete task data is valid. The final recommendation was TanStack Query as a shared cache, given that the shell panel will serve Today, Tasks, Calendar, and projects. This is a recommendation discussed with the developer, not an implemented or formally finalized migration.
- TanStack Router is installed; @tanstack/react-query is not installed and no QueryClient/query setup exists in web source. Router loaders can populate Query's cache, and components can observe it. Retain TaskModel data in that cache; derive Today presentation from it and keep selectedTaskId in the existing selection context.
- Conceptual lookup for shared task models: `tasks.find(task => task.taskId === selectedTaskId)`. Keeping only the ID as selection state avoids a separately stored selected-object snapshot becoming stale.
- If using separate list and detail queries, explicitly seed a detail query from a complete cached list item. Query does not automatically normalize list items into per-ID cache entries. Configure staleTime and preserve the source dataUpdatedAt when seeding so reuse does not falsely imply a new fetch or silently reset freshness. Cached data can render immediately; missing or stale data may require a request. Partial list data must not be treated as complete detail data.
- Completing/editing tasks must update or invalidate the relevant list/detail query entries. A cache library provides mechanisms, but application code defines which entries a mutation affects. The current completion flow uses router invalidation; account for that when integrating the cache.
- Immediate first action on resume: explain this responsibility split again, then guide a small developer-authored integration establishing a shared QueryClient/provider before moving existing task loading into a reusable query. Keep scope to task data; retain the mock API, mapper, presentation functions, selection context, and existing router. Do not install dependencies or author application code on the developer's behalf under this mentoring workflow.
- Next content work after data access: render the selected TaskModel in TaskDetails, with appropriate loading/error/missing states. Focus restoration and mobile Drawer remain later work. Future kebab actions/editing remain outside this slice.
- Sources used in the discussion: https://tanstack.com/router/latest/docs/guide/external-data-loading and https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data . Re-provide the explanation at the same useful depth, with small illustrative snippets as needed, while letting the developer write the code.

## Session Start - 2026-09-24

### Baseline and verification

- Objective: resume the shared task-data architecture discussion and begin the developer-authored QueryClient/provider integration. Opening, selection, and Close are already wired; do not repeat those implementation steps.
- Branch main; starting HEAD e46eaed545e620243580a5ae6247fcb74b887958 (feat(web): simplify Today task date labels), seven commits ahead of the cached origin/main reference. No fetch or push.
- Pre-existing changes: shell selection/Aside, Today row interaction, two untracked task component/context files, this tracked handoff, and the independent landing max-width edit. Existing critique output, generated .tanstack files, ten PNG references, and two HTML references remain outside the active slice.
- Source matches the September 23 shutdown guidance. TaskDetails has a working Close callback and placeholder body; Query is not installed/configured. The newest continuity record is here, rather than the older September 18 ignored local handoff.
- Fresh lint, TypeScript/production build, and git diff --check passed. Build emitted a non-blocking plugin timing advisory. The first check process lost its retrievable session, so lint/build were rerun to obtain confirmed results. No fresh browser acceptance or failure simulations.
- Reviewed tracked application changes and both new task files. Existing cleanup remains: title/project divs inside the task button should be phrasing elements such as spans. TaskDetailsProps still declares an unused Today-specific contract. Matching data, focus restoration, and mobile presentation remain unfinished. No commit created for this incomplete panel slice; no production/test code or dependencies changed by the agent.

### Guidance restored and next developer action

- Selection Context owns selectedTaskId/selectTask/closeTask. Query should own reusable TaskModel data and request state. Today grouping and labels stay in presentation functions. The cache recommendation supports the shared shell panel across future task views and is not yet implemented.
- Current loadTodayTasks fetches DTOs, maps to TaskModel, and immediately projects to Today data. Retain the reusable model layer in a task query so both Today and TaskDetails can observe it. Keep selection as an ID and derive the selected model; do not store a second selected-object snapshot.
- Immediate first coding step: install @tanstack/react-query in apps/web, create one stable QueryClient for this SPA, and put QueryClientProvider above RouterProvider in main.tsx. A module-level client is a suitable illustrative starting point for this client-rendered app. The developer authors the integration.
- Next: make that same client available to router loaders through typed router context; extract reusable task query options around the existing mock fetch/mapper; have the loader ensure data and components subscribe to that query. Preserve Today transformations while deriving them from observed TaskModel data.
- Then resolve selectedTaskId to a TaskModel in TaskDetails and render read-only content with loading/error/missing handling. The incomplete-task list is only one subset: absence there does not prove a task was deleted. Account for completed tasks and other entry points before making it the panel's universal data source.
- Query does not automatically normalize list items into detail queries. If separate detail queries are introduced, seed only complete data, preserve source dataUpdatedAt, and choose staleTime deliberately. Completion/Undo must update or invalidate Query data; router invalidation alone is not the complete cache-refresh strategy.
- Official Router external-data-loading and Query quick-start/initial-data documentation were checked for the restored guidance. Existing deferred browser failure checks remain deferred. Next session should preserve this explanation and advance from whatever provider/query setup the developer has completed.

### Follow-up: QueryClient foundation accepted

- Developer installed @tanstack/react-query 5.103.2 and added one module-level QueryClient in main.tsx, with QueryClientProvider wrapping RouterProvider. This completes the first setup slice; task fetching is not migrated yet.
- Reviewed main.tsx, package.json, and the lockfile. No blocking findings. The extra comma/spacing in the Router import is cosmetic and does not affect behavior.
- Fresh lint, TypeScript/production build, and whitespace checks passed. No browser check was performed for this provider-only setup.
- Created local commit 3eec7df (feat(web): set up shared QueryClient provider), containing only those three files. Nothing pushed. Existing panel, landing, handoff, and reference work remains outside that commit. No application code authored by the agent.
- Next small teaching slice: explain that QueryClientProvider makes the client available to React components, while route loaders need the same instance through typed router context. Start with createRootRouteWithContext in routes/__root.tsx, then pass queryClient through createRouter context in main.tsx. Do not create another client. Reusable task query/loading migration follows separately.
- Learning context: developer is new to Query and wants small guided steps with Angular service/DI analogies. Discussed stable app-lifetime client, provider scope, server versus client state, Redux Toolkit/RTK Query, and queryKey/queryFn. Preserve user authorship and explain each new concept before expanding the implementation.

## Session Start - 2026-09-25: recovered after interrupted session

### Baseline and recovered progress

- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f (feat(web): set up shared QueryClient provider). No commit or push created today.
- Compared current source, the tracked September 24 notes, recent commits, and the prior conversation named Fix Loader Query Usage. The older September 18 daily handoff is superseded by this tracked design/development record.
- Completion/Undo and simplified Today date labels are committed. Task selection, selected-row styling, the desktop Aside, and Close are implemented; their previously reported browser acceptance was not repeated today.
- Since the last saved guidance, the developer added typed router context in __root.tsx, supplied the existing QueryClient through createRouter in main.tsx, and created task-queries.ts. Its incompleteTasksQueryOptions fetches DTOs and maps them to reusable TaskModel objects.
- Today now calls queryClient.query(incompleteTasksQueryOptions), but still consumes a loader-produced presentation model. useQuery is imported but not used. TaskDetails still renders placeholder content and has an unused Today-specific props contract.
- Pre-existing tracked changes: load-today-tasks.ts, main.tsx, pre-auth landing, __root.tsx, post-auth shell, today.tsx, and this handoff. Untracked: task-details.tsx, task-queries.ts, task-selection-context.ts, critique output, generated .tanstack content, ten design PNGs, and two HTML references. Preserve unrelated/generated/reference work outside any later application commit.

### Verification and blocker

- Fresh npm.cmd run lint failed on three unused imports: createRootRoute in __root.tsx; loadTodayTasks and useQuery in today.tsx.
- Fresh npm.cmd run build stopped during TypeScript checking on those imports and TS2345 at today.tsx:36: TaskModel[] is incompatible with the callback's TodayTaskProjection[] parameter. No production bundle or browser acceptance was completed.
- Fresh git diff --check passed, with line-ending advisories only. No automated test script is defined in the web package.
- Root cause: replacing loadTodayTasks bypassed its final mapTaskToTodayTaskProjection conversion. Removing the callback annotation alone does not convert the data and leaves groupTasks with the wrong input shape.
- queryClient.query is valid in the installed Query package. Inspected its installed implementation and checked current official documentation; do not replace it with the deprecated ensureQueryData/fetchQuery methods based on older guidance.
- No application, test, dependency, or behavior configuration edits by the agent. Only this continuity record was updated. No commit because the application migration is unfinished and checks fail.

### Resume guidance: immediate correction, then shared subscriptions

First action: in apps/web/src/routes/_postAuth/today.tsx, import mapTaskToTodayTaskProjection from ../../features/today/task-mapper and restore the missing conversion before grouping. Keep the query cache storing TaskModel[], which can serve both Today and task details. Preserve the developer's preferred promise-chaining style:

```ts
return queryClient.query(incompleteTasksQueryOptions)
  .then(tasks => tasks.map(mapTaskToTodayTaskProjection))
  .then(tasks => groupTasks(tasks, referenceDate))
  .then(tasksModel => prepareTodayPresentation(tasksModel, referenceDate));
```

- Let the chain infer intermediate types and remove imports that are no longer used. Remove useQuery for this small checkpoint if its subscription is not being implemented yet. Re-run lint/build before accepting the correction. This is guidance, not applied code.
- Responsibility split: selection Context holds the selected ID; QueryClient holds reusable task data; Today maps/groups/formats that data. In Angular terms, the shared client is comparable to an app-scoped service, while observing the query is comparable to subscribing to service data.
- Next, make Today observe incompleteTasksQueryOptions through useQuery (or an intentionally configured suspense integration), deriving its projection/grouping/presentation from observed TaskModel data and the route reference date. The loader can prepare the same cache. Reading only Route.useLoaderData will not subscribe the page to later Query cache changes. Preserve explicit initial-loading, error, and retry behavior.
- Then connect successful completion and Undo to invalidation or updates of the relevant Query entries. Existing router.invalidate calls alone do not define a robust shared-cache synchronization strategy. With the current default staleTime, loader reruns can fetch again, so do not claim every current mutation necessarily leaves the list stale; the issue is completing the architecture for shared observers and future freshness settings.
- Resolve selectedTaskId to reusable task data in TaskDetails and render read-only content. For the initial open task, a cached list lookup can work. An incomplete-only list is not a universal details source: a completed task disappearing from that list does not prove deletion. Choose explicit behavior for completing the selected task, or add a by-ID data source before retaining completed details.
- Follow with focus restoration, narrow-screen Drawer, and the existing title/project div-to-span cleanup inside the native task button. Editing and future menu actions remain later scope. Existing deferred mutation-failure and reduced-motion checks remain unverified.
- Keep the next teaching step small: explain and restore the missing model-to-projection mapping before moving the transformations into a reactive component. The developer continues to author all production/test code.

## Session Start - 2026-09-26: shared queries and task details

### Baseline and recovered progress

- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f, eight commits ahead of cached origin/main. No fetch, commit, or push.
- Recovered the latest discussion from Review code and plan next steps. The developer paused after implementing retry wiring; the following "All done - what next?" turn failed before receiving guidance.
- Current source supersedes the September 25 resume instructions: Today uses useQuery, converts TaskModel to TodayTaskProjection before grouping/presentation, and handles query pending/error states. Its old route loader is removed. TaskDetails observes the same query and resolves selectedTaskId to display the title. Completion and Undo now invalidate the shared incomplete-task query.
- Pre-existing tracked changes: load-today-tasks.ts, main.tsx, pre-auth landing, __root.tsx, post-auth shell, today.tsx, and this handoff. Untracked: task-details.tsx, task-queries.ts, task-selection-context.ts, critique output, generated .tanstack files, ten design PNGs, and two HTML references. No application or test code authored by the agent.

### Verification and review

- Fresh lint fails with one react-hooks/rules-of-hooks error at today.tsx:27: useRouter is inside the anonymous function inferred as errorComponent. Extract a named PascalCase component and reference it from the route configuration.
- TypeScript/production build passes. Initial sandbox execution failed with spawn EPERM while loading Vite configuration; the approved retry outside the sandbox passed, with only the existing plugin timing advisory.
- Fresh git diff --check passes with line-ending advisories only. No automated test script exists. No fresh browser acceptance or mutation-failure simulation performed.
- Query retry currently passes tasksQuery.refetch directly to the error display, which forwards it to the button. A zero-argument wrapper makes the intent explicit and prevents forwarding the click event as query options; this is cleanup, not the lint blocker.
- Completion/Undo invalidateQueries promises are not returned or awaited. Saving can stop before refreshed data arrives, leaving a short window where a completed row is actionable again. Keep mutation success distinct from refresh failure when addressing this; query invalidation suppresses individual refetch rejections by default in the installed implementation.
- The selected task is looked up only in incomplete tasks. Completing it removes it from that source while selectedTaskId remains set, leaving an empty details body. Explicitly choose close-on-completion or introduce a by-ID source if completed details must remain visible. Absence from an incomplete list is not proof of deletion.
- TaskDetails loading/error/unavailable content, read-only fields beyond title, focus restoration, narrow-screen presentation, unused Today-specific TaskDetailsProps cleanup, and div-to-span cleanup inside the task button remain unfinished. No commit because lint fails and the panel/query slice needs these corrections and acceptance.

### Resume guidance and first action

Today's objective: finish the shared-query migration and make the read-only selected-task panel reliable. Context owns the selected ID; Query owns reusable TaskModel data; Today derives grouping/date presentation. Both Today and TaskDetails now observe the same query. Do not repeat provider setup, selection wiring, or the completed model-to-projection migration.

First developer action in apps/web/src/routes/_postAuth/today.tsx: move the current inline route error body into a named component and register it:

```tsx
// In the route configuration:
errorComponent: TodayRouteErrorComponent,

// Separate component:
function TodayRouteErrorComponent() {
  const router = useRouter();
  return (
    <TodayErrorComponent onRetry={() => { void router.invalidate(); }} />
  );
}
```

Keep TodayErrorComponent's required onRetry prop. In Today's query-error branch, use the explicit callback discussed last session:

```tsx
<TodayErrorComponent onRetry={() => { void tasksQuery.refetch(); }} />
```

These are illustrative snippets only. After the developer makes this small correction, rerun lint, then address the mutation-refresh pending interval and selected-task completion behavior before expanding the details content. Validate selection, Close, completion/Undo, loading, and retry. Continue in small explained steps; the developer authors all production and test code.

### Follow-up: saved Today file rechecked

- The latest saved today.tsx now registers the named TodayRouteErrorComponent. Fresh lint, TypeScript (tsc -b), and whitespace checks pass. Production bundling and browser behavior were not repeated for this follow-up.
- handleUndo now uses async/return await around the mutation chain, but its inner then callback still does not return invalidateQueries. Completion has the same missing return. Awaiting the outer chain cannot wait for an unreturned inner promise.
- Immediate next correction: return queryClient.invalidateQueries(...) from both existing then callbacks. Preserve the distinction between mutation and refresh failures. The explicit refetch callback cleanup and selected-task completion behavior remain as recorded above. No application code authored or commit created.

### Follow-up: selected-task completion behavior resolved

- Developer now returns invalidateQueries from completion and Undo and wraps the query-error refetch callback explicitly.
- Retained one Context action, closeTask(taskId?: string). Without an ID it closes unconditionally; with an ID it clears selection only when the latest selected ID matches. The provider uses a functional state update. Completion calls closeTask(task.task.referenceTaskId) after mutation success; the panel Close button calls closeTask() through a wrapper.
- Discussed responsibility split in depth: the completion handler requests closing the completed task's details; the selection provider owns the conditional state transition and null representation. Do not add a second close action or expose an arbitrary updater to consumers. Keeping TaskDetails mounted within the collapsed Aside is intentional and does not require a conditional mount.
- Fresh lint/TypeScript passed immediately before the final one-token correction from currentId === undefined to taskId === undefined. After that correction, isolated execution of the actual saved updater body passed unconditional close, matching-ID close, preservation of a different current selection, and already-closed cases. Fresh whitespace check passed. This is isolated logic verification, not browser acceptance; no new production bundle was run.
- Next small developer slice: expand the selected task's read-only details beyond its title using TaskModel fields, with appropriate request/error/unavailable handling. Remove the unused TodayTaskPresentationModel props contract from TaskDetails. Focus restoration and mobile presentation remain later steps. Agent authored no application/test code and created no commit.

### Follow-up: developer requested agent-authored presentation markup

- Explicit scope exception: the developer asked the agent to write most/all task-details HTML and Tailwind styling because this is not their learning goal. They retain ownership of new data/action wiring. This does not authorize the agent to implement future application behavior unasked.
- Added task-details-layout.tsx with TaskDetailsLayout and a separate TaskDetailsEditorLayout, sharing a pinned identity header, Close control, independently scrolling body, and editor footer. Read view includes disabled completion/edit actions, placeholder facts, instructions, Binder reference, and update composer. Editor includes disabled inputs/selects/date fields/steps and Save/Cancel. Uses existing semantic colors and Nunito typography.
- TaskDetails retains the developer's Query/Context lookup and existing title/Close wiring, and renders the new layout. Removed unused Today-specific props contract. Aside padding changed to zero so the presentation fills its existing shell. No new fetching, mutations, form state, mode switch, mobile Drawer, or persistence added.
- Neutral static placeholders are deliberate scaffolding, not claims about selected task data. Next learning step is to supply assignee and formatted date values to the presentation component from TaskDetails. Repetition, instructions, Binder, updates, and editing need their own data/behavior later. Add request/error/unavailable handling as that integration proceeds.
- Fresh lint, TypeScript, production build, and whitespace checks passed (lint before the final font-token correction; build after). Live desktop dark browser inspection showed the selected HVAC title and full read-only layout. Editor is type/build checked but not mounted or visually exercised; mobile and light theme not newly checked. Existing shell still hides the Aside on mobile.
- Local Vite preview started at http://127.0.0.1:5173/today and left open with a selected task. Static design reference remains at http://127.0.0.1:59755/homeops-task-details-reference.html. No commit or push.

### Scope correction: one section at a time, inline markup

- Developer found the full presentation plus extracted child components too large a step. Agreed middle ground: agent supplies only header and task-facts JSX/Tailwind inline in the existing TaskDetails component; developer wires values and behavior and decides when to extract components.
- Removed the agent-added task-details-layout.tsx (including editor and section/frame components). TaskDetails now contains the styled Close toolbar, selected title header, and placeholder Assigned to, Project, Planned for, and Due by facts. Existing Query lookup, selection, and Close logic preserved. No new actions or field bindings. Aside retains zero padding so the inline panel fills its shell.
- Fresh lint, TypeScript, and whitespace checks passed. Live desktop dark preview confirmed the simplified header/facts layout. No production bundle, mobile, or light-theme check repeated for this reduction.
- Next developer step: replace only the assignee placeholder with selectedTask.assignee.displayName, then project and nullable dates in subsequent small steps. Keep future presentation help similarly scoped; the previous full-layout implementation is superseded, while the original standalone design reference remains available.

## Session Start - 2026-09-27

### Baseline and independent progress

- Branch main; starting HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f (feat(web): set up shared QueryClient provider). No commit, fetch, or push today.
- Reviewed the tracked application diff, all three untracked task source files, and the latest September 26 continuity notes. Pre-existing changes remain load-today-tasks.ts, main.tsx, landing, root route, authenticated shell, Today, and this handoff; untracked task files, critique output, generated .tanstack content, ten design PNGs, and two HTML references remain in place.
- The developer independently bound assignee, project, planned date, and due date in TaskDetails. Nullable project/dates have dash fallbacks; dates use the existing formatter. The obsolete Today-specific props contract is gone. Do not repeat the previous placeholder-binding instructions.
- Shared query subscriptions, Today projection mapping, explicit retry wrappers, returned query invalidations, and conditional close-on-completion remain in place. Selection Context owns the selected ID, Query owns reusable task models, and Today derives its own presentation.
- New Mark complete and Edit task buttons are enabled but have no handlers. They are unfinished scaffolding and must be disabled or omitted until their behavior exists; completion must eventually respect task capabilities.

### Verification and remaining work

- Fresh npm.cmd run lint, npm.cmd run build (TypeScript and production bundle), and git diff --check passed. The build reported a non-blocking plugin timing advisory. Initial npm invocations hit the PowerShell script policy; using npm.cmd ran the checks successfully without changing policy.
- No fresh browser checks or failure simulations. No automated test script is defined. Passing compilation does not establish panel behavior or responsive acceptance.
- TaskDetails still treats loading, query failure, and a missing selected model as the same optional-chain fallback display. Keep Close available and render truthful state-specific content. A task absent from the incomplete list is unavailable from this view, not necessarily deleted.
- Mobile Drawer, keyboard focus restoration, and the existing div-to-span cleanup within the Today task button remain later work. The Aside is intentionally kept mounted and currently hidden on narrow screens.
- Only this handoff was edited by the agent. No application/test changes or staging. No commit because the read-only panel slice still has unfinished behavior and enabled inert actions.

### Resume guidance: one small state-handling step

Today's objective is to make the existing read-only details dependable before adding actions. First disable or omit the unwired buttons, then add explicit body states in apps/web/src/features/tasks/task-details.tsx while preserving the Close toolbar.

Reason about these cases in order: no selected ID; initial query pending; failed query without usable data (with retry); successful data with no matching task; matching task available. Keep loaded facts visible during background refresh rather than replacing them with loading UI. If a refresh fails while cached task data remains, preserve the facts and show a retryable refresh notice. Use wording such as "This task is no longer available in this view" for a missing match.

The first small developer-authored change can be the no-selection and initial-loading branches after the existing hooks/lookup. An illustrative guard is `if (selectedTaskId === null) return null;`; the query hook must still be called consistently before any early return. Handle the remaining branches in subsequent small steps. Once the selected-task branch is established, its fields can use selectedTask directly; optional chaining is not a substitute for an explicit unavailable state.

Validate switching between the current sample tasks, nullable fields, Close, completion of the selected task, preservation of another task selected while completion is pending, and Undo. Mobile/focus work and editing remain separate follow-ups. Preserve the developer's preference for small explained steps and inline presentation; do not expand into a full editor or component extraction unasked.

### Clarification: the current panel does not need a separate initial load

- The developer correctly challenged the state-handling recommendation above. Today only renders selectable rows after its shared query succeeds; TaskDetails observes that same query and looks up the selected complete TaskModel in memory. The Aside content is already mounted. Selecting a row changes only selectedTaskId and does not initiate a separate detail request.
- For this current entry path, initial loading/fetch failure is handled before selection in Today. Do not make a separate panel loading/error workflow the next required implementation step. The earlier recommendation was too broad for the current scope.
- A later shared-query background refresh can fail while previously loaded data remains usable; that is a shared refresh problem, not a failed in-memory lookup. The normal mock response currently has no network failure. Consider refresh messaging separately when needed, preserving available facts.
- Retain a small no-selection/missing-match guard. A missing match is a data/selection consistency case, not a fetch error. The existing close-on-completion handles the current normal removal path. Revisit initial detail loading if direct task links, restored selection, or a separate detail endpoint are introduced. The cache currently holds incomplete tasks, not every task in the system.

## Session End - 2026-09-27

- Developer is still confused about the benefit of useMutation compared with putting completion logic in a shared module. Explicit request: give a different/better explanation next development session. Resume with teaching, not implementation instructions or a repeat of the same definitions/table. No scheduled reminder requested.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Tracked changes remain load-today-tasks.ts, main.tsx, landing, root route, authenticated shell, Today, and this handoff. Three task source files plus the previously listed critique/generated/design assets remain untracked. No commit or push; no application or test code authored by the agent today.
- Today's startup lint, TypeScript/production build, and whitespace checks passed; no browser acceptance. No fresh verification at shutdown. Repository status was captured, but application contents were not re-reviewed at shutdown.
- Confirmed progress: selected-task read-only field bindings are implemented. Completion logic still lived in TodayTaskRow at the last inspection. The shared hook and notice extraction were discussed, not implemented or accepted as completed work. Panel completion/edit actions were still unwired at that inspection.
- Further correction to earlier advice: returning null with no selection would not show a blank open panel, because the shell already collapses its Aside when selectedTaskId is null. Keeping content mounted is also fine. A selected ID absent from the incomplete-task cache is a future consistency scenario (for example, another user completes it); current completion closes the matching selection before refreshing. Neither guard is a required new workflow for this slice.

### Resume guidance: explain the concrete problem before introducing useMutation

Start with the developer's actual question: "What's the benefit of this over just putting this logic in a central module?" Their central-module idea is valid and is part of the proposed design. Avoid framing this as a choice between centralizing and using a hook. The unresolved distinction is code reuse versus React-visible operation state, and why the library would be worth using instead of an ordinary function or custom useState hook.

Use one concrete walkthrough of the existing code in apps/web/src/routes/_postAuth/today.tsx: user clicks completion; isSaving becomes true so the row shows Saving; completeTask returns a promise; success closes the matching selection, shows the completion/Undo toast, and awaits query invalidation; failure sets completionError; finally clears isSaving. Explain the API operation and its visible progress as separate responsibilities, using the user's names and one stage at a time.

Then show what moving that entire operation into an ordinary shared function achieves and what the caller still needs for React to render pending/error state. A module variable is not a React subscription, but a shared function with caller-managed state is completely valid. A custom hook with useState can provide the same lifecycle; useMutation is an existing implementation of that lifecycle with mutation-cache integration, not magic, mandatory architecture, or automatic synchronization of task lists.

Use very small illustrative before/after snippets, for example:

```tsx
// Existing manual lifecycle, simplified for explanation:
setIsSaving(true);
try { await completeTask(taskId); }
catch { setCompletionError('Could not complete task'); }
finally { setIsSaving(false); }
```

```tsx
// Library-managed lifecycle, illustrative only:
const completion = useMutation({ mutationFn: completeTask });
// A click starts it: completion.mutate(taskId).
// Rendering reads completion.isPending and completion.isError.
```

Do not start with another broad responsibilities table, API vocabulary list, or a quiz about automatic cache updates. The previous explanations used all of those without resolving the user's confusion. Explain one concrete render/update sequence first; an Angular service/observable analogy may help if needed, but do not equate independent hook calls with a singleton service.

Once the benefit is clear, return to the recommendation: a central task-feature useCompleteTask hook, shared TaskCompletedNotice, existing plain API functions, and caller-specific controls/error presentation. The hook can coordinate completion, matching-ID close, notification, and awaited query refresh. Use task ID/title inputs rather than TodayTaskPresentationModel. Put essential success effects in hook-level mutation callbacks so row removal does not discard them. Undo must retain the original completed task identity after the row disappears.

Sharing a custom hook shares logic, not automatically state between separate invocations. Before both the row and panel can initiate completion for the same task, coordinate pending state by task ID using Query's mutation cache (and preserve duplicate-submission guards). Explain that separately after the core concept; do not front-load it tomorrow.

Immediate first action next session: revisit the existing completion handler together and explain the state changes around one click. No code change is required until the developer understands the choice. If proceeding afterward, the smallest extraction previously suggested was moving TodayCompletedNoticeComponent into features/tasks/task-completed-notice.tsx as TaskCompletedNotice, preserving taskTitle/onUndo props and behavior; then migrate Today to the shared completion hook before wiring the panel. These are recommendations, not completed or approved implementation steps. The developer retains all behavior/test authorship and prefers small explained steps.

## Session Start - 2026-09-28

- Objective: resume the requested explanation of useMutation versus an ordinary shared completion module, grounded in TodayTaskRow's current handler. No implementation required before the developer understands the choice.
- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f, eight commits ahead of cached origin/main. Existing tracked changes: load-today-tasks.ts, main.tsx, landing, root route, authenticated shell, Today, and this handoff. Three task source files, critique/generated output, ten design PNGs, and two HTML references remain untracked. No fetch, staging, commit, or push.
- Current source confirms shared TaskModel query, selected details fields, conditional close-on-completion, and returned invalidation promises. TaskDetails also has a no-selection return and capability gating on Mark complete. Completion still lives in TodayTaskRow; no shared completion hook or notice extraction exists. September 18 local handoff is superseded by this document's September 27 notes and later commits.
- Fresh lint and whitespace checks passed. TypeScript passed; initial production bundle hit sandbox subprocess restrictions (spawn EPERM). Authorized build rerun passed with only a plugin timing advisory. No browser acceptance or failure simulation performed.
- Existing unfinished behavior: details Mark complete remains unwired for eligible tasks and Edit task has no handler; disable/omit until implemented. Narrow-screen details and focus restoration remain outstanding. No production/test code edited; only this continuity entry added. No commit because the interaction slice remains unfinished.
- Teaching sequence: trace click -> setIsSaving -> API promise -> success effects and awaited refresh/error -> clear saving. An ordinary shared function can centralize all work, but callers still need reactive pending/error state. A custom useState hook can package that too; useMutation supplies that lifecycle and mutation-cache integration. It does not automatically invalidate task queries or synchronize separate hook instances. Use small illustrative snippets, then let the developer choose the next small step. Preserve September 27's correction: current selection reads already-loaded shared data and does not require a separate details-loading workflow.

## Session End - 2026-09-28

- User reports useMutation and the final hook-order correction are working. They ended the day and asked to hear next steps tomorrow. Resurface this guidance on the next development-session start; no timed notification requested.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f; eight commits ahead of cached origin/main. No commit or push. Existing tracked changes remain load-today-tasks.ts, main.tsx, landing, root route, authenticated shell, Today, and this handoff. New/untracked source includes complete-task.tsx, task-details.tsx, task-queries.ts, task-selection-context.ts, and features/today/today-completed-notice.tsx. Prior critique/generated/design assets remain untracked.
- Developer implemented useCompleteTask with useMutation, task ID/title inputs, matching-ID close, completion notification, and returned query invalidation. handleUndo now lives inside the hook and uses its queryClient, with the original task ID captured by the toast callback. Today and TaskDetails both invoke the shared hook. Toast presentation was extracted, but remains Today-named and located in features/today.
- Developer added a stable-size panel saving button: transparent original label preserves geometry, centered absolute dots inherit currentColor, and aria-busy marks pending. TaskDetails now calls all hooks before its no-selection return. User confirmed the fix; no independent browser acceptance tonight.
- Learning covered: mutation state is read synchronously across renders while the operation progresses asynchronously; custom hooks package React-aware logic; hook calls run during rendering, event handlers later; nested handlers capture dependencies through JavaScript closures, while passing dependencies explicitly is also valid. Angular comparisons (instance fields/DI versus closures/context) helped. React requires consistent hook calls before conditional returns. Continue with small explained steps and developer-authored behavior/test code.
- Verification performed earlier: startup lint/build/whitespace passed before the migration. Intermediate checks reproduced unused Today declarations, JSX parsing in a .ts file, and the invalid useQueryClient call inside handleUndo. These findings guided developer corrections. No fresh lint/build/whitespace checks or browser tests at shutdown; latest migration is not yet verified as a complete slice. Agent changed no production/test code.

### Resume guidance and immediate next steps

Lead with progress: shared mutation, toast/Undo, panel action, stable loading-button geometry, and hook-order correction are implemented; do not restart provider/query setup or repeat the useMutation introduction.

First developer action: clean the obsolete completion code from apps/web/src/routes/_postAuth/today.tsx. The saved file still has the old handleUndo and commented-out completion/notification block; remove those and imports made unused by extraction. Inspect current files before prescribing exact removals, then run lint, TypeScript/build, and whitespace checks. The prior unused-code failures were not freshly retested after the final changes.

Next behavioral slice: coordinate pending state by task ID across the Today row and details panel. Separate calls to useCompleteTask share logic but not their mutation observer state. Currently one control can remain enabled while the other completes the same task. Explain mutation keys and useIsMutating filtering in one small step, preserve a duplicate-submission guard, and verify that completing task A disables both A controls without disabling unrelated task B. A mutation key alone neither shares observer state nor deduplicates requests.

Then add task-details completion-error feedback. The current panel has no completion.isError rendering; preserve task identity so an error from A is not shown as B's error after selection changes. Verify completion and Undo from both entry points, failure/retry, and selecting B while A is pending (A's success must not close B). Refresh failures must be described truthfully as refresh failures after a successful mutation.

Small structural follow-up: move/rename features/today/today-completed-notice.tsx to a task-feature TaskCompletedNotice so complete-task.tsx does not depend on Today-specific presentation. Keep existing taskTitle/onUndo props and behavior.

Remaining separate scope: Edit task is still enabled without behavior; disable/omit until implemented. Narrow-screen details, keyboard focus restoration, and final visual/accessibility acceptance remain later work. Do not broaden into editor implementation unasked. No automatic implementation or commit at shutdown.

## Session Start - 2026-09-29

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Existing tracked application changes, five untracked task/notice source files, design references, critique output, and generated .tanstack files remain in place. No fetch, staging, commit, or push.
- Reconciled source with September 28 guidance: the obsolete Today handleUndo/commented completion block and unused imports are already removed. Skip that cleanup. Shared completion hook, returned query invalidation, captured Undo identity, matching-ID close, panel loading button, and correct hook order are implemented.
- Fresh lint, TypeScript/production build, and tracked whitespace checks passed. Build reports only a plugin timing advisory. No automated test script is defined; no browser acceptance or failure simulation performed today.
- Static review: row and panel still rely on separate completion.isPending values; pending state is not coordinated by task ID. Panel has no completion error feedback. Edit task is enabled without a handler. No commit because these interaction gaps remain; no application/test code edited.
- Today's objective: coordinate completion pending state for the same task across row and panel. First small developer action: add a mutationKey such as ['tasks', 'complete'] to useCompleteTask's useMutation options. This labels the operation; it does not share observer state or deduplicate requests.
- Next, subscribe with useIsMutating filtered to that key and the mutation variables' taskId, so both controls observe a pending completion for their displayed task. Preserve submission guards, including checking current cache state at submission if preventing requests before a rerender. Verify task A disables both A controls while unrelated B remains available. All hooks must stay before conditional returns.
- Then add panel completion-error feedback scoped to the submitted task identity, disable/omit Edit task until implemented, and verify completion/Undo, failure/retry, and selecting B while A completes. Preserve truthful refresh-failure handling. Renaming/moving the Today-named notice into the task feature and mobile/focus acceptance remain follow-ups.
- Continue small explained steps with developer-authored behavior/test code. Today's continuity entry is the only agent-authored repository change.

## Session End - 2026-09-29

- Developer paused and wants to resume tomorrow with the What needs doing section and selected-task description. This is session continuity, not a request for a timed notification.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Existing tracked changes remain load-today-tasks.ts, main.tsx, landing, root route, authenticated shell, Today, and this handoff. Five task/notice source files and prior critique/generated/design artifacts remain untracked. No staging, commit, or push.
- Developer added completion mutationKey and useIsCompletingTask, filtering pending completions by key and submitted task ID. Both row and panel use the shared pending state. Developer corrected a predicate returning boolean or empty string, moved hooks before the panel's early return, and replaced the panel's local pending eligibility check.
- Developer added inline panel completion-error feedback below the actions with role=alert, gated by completion.isError and completion.variables.taskId matching selectedTaskId. User reports successful manual validation of shared pending behavior and task-specific failure/retry handling, including changing selection. These final interactions were not independently browser-tested by the agent.
- Learning: mutation keys label operation types; useIsMutating observes the shared mutation cache and filters executions, analogous to a reactive Angular pipeline. Rerendering preserves hook-managed state in the same mounted component; ordinary local variables are recalculated. Panel mutation state retains the request it initiated even when selection changes, so error display must match submitted and selected IDs.
- Verification: startup lint/build/whitespace passed before today's changes. Later TypeScript reproduced the predicate return-type error, and lint reproduced the conditional hook call; developer subsequently corrected both. No fresh complete verification at shutdown. No application/test code authored by the agent.

### Resume guidance: finish desktop content before mobile

The developer corrected the recommendation to move directly to mobile: the saved docs/design/homeops-task-details-reference.html includes more desktop detail content. Current panel has title/actions, assignee, project, planned and due dates, and completion-error feedback. Reference also includes a paused explanation, Repeats, What needs doing (description plus optional ordered steps), an optional House Binder link, and Updates with a composer. Editing is a later behavioral slice. Do not treat every prototype interaction as required immediately.

Keep Project in the current two-column facts layout. Add Repeats later when recurrence data exists: Assigned to / Project, Planned for / Due by, then Repeats potentially spanning both columns. No project uses a dash; do not invent Does not repeat before recurrence is represented. The mock's generic header context sometimes doubles as a project label and is not a strict four-field contract.

Agreed next slice is What needs doing below the existing facts, wired to the selected task's description. Immediate first developer action: add description: string | null to the task API DTO and shared TaskModel. Then add descriptions to mock fixtures (include a null case), carry the field through the API-to-model mapper, and render the section in TaskDetails. Keep the Today projection unchanged because its row does not need description. Use No instructions added yet. for absent/empty description; account for whitespace-only content. Switch among tasks to confirm correct values and fallback. At shutdown, a targeted source search found no description or What needs doing implementation in the task feature.

Keep this small and explained. Numbered steps, editing, recurrence, Binder links, Updates, and mobile Drawer/focus work follow separately. Paused explanation already has model fields and remains a useful follow-up; Edit task is still unwired. The developer retains behavior/test authorship. Previous preference permits narrowly scoped presentation assistance, not an unsolicited full panel/editor implementation.

## Session Start - 2026-09-30

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Seven tracked modified files and five untracked task/notice source files remain, along with prior design references/assets, critique output, and generated .tanstack content. No staging, commit, or push.
- Reviewed current source against September 29 continuity: shared per-task completion pending state and task-identity-scoped panel error feedback are implemented, with hooks before the early return. Description is absent from TaskApiDto, TaskModel, mapper, mock fixtures, and panel. Resume the agreed desktop content slice; do not repeat mutation setup.
- Fresh lint and tracked whitespace checks passed. TypeScript passed; the sandbox production build failed on subprocess permissions, then the authorized full build rerun passed with a plugin timing advisory. No automated test script is defined. No fresh browser or failure-path acceptance performed; yesterday's manual validation remains developer-reported.
- Edit task remains enabled with no handler; disable or omit before committing this interaction slice. Mobile details/focus and refresh-failure behavior remain follow-ups. No application or test code authored by the agent; only this handoff appended.
- Immediate first developer action: add description: string | null after title in features/tasks/api/types.ts and features/tasks/types.ts. Then populate mock-task-api.ts (including null), carry dto.description through task-api-mapper.ts, and render What needs doing below the facts in task-details.tsx. Today projection needs no description field.
- Use selectedTask?.description?.trim() || 'No instructions added yet.' as a small illustrative display expression once the field exists. Verify switching tasks and null, empty, and whitespace-only values. Keep Project in the facts layout; defer steps, recurrence, Binder, Updates, editing, and mobile work. Continue in small developer-authored steps.

## Session End - 2026-09-30

- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. No staging, commit, or push. Prior application/design/critique/generated changes remain. Today's additional tracked changes are apps/web/package.json, package-lock.json, task API types, shared task types, task-api-mapper.ts, and mock-task-api.ts. Agent edited only this handoff.
- Product decision supersedes the plain description plan above: keep one What needs doing section containing freeform paragraphs and optional numbered/bullet lists. Do not ask household users to distinguish description, instructions, and steps as separate fields. Separate checkable steps would be a later feature with independent behavior.
- Chosen representation: instructions: JSONContent | null, using Tiptap's document structure as an object in both TaskApiDto and TaskModel. Serialize the whole API payload at the transport boundary; do not stringify instructions separately. Database storage remains undecided. TypeScript types do not validate incoming documents at runtime.
- Developer installed @mantine/tiptap (confirmed installed 9.5.1) and Tiptap core/react/pm/starter-kit/extension-link (package manifest now ^3.31.4). Added JSONContent type imports and instructions fields in both task types; mapper passes dto.instructions through. Mock HVAC task has an introductory paragraph, and shutdown search confirms orderedList/listItem nodes were added too. Other three tasks have null instructions. The final list structure was not fully reviewed or tested at shutdown.
- Clarified shared data flow: API DTO -> TaskModel in shared incomplete-task query -> Today projection for rows, while TaskDetails selects the full TaskModel. Instructions belong in the shared model, not TodayTaskProjection.
- Verification already performed: startup lint/build/whitespace passed before today's dependency/data changes (build required authorized rerun outside sandbox). Later npx.cmd tsc -b passed after the paragraph/null fixtures and type/mapper edits, before the final numbered-list addition. No fresh checks or browser acceptance at shutdown.

### Resume guidance: meaningful steps, then wire the editor

The developer explicitly corrected the teaching pace: "hold my hand" means clear explanations and coherent implementation chunks, not a Done confirmation after each field or mock-data fragment. The agent acknowledged that types, mapper, and complete example document should have been one chunk. Group related changes, explain unfamiliar parts, and pause at useful checkpoints. Preserve developer authorship of behavior and tests; do not automatically apply code.

Lead next session with the data foundation already implemented and move to Mantine/Tiptap integration. Do not repeat package installation, individual field additions, or make adding the list another checkpoint: shutdown evidence shows it exists. Review/verify the saved changes proportionately at startup.

Immediate next coding chunk: guide the developer through connecting the selected instructions document to the panel using the installed Mantine RichTextEditor and Tiptap useEditor/StarterKit, including the styles import after Mantine core styles. Explain the editor instance as the owner of the editable document and getJSON() as its structured output. Keep the toolbar limited to useful basic formatting (bold, bullets, numbered list, undo/redo). User's last implementation direction was that they wanted to be wiring the text editor already; do not postpone that behind more isolated fixture edits.

Handle React lifecycle as part of that coherent chunk: all hooks before conditional returns, correct document when switching selected tasks, null/empty document handling, and no carryover of task A content into task B. Distinguish read-only panel display from edit mode and persistence: neither is implemented yet, and the existing Edit task action is still unwired. Do not imply that mounting an editable editor saves changes. Scope editing/save behavior explicitly as needed without reopening settled decisions about one field or JSON storage. Consult installed-version APIs/current official docs when teaching exact editor options.

Acceptance for the next slice should include paragraph plus numbered list rendering and switching between the populated HVAC task and null-instruction tasks. Use editor-aware emptiness checks when needed; the earlier string trim fallback no longer applies to JSONContent. Recurrence, Binder, Updates, mobile/focus, and broader editor features remain separate follow-ups.

## Session Start - 2026-10-02

- Developer is starting their dev day after independent work and is midway through the edit version of task details. Reviewed saved source and reconciled it with September 30 guidance. Preserve developer authorship and use coherent, explained implementation chunks.
- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f (feat(web): set up shared QueryClient provider). Pre-existing tracked edits: package manifest/lock, task DTO/model/mapper/mock, Today loader, main, landing/root/authenticated/Today routes, and this handoff. Five task/notice source files remain untracked, alongside prior critique, generated .tanstack content, ten design PNGs and two HTML references. Do not sweep those into a commit.
- Independent progress: instructions: JSONContent | null flows through DTO -> TaskModel -> shared query. HVAC fixture includes a paragraph and numbered list; other fixtures use null. @tiptap/static-renderer is installed and both task-detail variants render instructions with StarterKit. TaskDetails now owns mode switching and delegates to ViewTaskDetailsComponent / EditTaskDetailsComponent in the same file. Edit task enters the edit variant; the latter still contains read-only facts and static instructions, without editor, Save, or Cancel controls. This is acknowledged work in progress, not completed editing/persistence.
- Existing shared completion pending state, returned query invalidation, Undo, and conditional matching-ID close remain implemented. Do not repeat their setup or the old plain-description plan.

### Review findings and verification

- Close regression: both variants receive onClose={closeTask} and forward it directly to a button. React supplies a click event; closeTask treats that argument as an optional task ID, so it neither sees undefined nor matches the selected string ID. Adapt at the parent with onClose={() => closeTask()} for both variants.
- Completion error regression: completionFailure now receives only completion.isError. The parent mutation observer persists across selection changes, so a failed completion for A can appear on B. Restore submitted-ID matching: completion.isError && completion.variables?.taskId === selectedTaskId.
- Fresh lint fails with seven errors: unused UseMutationResult and TaskApiDto imports, unused completable/isCompleting/onSave/onView editor bindings, and synchronous setIsEditing(false) inside useEffect. Fresh build fails at TypeScript with the six unused-symbol errors; production bundling does not run. Tracked git diff --check passes with line-ending advisories. No test script is defined and no fresh browser/failure-path acceptance was performed.
- Editor wiring trap: onSave currently points at handleCompleteTask. It is unused today, so Save does not yet complete tasks, but it must become a distinct edit-save operation before any Save control calls it. Completion eligibility is not edit-save eligibility.
- No code corrections, staging, commit, or push by the agent. Only this continuity entry was appended. Current failures and unfinished editor make this unsuitable for an automatic reviewed commit.

### Resume guidance: stabilize the split, then connect the editor

Today's objective: continue the developer's task-details editor, preserving the existing read view. Immediate first coding chunk is to repair the two callback/error regressions above and clean up unused imports/editor-only completion props. Resolve edit-mode reset intentionally rather than suppressing lint: a selected-task-keyed child containing mode/editor state can start fresh when task identity changes; ensure closing/reopening also resets by unmounting it when selection is null. The Context/shared-query parent can retain selection and data lookup. Do not refactor automatically.

Then replace the static instructions renderer only in EditTaskDetailsComponent with the Mantine/Tiptap editing surface. Keep static rendering in ViewTaskDetailsComponent. The editor owns a draft document; getJSON() produces instructions data for a separate save operation. Cancel returns to view and discards the draft. Use basic formatting, bullets, numbered lists, undo/redo; import the installed editor styles and verify installed APIs when giving exact implementation guidance. Do not add installation or fixture checkpoints: those foundations already exist.

Keep selected-task identity and editor lifetime connected so switching tasks never carries A's draft into B. Decide the save operation/cache update as its own coherent behavior chunk; mounting an editor does not persist changes. Verify paragraph/list display, populated/null tasks, edit/cancel/reopen, task switching, both Close buttons, and task-specific completion errors. Mobile Aside/focus, recurrence, Binder, Updates, and notice renaming remain separate follow-ups.

### Follow-up: rough edit presentation requested and supplied

- Developer explicitly requested HTML/Tailwind presentation help for the edit variant, matching the earlier view-markup exception. Updated only EditTaskDetailsComponent's presentation and used its existing onView callback for Cancel. View markup and mutation/data behavior remain developer-owned.
- Added labeled disabled task-name, assignee/project, and date controls initialized from the selected model; an always-visible instructions preview with disabled formatting toolbar; and a fixed Cancel/disabled Save footer. The toolbar is static scaffolding, not a mounted Tiptap editor. Save remains unwired. Unused editor props are no longer destructured; existing prop contract remains available for developer cleanup/wiring.
- Developer's keyed SelectedTaskDetails wrapper and effect removal are saved. Fresh lint, TypeScript/production build, and whitespace checks pass. Live desktop dark preview verified populated paragraph/list content, null instructions, Cancel returning to view, and selection changes resetting edit mode. No mobile/light-theme acceptance.
- Local Vite preview is running at http://127.0.0.1:5173/today; in-app browser is left showing the HVAC task's edit scaffold. Screenshot saved in the current visualization output directory as task-edit-preview.png. No commit or push.
- Next developer chunk: replace only the instructions preview/toolbar with Mantine RichTextEditor and local Tiptap draft, keeping Cancel and task-key reset semantics. Connect persistence separately, then enable appropriate controls. No new packages needed.

## Session Start - 2026-10-03

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Existing tracked application/dependency edits and five untracked task/notice source files remain, together with prior design assets/references, critique output and generated .tanstack content. No staging, commit, or push; editor work remains incomplete and the broader untracked scope is mixed.
- Reconciled current source with October 2 follow-up: keyed SelectedTaskDetails, wrapped Close callbacks, submitted-task-scoped completion error, working edit/view mode and Cancel are saved. Save now receives a no-op rather than completion. The edit presentation has disabled task fields and Save, plus a static instructions preview/toolbar. Actual RichTextEditor/useEditor integration and persistence are still absent. Skip yesterday's completed corrections.
- Fresh lint and tracked whitespace checks passed. TypeScript passed; sandbox bundling failed with spawn EPERM. Authorized production build rerun passed with only a plugin timing advisory. No browser acceptance or failure simulations repeated; no automated test script is defined.
- Today's coherent developer-authored chunk: in EditTaskDetailsComponent, create a local Tiptap editor with StarterKit and selectedTask.instructions (empty document for null); replace the static preview/toolbar with Mantine RichTextEditor, basic formatting, bullet/ordered lists and undo/redo. Add @mantine/tiptap/styles.css after core styles in main.tsx. Keep read-view static rendering. Installed type declarations and official Mantine guidance were consulted.
- Editor instance owns draft state. getJSON() supplies structured instructions to a future distinct save operation; editor mounting alone does not persist data. Existing keyed task wrapper resets lifetime across task changes, and Cancel unmounts the edit component, discarding its local draft. Avoid resetting content on every query refresh. Leave Save disabled until an update operation exists.
- Acceptance: populated paragraph/numbered list, null instructions, typing/formatting, Cancel then reopen restoring original content, and switching tasks without draft carryover. Other fields, persistence/cache refresh, recurrence, Binder, Updates and mobile/focus remain subsequent chunks. Agent changed only this handoff, preserving developer code authorship.

## Session End - 2026-10-03

- Developer paused until tomorrow at validation/save design. Resume with concrete explanations and coherent implementation chunks; they are new to React forms and Tiptap. Preserve their authorship of production and test code. No scheduled reminder requested.
- Baseline remains main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Existing application/dependency/design changes and untracked task/notice source, critique/generated output, PNGs and HTML references remain. Today's source changes include task-details.tsx, main.tsx, index.css and task API types. No staging, commit or push. Agent changed only this handoff.
- Developer wired Mantine RichTextEditor/useEditor/StarterKit with selected instructions, basic formatting, lists and undo/redo. Tiptap stylesheet is imported. Explained transactions versus React rerenders and shouldRerenderOnTransaction; true requests rerenders of the hook owner, false can pair with targeted useEditorState subscriptions. Editor owns draft document; mounting or typing does not save it.
- Diagnosed missing numbered markers in live localhost editor: valid ol/li, computed list-style-type none, li display list-item. Browser generates markers; no separate number DOM elements are needed. Disabling Tailwind Preflight per general Mantine guidance caused broad visual regressions in this existing UI. Developer restored full Tailwind import and added shared .rich-text ol/ul marker rules, applying rich-text to editor content. Keep Preflight. Do not repeat the global-disable recommendation. Developer reports restored appearance.
- Title now uses controlled value/onChange without defaultValue. Both dates use native type=date with existing YYYY-MM-DD strings and empty-string drafts; missing due-date type was fixed. Assignee/project state now holds IDs, with independent temporary memberOptions/projectOptions arrays outside the component, mapped options and No project empty option. Current fixtures use member-alex/member-jordan and project-update-kitchen-lighting/project-finish-home-office. Later lookup APIs should be household-scoped; do not derive available choices solely from incomplete tasks.
- Verification during session: startup lint, TypeScript/build and whitespace passed (build required authorized rerun after sandbox spawn EPERM). Later lint, TypeScript and whitespace passed after dropdown wiring. Latest submit scaffolding was added afterward and has not been checked. No fresh verification at shutdown; no broad browser acceptance of final form.

### Resume guidance: validation and save responsibilities

Developer's last question: should a validation function in task-details call onSave if validation passes? Explained yes, with separate responsibilities. EditTaskDetailsComponent owns draft fields and field-error display. Its handleSubmit coordinates validation, errors and building UpdateTaskInput, then calls an onSave callback. SelectedTaskDetails can own the update mutation and successful return to view because it already owns edit mode. updateTask belongs in the API module, wrapped by a mutation hook for pending/errors/query refresh. onSave is an application callback prop, not a built-in API operation. On failure retain editor/draft and display a save error. API-side validation will also be needed.

Current saved source at shutdown has progressed beyond the discussion: UpdateTaskInput exists in features/tasks/api/types.ts with taskId/title/assigneeId, nullable projectId/scheduledDate/dueDate, and JSONContent|null instructions. Do not ask them to add it again. Save is now enabled with onClick={handleSubmit}. Module-level handleSubmit calls a placeholder validateDraft() and logs Submit to API or Show errors; validateDraft returns false. There is no actual validation or persistence. Parent onSave remains a no-op and prop type remains () => void. This is unfinished scaffolding, not a functional save. The stale comment says Save stays disabled even though it is enabled.

Immediate next coherent chunk: explain that module-level handleSubmit currently cannot read component-local title/date/ID/editor values. Put the coordinating handler inside EditTaskDetailsComponent (or explicitly pass draft values), while a pure validateDraft(draft) helper can stay outside the component in the same file. Define a TaskDraft and field-keyed TaskFormErrors, return errors from validation, store/display them in component state, stop submission when errors exist. Start with trimmed nonblank title, valid assignee choice, optional valid project choice and valid nonempty calendar dates. Do not invent a scheduled-before-due rule; overdue work can legitimately be scheduled later. Handle date validation failures as field feedback rather than uncaught parseCalendarDate errors. Instructions are optional.

Illustrative orchestration: const errors = validateDraft(draft); setErrors(errors); if (hasErrors(errors)) return; const input = buildUpdateInput(draft, editor); await onSave(input). This is pseudocode, not implemented helpers. Build request using trimmed title, IDs, empty project/date strings mapped to null, and editor.isEmpty ? null : editor.getJSON(), after confirming task/editor exist. Change callback contract to onSave: (input: UpdateTaskInput) => Promise<void> when wiring asynchronous save. Decide who handles rejected promises so no unhandled rejection and no premature transition to view. Later connect a distinct mock update operation, mutation state, cache refresh and success transition; do not reuse completion. Consider native form onSubmit semantics while wiring; retain explicit button types for Cancel and formatting controls. Prevent duplicate submissions and ensure an older save cannot reset another selected task's edit mode.

Continue with teaching at this exact point, not repeating initial editor/date/dropdown setup. Saving, validation feedback and actual member/project lookup APIs remain incomplete; mobile/focus, recurrence, Binder and Updates remain later work.

## Session Start - 2026-10-04

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f, eight commits ahead of cached origin/main. Existing 14 tracked modified files and untracked task/notice source, critique/generated content and design references remain. No fetch, staging, commit or push. Agent changed only this handoff.
- Reconciled October 3 resume guidance with source: editor, controlled title/dates/ID dropdowns, rich-text list marker rules and UpdateTaskInput are present. Save invokes module-level handleSubmit; validateDraft always returns false; parent onSave is still a no-op with a no-argument contract. No actual save or validation is implemented. Skip completed editor/data setup.
- Fresh lint and tracked whitespace checks passed. TypeScript passed; sandbox Vite build failed with spawn EPERM and related dependency-loading errors. Authorized build rerun passed, with plugin timing and >500 kB chunk advisories. No test script is defined; no browser acceptance or failure simulation performed. No commit because validation/save remains unfinished and the broader file scope is mixed.
- Today's objective: implement field validation and submission coordination as a coherent developer-authored chunk, then wire persistence separately. Move handleSubmit inside EditTaskDetailsComponent so it can read current draft/editor state. A pure validateDraft(draft) helper can remain at module scope. Add TaskDraft, field-keyed TaskFormErrors, errors state and associated field feedback. Require trimmed nonblank title, valid assignee and optional project choices, and valid nonempty calendar dates; catch parse failures for field feedback. Instructions are optional. Do not add a scheduled-before-due restriction.
- Submit flow: validate draft, set errors, stop on errors, guard selected task/editor availability, build UpdateTaskInput, call typed onSave. Normalize blank optional IDs/dates to null, trim title, and use editor.isEmpty ? null : editor.getJSON(). Existing UpdateTaskInput need not be recreated. This is guidance, not implemented helpers.
- Subsequent save chunk: onSave: (input: UpdateTaskInput) => Promise<void>, distinct mock update API and mutation, pending guard/error display, cache refresh and success-only transition to view. Retain draft on failure and handle rejected promises. Keep selected-task identity safe across asynchronous operations. Current enabled Save and stale disabled-save comment are unfinished scaffolding. Preserve Cancel/task-key reset behavior, full Tailwind import and local list-marker fix.
- First action next time: continue inside EditTaskDetailsComponent with draft/error types and validation orchestration; do not restart editor installation or control wiring. Acceptance should cover blank/whitespace title, optional fields, invalid choices/dates, correction clearing errors and no callback on invalid draft, followed by save/failure/retry behavior once persistence exists.

## Session End - 2026-10-04

- Developer stopped at tutorial step 4 (registering controls and adding error messages). Explicit request: resume tomorrow with the same amount of explanatory detail as today. Explain why each piece exists, not just what to type; use coherent implementation chunks, Angular comparisons and small examples. Preserve developer authorship. No scheduled notification requested.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f; eight commits ahead of cached origin/main. Existing 14 tracked modified files and prior untracked application/design/critique/generated files remain. New untracked task-form-schema.ts. No staging, commit or push; agent edited only this handoff. No shutdown lint/build/browser checks.
- Decision supersedes the manual-validation startup plan: use React Hook Form + Zod + @hookform/resolvers, consistent with the master plan and enterprise React learning objective. Mantine supplies presentation; TanStack Query will own API mutation/cache refresh. These are independent libraries, not React built-ins. Avoid returning to manual errors state or Mantine Form recommendations.
- Package manifest now records exact react-hook-form 7.89.0, zod 4.4.3, @hookform/resolvers 5.9.1. Initial unversioned npm command failed on an optional resolver -> @typeschema/main -> @typeschema/zod peer chain requiring Zod 3. Explicit-version dry runs passed with peer checks enabled and force disabled. This did not downgrade the resolver. Exact npm selection mechanism was NOT established; do not invent a root-cause explanation or claim all packages require Zod 4+. User correctly challenged overconfident explanations. Actual post-install lint/build not verified this session.
- Saved source: task-form-schema.ts exports createTaskFormSchema(memberIds, projectIds) and TaskFormValues via z.infer<ReturnType<typeof createTaskFormSchema>>. Rules: trimmed nonblank title, valid member ID, empty or valid project ID, and empty-string or z.iso.date() dates. The schema is .ts because it has no JSX; runtime lookup IDs are supplied by the component, avoiding a schema import from UI.
- EditTaskDetailsComponent imports useForm/zodResolver/schema factory, creates schema from mapped option IDs, and configures resolver/defaultValues/mode onSubmit/reValidateMode onChange. Inspection at shutdown still shows the five old useState declarations and value/onChange bindings, no register calls on inputs and no field-error JSX. Treat this as the user's step-4 work in progress; recheck before prescribing removals. Old module-level handleSubmit/validateDraft placeholders remain. Save onClick currently references the locally destructured RHF handleSubmit without a valid-submit callback. Outer edit element remains section; persistence remains absent. Do not treat this scaffolding as working submission.

### Resume guidance: step 4, with explanations

Start with: you have installed the libraries, extracted the schema, and created the form manager; today we connect controls and display their errors. Do not restart setup. Explain RHF tracks values/events/errors, Zod validates runtime values (TypeScript disappears at runtime), and zodResolver translates Zod results to RHF field errors. useForm<TaskFormValues> gives typed field names; defaultValues initializes a draft, rather than syncing every refresh. Existing selected-task key resets component/form lifetime. Destructuring formState: { errors } extracts a nested property, not a separate formState binding.

First coherent developer chunk: replace title value/onChange with {...register('title')}, preserving id, type, label and className. register returns name/ref/onChange/onBlur so RHF can track the actual input. Add aria-invalid={Boolean(errors.title)} and aria-describedby={errors.title ? 'edit-task-title-error' : undefined}. Immediately below, conditionally render the field message:

```tsx
{errors.title && (
  <p id="edit-task-title-error" role="alert"
     className="mt-1 text-sm text-(--color-status-danger)">
    {errors.title.message}
  </p>
)}
```

Explain errors.title is a field error object and .message is the schema's message. No setErrors is needed: RHF maintains errors. aria-invalid communicates invalid state; aria-describedby connects the input to its explanation; role=alert announces the newly displayed message. Apply corresponding registration/error markup with unique IDs to assigneeId, projectId, scheduledDate, dueDate. Keep date input types and select options. Remove obsolete five field useState declarations once replaced; keep useState import for parent's edit-mode state.

Then tutorial step 5: remove old module-level placeholder functions. Define onValidSubmit(values: TaskFormValues) inside edit component (temporary console inspection only). Change edit outer section to form with noValidate and onSubmit={handleSubmit(onValidSubmit)}, retaining classes/aria label and matching closing tag. Save becomes type=submit without onClick; Close/Cancel/formatting controls must not submit. Explain handleSubmit is a higher-order function that creates the event handler, checks the schema, populates errors and only invokes onValidSubmit for valid values. noValidate suppresses competing browser validation popups. mode onSubmit defers initial checks until submit; reValidateMode onChange rechecks errored fields after submission.

Acceptance checkpoint: blank/whitespace title -> message and no valid-submit callback; correction -> error clears; valid submit -> all five values logged; optional empty project/dates allowed; populated/null tasks and Cancel/reopen preserve expected defaults. Review current source and run proportionate checks at next startup, not at shutdown. This only validates native fields: Tiptap still owns instructions separately, and nothing saves yet. Next coherent chunks are editor/form integration (including dirty tracking as needed), request normalization, distinct update API/mutation, pending/error recovery and success-only view transition. Preserve draft on failure and task identity across async operations. Do not repeat the full Tailwind Preflight removal suggestion; existing local rich-text marker rules remain intentional.
## Session Start - 2026-10-05

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Fourteen tracked modified files plus prior untracked task/notice/schema sources, design references/assets, critique and generated .tanstack content remain. No staging, commit or push. Agent changed only this handoff.
- Source matches October 4 checkpoint: schema and useForm setup exist, but all five controls still use local useState/value/onChange bindings. register and errors are unused. Save passes RHF handleSubmit directly to onClick; old module-level handleSubmit/validateDraft placeholders remain. Persistence is absent; parent onSave is a no-op.
- Fresh npm.cmd run lint failed on unused register, errors and module-level handleSubmit. npm.cmd run build stopped in TypeScript on those unused declarations and the incompatible onClick={handleSubmit} signature; Vite did not run. Initial npm invocations hit PowerShell script policy, resolved by invoking npm.cmd without changing policy. Tracked git diff --check passed. No browser acceptance. No commit because this remains an unfinished slice with failing checks and mixed file scope.
- Today's objective: resume tutorial step 4 with the explanations and small examples saved below in October 4's resume guidance. Register title first, replace its old controlled bindings, and display errors.title.message with aria-invalid/aria-describedby and an associated alert. Repeat for assigneeId, projectId, scheduledDate and dueDate, then remove the five obsolete state declarations; preserve parent's useState.
- Next coherent chunk: remove placeholder functions, define component-local onValidSubmit(values: TaskFormValues), and use a form with noValidate/onSubmit={handleSubmit(onValidSubmit)}. Save is type=submit; Close, Cancel and toolbar buttons must not submit. Explain that handleSubmit creates the event handler and invokes the callback only after successful validation. Initially inspect validated values only; saving is a later API/mutation chunk.
- Acceptance after developer implementation: blank/whitespace title shows feedback without invoking valid callback, correction clears error, valid submission yields five fields, empty optional project/dates work, and Cancel/reopen/task switching retain expected default/reset behavior. Tiptap instructions remain separately owned. Continue with developer-authored code and the detailed October 4 teaching sequence.


## Session End - 2026-10-05

- Developer ended the day after fixing update callback type mismatches. Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Fourteen tracked modified files and existing untracked task/notice/schema, design, critique and generated .tanstack files remain. No staging, commit or push. Agent authored only continuity notes, no application/test code.
- Completed by developer: registered all five native fields with RHF, removed their obsolete local state, added field errors with unique IDs and matching aria-invalid/aria-describedby, converted outer edit section to a form with noValidate/onSubmit={handleSubmit(onValidSubmit)}, and made Save a submit button. Removed old validation placeholders. User reports validation looks good; agent did not perform browser acceptance.
- onValidSubmit now lives inside EditTaskDetailsComponent, guards task/editor availability, and constructs typed UpdateTaskInput from validated fields, selected task ID and Tiptap JSON. Empty project/date strings become null; empty editor becomes null. It still only console.logs(input).
- Developer added updateTask(input): Promise<TaskApiDto> in mock-task-api.ts. Current implementation waits 1500 ms, finds an existing task by ID and returns Promise.resolve(task!). It does not update fields. Parent onSave returns that promise; prop contract is now (input: UpdateTaskInput) => Promise<TaskApiDto>. Editor does not yet destructure or call onSave.
- Verification before shutdown: latest npm.cmd exec -- tsc -b --pretty false and npm.cmd run lint both passed after these changes. Earlier startup build failed in TypeScript before Vite; no successful production bundle run today. No fresh checks at shutdown. Lightweight source inspection confirms the suggested missing-task guard has NOT yet been applied.
- Important scope decision: user explicitly rejected implementing disposable mock lookup tables/update persistence. They correctly want the request to contain assigneeId/projectId only. No extra frontend request or full objects are needed in the update request. Agent clarified local mock response lookup versus request mapping, then agreed to defer mock persistence. Do not revive the rejected lookup-module/mock-update plan or imply they agreed to build the backend next; that was only an agent recommendation.

### Resume guidance: callback contract is aligned; save remains scaffolding

Lead with completed validation and request mapping. Do not repeat RHF setup, field registration or error-ID fixes. Today's teaching clarified that errors.title.message is RHF's field-error shape carrying the Zod message through zodResolver. handleSubmit(onValidSubmit) runs during rendering to return an event handler; that handler later prevents default submission, validates and calls the callback with values. Passing a function without parentheses defers its execution.

The developer's most recent question was about return types. Explain the two distinct promises if revisiting: an async update function can return Promise<void> for no response data, or Promise<TaskApiDto> when returning a task; either is a contract choice. Current code uses TaskApiDto consistently. An arrow callback with braces requires return to forward the promise; an expression arrow returns it automatically. Do not insist on void now that both declared types agree. Returning a value from async already resolves its promise, so return task is sufficient.

Immediate first coding action recommended last: replace task! in mock-task-api.ts with a real missing-task guard, then return task. Illustrative snippet:

```ts
if (!task) {
  throw new Error('Task not found');
}
return task;
```

Explain that ! changes TypeScript's assumption only; find can still return undefined at runtime. This is a small correctness fix to their existing stub, not a request to implement disposable mock persistence. Let the developer author it.

After that, clearly state where the chain stops: onValidSubmit builds/logs a request, editor does not receive/use onSave, and updateTask returns unchanged data. Connecting onSave requires destructuring it, returning/awaiting its promise from the submission callback and handling rejection with visible feedback while preserving the draft. Do not present success or close edit mode for the unchanged-data stub. Actual persistence, query refresh, pending/duplicate-submit handling, save-error recovery and success-only view transition remain unfinished; real API work is not yet chosen or implemented. Resume with one coherent explained chunk and respect the user's decision to defer mock persistence. Mobile/focus and other previously deferred panel work remain separate scope.

## Session Start - 2026-10-07

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Fourteen tracked modified files and existing untracked task/notice/schema sources, design assets/references, critique and generated .tanstack output remain. No staging, commit or push; unfinished save behavior and mixed file scope prevent a completion commit.
- Current code matches October 5 shutdown: five native fields registered with validation/errors; typed request normalization includes editor JSON and nullable optional fields. onValidSubmit only logs input. Editor does not destructure/call onSave; parent returns updateTask's promise; stub returns unchanged task with an unsafe non-null assertion.
- Verification: lint reported no errors; TypeScript passed. Initial production build failed loading Vite config with sandbox spawn EPERM. Authorized retry outside sandbox passed the complete production build (exit 0), with chunk-size and plugin-timing warnings. Tracked diff whitespace check passed. No browser acceptance performed.
- Today's objective and immediate first developer action: in updateTask, replace return Promise.resolve(task!) with a missing-task guard throwing Error('Task not found'), then return task. Non-null assertion only changes compile-time assumptions; find can return undefined. An async function wraps the returned task in its promise. Keep the aligned Promise<TaskApiDto> callback contract.
- Next explained slice after that correction: consume onSave in EditTaskDetailsComponent, forward/await its promise from valid submission, and handle rejection visibly while preserving the draft. The stub still does not persist, so do not signal a successful save or switch to viewing unchanged data. Respect the user's decision to defer disposable mock persistence; backend work is not yet selected. Pending/duplicate submission, actual persistence, query refresh and success-only transition remain later work.
- Agent updated only this handoff; production and test authorship remains with the developer. October 5 resume guidance above remains applicable.

## Backend transition checkpoint - 2026-10-07

- User chose to begin the real backend step by step and explicitly requested persistent checkpoints for future sessions. See docs/backend-checkpoints.md for the active checklist and stopping point. No backend code or scaffold exists yet.
- This supersedes the startup recommendation to prioritize mock guard cleanup and the older statement that backend work is not selected. Do not revive disposable mock persistence. Existing Java/Spring Boot/PostgreSQL direction is in the master plan; first discussion is application structure, followed by build/migration tooling and a bounded read/update contract.
- Developer completed frontend onSave awaiting, save-error state/display, RHF isSubmitting overlay, aria-busy, disabled native fields and Save/Cancel/Close, and Tiptap editability effect plus disabled toolbar fieldset. Latest lint and full production build passed; existing chunk-size warning remains. Manual testing explicitly deferred, not passed.
- Next session: resume checkpoint 1 in docs/backend-checkpoints.md; teach one choice at a time and preserve developer authorship. First outcome is a saved task edit surviving reload. No application/test edits, commit, or push by the assistant.

## Session Start - 2026-10-08

- Recovered October 7's final discussion from the Start development session chat and reconciled it with docs/backend-checkpoints.md and the current source. The missing formal wrap-up did not lose the backend checkpoint.
- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Fourteen tracked modified files plus existing untracked task sources, backend checkpoints, design references/assets, critique output, and generated .tanstack files. No staging, commit, or push; save behavior is unfinished and the file scope is mixed.
- Current frontend: validated task-edit request; awaited onSave; visible error state; pending overlay; disabled fields, toolbar and buttons; Tiptap editability effect. Parent still delegates to a mock updateTask that returns unchanged data. No real persistence, query refresh after save, or success-only return to view mode. Browser acceptance remains explicitly deferred.
- Current backend: apps contains only web, and no backend ADR exists. Resume checkpoint 1, architecture discussion. Java/Spring Boot/PostgreSQL is the existing stack direction; feature-based package organization remains a recommendation awaiting discussion.
- Resume guidance: first agree on one deployable Spring Boot application organized around tasks, projects, and households. Within each feature, the controller/API DTOs receive and translate HTTP requests, the service owns business rules and transaction boundaries, and repositories/entities handle persistence. Example flow: HTTP task update -> task controller -> task service -> task repository -> PostgreSQL. Keep external API DTOs separate from database entities.
- Next steps, one at a time: settle structure, then build tool, then schema migration tool, then the bounded task read/update contract (validation/errors, dates/nulls, and rich-text instructions). Record the backend ADR before scaffolding. First coding action follows these decisions: scaffold the agreed backend foundation. Do not add disposable mock persistence as a prerequisite.
- First outcome remains: edit an existing task, reload, and see the saved changes. The developer authors all application, configuration, and test code.
- Verification: tracked diff whitespace check passed; fresh lint and production build started, results pending below. This was a continuity inspection of the active save boundary, not a full review of all accumulated changes.
- Verification result: npm.cmd run lint and npm.cmd run build both completed with exit 0. Production build retains chunk-size and plugin-timing warnings. No browser acceptance performed.

## Session End - 2026-10-08

### State and work completed

- Branch main, HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. No commits or pushes this session. Existing frontend/task-edit/design changes remain. New backend scaffold is mostly untracked; TaskAssigneeResponse.java, TaskProjectResponse.java, and TaskResponse.java have staged additions plus unstaged edits (AM). Preserve both index and working tree; review final contents before any future commit.
- Developer generated apps/api with Spring Initializr: Maven, Java 21, Spring Boot 4.1.1, group com.thornstack, artifact homeops-api, base package com.thornstack.homeops. Thornstack is the developer identity; HomeOps remains a working product name.
- Developer is using IntelliJ and Bruno. Discussed free IntelliJ viability and Maven sync versus downloading dependency sources. Installed IntelliJ version was reported as 2025.3.6.1; any subsequent upgrade is unconfirmed.
- Developer added Actuator and showed Bruno GET http://localhost:8080/actuator/health returning HTTP 200 and status UP, with liveness/readiness groups. This is user-provided screenshot evidence, not an assistant-run backend test. Saving the Bruno request/collection was recommended but not verified.
- Chose a durable Actuator endpoint instead of a throwaway hello controller. Feature-first organization was explained: tasks.api contains controller and API DTOs, with service and persistence responsibilities introduced as needed. Generic models folders were discouraged because they blur API/domain/persistence distinctions.
- Developer created TaskAssigneeResponse(String householdMemberId, String displayName), TaskProjectResponse(String projectId, String title), and the first portion of TaskResponse. Records are a Java construct; DTO describes their purpose. Record accessors use displayName(), not getDisplayName().
- Shutdown inspection confirms TaskResponse already contains String taskId, String title, TaskAssigneeResponse assignee, TaskProjectResponse project, boolean isBlocked, and String blockedDescription. Do not ask the developer to recreate this first pass tomorrow.

### Verification and limitations

- Session-start frontend lint and production build passed; chunk-size and plugin-timing warnings remain. Tracked whitespace check passed at startup.
- Two nested record declarations were inspected during teaching; partial TaskResponse was read at shutdown for continuity only. No backend Maven tests/build or full review performed by the assistant. No fresh end-of-day verification, staging, or commit.
- No task controller, database, migrations, or real task persistence yet. Frontend pending/error browser acceptance remains deferred. Do not implement disposable mock persistence.

### Resume guidance - next explained step

Start by saying: Your two nested response records and the first six TaskResponse components are already in place. Today we will finish the response contract in small steps, starting with status.

Relevant files: apps/api/src/main/java/com/thornstack/homeops/tasks/api/TaskResponse.java and sibling response records; apps/web/src/features/tasks/api/types.ts; apps/web/src/features/tasks/api/task-api-mapper.ts.

Remaining frontend contract components: status ('open', 'completed', 'cancelled'), completedAt/cancelledAt/archivedAt, dueDate/scheduledDate, capabilities containing canComplete, and instructions containing nullable Tiptap JSON.

Immediate first topic: explain a Java task-status enum versus arbitrary strings and decide its API serialization before asking the developer to add it. Preserve lowercase JSON values expected by the frontend; do not assume a default uppercase Java enum will match. Explain one concept at a time, provide short examples when helpful, and let the developer author every application/configuration/test change.

Then address dates deliberately: dueDate and scheduledDate are calendar dates. Existing frontend currently parses even the fields named completedAt/cancelledAt/archivedAt as calendar dates; do not silently introduce timestamp responses without an explicit contract decision and corresponding frontend work. Discuss Instant versus LocalDate semantics before implementing lifecycle fields.

Add a response record for capabilities (boolean canComplete), and discuss the JSON-tree representation for rich-text instructions using dependencies actually installed with Boot 4/Jackson. Keep null semantics aligned (optional project/instructions/dates; required assignee). API DTOs remain separate from database entities.

Once TaskResponse is complete, settle the read endpoint contract and persistence path. Full architecture ADR, migration choice, PostgreSQL foundation, integration tests, real reads/updates, and frontend integration remain open. Outcome stays: edit a task, reload, and retain saved changes.

## Session Start - 2026-10-09

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Existing frontend/task-edit/design changes and mostly untracked backend scaffold remain. Three task response records retain staged additions plus unstaged edits. No staging, commit, or push; partial response contract and mixed accumulated scope remain unsuitable for an automatic completion commit.
- Source matches October 8 shutdown: TaskAssigneeResponse and TaskProjectResponse exist, and TaskResponse contains its first six components. Focused continuity inspection covered these records, Maven configuration, context test, frontend DTO and mapper; this is not a full review of all accumulated frontend/design changes.
- Verification: backend Maven test passed (1 context-load test, no failures/errors). Initial wrapper execution was denied cache access; authorized retry succeeded. Frontend lint and TypeScript passed; initial Vite build hit sandbox spawn EPERM, and authorized retry passed the complete production build. Existing chunk-size/plugin-timing warnings and Mockito dynamic-agent warning remain. Tracked diff whitespace check passed. No browser acceptance or task endpoint/persistence verification.
- Today's objective: finish the task response contract one explained step at a time, starting with status. Explain enum constraints versus arbitrary strings and deliberately preserve frontend JSON values open/completed/cancelled. Recommendation: a Java enum with explicit lowercase JSON names; this is not implemented or yet accepted.
- Immediate first developer action after the explanation: define the task-status response enum beside the response records and use it for TaskResponse.status. Do not repeat the first six components. Follow with deliberate calendar-date versus instant semantics, capabilities.canComplete and nullable rich-text JSON. October 8 detailed resume guidance remains applicable.
- Outcome remains an edit surviving reload through Spring Boot/PostgreSQL. Developer authors application/configuration/test code; agent changed only continuity notes. No controller, database or persistence yet.

### October 9 continuation - response contract and pacing

- Developer clarified familiarity with Java and Spring Boot; IntelliJ IDEA is the unfamiliar part. Use larger coherent implementation steps and concise contract/review guidance; skip basic Java/Spring tutorials unless requested. Preserve developer code authorship.
- Source inspection confirms TaskStatus with explicit lowercase JsonProperty names; TaskResponse now includes status, LocalDate dueDate/scheduledDate and Instant completedAt/archivedAt/cancelledAt. This adopts exact lifecycle timestamps. These subsequent edits have not yet had fresh build/serialization verification.
- Next batch: add TaskCapabilitiesResponse(boolean canComplete), plus capabilities and nullable instructions to TaskResponse. Installed Jackson databind 3.1.5 contains tools.jackson.databind.JsonNode; use that JSON tree type for Tiptap instructions.
- Required frontend alignment remains: TaskModel lifecycle fields are still CalendarDate, mapper still uses parseCalendarDate, and mock completion still writes YYYY-MM-DD. Recommend retaining ISO timestamp strings in the client, mapping lifecycle fields without calendar parsing and using an ISO timestamp in mock completion. Existing seeded lifecycle values are null. Keep dueDate/scheduledDate calendar parsing unchanged.

### October 9 contract review

- Developer reiterated preference for concise reviews and coherent objectives, not field-by-field instructions. They know Java/Spring Boot; focus explanations on unfamiliar tools or substantive design decisions.
- Completed source changes: capabilities record, JsonNode instructions, lifecycle ISO strings in TaskModel, direct lifecycle mapping, and ISO timestamp generation in mock completion. Date-only mapping remains intact.
- Frontend verification failed: mock-task-api.ts lines 1-2 retain unused dayjs and parseCalendarDate imports. Both ESLint and TypeScript reject them; production bundling did not run. Developer correction required. No application/test edits or commit by agent.
- Contract serialization behavior still lacks a dedicated test; context-load coverage alone does not establish exact wire JSON. After import cleanup and passing verification, next objective is a persistent task read through PostgreSQL, with migration/schema setup and serialization coverage as part of that slice.

### Deployment-learning objective clarified - 2026-10-09

- User is a software architect and explicitly wants to learn cluster-based application delivery. Treat this as a real learning requirement, not merely familiarity with Kubernetes. Kubernetes is therefore the recommended learning deployment target; no cloud provider or hosted cluster has been selected or provisioned.
- Distinguish product operating needs from educational needs: HomeOps does not yet demonstrate requirements that demand Kubernetes. A managed container platform can provide automated delivery without user-managed Kubernetes. Enterprise quality depends on operational practices, not the platform label.
- Recommended progression: local PostgreSQL via Compose while API runs in IntelliJ; persistent application slice; container image and registry; local Kubernetes deployment; CI and GitOps; managed-cluster operations. Include rollouts, probes, resource requests/limits, configuration/secrets, networking, failure recovery, observability and migration compatibility. Managed PostgreSQL remains the recommended hosted database direction; operating PostgreSQL in Kubernetes is a separate optional learning scope.
- Immediate active task remains local PostgreSQL setup. Docker/Compose installed; last engine check could not find the Docker Desktop Linux engine pipe. User has been asked to start Docker Desktop. No Compose file, database, or credentials created yet.

### Local PostgreSQL ready - 2026-10-09

- User created root compose.yml and package.json with db:up/status/stop/logs/shell scripts. Compose uses postgres:18, localhost port 5432, a named volume mounted at /var/lib/postgresql, and pg_isready health check. .env.local is confirmed ignored; its secret contents were not read.
- Agent ran npm.cmd run db:up successfully; homeops-postgres-1 reported healthy. Root scripts reviewed and match the intended local workflow. User continues to author all application/configuration/test files.
- Next objective: provision separate migration and application database roles, then configure Spring Boot JDBC/JPA/Flyway using externalized credentials. No domain tables yet created by the agent. Deployment direction accepted: managed Kubernetes; EKS recommended for AWS learning, with hosted managed PostgreSQL outside the cluster.

### Database workflow preference - 2026-10-09

- User has DBeaver and prefers its SQL editor over interactive console commands. They want reusable setup scripts committed at repository level for new-machine setup. Use DBeaver for queries/inspection and tracked SQL as the source of truth; avoid console-only setup instructions.
- Recommended organization (not yet created): infra/postgres/bootstrap.sql for administrative roles/schema/grants, infra/postgres/README.md for local setup/password steps, and application Flyway migrations under apps/api/src/main/resources/db/migration. Bootstrap and application migrations have different privileges/lifecycles. Do not commit credentials or psql-only backslash commands in portable SQL. Existing proposed CREATE ROLE/SCHEMA statements are one-time bootstrap, not rerunnable as-is; role creation has not been verified.
- DBeaver connection should target 127.0.0.1:5432, database homeops, admin user postgres with the locally configured admin password. A successful prior container-internal SQL query verified homeops/PostgreSQL 18.6 but did not test the host TCP/password connection.

### Bootstrap verified - 2026-10-09

- User executed bootstrap through DBeaver. Read-only database verification confirms homeops_migrator/homeops_app both have LOGIN and neither has SUPERUSER, CREATEDB or CREATEROLE. Schema homeops is owned by homeops_migrator. homeops_app has schema USAGE and lacks schema CREATE.
- Next step: set distinct role passwords privately and verify separate DBeaver TCP connections before configuring Spring Boot/Flyway. Recommend a tracked password-free credentials.example.sql and an ignored credentials.sql.local copy for local execution in DBeaver; actual credentials must not enter the tracked bootstrap. DBeaver may retain executed SQL in local query history. Password setup and role-authenticated connections remain unverified.

### Credentials checkpoint and next integration - 2026-10-09

- User reports distinct role passwords and both DBeaver connections completed. This is user-reported verification; agent did not read credential files or attempt role-password authentication.
- Backend inspected: pom.xml still contains Web MVC, Web MVC test and Actuator only; application.properties contains only the application name. Next developer batch is JPA/PostgreSQL/Flyway dependencies and externalized datasource/Flyway configuration, using homeops schema explicitly and ddl-auto=validate. Boot 4.1.1 BOM includes spring-boot-starter-flyway and manages Flyway/PostgreSQL versions.
- Local startup migration credentials are acceptable for this learning slice; intended deployment separation is a migration job followed by application pods without migration credentials. Compose .env.local is not automatically imported by Spring Boot running in IntelliJ. New datasource configuration will also affect context-load tests; isolated PostgreSQL test configuration remains open.

## Session End - 2026-10-09

- User paused before implementing Spring Boot database integration and wants to resume tomorrow. Use concise, coherent batches: user knows Java/Spring Boot, is learning IntelliJ/PostgreSQL, and dislikes field-by-field handholding. User authors all application, configuration and test code.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Five response files have staged additions plus unstaged edits. Existing frontend/design changes remain; backend scaffold, root Compose/package files and infra scripts are largely untracked. No commit or push. No shutdown tests/review beyond lightweight state/config inspection.
- Completed: response DTO fields and lowercase enum mapping, frontend timestamp alignment, root Compose PostgreSQL 18 service, root db:* npm scripts, saved bootstrap SQL, separate database roles/schema. Agent verified database healthy, SQL query returned homeops/PostgreSQL 18.6, migrator owns homeops schema, app has USAGE without CREATE, both roles lack admin privileges. User reports password setup and separate DBeaver connections working; agent did not inspect secrets.
- Verification limits: backend context test passed after DTO changes, but no serialization test. Latest frontend review found unused dayjs/parseCalendarDate imports blocking lint/build; cleanup has not been reverified. Browser acceptance remains deferred. No task tables, persistence, controller, integration tests or API-to-database configuration yet.
- Accepted direction: managed Kubernetes for deployment learning, with EKS recommended for AWS relevance and managed PostgreSQL outside the cluster. Local Compose first, then persistent slice, images/local Kubernetes, CI/GitOps and hosted cluster. No cloud resources provisioned.

### Resume guidance - Spring Boot database wiring

Immediate first action: add four dependencies to apps/api/pom.xml, then reload Maven in IntelliJ. Shutdown inspection confirms these have NOT been added; application.properties still has only spring.application.name.

Dependencies, versions managed by Boot 4.1.1:
- org.springframework.boot:spring-boot-starter-data-jpa (default scope)
- org.springframework.boot:spring-boot-starter-flyway (default scope)
- org.flywaydb:flyway-database-postgresql (runtime)
- org.postgresql:postgresql (runtime)

Then add to apps/api/src/main/resources/application.properties:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_APP_USER}
spring.datasource.password=${DB_APP_PASSWORD}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.default_schema=homeops
spring.jpa.open-in-view=false

spring.flyway.url=${DB_URL}
spring.flyway.user=${DB_MIGRATION_USER}
spring.flyway.password=${DB_MIGRATION_PASSWORD}
spring.flyway.default-schema=homeops
spring.flyway.schemas=homeops
spring.flyway.create-schemas=false
```

Configure the application run configuration in IntelliJ: Run -> Edit Configurations -> Environment variables. Supply DB_URL=jdbc:postgresql://127.0.0.1:5432/homeops, DB_APP_USER=homeops_app, DB_MIGRATION_USER=homeops_migrator, and the corresponding passwords privately. An ignored local env file can be explicitly attached if the installed IDE supports it. Compose's .env.local is NOT automatically loaded by Spring Boot. Do not commit secret-bearing run configurations.

Start PostgreSQL using npm.cmd run db:up at repo root if needed, reload Maven, and start the API. First acceptance is successful database initialization with no domain migrations yet. Then create the first meaningful Flyway migration and persistence slice. Flyway owns schema evolution; Hibernate validates mappings. Local startup migrations are convenient; eventual Kubernetes migration execution should be separate from app pods without migration credentials. Context-load tests will need appropriate database/env setup; isolated PostgreSQL integration testing remains open.

Use DBeaver for SQL inspection and saved repo SQL for reproducible setup. infra/postgres/bootstrap.sql owns administrative bootstrap; future application migrations belong in apps/api/src/main/resources/db/migration. Keep passwords separate and ignored. Re-provide this next batch rather than repeating enum/date/Compose teaching.

## Session Start - 2026-10-10

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Five response records/enums have staged additions plus unstaged edits. Accumulated frontend/design work, mostly untracked backend scaffold, Compose/root package files, infra SQL, design references, critique and generated .tanstack files remain. No staging, commit or push; scope is mixed and frontend checks fail.
- Reconciled October 9 resume guidance with current source. Response contract and frontend lifecycle timestamp changes are present. pom.xml still has Web MVC, Web MVC test and Actuator only; application.properties still contains only the application name. Database integration has not begun. This was a focused continuity review, not a full review of accumulated frontend/design work.
- Fresh verification: offline Maven test passed (1 context-load test, zero failures/errors); existing Mockito dynamic-agent warning remains. Docker status initially hit sandbox pipe permissions; authorized read-only retry confirmed homeops-postgres-1 healthy on localhost:5432. No credentials read or role-authenticated connections retested. git diff --check HEAD passed.
- Frontend lint failed on unused dayjs and parseCalendarDate imports at mock-task-api.ts lines 1-2. Production build also reported TS6133 for those imports; Vite bundling did not run. Developer should remove the obsolete imports. Browser acceptance and exact DTO serialization remain unverified.
- Today's objective: wire Spring Boot to PostgreSQL using distinct application/migration credentials. First backend action: add JPA, Boot Flyway starter, PostgreSQL Flyway module and PostgreSQL driver to pom.xml, then reload Maven in IntelliJ. Existing local Boot 4.1.1 dependency management and official Spring Boot initialization documentation confirm the dependency/configuration approach.
- Continue with the full October 9 properties example and IntelliJ environment variables above. Compose's env file is not automatically loaded by the API. Acceptance for this batch is successful datasource/Flyway/JPA initialization; no domain migration or task persistence is claimed. Tests will need database configuration once integration is added. Later migrations must grant appropriate table/sequence access to homeops_app; schema USAGE alone does not provide data access.
- Agent changed only this tracked handoff. Developer continues to author all application, configuration and test code. Preserve concise coherent batches and the preference for DBeaver and reusable SQL.

## Session End - 2026-10-10

- Stopping point: developer reports an error with V3__create_project.sql and explicitly wants to tackle it tomorrow. No error text/logs supplied; cause and database/history state are unknown. No shutdown debugging, tests, migration execution, commit or push.
- Branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f. Five Java response files and V1/V2/V3 migrations have staged additions plus unstaged changes. Accumulated frontend/design changes remain, along with untracked backend scaffold/config/tests, infra SQL, root Compose/package files, backend checkpoint notes, task UI sources, design assets, critique and generated .tanstack files. Preserve all existing staging and edits.
- Developer added JPA, Flyway starter, PostgreSQL module/driver and externalized datasource/JPA/Flyway configuration. Configured IntelliJ run environment using Modify options -> Environment variables, keeping Store as project file unchecked. Actual secrets were not read. Application uses homeops_app; Flyway uses homeops_migrator through separate spring.flyway properties.
- Developer removed unused frontend imports. Latest checks during the session: frontend lint and TypeScript passed; backend offline compile passed. Earlier context test passed before database integration; it was not rerun with new database credentials. Local health returned HTTP 200/UP, but agent could not establish process identity/new configuration; developer later confirmed startup. No full frontend production bundle after import cleanup, browser acceptance or exact response serialization test.
- V1 creates homeops.household (household_id UUID primary key, name text not null); V2 creates household_member (UUID primary key, required household foreign key and display_name). Source reviewed and developer reports both applied; second startup reported schema up to date. V3 file exists and was intended to create project with project_id, household_id foreign key and title; its contents were not inspected at shutdown. V3 success is not established.

### Resume guidance: diagnose V3 before advancing

Immediate first action tomorrow: obtain the exact Flyway/startup error and inspect the actual V3 file, then inspect homeops.flyway_schema_history and relevant schema objects read-only using the DBeaver migrator connection. Distinguish SQL execution failure from validation/checksum or configuration errors using evidence. Do not assume a cause, successful application or rollback. Do not reflexively run repair, edit applied migrations, drop tables or reset the database. Explain the diagnosis and let the developer author the correction.

The user knows Java/Spring Boot but explicitly requested hand-holding for Flyway. Resume with one explained step at a time, not the entire schema roadmap. Concepts covered: migrations are ordered SQL changes; startup invokes Flyway with migration credentials; default versioned filename syntax is V<number>__description.sql; history tracks applied versions/checksums and skips applied versions. Applied successful migrations remain unchanged; later changes use new files. Splitting tables into V1/V2/V3 was a teaching choice, not a Flyway requirement; multiple related statements can form one coherent migration.

UUID PRIMARY KEY enforces non-null uniqueness but does not generate values. Recommended future JPA UUID generation; not yet implemented. Existing V1/V2 have no database ID default. After V3 recovery, continue task table design with required household/assignee, optional project and same-household constraints. App table grants, seed data, JPA mappings, endpoints, persistent edits and isolated database tests remain future work. Overall backend foundation remains partial. No reminder automation requested or created; resurface this guidance at the next development-session start.

## Session Start - 2026-10-11

- Baseline: main at 3eec7df0aa7295819241c04743f17c2c1d13ad0f, unchanged from the previous handoff. Five Java response files and three SQL migrations still have staged additions plus unstaged edits. Accumulated frontend/design changes and untracked backend, infrastructure, task UI and reference files remain. Preserve existing staging; no commit because scope is mixed and V3 recovery is unresolved.
- Today's objective: diagnose the reported V3 project migration failure, then verify successful application before moving to the task table. Reviewed the backend response changes, database configuration and all three migration sources. V3 defines project_id UUID primary key, required household_id referencing homeops.household, and required title; no obvious SQL typo found. This was a focused continuity review, not a full review of accumulated frontend/design work.
- Fresh checks passed: offline Maven compile with tests skipped, frontend lint, frontend TypeScript/production build, and git diff --check HEAD. Vite reports the existing large-chunk warning and plugin timing notices. Database-dependent context tests were not run: the configured IntelliJ credentials are not supplied to this shell. No migration execution or live database/history verification was performed.
- Requested the exact IntelliJ Flyway/startup error, including Caused by or SQL State/Message, without credentials. Cause and V3 database state remain unknown. Next inspect migration history and table presence through the DBeaver migrator connection, using read-only queries. Do not infer a repair strategy from SQL appearance alone.
- Resume guidance remains the October 10 section above: one explained Flyway step at a time; developer authors all application/configuration/test corrections. First action is to supply the error text. Once identified, reconcile it with history/schema state before recommending a correction. Only this handoff was edited by the assistant; no commit or push.

### V2 validation blocker identified - 2026-10-11

- Developer supplied FlywayValidateException: checksum mismatch for migration version 2; database checksum 1915145447, locally resolved checksum -1581599026. The reported blocker is V2 validation; this does not establish a V3 SQL execution failure.
- V2 has no committed Git history; its staged version is empty, so Git cannot supply the known applied contents. Current working file creates household_member with a household foreign key. Exact post-application changes remain unknown; ask whether SQL, comments or formatting changed and inspect IntelliJ Local History if available.
- Explain that validation compares the applied migration fingerprint with the resolved file. Prefer restoring the applied content when recoverable, then put intended schema changes in a new versioned migration. Repair realigns history metadata; it does not apply edited SQL or reconcile table structure. No repair, migration edits or database changes performed. Live history/schema inspection remains pending.

### V2 schema comparison - 2026-10-11

- Developer supplied DBeaver column and constraint results. household_member has the expected three required columns (household_member_id UUID, household_id UUID, display_name text), primary key and fk_household_member_household foreign key to household(household_id). These results match the current V2's declared columns and constraints; the exact original file/change remains unknown.
- Next guided action: one-time Flyway repair through the Maven plugin, using local Flyway version 12.4.0, explicit localhost database/schema/migration location and migrator credentials supplied privately. Maven plugin configuration is separate from Spring Boot properties/IntelliJ application environment. Inspect Flyway info first to ensure the supplied migration location resolves V1/V2/V3 and there are no unexpected missing/failed migrations; then repair and restart the configured application. No repair has yet been executed or successful validation/startup established.

## Session Start - 2026-10-12: requested commit and push

- User explicitly requested committing and pushing accumulated work before continuing development. Starting branch main; HEAD 3eec7df0aa7295819241c04743f17c2c1d13ad0f, with eight local commits ahead of the last known origin/main.
- Checkpoint scope: task selection/details and validated rich-text edit form, shared task queries/completion/Undo, lifecycle timestamp contract, Spring Boot/Maven API scaffold and response DTOs, PostgreSQL bootstrap/Compose/Flyway configuration and V1-V3 migrations, guarded repair helper, and design assets/references/critiques plus continuity notes. Generated apps/web/.tanstack temporary files are excluded. Local credential files remain ignored.
- Fresh verification: frontend npm.cmd run lint and npm.cmd run build passed; build retains the large-chunk warning. API Maven offline compile with tests skipped passed after an outside-sandbox retry produced an explicit BUILD SUCCESS log. git diff --check HEAD passed before this note. No browser acceptance or database-dependent context tests; IntelliJ database credentials are not supplied to this shell.
- This is a work-in-progress checkpoint, not a claim of complete persistence. updateTask still returns unchanged mock data; actual task endpoints, persistence, query refresh after save and success transition remain unfinished. Mobile task details and save/navigation acceptance remain deferred.
- Reconciled backend-checkpoints.md with the latest October 11 evidence: the blocker is the V2 checksum mismatch. Supplied schema columns/constraints match current V2; repair completion and subsequent startup are unverified. No migrations, repair or database writes performed for this commit request.
- Resume guidance: first confirm whether the developer already ran the repair helper. If not, inspect Flyway info for the expected migration set before the previously discussed repair. Explain that repair changes recorded metadata, not table structure. Restart the configured API, verify validation and V3 history, and only then continue task schema design. The developer authors application/configuration/test changes; the assistant changed only continuity documentation in this session.
- Commit intent: chore: checkpoint task editor and backend foundation. Push includes this checkpoint and the eight prior local commits; command results in the chat establish the final hash and remote outcome.
- Final staged whitespace check includes previously untracked files and reports two whitespace-only lines in task-details.tsx plus an extra EOF blank line in one critique. These cosmetic findings are preserved in the requested checkpoint; lint/build/compile passed. No common private-key or GitHub/AWS access-key patterns were detected by the focused staged-file scan.
