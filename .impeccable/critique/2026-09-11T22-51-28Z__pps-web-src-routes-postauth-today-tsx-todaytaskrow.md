---
target: blocked Today row (Milestone 3 desktop)
total_score: 33
p0_count: 0
p1_count: 2
timestamp: 2026-09-11T22-51-28Z
slug: pps-web-src-routes-postauth-today-tsx-todaytaskrow
---
# Blocked Today Row — Milestone 3 Desktop Critique

## Design Health Score

This score is scoped to the representative desktop blocked-row primitive rather than the complete Today page.

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 4 | Lock and exception footer expose the unavailable state clearly. |
| 2 | Match system / real world | 3 | `Paused` may imply a voluntary action while the domain state is blocked. |
| 3 | User control and freedom | 4 | The unavailable completion action is correctly absent. |
| 4 | Consistency and standards | 2 | Code and the latest standalone reference say `Paused`; the committed specification and approved PNG say `Blocked`. |
| 5 | Error prevention | 4 | A blocked task cannot be completed from this row. |
| 6 | Recognition rather than recall | 4 | Lock, assignee, timing, and blocker reason are all visible in place. |
| 7 | Flexibility and efficiency | 3 | The stable rails scan efficiently; interaction capabilities are intentionally deferred. |
| 8 | Aesthetic and minimalist design | 3 | Structure is calm, but the title lacks the specified primary emphasis. |
| 9 | Error recovery | 3 | Not materially exercised by this read-only primitive. |
| 10 | Help and documentation | 3 | The blocker reason explains the state, but terminology conflict weakens the contract. |
| **Total** | | **33/40** | **Good; two acceptance decisions before sign-off.** |

## Anti-patterns verdict

The row does not look generically AI-generated. It uses a purposeful grid, a familiar lock, and a restrained exception footer rather than chips, alert cards, or status color. The deterministic detector returned `[]` for `apps/web/src/routes/_postAuth/today.tsx`. Browser overlay notices were generic page-wide signals and did not identify a blocked-row-specific violation.

## Overall impression

The row architecture is sound. The single biggest opportunity is restoring the task title as the row's visual anchor; the largest acceptance risk is the unresolved `Blocked` versus `Paused` source-of-truth conflict.

## What’s working

- The lock, title/context, compact assignee, Due, and Planned regions align in a stable desktop scan pattern.
- The footer stays inside the same list item, begins at the title column, and does not move the assignee or timing rails.
- Blocked completion behavior is truthful: no checkbox or button is rendered, the lock has an accessible label, and meaning does not depend on color.

## Priority issues

### [P1] Restore primary emphasis to the task title

**Why it matters:** The title currently inherits secondary text color, making the primary timing fact visually stronger. The specification says the title is the strongest row text, and the standalone reference applies primary ink and medium weight.

**Fix:** Apply the established primary text token and intended title weight to the task-title element while leaving project context muted.

**Suggested command:** `$impeccable typeset apps/web/src/routes/_postAuth/today.tsx`

### [P1] Resolve the `Blocked` versus `Paused` contract

**Why it matters:** The committed specification and approved PNG require `Blocked — <reason>` and `Blocked task; completion unavailable`. The current code, September 10 end handoff, and standalone HTML use `Paused`. Both cannot be the acceptance oracle.

**Fix:** Choose the canonical household-facing term, then align visible footer text, accessible label, specification, and approved reference. If `Paused` was the later intentional decision, the implementation may already be correct and the committed design artifacts need updating.

**Suggested command:** `$impeccable clarify apps/web/src/routes/_postAuth/today.tsx`

### [P2] Harden long unbroken content

**Why it matters:** Normal prose wraps, but a long unbroken title, project name, URL, or blocker token can overflow the flexible grid item and be clipped by the list container.

**Fix:** Give flexible copy regions `min-width: 0` and an explicit long-token wrapping policy such as `overflow-wrap: anywhere` where appropriate.

**Suggested command:** `$impeccable harden apps/web/src/routes/_postAuth/today.tsx`

### [P2] Treat whitespace-only blocker reasons as absent

**Why it matters:** `null` and an empty string omit punctuation correctly, but a whitespace-only description is truthy and renders a dangling `Paused —` or `Blocked —`.

**Fix:** Normalize the description once with trimming, and render the dash only when normalized text remains.

**Suggested command:** `$impeccable harden apps/web/src/routes/_postAuth/today.tsx`

## Persona red flags

### Jordan — first-time household member

The lock and plain-language reason explain why the task cannot move. The only ambiguity is `Paused`: Jordan may read it as something another household member deliberately paused rather than work blocked by an external dependency.

### Sam — screen-reader and keyboard user

Sam hears `Paused task; completion unavailable`, and no misleading completion control enters the tab order. The visible and accessible wording should be aligned with the canonical domain term once selected.

### Riley — edge-case tester

Riley can trigger a dangling dash with a whitespace-only reason and can stress clipping with an unbroken long token. Ordinary sentence-length reasons render correctly.

## Minor observations

- The hard-coded copper avatar colors are not tokenized, but they match the approved visual direction; treat this as design-system debt rather than a blocked-row defect.
- The page-wide 1600px maximum differs from the specification’s approximate 980px measure, but that predates this blocked-row diff and should be reviewed separately rather than charged to this change.

## Questions to consider

- Was `Paused` an intentional later replacement for `Blocked`, or did the implementation drift from the committed design?
- Should long-token and whitespace-only reason hardening be included in Milestone 3 sign-off, or tracked as the next robustness pass?
