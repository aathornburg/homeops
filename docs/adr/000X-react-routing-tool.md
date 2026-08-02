# [0003] - [React Routing Tool]

* **Date:** 2026-07-15
* **Status:** Proposed
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A

## Context
Naturally, a complex-enough React application will need to utilize routing. Unlike Angular, though, there is no built-in or opinionated way to route.

## Considered Options [From [Reddit](https://www.reddit.com/r/reactjs/comments/1klp8cr/react_router_v7_or_tanstack_router/)]
* **Option 1: React Router v7**
  * Description: A React routing library
  * Pros: Significant improvements over v6, especially with its framework mode, data APIs, and file-based routing support. It’s backed by Remix, so there’s a solid team behind it, and it feels like a natural evolution if you’re already in the React Router ecosystem.
  * Cons: Seems to be on a downtrend
* **Option 2: Tanstack router**
  * Description: Another React routing library
  * Pros: incredibly powerful and flexible, with more control over route definitions, loaders, and caching. It also promotes strong typesafety and full control over rendering strategies, which is attractive for more complex use cases. Small learning curve.
  * Cons: ???

## Decision Outcome
* **Chosen Option:** Option 2: Tanstack Router
* **Rationale:** Seems to be the go-forward option nowadays, with more features and better documentation

## Consequences
* **Positive, so-called "good" effects:** Should allow for cleaner routing logic; externalizes routing logic instead of re-writing it and storing it in the aplication
* **Negative, so-called "bad" effects:** Makes the application slightly heavier.
* **Mitigation Strategy:** N/A

> Note: including this to keep this initial ADR as a template.
## Pros and Cons of the Decision
*(Optional summary of the final selected option's impacts for quick scanning)*
* **Pros:**
  * [Pro 1]
* **Cons:**
  * [Con 1]
