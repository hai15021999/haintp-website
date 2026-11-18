# Active TODOs

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

Single list of open work. Agents add rows for anything they could not finish or verify; the owner prioritizes.

## Owner must verify (content facts)

| ID | Item | Where | Priority |
|---|---|---|---|
| V-1 | Appvity: company name, title, start 2020-06, still current? | `content/resume.ts` (`appvity`) | High |
| V-2 | Valuation Platform engagement: "Casber Solution — appraisal company client", freelance, start 2026-01 | `resume.ts`, `projects.ts` (`valuation-platform`) | High |
| V-3 | Valuation Platform role wording "Front-end Developer · UI system owner" and highlights are publishable (client confidentiality) | `projects.ts`, `assets/case-studies/valuation-platform.md` | High |
| V-4 | FPT University start 2019-09 | `resume.ts` (`fptu`) | Medium |
| V-5 | Language levels (Vietnamese native, English professional working) | `resume.ts` | Medium |
| V-6 | Periods for Excel add-in, Helpdesk, Admin portal, Bingo, Bonsai (omitted, not guessed) | `projects.ts` | Low |
| V-7 | Location "Ho Chi Minh City, Vietnam" | `profile.ts` | Low |
| V-9 | AI Chatbot with RAG and Microservices & Integration APIs (Appvity, confirmed): role, period and exact stack still unknown | `projects.ts` (`rag-chatbot`, `microservices-integration`) | High |
| V-10 | Confirm the client names Vinamilk, Prudential, Viags may be shown as titles (only details are withheld). Employer = Appvity (confirmed) | `projects.ts` (`*-approval-workflow`), `resume.ts` | High |
| V-8 | Add LinkedIn URL if any (`SocialLink.id = 'linkedin'` already supported) | `profile.ts` | Low |

## Engineering

| ID | Item | Priority |
|---|---|---|
| E-1 | Confirm hosting provider + SPA fallback; fill `deployment.md` and `environment.prod.ts → siteUrl` | High |
| E-2 | Add unit specs: `period.ts`, content integrity (testing-strategy.md) | Medium |
| E-3 | Add Playwright smoke suite incl. hidden-tab deep link | Medium |
| E-4 | Prerender routes (`@angular/ssr` prerender) for SEO-3 — needs ADR | Medium |
| E-5 | Upgrade Angular 19 → 21 (match the Valuation Platform); re-check ADR-004 | Low |
| E-6 | Per-project Open Graph image/description | Low |
| E-8 | Lighthouse run in CI (PERF-4) | Low |

## Done (2026-11-18 restructure)

- SSoT docs created (`docs/`).
- UI kit adopted, Plum theme, dark mode, sidenav rail/drawer (ADR-002).
- Content layer, BaseComponent/Material/global state removed, zoneless, strict TS (ADR-003).
- Fixed: project detail always opening one project; professional cards not clickable; prod env never used; missing asset refs in `angular.json`; contact loading dialog stuck on error.
- Client name removed from the Valuation Platform project (contract policy); slug `valuation-platform`, no redirect from the old slug.
- New projects: Valuation Platform, Compact UI Kit, Moonlight (now listed), this website.
- All project covers are original SVG illustrations (stock/web images for Excel, Helpdesk, Admin, Bingo, Bonsai removed).
- Added professional projects: AI Chatbot with RAG, Microservices & Integration APIs, and 3 confidential approval-workflow projects (Vinamilk, Prudential, Viags — all Appvity, linked from the resume) with a policy notice instead of details.
- Resume page completed (was "under development").
- Router view transitions disabled after hidden-tab hang (ADR-004).
