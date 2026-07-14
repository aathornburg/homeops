# [0000] - [Linting and Formatting Tools]

* **Date:** 2026-07-11
* **Status:** Proposed
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A

## Context
This monorepo contains a web application written in React and should take advantage of tooling that enforces linting and formatting rules such as accessibility, consistent spacing, etc. The most important factor for this choice - and many other architectural decisions - is to try to align these tools with what's most likely used at an enterprise level.

## Considered Options
* **Option 1: ESLint (Linting) + Prettier (Formatting)**
  * Description: These are standard tools for TypeScript projects in general. For example, ESLint is used at my company which uses Angular for almost all of our frontends.
  * Pros: Most common choice for enterprises. Both tools have existed for a long time and have plenty of documentation around them.
  * Cons: Two tools to accomplish this task. These tools can run slowly and require a good amount of configuration.
* **Option 1: Biome**
  * Description: This is a newer option, written in Rust, compared to ESLint and Prettier and handles both linting and formatting.
  * Pros: One tool handles both linting and formatting. It's also much faster and requires much less standard configuration to get you 95% of the way to the point that ESLint + Prettier can get you to.
  * Cons: It's newer so it's probably not being utilized in brownfield enterprise-level React applications.

## Decision Outcome
* **Chosen Option:** Option 1: ESLint (Linting) + Prettier (Formatting)
* **Rationale:** As mentioned above, the most important factor was using tools that are enterprise-grade. While Biome seems to be a great option and the path of least resistance, it's not as commonly used at an enterprise-level as ESLint and Prettier.

## Consequences
* **Positive, so-called "good" effects:** Utilizing enterprise-grade tools to enforce standard linting and formatting rules.
* **Negative, so-called "bad" effects:** Need to spend additional effort to determine the correct configuration for these tools.
* **Mitigation Strategy:** Front load the research to determine the correct configuration. Or simply do not use these tools.

> Note: including this to keep this initial ADR as a template.
## Pros and Cons of the Decision
*(Optional summary of the final selected option's impacts for quick scanning)*
* **Pros:**
  * [Pro 1]
* **Cons:**
  * [Con 1]
