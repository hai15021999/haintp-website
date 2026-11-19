# Service Scope

> Status: Active · Last updated: 2026-11-19 · Owner: Hai Nguyen

## Purpose

A static, client-rendered personal website that presents Hai Nguyen as a front-end developer: profile, portfolio with case studies, printable resume, and a contact form.

## In scope

| Area | Route | Description | Source of content |
|---|---|---|---|
| About | `/about` | Intro, key numbers, featured work, skills, education | `content/profile.ts`, `skills.ts`, `projects.ts`, `resume.ts` |
| Portfolio | `/portfolio` | Project grid, type filter (`?type=`), text search | `content/projects.ts` |
| Project detail | `/portfolio/:slug` | Facts, highlights, stack, optional structured case-study sections (problem, flow, decisions, code, screens, outcomes) and Markdown case study | `projects.ts` + `assets/case-studies/<slug>.md` |
| Resume | `/resume` | Experience, skills, education, languages; print to PDF | `content/resume.ts`, `profile.ts` |
| Contact | `/contact` | Validated form sent through EmailJS | `features/contact` + EmailJS template |
| Shell | all | Side navigation (rail / drawer), top bar, color mode | `app.component.*`, `core/*` |

## Out of scope

- Own backend, database, authentication, admin UI or CMS.
- Blog / articles (TODO: decide; would need a content ADR).
- Analytics and tracking scripts (NFR: no third-party trackers without an ADR).
- Server-side rendering / prerendering (candidate, see [todo-active.md](../10-engineering/todo-active.md)).
- Multi-language UI (content is English).

## Primary users

| Persona | Goal | Success signal |
|---|---|---|
| Recruiter / hiring manager | Judge fit quickly | Reaches Resume or Contact within 2 clicks |
| Engineering lead | Assess depth | Opens a case study, reads stack and highlights |
| Prospective client | Start a conversation | Sends the contact form |
| Owner | Keep content current | Edits one content file, no template changes |

## External dependencies

| Dependency | Purpose | Contract |
|---|---|---|
| EmailJS | Deliver contact-form messages to the owner's inbox | [api-contracts.md § EmailJS](api-contracts.md#emailjs) |
| Google Fonts | Inter font | `src/index.html` |
| Static host | Serve `dist/` with SPA fallback | [deployment.md](../20-operations/deployment.md) |

## Constraints

- Single maintainer; changes must be small and documented.
- Same visual system as the Valuation Platform client project (Inter, compact UI kit, same neutrals) with the kit Plum brand color — [ADR-002](adr/ADR-002-compact-ui-kit.md).
- All page text comes from `src/app/content/` — [ADR-003](adr/ADR-003-content-layer-and-shell.md).
- Client names under contract (the appraisal company behind the Valuation Platform) must not appear in the site, repo or docs.
- Confidential projects (`confidential: true`) show only a title and a one-line summary; no role, stack, screens or client details may be added (code of ethics).
- Facts about employers, dates and clients must be verified by the owner before publishing (see `VERIFY` comments in `resume.ts`).

## Cross-references

- [system-context.md](system-context.md) · [architecture.md](architecture.md) · [non-functional-requirements.md](non-functional-requirements.md)
