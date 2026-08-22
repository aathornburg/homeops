# House Binder Product and Roadmap Design

## Purpose

Define House Binder as the durable property-reference capability within the HomeOps Household area and place its delivery across the existing Version 1 through Version 5 roadmap. This document fixes product boundaries and sequencing; milestone-specific implementation designs must resolve the detailed schemas and authorization contracts identified below before their code work begins.

House Binder complements task management. It answers questions such as "What model is the furnace?", "When was the roof installed?", "Where is the main water shutoff?", and "What did we notice during the last inspection?" without turning HomeOps into a generic document or notes application.

## Approved Product Decisions

- House Binder lives within the Household area.
- HomeOps supplies template-backed starter sections with curated structured fields and freeform notes.
- The Version 1 starter set is HVAC, electrical, plumbing, generator, roof, and chimney.
- A new mock household begins with one section for each Version 1 starter template.
- Households can add notes-only custom sections and can rename, reorder, archive, and restore any section.
- Version 1 does not support additional instances of a HomeOps template or destructive section deletion.
- Household-created sections are notes-only in the first version.
- Notes remain contextual rather than becoming a top-level destination.
- Task-specific notes stay with tasks; future project notes stay with projects.
- The current placeholder `/notes` route and generic note search examples are product exploration, not a committed standalone feature. Binder-relevant examples should move into House Binder as it evolves.

## User Outcome

A household member can open Household, enter House Binder, find the relevant home system, read its important facts, and add plain-language observations without deciding whether the information belongs in a separate notes application.

Examples:

- HVAC structured fields: brand, model, serial number, manufacture year, installation year, system type, filter size, and service provider.
- HVAC note: `Rust noted on the corner closest to the wall.`
- Roof structured fields: material, installation year, contractor, and warranty expiration.
- Custom section: `Basement drainage` with freeform notes only.

The examples do not define the complete field catalog. Exact field names, types, validation, and option lists for all six starter templates are a required Version 1 design-and-planning deliverable before implementation begins.

## Section Model

### Template-backed sections

A template-backed section has:

- A stable internal template identity.
- A household-visible title that can be renamed.
- A HomeOps-defined field schema.
- Household-specific field values.
- Freeform notes.
- Display order and archived state.

Renaming a starter section does not change its template identity or field schema. Archiving hides an irrelevant section from the normal Binder list without destroying its information; archived sections remain restorable.

### Custom sections

A custom section has:

- A household-supplied title.
- Freeform notes.
- Display order and archived state.

Each section has one multiline plain-text notes value in the first version. Multiple note records, rich-text formatting, custom labeled fields, custom templates, and schema builders are deferred. Notes-only custom sections preserve flexibility for observations and prose that do not fit cleanly into label/value fields.

## Contextual Notes Model

"Note" is a content capability, not a top-level navigation destination.

- Durable property observations belong to a House Binder section.
- Work-specific descriptions, observations, comments, and activity belong to a task.
- Future project planning notes belong to the project.
- Search may surface all of these contexts, but selecting a result returns the user to its owning task, project, or Binder section.

This prevents a generic Notes area from becoming an unstructured inbox that duplicates information already owned by another feature.

## Roadmap Placement

### Version 1 — Frontend foundation

Observable outcome: a household member can explore and edit a realistic House Binder experience backed by the frontend mock-data layer.

- Slice 1: add House Binder to the Household page and present the six read-only starter sections.
- Slice 2: edit structured values and section notes through the mock-data layer.
- Slice 3: add notes-only custom sections and support rename, reorder, archive, and restore.
- Cover default, loading, all-sections-archived, custom-section-empty, and error states.
- Mock saves survive client-side navigation during the current app session but reset on a full reload; the UI and tests must not imply durable persistence before Version 3.

### Version 2 — Task integration

Observable outcome: maintenance work can lead directly to the durable property information needed to perform it.

- Allow a task to reference one House Binder section.
- Link from task detail to the referenced section.
- Show related tasks from the Binder section.
- Keep task and Binder notes separate; do not synchronize or copy prose between contexts.
- A task may continue to reference an archived section. Opening that reference shows the section with an archived state and a restore action.

### Version 3 — Persistence and API contracts

Observable outcome: House Binder information survives sessions and is available through stable backend contracts.

- Persist sections, template identities, field values, notes, order, and archived state.
- Persist and validate the optional task-to-Binder-section relationship.
- Provide a related-task query for a Binder section.
- Add Spring Boot endpoints and validation.
- Include Binder contracts in OpenAPI and the generated TypeScript client.
- Preserve unknown or newly introduced template fields during compatible schema evolution.

Version 3 operates under a single-household development trust boundary. It is not ready for multi-household production use until Version 4 adds authentication, tenant enforcement, and role-based authorization.

### Version 4 — Sharing, permissions, and history

Observable outcome: household members can collaborate on Binder information with appropriate accountability.

- Apply household membership and role-based permissions.
- Record House Binder changes in activity history.
- Show who changed durable information and when.
- Define authorization on the backend; frontend restrictions remain a user-experience aid rather than enforcement.

Version 2 task activity remains task-scoped workflow history. Version 4 House Binder history is persisted, attributable audit information for changes to durable household records.

### Version 5 — Documents and discovery

Observable outcome: House Binder becomes the trusted place to find both property facts and supporting documents.

- Define accepted file types and sizes, storage and retention rules, malware scanning, and download authorization before enabling real uploads.
- Attach manuals, receipts, warranties, inspection reports, and related files to Binder sections only after those controls pass verification.
- Include active Binder section titles, structured values, notes, and attachment metadata in permission-filtered search; archived sections are excluded by default.
- Preserve context when opening a search result.
- Do not index attachment bodies unless a separately approved OCR or content-extraction capability is added.

Other feature search corpora, such as task descriptions and comments or future project notes, must be defined by their owning feature rather than by House Binder.

## Ownership Boundaries

- Household owns House Binder placement, household selection, and membership context.
- House Binder owns section templates, field values, notes, ordering, archiving, and related-task presentation.
- Tasks own task-specific content and an optional reference to one Binder section.
- Search indexes Binder content but does not own or duplicate it.
- Attachment infrastructure remains deferred until Version 5.

## States and Failure Handling

- Loading uses section and field skeletons rather than a page-centered spinner.
- A newly initialized Binder presents the six Version 1 starter sections and explains that irrelevant sections can be archived and later restored.
- When every section is archived, the Binder explains how to restore a starter section or add a custom section.
- A custom section with no notes presents a prompt to record useful context rather than a generic blank state.
- Failed saves retain the user's unsaved text, identify the affected section, and offer retry.
- An archived linked Binder section remains available from its task and is visibly labeled archived. A genuinely missing section does not prevent the task from loading; the task shows that its reference is unavailable.

## Verification Expectations

Version 1 verification should cover:

- Starter sections and their fixed field sets render correctly.
- Structured values and freeform notes can be edited independently.
- A custom section accepts prose but does not expose custom structured fields.
- Rename, reorder, and archive behavior preserves section identity and content.
- Restore returns an archived section without losing its values, notes, order, or task references.
- Mock-save tests distinguish client-side navigation persistence from full-reload reset.
- Keyboard and screen-reader users can navigate sections, fields, notes, and actions.
- Loading, empty, and error states explain the next action in plain language.

Later versions add contract tests for persistence and authorization, relationship tests for task references, audit-history tests, attachment security tests, and search-result context tests.

## Milestone Design Prerequisites

These are tracked design gates, not requirements to solve in this roadmap update:

- Before Version 1 implementation: approve the complete field catalog for all six starter templates, including stable field keys, labels, types, validation, option lists, and title-validation rules.
- Before Version 3 implementation: define template schema versioning and compatible evolution, including stable field identity, added/renamed/deprecated fields, and preservation of fields unknown to an older client during read-modify-write cycles.
- Before Version 4 implementation: approve a House Binder permission matrix covering view, edit values, edit notes, add custom section, rename, reorder, archive/restore, view history, and later upload/download actions.
- Before Version 5 implementation: approve attachment storage/security requirements and the final permission-filtered search contract.

## Deferred Scope

- Custom field builders or user-authored templates.
- Additional instances of a HomeOps starter template.
- Destructive section deletion.
- Multiple note records or rich-text section notes.
- A generic top-level Notes destination.
- Multiple Binder links from one task.
- Attachments before Version 5.
- OCR, automatic document classification, vendor integrations, and equipment-data enrichment.
- Project-specific Binder behavior beyond contextual project notes.

These are revisitable ideas, not commitments in the initial House Binder milestone.
