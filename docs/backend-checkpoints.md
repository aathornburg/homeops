# Backend development checkpoints

Created: 2026-10-07

## Outcome and working agreement

First outcome: edit an existing task, reload the page, and see the saved changes from PostgreSQL through the Spring Boot API.

Work one explained step at a time. The developer writes all application, configuration, and test code; the assistant explains, reviews, verifies, and maintains these notes. Update this checklist as evidence establishes completion. Do not treat recommendations as accepted decisions or completed work.

The user approved starting backend planning before finishing the original Version 1/2 frontend roadmap. Those learning goals remain deferred, not complete. Do not require disposable mock persistence or additional frontend features before backend work.

## Current stopping point

**Latest: October 12 checkpoint.** October 11's supplied error identified a V2 checksum mismatch, rather than an established V3 SQL failure. The developer's DBeaver results match the current V2 columns and constraints. A guarded local Flyway repair helper now exists at infra/postgres/flyway-repair.sh, with root db:repair script and apps/api/flyway.conf. Execution and successful validation/startup remain unverified. Resume by confirming whether repair was already performed; otherwise inspect Flyway info for the expected V1/V2/V3 before the previously discussed repair, then restart the configured API and verify history. Repair updates history metadata; it does not apply edited SQL. Detailed October 11 guidance is in the session handoff. Preserve developer authorship and step-by-step Flyway teaching.

October 8: Spring Boot application now exists at apps/api, using Maven, Java 21, Spring Boot 4.1.1, and package com.thornstack.homeops. The developer added Actuator and demonstrated GET /actuator/health in Bruno returning HTTP 200 with status UP (screenshot evidence). No task controller or persistence exists yet. Next: define the task-read response using the existing frontend TaskApiDto, then implement the real read path in small explained steps. Preserve developer authorship.

Existing master-plan direction: Java, Spring Boot, Spring Web, Spring Data JPA, PostgreSQL, OpenAPI, eventually a generated TypeScript client and Spring Security. Initial Java/Boot versions and Maven are now selected; migration tooling, detailed package structure, and endpoint semantics remain to be settled. Runnable-foundation checkpoint remains partial until database, migrations, and integration verification are in place.

## Checkpoints

- [ ] **1. Architecture and first API contract.** Record the backend ADR and the read/update contract. Discuss application structure, build tool, schema migration tool, validation, errors, date/null semantics, and rich-text instructions. Done when these decisions and the first slice's limits are documented. Keep request IDs distinct from response display objects.
- [ ] **2. Runnable foundation.** Scaffold the agreed backend location, start Spring Boot with a local PostgreSQL database, apply an initial versioned migration, and establish integration testing. Done when another session can follow documented setup and verify startup and database access. Resolve Java/tool versions at this checkpoint using current official documentation.
- [ ] **3. Persistent task reads and updates.** Implement only the task data and household/member/project relationships needed by the existing UI. Include server-side validation, transaction boundaries, consistent errors, and API documentation. Verify valid persistence and rejected invalid/missing references. Done when API reads observe saved updates and integration checks pass.
- [ ] **4. Frontend integration.** Connect task reads and updates to the real API, refresh/update shared query data, and transition to view mode only after success. Explicitly decide how existing completion/Undo and member/project options obtain consistent data; do not silently mix incompatible mock and real IDs. Done when an edit survives page reload and error handling preserves the draft.
- [ ] **5. Acceptance and handoff.** Exercise pending, failure/retry, keyboard interaction, and task switching during saves; run appropriate frontend/backend checks and document how to resume. Manual testing was deferred by the user on October 7 and remains open.

## Scope boundaries

The initial backend is a single-household development setup, as specified by Version 3 of the master plan. Production multi-household use waits for authentication, tenant enforcement, and authorization. Binder, dependencies, planning wizard, audit history, scheduling, and broader enterprise features remain later milestones. Avoid requiring the entire future domain before completing the first persistent task slice.

## Frontend baseline

The task edit form validates native fields and constructs UpdateTaskInput with IDs, nullable dates/project, and Tiptap JSON instructions. It awaits onSave, shows a blur/loader overlay via isSubmitting, catches save failures visibly, and retains the draft. Native fields, toolbar, Save, Cancel, and Close disable during submission; an effect toggles Tiptap editability. No success transition or real persistence exists.

Latest October 7 lint and production build passed; the existing chunk-size warning remains. Browser pending/error behavior is unverified. Disabled controls are not evidence that all rapid duplicate submissions or navigation races are handled.

## References

- [Master plan](homeops-master-plan.md): original stack, rationale, and Version 3/4 scope.
- [Session handoff](design/homeops-landing-app-shell-handoff.md): detailed teaching and session history.
- [Architecture decisions](adr/): existing ADR convention; no backend ADR yet.

## Startup clarification - 2026-10-08

The developer clarified that the immediate need is creating and running the Spring Boot application, before discussing feature/package structure. Start with Spring Initializr and a minimal Spring Web application; do not gate initial scaffolding on a completed architecture ADR. Recommended generator choices (not yet accepted): Maven, Java 21 (local java reports 21.0.11), current stable Spring Boot, Jar, properties configuration, group com.homeops, artifact/name homeops-api, package com.homeops, location apps/api. Add database dependencies and migration setup in the following slice. First checkpoint is a running embedded web server; domain endpoints and database persistence come afterward. Earlier ordering should be read with this clarification.

## End-of-day checkpoint - 2026-10-08

Backend scaffold and Actuator health request are working per the developer's Bruno screenshot. Three records now exist in tasks.api: TaskAssigneeResponse, TaskProjectResponse, and partial TaskResponse (taskId, title, assignee, project, isBlocked, blockedDescription). Next session: continue TaskResponse with status first, then dates, capabilities, and rich-text instructions. Do not repeat the completed first six components. Detailed resume guidance and verification limits are in the October 8 Session End section of docs/design/homeops-landing-app-shell-handoff.md. No backend build/test run by the assistant yet; no commit or push. Task API/persistence and the overall runnable-foundation checkpoint remain incomplete.

## End-of-day checkpoint - 2026-10-09

Response DTO and frontend lifecycle timestamp alignment are implemented. Local PostgreSQL 18.6 is running through root compose.yml and db:* npm scripts. Bootstrap roles/schema verified; user reports separate DBeaver credential connections working. Next: add JPA, PostgreSQL driver, Boot 4 Flyway starter and PostgreSQL Flyway module, then wire separate application/migration credentials in Spring Boot and IntelliJ. This integration is not implemented yet (pom still Web MVC/test/Actuator; application.properties only application name). Detailed ready-to-resume configuration is in October 9 Session End in the session handoff. Checkpoints 1/2 remain partial; no domain tables or persistence. Managed Kubernetes accepted as deployment-learning direction. No shutdown tests, commit or push.

## Database wiring checkpoint - 2026-10-10

Developer added all four dependencies and the externalized datasource/JPA/Flyway properties, and reports IntelliJ environment-variable setup complete. Maven offline compile passes. Frontend obsolete imports are removed; fresh lint and TypeScript checks pass. The local port-8080 health endpoint returns HTTP 200/status UP, but the running process's identity and use of the new configuration were not established; database initialization is not yet independently confirmed. Next: restart HomeopsApiApplication from the configured IntelliJ run configuration and confirm Flyway/PostgreSQL and JPA initialization in the startup log. Then design the first meaningful domain migration. PostgreSQL driver and Flyway PostgreSQL module currently use default compile scope; runtime scope is the intended dependency cleanup. No credentials read, application/test edits, commit or push by the assistant. Context test was not rerun with the new database configuration because IntelliJ's run environment is not inherited by the shell.

### Startup confirmation and next slice

Developer responded "Looks good!" to the startup verification step; treat startup as user-confirmed, without claiming independently inspected logs. The next deliverable is the initial domain migration under apps/api/src/main/resources/db/migration. No migration file currently exists. Recommended scope, not yet an accepted schema: household, household_member, project and task tables sufficient for the current read/update contract. Decide identifiers and relationship constraints before writing SQL; keep response capabilities derived rather than stored. Include application-role table permissions because the bootstrap grants schema USAGE only. Completion criteria: Flyway applies the migration once, a subsequent restart leaves it unchanged, and DBeaver verifies the resulting tables and intended application access. Seed data, JPA mappings, task endpoints and integration tests follow as coherent steps; do not mark the runnable-foundation checkpoint fully complete yet.

### First migration applied - 2026-10-10

Developer requested close, step-by-step guidance for Flyway, which is new to them. This tool-specific need supersedes the earlier broad schema batch; do not infer unfamiliarity with Java/Spring. Explained startup migration credentials versus application credentials, migration history, and the default V/version/double-underscore naming rule.

Source now contains V1__create_household.sql defining homeops.household with household_id UUID PRIMARY KEY and name TEXT NOT NULL. Developer reports restarting the server and seeing Flyway run this migration. Application was reported successful; agent has not independently inspected database history or startup logs. Next teaching checkpoint: use the DBeaver migrator connection to inspect household and flyway_schema_history, including version, script, installed_by, checksum and success. Restart once more to observe V1 is not reapplied. Explain that subsequent schema changes belong in new versioned migrations rather than edits to applied V1. Member/project/task tables, app table grants, persistence and tests remain future work. Agent authored only this note.

Developer subsequently confirmed a second startup reports the schema up to date. Migration application and skip-on-restart behavior are user-confirmed. Next guided step: V2__create_household_member.sql, with UUID household_member_id primary key, required household_id foreign key to household, and required display_name. This is proposed developer work, not an existing migration. Explain the membership relationship and foreign-key enforcement, then apply via startup and inspect the version-2 history entry in DBeaver. Authentication linkage and task relationships remain later steps.

### V2 checkpoint - 2026-10-10

Developer reports the database is now at V2. Source inspection confirms household_member has its UUID primary key, required household foreign key and display_name as discussed. No independent database-history query performed. Explained that UUID PRIMARY KEY does not generate IDs; application/JPA UUID generation is the current recommendation, not yet implemented, and both existing migrations have no ID default. Next guided migration recommendation: V3__create_project.sql with project_id UUID PRIMARY KEY, household_id UUID NOT NULL referencing household, and title TEXT NOT NULL. Tasks and their optional project/required assignee relationships follow. Leave applied V1/V2 unchanged; account for same-household relationship constraints when introducing tasks. No application/configuration/test edits by the assistant.
