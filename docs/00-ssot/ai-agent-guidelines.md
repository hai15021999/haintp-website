# AI Agent Guidelines

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen
> Applies to every AI coding agent (Claude Code, Copilot, Cursor, Gemini…). Root entry points `AGENTS.md`, `CLAUDE.md` and `.github/copilot-instructions.md` link here.

## 1. Read order before any change

1. This file.
2. [architecture.md](architecture.md) — layers and refactoring constraints.
3. [api-contracts.md](api-contracts.md) — if touching routes, content or the contact form.
4. [coding-standards.md](../10-engineering/coding-standards.md) — if writing code or CSS.
5. Relevant ADRs in [adr/](adr/).
6. The code you will change.

## 2. Source-of-truth hierarchy

ADR (Accepted) → `00-ssot` → `10-engineering` → `20-operations` → `src/app/content` → code → templates/comments.
If code and SSoT disagree: **do not silently pick one**. Report the conflict; fix code to match SSoT, or propose an ADR.

## 3. Hard rules (never break)

| # | Rule |
|---|---|
| R1 | Do not invent facts about the owner (employers, dates, titles, clients, metrics). Unknown → omit the field or add `// VERIFY:` and a row in [todo-active.md](../10-engineering/todo-active.md) |
| R2 | Do not invent APIs, config keys, packages, CLI flags or kit classes. Verify in `node_modules`, `components.css` or the upstream kit docs first |
| R3 | Page text lives in `src/app/content/`. Never hard-code profile/project/resume text in templates |
| R4 | No hex colors, `!important` or new palettes in component/site CSS. Use `--ui-*` tokens. Brand values only in `theme-haintp.css` |
| R5 | Do not edit `src/styles/ui-kit/tokens.css` or `components.css`. Change upstream `D:\report-page-design`, then re-copy |
| R6 | Do not add dependencies, a backend, analytics, or re-enable router view transitions without an ADR |
| R7 | Never remove a published route or slug; add a redirect instead |
| R8 | No secrets in code or docs. EmailJS public key is the only allowed identifier |
| R9 | Do not commit, push or deploy unless the owner asks |
| R10 | Never add details (role, stack, screenshots, features, metrics) to a project with `confidential: true`, and never name a client the owner has withheld |

## 4. Change management

| Change type | Required in the same PR |
|---|---|
| New page / route | Route row in `api-contracts.md`, scope row in `service-scope.md`, nav entry if top-level |
| New project | Entry in `projects.ts`, cover image, optional case study; follow [service-template.md](../99-templates/service-template.md) |
| Content schema change | `content.types.ts` + every content file + `api-contracts.md`; ADR if breaking |
| New dependency | ADR + `dependency-management.md` table |
| Styling primitive (`.panel-*`, `.tag`…) | Glossary row + coding-standards § Styling |
| Behavior fix | Test or manual check listed in PR; TODO closed if tracked |

## 5. Refactoring constraints

- Keep public surface stable: routes, slugs, content field names, `localStorage` keys (`haintp.theme`, `haintp.sidenav`), EmailJS params.
- Prefer deleting dead code over abstracting it. No speculative layers (no "BaseComponent", no generic store).
- Keep components standalone, `OnPush`, signal-based (`input()`, `computed()`, `signal()`); no `ChangeDetectorRef` calls.
- One concern per PR: refactor and behavior change in separate commits.

## 6. API / contract evolution

- Additive first: new optional fields, new query params with defaults.
- Breaking: ADR → update contract doc → migrate all content → code. Never leave both shapes alive without a dated TODO.

## 7. Documentation synchronization

- A PR that changes behavior described in docs must update those docs. Reviewers reject otherwise.
- Update the `Last updated` line of every doc you edit.
- Do not restate a rule in two places — link to the owning file.
- After finishing a tracked item, move it to "Done" in [todo-active.md](../10-engineering/todo-active.md).

## 8. Hallucination prevention

| Before you… | Verify by |
|---|---|
| Use a kit class | `grep -n "\.ui-<name>" src/styles/ui-kit/components.css` |
| Use an Angular API | Check the installed version in `package.json` (Angular 19) — e.g. `linkedSignal`, `rxResource` are v19 developer-preview APIs |
| Reference a file or path | `Glob`/`ls` it |
| State a fact in content | Find it in existing content, git history or ask the owner |
| Claim the build works | Run `npx ng build` and read the output |
| Claim UI works | Run `npm start`, open the page, check light + dark, mobile + desktop |

When unsure: say so, leave a `TODO(owner):` with the question, and continue with the rest.

## 9. Definition of done (agent)

- [ ] `npx ng build` succeeds, no new warnings
- [ ] Pages touched checked in browser (light/dark, ≤ 767 px and desktop)
- [ ] No hex / `!important` added outside allowed files
- [ ] Docs and `todo-active.md` updated
- [ ] Summary lists what was not verified
