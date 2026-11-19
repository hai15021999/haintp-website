# Active TODOs

> Status: Active · Last updated: 2026-11-19 · Owner: Hai Nguyen

Single list of open work. Agents add rows for anything they could not finish or verify; the owner prioritizes.

## Owner must verify (content facts)

| ID | Item | Where | Priority |
|---|---|---|---|
| V-1 | Appvity: company name, title, start 2020-06, still current? | `content/resume.ts` (`appvity`) | High |
| V-2 | Valuation Platform engagement: "Casber Solution — appraisal company client", freelance, start 2026-01 | `resume.ts`, `projects.ts` (`valuation-platform`) | High |
| V-3 | Valuation Platform role wording "Front-end Developer · UI system owner" and highlights are publishable (client confidentiality) | `projects.ts`, `assets/case-studies/valuation-platform.md` | High |
| V-5 | Language levels (Vietnamese native, English professional working) | `resume.ts` | Medium |
| V-6 | Periods for Excel add-in, Helpdesk, Admin portal, Bonsai (omitted, not guessed). Bingo (2024-01 → 2024-03) and Moonlight taken from repo activity — confirm | `projects.ts` | Low |
| V-7 | Location "Ho Chi Minh City, Vietnam" | `profile.ts` | Low |
| V-9 | AI Chatbot with RAG and Microservices & Integration APIs (Appvity, confirmed): role and period still unknown. RAG chatbot stack/highlights now from repo `openai-chat` (2026-11-19) | `projects.ts` (`rag-chatbot`, `microservices-integration`) | High |
| V-10 | Confirm the client names Vinamilk, Prudential, Viags may be shown as titles (only details are withheld). Employer = Appvity (confirmed) | `projects.ts` (`*-approval-workflow`), `resume.ts` | High |
| V-11 | Project detail case-study sections: confirm Valuation Platform metrics/problem/flow/decisions wording; supply outcomes and masked screenshots (`gallery`); Bingo, Moonlight, RAG chatbot sections written from their repos (2026-11-19) — confirm decision rationales; Excel add-in sections written from the owner’s description (no repo access, company product). Tech stack purposes: confirm Valuation "Tailwind CSS v4" and website "Tailwind CSS v3" wording; add the Azure DevOps purpose for the Excel add-in; Moonlight Gemini calls are commented out in the repo, so the site says "built, switched off" | `projects.ts` | Medium |
| V-12 | **Security:** public repo `LotoAppBackEnd` contains an RSA private key (`config/casber_vm_key.pem`), `utils/.env` with `JWT_SECRET`, and manager credentials in `data/manager.mjs`. Revoke/rotate them, purge from git history, then add the backend link to `bingo-game` | GitHub repo | High |
| V-13 | RAG chatbot shows a code excerpt from private repo `openai-chat` (Appvity work). Confirm it may be published, else remove `codeSamples` | `projects.ts` (`rag-chatbot`) | High |
| V-14 | Owner details added 2026-11-19 for Bonsai, Helpdesk, Admin portal, Microservices. Still open: Bonsai role — keep "project lead · design"?; Bonsai period; what numbering-service and webhook-service do; Helpdesk/Admin portal periods and the purpose of each technology (sidebar tags kept until then) | `projects.ts` | Medium |
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

- 2026-11-19: Education shows only the graduation date (owner request); V-4 (start year) closed — no longer shown.

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
