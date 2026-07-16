# HomeOps Color Token System Design

## Goal

Replace the Vite-era color variables in `apps/web/src/index.css` with a two-layer HomeOps color system that maps the checked-in light and dark palette boards to stable semantic roles. The system must cover ordinary interaction states, semantic statuses, premium project-planning treatments, and WCAG AA text contrast without making components depend on palette-specific names.

## Architecture

The stylesheet will expose two layers:

1. Immutable palette primitives hold literal color values. Light and dark primitives coexist and are never redefined by a theme selector.
2. Semantic tokens describe usage. Light mode is the root mapping; `prefers-color-scheme: dark` remaps only semantic tokens to dark primitives.

Components consume semantic tokens only. Palette primitives are implementation details of the theme.

## Source Palette Mapping

The light board supplies Canvas `#FAFAF8`, Surface `#FFFFFF`, Panel `#F2F5F1`, Border `#DDE4DE`, Ink `#1F2523`, Household Green `#2F6F5E`, Soft Green `#E5F1EC`, Clipboard Ochre `#7A5C2E`, and Project Violet `#6F55A3`.

The dark board supplies Night Worktop `#101614`, Deep Panel `#151E1B`, Raised Surface `#1B2622`, Soft Surface `#22302B`, Dark Border `#31443D`, Mint Action `#72AC9B`, Mint Wash `#203A34`, Warm Ochre `#C2A36B`, Project Violet `#B29ED6`, Text Primary `#F1F5F2`, and Text Secondary `#B8C4BE`.

`DESIGN.md` additionally supplies light secondary text `#4F5D58`, information blue `#4267A3`, and danger red `#A8423D`.

The original light muted value `#6F7C76` reaches only about 4.17:1 on Clean Canvas, so readable muted text will use the slightly darker `#68746E`, which reaches about 4.66:1 on Clean Canvas. Disabled text may use a lower-contrast neutral because disabled controls are non-interactive, but it must not be reused for helper copy or metadata.

## Palette Extensions

The boards are visual direction boards, not complete interaction ramps. Add explicit primitives for:

- Green hover, active, border, and stronger soft-surface states.
- Ochre, violet, information, and danger surface/border treatments.
- Light and dark strong borders and disabled neutrals.
- Dark information and danger families, which are absent from the dark board.
- A neutral overlay color for dialogs and menus.

Extensions stay close to the source hues and use explicit colors rather than building core UI contrast from transparency. Transparency is reserved for the overlay, where compositing is the intended behavior.

## Semantic Inventory

### Foundations

- `--color-background-canvas`
- `--color-background-panel`
- `--color-surface`
- `--color-surface-raised`
- `--color-surface-muted`
- `--color-surface-hover`
- `--color-overlay`

### Text

- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-text-inverse`
- `--color-text-disabled`
- `--color-text-link`
- `--color-text-link-hover`

### Borders and focus

- `--color-border-subtle`
- `--color-border-default`
- `--color-border-strong`
- `--color-border-disabled`
- `--color-focus-ring`

### Actions and selection

- `--color-action-primary`
- `--color-action-primary-hover`
- `--color-action-primary-active`
- `--color-action-primary-disabled`
- `--color-action-on-primary`
- `--color-action-subtle`
- `--color-action-subtle-hover`
- `--color-selected`
- `--color-selected-hover`
- `--color-on-selected`

### Status families

Success, warning, danger, information, and neutral each receive foreground, surface, and border tokens. Success aliases the Household Green/Mint Action family because the approved design assigns green to ready and completed states as well as primary actions. Neutral covers waiting, inactive, and unknown states.

### Premium family

Premium receives foreground, hover, active, surface, and border tokens. These tokens are reserved for paid project-planning features and must not style ordinary chores, maintenance, or errands.

## Theme Behavior

Light mode remains the default root theme. Dark mode follows the existing `prefers-color-scheme: dark` behavior. The semantic API is compatible with a future explicit `data-theme` selector, but no theme-toggle behavior is added in this change.

Depth in light mode comes from surfaces, borders, and existing semantic shadows where needed. Depth in dark mode comes from the ordered surface scale: Night Worktop, Deep Panel, Raised Surface, then Soft Surface. Dark-mode components must not depend on shadows to distinguish elevation.

## Migration

Remove the unused starter variables `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, and `--social-bg`. Replace the remaining uses of `--text`, `--text-h`, `--bg`, and `--border` in `index.css` with the corresponding semantic tokens. Typography variables remain unchanged.

No compatibility aliases are needed because no other checked-in CSS or TSX file currently consumes the starter color tokens.

## Accessibility and Verification

- Normal text must reach at least 4.5:1 against its intended background.
- Large text and non-text UI boundaries must reach at least 3:1 where WCAG requires it.
- Status foreground/surface pairs must reach at least 4.5:1 when they render text.
- Status meaning must also be expressed with text or icons.
- Focus uses a visible solid outline and does not rely on a soft glow alone.
- Verification will include a production build, a token-usage search confirming removal of the starter names, and automated contrast calculations for the primary text and status pairings in both themes.

## Scope

This change updates the global token system and the existing global selectors in `index.css`. It does not build new components, add a theme toggle, or restyle routes that do not yet exist.
