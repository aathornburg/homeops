# [0002] - [CSS Framework]

* **Date:** 2026-07-12
* **Status:** Proposed
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A

## Context
The web application can utilize a CSS framework to make styling easier. This is not a required decision, as styles can just be defined as regular CSS/SCSS, but there are existing CSS frameworks that can be utilized to reduce copy/paste styles and speed up development. The standard is defined as Tailwind.

## Considered Options
* **Option 1: Tailwind**
  * Description: A commonly-used framework that generalizes CSS styles as CSS classes.
  * Pros: Eliminates copy/paste of CSS styles. Also makes it easier to make slightly-different versions of styles for an already-existing component. Familiar with it from food-finder app/repo.
  * Cons: Pushes styles into the template and can cause very long lines of code when many styles are used

## Decision Outcome
* **Chosen Option:** Option 1: Tailwind
* **Rationale:** This is an enterprise-grade CSS framework that I'm familiar with.

## Consequences
* **Positive, so-called "good" effects:** Should speed up style development
* **Negative, so-called "bad" effects:** May miss out on learning other enterprise-level style standards that isn't part of Tailwind
* **Mitigation Strategy:** N/A

> Note: including this to keep this initial ADR as a template.
## Pros and Cons of the Decision
*(Optional summary of the final selected option's impacts for quick scanning)*
* **Pros:**
  * [Pro 1]
* **Cons:**
  * [Con 1]
