# Dependency Management

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Runtime dependencies (allow-list)

| Package | Version range | Why | Added by |
|---|---|---|---|
| `@angular/core`, `common`, `compiler`, `forms`, `platform-browser`, `platform-browser-dynamic`, `router` | ^19.2 | Framework | — |
| `rxjs` | ~7.8 | Router events, HTTP | — |
| `tslib` | ^2.3 | TS helpers | — |
| `zone.js` | ~0.15 | Test runner only (app is zoneless) | ADR-003 |
| `marked` | ^15 | Case-study Markdown → HTML | — |
| `@emailjs/browser` | ^4.4 | Contact form | ADR-003 |

Anything not in this table needs an ADR before it is added.

## Dev dependencies

Angular CLI/build/compiler 19.2, TypeScript ~5.5, Tailwind CSS ^3.4, Karma/Jasmine.

## Removed in 2026-11 (do not re-add without ADR)

`@angular/material`, `@angular/animations`, `ngx-markdown`, `excel-date-to-js`, `emailjs-com` (deprecated → `@emailjs/browser`).

## Vendored: compact UI kit

| Item | Value |
|---|---|
| Upstream | `D:\report-page-design` (skill `compact-ui-kit`) |
| Version | 2.4 (2026-11-13) |
| Copied files | `tokens.css`, `components.css`, `integrations/tailwind-v3.preset.cjs` → `src/styles/ui-kit/` |
| Ours | `src/styles/ui-kit/theme-haintp.css` |

Update procedure:

1. Read upstream `CHANGELOG.md` for breaking class/token changes.
2. Copy the three files over the vendored copies (no local edits exist to merge).
3. `npx ng build`, then manual check (testing-strategy.md).
4. Update the version row above. Commit `chore(ui-kit): re-copy kit vX.Y`.

## Update policy

| Kind | Cadence | Rule |
|---|---|---|
| Patch/minor | Monthly | `npm update`, build, smoke test |
| Angular major | Within 6 months of release | `ng update @angular/core @angular/cli`; re-check developer-preview APIs (`linkedSignal`, `rxResource`) and ADR-004 |
| Security advisories | On notice | `npm audit`; fix or document why not |

Install with `npm ci` in CI/deploy; commit `package-lock.json` with every dependency change.
