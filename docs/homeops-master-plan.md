# HomeOps Master Plan

A hands-on enterprise React learning project built around a personally useful household task and project manager.

## 1. Project Purpose

HomeOps is a household task/project management app designed to be useful at home while intentionally exercising enterprise-level frontend and backend architecture decisions.

The goal is not to build the smallest possible to-do app. The goal is to build a realistic application where decisions around routing, state management, data fetching, forms, validation, backend technology, persistence, security, scheduling, and API contracts are made deliberately and documented.

## 2. Core App Concept

HomeOps manages household work such as chores, home maintenance, lawn care, errands, recurring tasks, project planning, and shared household responsibilities.

Example tasks:

- Change HVAC filter
- Flush water heater
- Overseed front lawn
- Clean litter boxes
- Check crawlspace after heavy rain
- Schedule contractor estimate
- Buy grass seed
- Aerate lawn
- Mow before overseeding

The app should support richer planning than a basic to-do list.

Core concepts:

- Tasks
- Projects
- Dependencies
- Due dates
- Due windows
- Recurring tasks
- Blocked/ready status
- Household areas
- Labels/categories
- Assignees
- Notifications
- Audit/activity history
- Calendar planning

## 3. Target Architecture

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- MSW
- Vitest
- React Testing Library
- Playwright
- Redux Toolkit only for complex client workflow state

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Security eventually
- Spring Data JPA
- PostgreSQL
- OpenAPI
- Generated TypeScript client eventually

### State Management Rules

Use the right tool for the type of state.

| State Type | Examples | Preferred Tool |
|---|---|---|
| Local UI state | Modal open, selected tab, form field visibility | `useState`, `useReducer` |
| Low-frequency shared UI state | Theme, current household, sidebar state | Context |
| Server state | Tasks, projects, users, notifications | TanStack Query |
| Complex unsaved workflow state | Multi-step planning wizard | Redux Toolkit |
| Form state | Create/edit task, recurrence form | React Hook Form |
| URL state | Filters, search, selected status, pagination | React Router search params |

Important rule:

> Do not put server data in Redux by default. Use TanStack Query for server state. Use Redux Toolkit only when the app has complex client-owned workflow state.

## 4. Key Architecture Decisions

### React over Angular

React is chosen because the learning goal is enterprise React architecture. Angular would be a reasonable enterprise choice, but it provides more built-in structure. React requires explicit decisions around routing, state, forms, data fetching, project structure, and testing.

### Vite SPA over Next.js

HomeOps is an authenticated home productivity app. SEO is not important. SSR is not required. A Vite SPA keeps the architecture simpler while still teaching enterprise React patterns.

### Spring Boot over Express

Express would be enough for a lightweight personal task app. Spring Boot is chosen because the goal is enterprise backend learning: layered architecture, validation, transaction boundaries, security, JPA, OpenAPI, migrations, and production conventions.

### PostgreSQL over MongoDB

Tasks, projects, dependencies, users, households, labels, recurrence rules, and audit history form a relational domain. PostgreSQL is the best default because constraints, joins, transactions, and reporting matter.

### Feature-first frontend structure

Organize by domain/feature rather than technical type.

Recommended structure:

```txt
src/
  app/
    App.tsx
    router.tsx
    providers.tsx
  features/
    tasks/
      api/
      components/
      hooks/
      pages/
      types.ts
    projects/
      api/
      components/
      hooks/
      pages/
      types.ts
    calendar/
    notifications/
    household/
  shared/
    ui/
    api/
    auth/
    utils/
```

This mirrors enterprise Java package thinking: group around business capabilities, not just technical layers.

## 5. Core Domain Model

Initial domain objects:

- Household
- User
- HouseholdMember
- Task
- Project
- TaskDependency
- TaskComment
- TaskLabel
- TaskRecurrenceRule
- TaskActivity
- NotificationPreference

Possible task fields:

```txt
id
title
description
status
priority
dueDate
dueWindowStart
dueWindowEnd
scheduledDate
estimatedMinutes
area
category
assigneeId
projectId
createdAt
updatedAt
completedAt
```

Suggested task statuses:

```txt
BACKLOG
READY
BLOCKED
IN_PROGRESS
WAITING
DONE
CANCELLED
```

Status rules:

- A task with incomplete dependencies is BLOCKED.
- A task with no incomplete dependencies can be READY.
- A task can be WAITING when blocked by time, weather, shipping, a contractor, or someone else.
- The backend should eventually own authoritative status calculation.
- The frontend can derive display hints but should not be the source of truth for business rules.

## 6. Project Roadmap

### Version 0 — React Basics

Goal: Build the first usable UI without over-engineering.

Features:

- React + TypeScript + Vite app
- Basic routing
- Task list
- Task detail
- Create/edit task
- Hardcoded data
- Feature-first folders
- Initial ADRs

Do not add Redux yet.
Do not add Spring Boot yet.
Do not add PostgreSQL yet.

Learning goal:

> Can I build a clean React feature without importing enterprise tools before they are justified?

### Version 1 — Real Frontend Architecture

Goal: Add realistic frontend infrastructure.

Features:

- React Router
- Shared layout/navigation
- Shared UI components
- MSW mock API
- TanStack Query
- React Hook Form
- Zod validation
- Basic unit/component tests

Learning goal:

> Can I distinguish local UI state, form state, URL state, and server state?

### Version 2 — Workflow Complexity

Goal: Add features that justify deeper architecture.

Features:

- Task dependencies
- Blocked/ready status
- Dependency list
- Unblocks list
- Task planning wizard
- Redux Toolkit for unsaved multi-step planning state
- Activity history

Learning goal:

> Can I explain when Redux Toolkit is justified and when it is not?

### Version 3 — Backend

Goal: Replace mocks with a real enterprise-style backend.

Features:

- Spring Boot API
- PostgreSQL database
- Task CRUD endpoints
- Project endpoints
- Dependency endpoints
- Validation
- Transaction boundaries
- OpenAPI documentation
- Generated TypeScript client

Learning goal:

> Can I integrate React with a Java/Spring backend through a stable API contract?

### Version 4 — Enterprise Features

Goal: Add cross-cutting concerns common in enterprise apps.

Features:

- Authentication
- Household sharing
- Role-based permissions
- Recurring tasks
- Scheduled jobs
- Notifications
- Audit/activity history
- Error handling standards
- Observability/logging

Learning goal:

> Can I separate frontend authorization as UX from backend authorization as enforcement?

### Version 5 — Advanced Architecture

Goal: Add advanced design discussions and optional complex features.

Features:

- Calendar integration
- Weather-aware tasks
- Attachments
- Search
- Feature flags
- Deployment pipeline
- Event-driven notification design
- Microfrontend evaluation document

Learning goal:

> Can I evaluate architecture patterns without applying them prematurely?

## 7. First 10 Tickets

### HOMEOPS-001 — Create frontend app

Create a React + TypeScript + Vite app.

Acceptance criteria:

- App runs locally
- TypeScript enabled
- Basic linting/formatting configured
- Initial README exists

### HOMEOPS-002 — Add ADR folder

Create:

```txt
docs/adr/
```

Add initial ADRs:

- `0001-use-react-over-angular.md`
- `0002-use-vite-spa-over-nextjs.md`
- `0003-plan-spring-boot-backend.md`

### HOMEOPS-003 — Add routing

Routes:

```txt
/
/tasks
/tasks/:taskId
/projects
/projects/:projectId
/calendar
/settings
```

Acceptance criteria:

- Routes work
- Navigation exists
- Unknown route shows a not-found page

### HOMEOPS-004 — Create shared layout

Build:

- App shell
- Header
- Sidebar or top nav
- Main content region

Acceptance criteria:

- Layout is reusable
- Routes render inside layout

### HOMEOPS-005 — Create task model and hardcoded data

Create a `Task` type and seed data.

Acceptance criteria:

- At least 10 realistic household tasks
- Include statuses, due dates, categories, and priorities

### HOMEOPS-006 — Build task list page

Features:

- List tasks
- Filter by status
- Filter by category
- Sort by due date

Acceptance criteria:

- Filtering works
- Sorting works
- Empty state exists

### HOMEOPS-007 — Build task detail page

Features:

- Show task title, description, status, priority, due date, category
- Show placeholder sections for dependencies and activity

Acceptance criteria:

- Route uses task id
- Not-found state exists for invalid task id

### HOMEOPS-008 — Build create task page

Start with simple local form state.

Fields:

- Title
- Description
- Due date
- Priority
- Category

Acceptance criteria:

- Can create a task in client state
- Basic required validation exists

### HOMEOPS-009 — Refactor into feature-first structure

Move task code into:

```txt
features/tasks/
```

Acceptance criteria:

- Task pages/components/hooks/types are grouped by feature
- Shared reusable pieces live in `shared/`

### HOMEOPS-010 — Add initial tests

Tests:

- Task list renders
- Status filter works
- Category filter works
- Task detail renders valid task
- Invalid task id shows not-found state

Acceptance criteria:

- Tests run from command line
- Tests do not depend on implementation details

## 8. ADR List

Recommended ADRs to create over time:

```txt
0001-use-react-over-angular.md
0002-use-vite-spa-over-nextjs.md
0003-plan-spring-boot-backend.md
0004-use-feature-first-frontend-structure.md
0005-use-msw-before-real-backend.md
0006-use-tanstack-query-for-server-state.md
0007-do-not-use-redux-for-api-cache.md
0008-use-redux-toolkit-for-planning-wizard.md
0009-use-react-hook-form-and-zod.md
0010-use-spring-boot-over-express.md
0011-use-postgresql-over-mongodb.md
0012-use-openapi-generated-client.md
0013-backend-owns-task-status-rules.md
0014-use-scheduled-jobs-for-recurrence.md
0015-use-activity-table-for-audit-history.md
0016-defer-microfrontends.md
```

## 9. Example ADR Template

```md
# ADR 0000: Title

## Status

Accepted

## Context

What problem are we solving? What constraints matter?

## Decision

What are we choosing?

## Options Considered

### Option A

Pros:

- ...

Cons:

- ...

### Option B

Pros:

- ...

Cons:

- ...

## Consequences

What becomes easier?
What becomes harder?
What might we revisit later?
```

## 10. Suggested Initial README Summary

```md
# HomeOps

HomeOps is a household task and project management application built as a hands-on enterprise React learning project.

It is intentionally more architected than a lightweight personal to-do app. The goal is to practice enterprise frontend and backend decisions using React, TypeScript, Spring Boot, PostgreSQL, OpenAPI, and related production-style patterns.

## Learning Goals

- Build a React app using enterprise-friendly architecture
- Compare React decisions to Angular/Java patterns
- Use TanStack Query for server state
- Use Redux Toolkit only when complex client workflow state justifies it
- Integrate with a Spring Boot backend
- Model task dependencies, recurrence, notifications, and audit history
- Document architecture decisions with ADRs
```

## 11. Guiding Principle

Do not add enterprise tools just because they are common in enterprise apps.

Add them when the app reaches the problem they solve.

Examples:

- Add TanStack Query when mock API/server data appears.
- Add React Hook Form when form complexity appears.
- Add Redux Toolkit when a multi-step unsaved workflow appears.
- Add Spring Boot when replacing mock APIs with real backend behavior.
- Add PostgreSQL when persistence and relationships matter.
- Add scheduled jobs when recurrence or reminders need background processing.
- Add events/queues only when synchronous flows become insufficient.

## 12. Final Target

HomeOps should become:

> A household task/project manager with dependencies, recurring tasks, due windows, blocked states, household sharing, notifications, audit history, and calendar planning.

It should be personally useful while serving as a realistic enterprise React and Spring Boot reference project.
