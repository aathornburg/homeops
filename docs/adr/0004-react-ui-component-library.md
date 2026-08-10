# [0004] - [React UI Component Library]

* **Date:** 2026-08-08
* **Status:** Proposed
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A
* **AI-consulted ADR:** Yes

## Context
In order to save time - and potentially mirror enterprise applications, where they often have their own library - HomeOps will use a UI library. This way, I won't have to create my own custom components and ensure that they are functional and accessible.

## Considered Options
* **Option 1: Material UI**
  * Description: A comprehensive React component library that implements Google's Material Design and is similar to Angular Material.
  * Pros: Familiar coming from Angular Material. Mature, enterprise-grade, and includes a broad set of production-ready components. Supports React 19, Vite, theming, and integration with Tailwind CSS.
  * Cons: Its Material Design language is immediately recognizable and feels too much like a Google product for HomeOps. It also introduces Emotion and a theme system that would need to coexist with Tailwind and the existing HomeOps tokens.
* **Option 2: Mantine**
  * Description: A comprehensive React component library with styled components and additional packages for common needs such as dates, forms, and hooks.
  * Pros: Provides complete components without requiring routine styling work. Its default appearance is more neutral than Material UI and can fit the HomeOps identity with a relatively small theme. It supports Vite, light and dark color schemes, CSS variables, global component defaults, and predictable style overrides.
  * Cons: It is likely less common in enterprise applications than Material UI. It introduces another styling system alongside Tailwind and makes the application dependent on Mantine's component APIs and release cycle.
* **Option 3: Headless Primitives or Source-Distributed Components**
  * Description: Use unstyled primitives such as Radix or React Aria, or copy styled component source into the repository through a tool such as shadcn/ui.
  * Pros: Provides the most control over markup and design. Headless primitives handle difficult accessibility and interaction behavior, while source-distributed components provide customizable starting points.
  * Cons: Requires the application to own more styling and component maintenance. This would shift time toward creating a component library instead of learning the React application architecture behind HomeOps features.

## Decision Outcome
* **Chosen Option:** Option 2: Mantine
* **Rationale:** Mantine provides the best balance between finished UI components and a neutral visual identity. It avoids spending a significant amount of time deciding details such as button padding and input states, while still allowing the existing HomeOps colors, typography, radii, and light and dark themes to be applied globally. This keeps the focus on learning React composition, routing, state ownership, feature boundaries, data flow, and testing.

Mantine will be used for generic UI controls and app-shell primitives. Tailwind will continue to be used for page layout and the existing custom marketing pages. HomeOps-specific components such as task rows, status chips, household selectors, and premium callouts will remain application components because they represent product concepts rather than generic UI controls.

Adoption will be incremental. The first proof will be an Add Task dialog that exercises a modal, text input, select or combobox, date input, buttons, validation display, responsive layout, and both color schemes. Existing components will only migrate when feature work naturally touches them.

## Consequences
* **Positive, so-called "good" effects:** Common controls will be available without building and styling them from scratch. The application can retain the HomeOps identity through one shared Mantine theme. More development time can be spent on React feature architecture and product behavior.
* **Negative, so-called "bad" effects:** Mantine and Tailwind will coexist, which can create unclear ownership or CSS-order problems if their responsibilities are not kept separate. The application also becomes dependent on Mantine and may need migration work for future major releases.
* **Mitigation Strategy:** Configure the Mantine theme and CSS layer order once. Use Mantine for generic controls, Tailwind for layout and custom marketing surfaces, and local components for HomeOps product concepts. Avoid per-instance style overrides and avoid wrapping every Mantine component without a repeated product requirement. Tests should use accessible roles, labels, and visible behavior instead of Mantine class names or internal markup.

## Pros and Cons of the Decision
* **Pros:**
  * Provides styled, accessible components with minimal routine UI work.
  * Leaves React feature architecture visible and owned by the application.
  * Fits the existing HomeOps identity better than Material UI.
  * Can be adopted incrementally without rewriting the current landing page.
* **Cons:**
  * Adds a second styling system alongside Tailwind.
  * Is less familiar from an enterprise perspective than Material UI.
  * Requires deliberate dependency upgrades and clear styling boundaries.
