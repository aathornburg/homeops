---
target: current mobile menu in apps/web/src/shared/layout/preAuthHeader.tsx
total_score: 22
p0_count: 1
p1_count: 2
timestamp: 2026-08-10T22-38-47Z
slug: apps-web-src-shared-layout-preauthheader-tsx
---
# HomeOps Mobile Menu Critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2/4 | Drawer state is clear, but the dialog has no title. |
| 2 | Match system / real world | 4/4 | Labels are plain and familiar. |
| 3 | User control and freedom | 3/4 | Close, backdrop dismissal, Escape, and focus return are present. |
| 4 | Consistency and standards | 3/4 | Standard drawer, but mobile account actions are buttons while desktop uses links. |
| 5 | Error prevention | 1/4 | Log in and Start free appear actionable but have no destination. |
| 6 | Recognition rather than recall | 3/4 | Destinations are labeled; the missing Menu title weakens orientation. |
| 7 | Flexibility and efficiency | 2/4 | Navigation works, but account paths cannot be completed. |
| 8 | Aesthetic and minimalist design | 3/4 | Calm and uncluttered; full-width presentation weakens the drawer metaphor. |
| 9 | Error recovery | 0/4 | Account actions silently do nothing. |
| 10 | Help and documentation | 1/4 | The approved reassurance copy is missing. |
| **Total** | | **22/40** | **Acceptable; visually solid, functionally incomplete.** |

## Anti-Patterns Verdict

The mobile menu does not look AI-generated. Its restrained palette, familiar drawer pattern, plain labels, and limited green emphasis fit HomeOps. It does retain an unfinished-library-default quality because the header is empty, the sheet expands to full width on the inspected phone, and the reassurance line from Option A is absent.

The deterministic detector returned zero findings for `apps/web/src/shared/layout/preAuthHeader.tsx`. No false positives were present. Browser overlay injection was unavailable in one assessment because that isolated browser runtime had no browser backend; the other assessment supplied fresh mobile measurements.

## Overall Impression

The basic design is good and the hardest layout decision is working: navigation stays at the top while the account actions remain anchored in the thumb zone. The largest opportunity is to finish the component's orientation, touch sizing, and conversion behavior so the visual promise matches the interaction.

## What's Working

- The navigation and account actions form two clear groups, with the primary action at the bottom.
- HomeOps semantic colors and restrained green emphasis preserve the brand across color schemes.
- Navigation rows are roughly 49.5px tall and include active, focus-visible, and progressive hover feedback.

## Priority Issues

1. **[P0] Mobile account actions do not navigate.** Both are bare Mantine `Button` components without links or handlers. Connect them to the same destinations as their desktop counterparts.
2. **[P1] The dialog is unnamed.** Add the approved visible `Menu` title so Mantine can associate it with the dialog's accessible name.
3. **[P1] Important touch targets are undersized.** The close control measured about 31.5px square and the account buttons about 40.5px tall. Bring close and account actions to at least 44px; Option A uses 40px for close visually and 48px for the primary action, but the interactive close target should still reach 44px.
4. **[P2] The Drawer loses page context on narrow phones.** It occupied the full 417px inspected viewport. Set the approved `size="xs"`/approximately 320-332px treatment so a strip of dimmed page remains visible where practical.
5. **[P2] Conversion reassurance is missing.** Restore `Free to get started. No credit card.` beneath Start free.

## Persona Red Flags

- **Jordan, first-timer:** The empty header provides no orientation, and dead account actions make the site appear broken.
- **Sam, accessibility-dependent:** The dialog lacks an accessible name and key controls miss the 44px target, although Escape dismissal and focus restoration are strengths.
- **Casey, distracted mobile user:** Bottom anchoring is excellent for one-handed use, but small controls and a nonfunctional CTA interrupt the flow.

## Minor Observations

- Navigation typography is bolder and larger than the approved mockup; it works, but a slightly calmer treatment would better preserve hierarchy.
- Add the approved header divider to strengthen the title/navigation separation.
- The secondary Log in action currently competes more with Start free than it did in the reference.
- Having no active navigation item while the landing page is current is correct.

## Questions to Consider

- If the Drawer remains full-width, is it still meaningfully a drawer rather than a navigation page?
- Should the conversion promise be only `Start free`, or the fuller reassurance already approved in Option A?
- Are the Option A dimensions now acceptance criteria, or only visual suggestions?
