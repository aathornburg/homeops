---
name: HomeOps
description: A friendly household clipboard that can mature into a calm operating console.
colors:
  ink: "#1F2523"
  text: "#4F5D58"
  muted: "#6F7C76"
  canvas: "#FAFAF8"
  surface: "#FFFFFF"
  panel: "#F2F5F1"
  border: "#DDE4DE"
  primary: "#2F6F5E"
  primary-soft: "#E5F1EC"
  accent: "#7A5C2E"
  info: "#4267A3"
  warning: "#9A5B1F"
  danger: "#A8423D"
  premium: "#6F55A3"
typography:
  display:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "40px"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Nunito Sans', system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.16
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Nunito Sans', system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 620
    lineHeight: 1.25
  body:
    fontFamily: "'Nunito Sans', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Nunito Sans', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.25
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  chip-status:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card-task:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
---

# Design System: HomeOps

## 1. Overview

**Creative North Star: "The Helpful Home Clipboard"**

HomeOps should feel like the shared household clipboard on the kitchen counter: clear, current, plain-spoken, and easy for anyone in the home to act on. The default experience is friendly and approachable, with enough structure underneath to grow into a more information-dense console for power users later.

This is a HomeOps seed design system, not an extraction from the current Vite starter UI. The existing starter styling has no product meaning and should be ignored when making future design decisions.

The visual philosophy is restrained product UI with a warmer human edge. Avoid an over-optimized enterprise dashboard, a technical admin console, or a power-user productivity tool that hides basic actions behind dense configuration.

**Key Characteristics:**
- Friendly by default, never childish.
- Plain-language controls before productivity jargon.
- Calm task surfaces with visible status, ownership, and due timing.
- Density can increase through a future view setting without changing brand identity.
- Premium project planning gets a distinct accent, but the free chore and maintenance core stays primary.

## 2. Colors

The HomeOps palette is a quiet household utility palette: clean neutral surfaces, a green primary for everyday action, practical semantic colors, and one premium accent reserved for future project planning.

### Primary
- **Household Green**: The primary action and selection color. Use for the main CTA, active navigation, selected filters, ready states, and household setup progress.
- **Soft Household Green**: A low-emphasis background for selected chips, status badges, and gentle confirmation panels.

### Secondary
- **Clipboard Ochre**: A restrained supporting accent for due-soon highlights, maintenance reminders, and small moments where the app should feel practical rather than clinical.

### Tertiary
- **Project Violet**: Reserved for future premium project planning. Do not use it for ordinary chore management.
- **Steady Blue**: Use for informational states, calendar context, and neutral system guidance.

### Neutral
- **Worktop Ink**: Primary text and strong icons.
- **Readable Slate**: Body text and secondary labels.
- **Quiet Slate**: Metadata, timestamps, and helper copy.
- **Clean Canvas**: App background.
- **Task Surface**: Cards, panels, dialogs, and form controls.
- **Soft Panel**: Sidebars, toolbar bands, empty-state panels, and inactive navigation regions.
- **Household Border**: Dividers, input strokes, and low-emphasis card boundaries.

### Named Rules

**The Friendly Restraint Rule.** Green is the main product color, but it should occupy less than 10 percent of a normal task screen. Its job is to identify action and state, not decorate the interface.

**The Premium Reservation Rule.** Violet is forbidden for core chores, maintenance, and errands. It only appears when a future project-planning feature is explicitly premium or outcome-based.

## 3. Typography

**Display Font:** Fraunces, Georgia, serif
**Body Font:** Nunito Sans, system-ui, sans-serif
**Label/Mono Font:** ui-monospace, Consolas, monospace for code-like developer artifacts only

**Character:** Fraunces gives the landing page, wordmark, and occasional brand moments a cozy household voice. Nunito Sans carries the everyday product UI so tasks, settings, forms, and navigation feel friendly and easy to read. Do not use display-font theatrics in labels, tables, filters, or forms.

### Hierarchy
- **Display** (650, 40px, 1.08): Use Fraunces sparingly for the landing page hero, wordmark, and major onboarding moments.
- **Headline** (650, 28px, 1.16): Use for page titles, setup steps, and major authenticated app sections.
- **Title** (620, 20px, 1.25): Use for task cards, panel headings, form sections, and list groups.
- **Body** (400, 16px, 1.5): Use for descriptions, task notes, empty-state copy, and guidance. Keep prose to 65-75ch.
- **Label** (650, 13px, 1.25): Use for field labels, filter labels, badges, and compact metadata. Do not uppercase labels by default.

### Named Rules

**The Plain Words Rule.** Use household language first: "Due soon", "Blocked by weather", "Assigned to Maya", not system-first language like "dependency state" or "workflow status".

**The No Fluid Type Rule.** Product UI type uses fixed rem or px steps. Responsive behavior changes layout and density, not the meaning of the type scale.

## 4. Elevation

HomeOps is flat by default and layered by structure. Depth comes from surface color, borders, spacing, and the occasional soft shadow on floating UI. Task cards should feel placed on a work surface, not like glossy SaaS tiles.

### Shadow Vocabulary
- **Lifted Surface** (`0 8px 20px rgba(31, 37, 35, 0.08)`): Use for popovers, menus, and transient overlays.
- **Focus Glow** (`0 0 0 3px rgba(47, 111, 94, 0.18)`): Use with a visible outline or border change on interactive focus.
- **Hover Lift** (`0 4px 8px rgba(31, 37, 35, 0.06)`): Optional for clickable task cards in comfortable density only.

### Named Rules

**The Flat Until Needed Rule.** Surfaces rest flat. Shadows appear for interaction, focus, floating layers, or clear hierarchy. Never pair a decorative wide shadow with a 1px ghost-card border.

## 5. Components

Components should feel like familiar household tools: obvious, steady, and forgiving. Every interactive component needs default, hover, focus-visible, active, disabled, loading, and error states before it is considered complete.

### Buttons
- **Shape:** Gently curved rectangle (8px radius).
- **Primary:** Household Green background, white text, 10px by 16px padding, medium-bold label.
- **Hover / Focus:** Hover darkens the green slightly. Focus uses a visible 2px outline plus Focus Glow.
- **Secondary / Ghost / Tertiary:** Secondary buttons use white surface, Household Border, Worktop Ink, and no shadow. Ghost buttons are text-colored with a soft panel hover.

### Chips
- **Style:** Pill shape (999px radius), compact padding, and semantic background. Filter chips should be readable before colorful.
- **State:** Selected chips use Soft Household Green with Household Green text. Warning chips use a pale ochre tint with Clipboard Ochre text. Premium chips may use a pale violet tint only for project features.

### Cards / Containers
- **Corner Style:** Rounded but not plush (12px radius).
- **Background:** Task Surface for cards, Soft Panel for sidebars and inactive bands.
- **Shadow Strategy:** Flat at rest. Clickable cards may use Hover Lift in comfortable density.
- **Border:** Household Border at 1px for separation.
- **Internal Padding:** 16px default, 12px in compact mode, 24px for major empty states.

### Inputs / Fields
- **Style:** White surface, 1px Household Border, 8px radius, 10px by 12px padding.
- **Focus:** Household Green border plus Focus Glow. Do not rely on color alone; keep the outline visible.
- **Error / Disabled:** Error uses Danger Red for border and message. Disabled uses Soft Panel background and Quiet Slate text.

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.** Default navigation should be plain, readable, and structural. Active states use Household Green text and a Soft Household Green background. On mobile, collapse navigation into a simple bottom or top-level pattern before introducing dense sidebars.

### Task Row

Task rows are the signature product primitive. They should show the task name, status, due timing, owner, and one clear next action without forcing users into a detail page. Comfortable mode can use card-like rows; future power-user mode can tighten spacing and show more columns while preserving the same color and type tokens.

## 6. Do's and Don'ts

### Do:
- **Do** make the default mode feel like The Helpful Home Clipboard: readable, human, and obvious.
- **Do** support a future Calm Household Console mode through density, columns, and saved views, not a different visual brand.
- **Do** use Household Green for primary actions, current selection, and meaningful ready/complete signals.
- **Do** reserve Project Violet for future premium project planning.
- **Do** use plain-language empty states that teach the next household action.
- **Do** keep focus states visible and WCAG AA contrast intact.

### Don't:
- **Don't** make HomeOps feel like an over-optimized enterprise dashboard.
- **Don't** make it feel like a technical admin console.
- **Don't** make it feel like a power-user productivity tool that hides basic actions behind dense configuration.
- **Don't** use decorative gradient text, glassmorphism, oversized hero metrics, or generic identical icon-card grids.
- **Don't** use full-saturation accents on inactive states.
- **Don't** use Project Violet for free core chores, maintenance, or errands.




