# [0004] - [React UI Component Library]

* **Date:** 2026-08-08
* **Last Updated:** 2026-08-15
* **Status:** Accepted
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A
* **AI-consulted ADR:** Yes

## Context
HomeOps needs a consistent approach to UI controls, layout, typography, theming, and accessible interactions. A component library can reduce the time spent implementing and maintaining these concerns, leaving more time for React architecture and product behavior.

Using a component library creates coupling to its APIs, conventions, and release cycle. Restricting Mantine to complex controls while using native HTML and Tailwind for all basic layout would reduce some visible coupling, but it would also require the application to maintain two competing sets of UI conventions. A future migration away from Mantine would remain a significant project because the most expensive dependencies are behavior-heavy components, theming, focus management, overlays, forms, and responsive behavior—not simple layout components alone.

Enterprise applications commonly accept this coupling after selecting a design system or component library because consistency and delivery speed are more valuable than preserving a hypothetical low-cost migration path.

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

Mantine is an intentional, strategic dependency for the HomeOps web application. Its components will be used consistently when they provide an appropriate abstraction, including:

* Interactive controls such as buttons, inputs, comboboxes, menus, modals, and drawers.
* Layout primitives such as `Group`, `Stack`, `Container`, and `AppShell`.
* Typography and presentation primitives such as `Text`, `Title`, and `ThemeIcon`.

Native semantic HTML will still be used when the element's document meaning matters or when a Mantine component adds no useful behavior or convention. Examples include `main`, `nav`, `section`, `article`, headings, and forms. Mantine's polymorphic components may render these semantic elements where appropriate.

Tailwind remains available for application-specific styling, responsive composition, and custom visual treatments. It is not a parallel replacement for every Mantine layout or typography component. When a Mantine component clearly expresses the intended UI, using it is preferred over avoiding the dependency solely to make a hypothetical future migration easier.

HomeOps-specific components such as task rows, status chips, household selectors, and premium callouts will remain application components because they represent product concepts rather than generic UI controls. These components may compose Mantine primitives directly.

Mantine components will not be wrapped one-for-one merely to conceal the dependency. Local abstractions should represent repeated HomeOps behavior, design rules, or product concepts. If HomeOps later develops its own design system or adopts another library, that change will be treated as a deliberate migration rather than a constraint imposed on current development.

Adoption will be incremental. The first proof will be an Add Task dialog that exercises a modal, text input, select or combobox, date input, buttons, validation display, responsive layout, and both color schemes. Existing components will only migrate when feature work naturally touches them.

## Consequences
* **Positive, so-called "good" effects:** Controls, layout, and typography share one set of conventions. Developers write less routine styling and can compose interfaces faster. The application benefits from Mantine's accessibility behavior, responsive APIs, theme integration, and consistent component vocabulary.
* **Negative, so-called "bad" effects:** The application is intentionally coupled to Mantine's APIs and release cycle. Replacing Mantine would require changes across much of the UI. Mantine and Tailwind will coexist, which can cause inconsistent conventions or CSS-order problems if their responsibilities are unclear.
* **Mitigation Strategy:** Configure the Mantine theme and CSS layer order centrally. Prefer Mantine for reusable UI primitives and Tailwind for application-specific styling and composition. Keep product concepts in local components, avoid wrappers that only mirror Mantine's API, and test through accessible roles, labels, and visible behavior rather than Mantine class names or internal markup.

## Pros and Cons of the Decision
* **Pros:**
  * Provides styled, accessible components with minimal routine UI work.
  * Establishes consistent layout and typography conventions in addition to controls.
  * Leaves React feature architecture visible and owned by the application.
  * Fits the existing HomeOps identity better than Material UI.
  * Can be adopted incrementally without rewriting the current landing page.
* **Cons:**
  * Adds a second styling system alongside Tailwind.
  * Intentionally couples a broad portion of the UI to Mantine.
  * Is less familiar from an enterprise perspective than Material UI.
  * Requires deliberate dependency upgrades and clear styling boundaries.
