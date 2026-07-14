# [0000] - [Web Framework]

* **Date:** 2026-07-12
* **Status:** Proposed
* **Deciders:** Alan
* **Consulted:** N/A
* **Informed:** N/A

## Context
This monorepo contains a web application that will include a pre-auth landing page and a post-auth application that will allow for an enhanced "todo" experience focused on managing house chores. Given that the focus of this repository is to learn enterprise-grade tooling, languages, technology, and processes, a natural choice is to decide with web framework to use to develop the application.

## Considered Options
* **Option 1: React**
  * Description: An unopinionated framework for developing web applications.
  * Pros: Very common framework for enterprises. Unopinionated nature means there will be many decisions that provide the opportunity to learn about standard enterprise architecture.
  * Cons: Not the most optimized for SEO due to it being rendered client side. Very unopinionated nature means many decisions need to be made regarding how to accocmplish certain features, like routing.
* **Option 1: NextJs**
  * Description: A framework that utilizes React and provides an opinionated way to create SSR applications.
  * Pros: SSR (Server-Side Rendering) is more optimized for SEO. The opinionated nature means that development can be started sooner as less decisions will need to be made.
  * Cons: Its opinionated nature does mean less decisions - and therefore experience and wisdom - for a React web application. Plus, an entire application that uses SSR will not be efficient for the client.

## Decision Outcome
* **Chosen Option:** Option 1: React with Option 2: NextJs being used for any pre-authorization/marketing pages.
* **Rationale:** Learning React first will let me make many decisions, giving me exposure to a decision tree that would be encountered in an enterprise setting. And, learning React first should make learniing NextJs even easier to learn when it's used down the line for marketing pages.

## Consequences
* **Positive, so-called "good" effects:** Making decisions will give me solid exposure to enterprise-level web decisions for a React application. React is a very common framework for enterprise web apps. Learning NextJs down the line will be easier after learning React and making technical decisions regarding this application.
* **Negative, so-called "bad" effects:** Utilizing two frameworks ultimately means more time is spent learning and makiing decisions, taking time away from development.
* **Mitigation Strategy:** Fully create the application in React, as there won't be very many pre-auth/marketing pages in the first few versions of the app.

> Note: including this to keep this initial ADR as a template.
## Pros and Cons of the Decision
*(Optional summary of the final selected option's impacts for quick scanning)*
* **Pros:**
  * [Pro 1]
* **Cons:**
  * [Con 1]
