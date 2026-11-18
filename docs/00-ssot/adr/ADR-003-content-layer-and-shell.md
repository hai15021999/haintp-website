# ADR-003: Typed content layer; drop BaseComponent, Material and global state

> Status: Accepted · Date: 2026-11-18 · Deciders: Hai Nguyen

## Context (v1 review findings)

| Finding | Impact |
|---|---|
| Every component extended `BaseComponent`, injecting Router, MatDialog, Snackbar, CDR, AppState | Coupling; untestable; Material forced into every page |
| `AppStateService.currentPage` set manually by each page | Nav highlight could disagree with the URL |
| Page text (skills, intros, projects) embedded in components and `mocks/` | Hard to update; duplicated copy |
| Portfolio "detail" always opened `were-wolf-moon-light`; professional cards not clickable; Moonlight project not listed | Broken navigation |
| ~3,000 lines of unused code (Excel/Office services, Proxy state store, directives, API service to `api.example.com`, empty barrels) | Noise for humans and AI agents |
| `environment.prod.ts` never swapped (no `fileReplacements`); `angular.json` referenced missing `src/logo.ico` and prismjs CSS | Wrong prod config; fragile build |
| `emailjs-com` deprecated; contact error path left the loading dialog open | Bug |
| `strictNullChecks: false`, `noImplicitAny: false` | Weak typing |
| Resume page = "under development" image | Missing feature |

## Decision

1. **Content layer**: `src/app/content/` holds typed modules (`profile`, `projects`, `resume`, `skills`) and pure helpers (`period.ts`). Pages render from it.
2. **No BaseComponent**: components use `inject()` for what they need.
3. **No global store**: router is the source of navigation state (`routerLinkActive` + `aria-current`). Root services only for theme and layout.
4. **Zoneless** change detection with signals; drop `zone.js` from the app bundle (kept for tests).
5. **Remove** Angular Material, animations, ngx-markdown, excel-date-to-js, emailjs-com; add `@emailjs/browser`.
6. **Slugs** replace numeric project ids; v1 URLs redirect.
7. Turn on full TypeScript `strict` (null checks, implicit any).

## Consequences

- (+) Adding a project = one object + one image. Pages stay template-only.
- (+) Smaller, simpler code; clear layers for agents.
- (−) `linkedSignal` and `rxResource` are developer-preview in Angular 19; re-check on upgrade.
