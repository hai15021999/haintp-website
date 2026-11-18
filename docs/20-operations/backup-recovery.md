# Backup & Recovery

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## What must survive

| Asset | Primary | Backup | RPO | Recovery |
|---|---|---|---|---|
| Source, content, docs, images | GitHub `hai15021999/haintp-website` | Local clone(s) | Last push | `git clone` + `npm ci` + build |
| UI kit upstream | `D:\report-page-design` | Vendored copy in `src/styles/ui-kit/` | Last re-copy | Copy back from vendored files |
| Built site | Host | Rebuild from any commit | — | `npm run build` |
| EmailJS template + service | EmailJS account | TODO(owner): export template HTML into `docs/20-operations/` | Manual | Recreate template with params from api-contracts.md |
| Domain / DNS | Registrar | TODO(owner): record registrar and records here | — | Re-point DNS |

No user data is stored by the site, so there is nothing else to back up.

## Recovery drill (yearly)

- [ ] Fresh clone on a clean machine → `npm ci && npm run build` succeeds
- [ ] Deploy to a preview URL; run the smoke test
- [ ] Confirm EmailJS template still matches params
