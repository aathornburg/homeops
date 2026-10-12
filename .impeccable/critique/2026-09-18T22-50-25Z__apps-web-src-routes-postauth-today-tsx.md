---
target: Today completion color and current page state
total_score: 20
p0_count: 0
p1_count: 3
timestamp: 2026-09-18T22-50-25Z
slug: apps-web-src-routes-postauth-today-tsx
---
# Today completion review - 2026-09-18

Method: dual-agent (A: /root/visual_review; B: /root/detector_review), with independent assessments. B returned after an interim usage-limit error, so the parent also completed a fallback detector run after A. Both scans returned zero findings. Scope: Today page, especially completion controls and saving state.

## Verdict

The page has a calm, coherent visual foundation. The compact stacked loader/text is balanced. Ochre works visually as the existing warm accent for the loader; successful completion is more consistent with the documented green action/selection system. The warning token is currently serving multiple semantic roles. Any checkbox fill needs a contrasting checkmark.

## Verified evidence

- Independent browser review: fresh hidden tab at existing localhost:5173/today, desktop dark theme. Normal completion clicked for Measure office window for blinds. Saving appeared and disappeared, but task stayed checked under For Today, count remained 3, and Overdue remained. Visual review tab closed.
- Build, lint, git diff --check: passed. Build emitted a non-blocking plugin timing notice.
- Detector: node .agents/skills/impeccable/scripts/detect.mjs --json apps/web/src/routes/_postAuth/today.tsx returned [] with exit 0. No deterministic findings; it does not verify completion correctness or dynamic checkbox contrast. B independently reproduced stale completion and a second toggle that visually unchecks the task without actually undoing it; source confirms that toggle calls completeTask again. Both temporary browser tabs were closed. Mutable detector overlay injection was unavailable through the permitted browser API; no live detector server was started.
- Installed Mantine checkbox CSS/default theme and live review confirm white tick on dark ochre #c2a36b. Calculated contrast 2.40:1, below 3:1 for a meaningful graphical state indicator. Light-theme white on #7a5c2e is 6.18:1. Existing inverse-text token would produce 7.62:1 against dark ochre. Changing fill hue alone does not guarantee adequate tick contrast.
- Mobile, live light theme, reduced motion, complete keyboard traversal, and screen-reader speech were not manually tested. Failure handling findings are source-based, not injected failure tests.

## Strengths

1. Titles, project context, assignees, and due/planned dates scan cleanly without excessive decoration.
2. Saving feedback remains local to the affected row and the small vertical loader/text group is balanced.
3. Blocked/unavailable footer uses existing row structure, and the blocked reason is safely narrowed and trimmed. Only one footer label is shown.

## Priority issues

1. P1: Successful completion does not update Today. Handler clears saving without refreshing the projection, leaving a completed task, count, and overdue label visible. Refresh/reconcile the source and add the planned Undo behavior. Checkbox currently toggles independently and another click calls complete again, not Undo.
2. P1: Failure/duplicate handling is incomplete. Handler has finally but no catch, rollback/message, or pending/capability guard. Checkbox remains enabled under the overlay. Restore truthful UI on failure, show actionable feedback, and prevent repeat submissions including keyboard activation.
3. P1: Accessible action/status names are absent. Live AX exposes unnamed checkboxes. Add task-specific accessible names and announce saving via status semantics. Unblocked unavailable lock currently lacks the explicit accessible image label assigned to blocked locks; adjacent footer text does communicate unavailability.
4. P2: White checkbox tick on dark ochre has 2.40:1 contrast. Set a theme-appropriate icon foreground and verify both themes. The documented primary green is the stronger semantic fit for completion.
5. P2: Groceries still says Completion unavailable without a reason. The fixture is unblocked and canComplete is false. Define a real rule/reason or make that fixture completable; do not invent permissions merely to explain it.

## Heuristic assessment (0-4, row interaction scope)

| Heuristic | Score | Evidence |
|---|---:|---|
| Visibility of system status | 2 | Saving visible; outcome stale and unannounced |
| Match with real world | 3 | Familiar task wording; unavailable state vague |
| User control/freedom | 1 | Checkbox suggests reversal; no Undo integration |
| Consistency/standards | 2 | Warning color reused for completion |
| Error prevention | 2 | Capability gated rendering; pending remains enabled |
| Recognition over recall | 3 | Context/dates visible |
| Flexibility/efficiency | 2 | One-click action; accessibility gaps |
| Aesthetic/minimalist design | 3 | Restrained, scannable presentation |
| Error recovery | 0 | No completion failure recovery |
| Help/documentation | 2 | Paused reason useful; unavailable reason absent |
| Total | 20/40 | Visual foundation sound; behavior unfinished |

## Cognitive and persona observations

No strong generic AI-design tells in the row. Cognitive load is low before action; stale completion results introduce uncertainty afterward. First-time users may infer that the checked task can be unchecked to undo. Screen-reader users cannot distinguish unnamed checkbox actions. Hurried users can submit again while saving or after an unchanged result. Saving begins reassuringly but ends ambiguously.

## Minor observations and next decision

The blur has no translucent backing; its visual contrast depends on underlying content. The checkbox target measured 22.5px square; spacing must be assessed before declaring a target-size failure. Revisit whether completion leaves Today immediately with an Undo notification, as the existing plan suggests. Highest-value next slice: successful refresh, pending guard, and error rollback/feedback before further visual polish.

