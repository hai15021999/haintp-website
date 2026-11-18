# Observability

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

Static site, no backend, no analytics (NFR SEC-4). Observability is deliberately minimal.

## Signals

| Signal | Source | How to read | Status |
|---|---|---|---|
| Site up | Host dashboard / uptime ping | TODO(owner): pick a free uptime monitor for `/` and `/portfolio/valuation-platform` | TODO |
| Build health | `ng build` output, budgets | Local / CI logs | Active |
| Contact delivery | EmailJS dashboard → History | Sent / failed count, quota | Active |
| Client errors | Browser console | Manual during smoke tests | Active |
| Performance | Lighthouse | Manual; CI TODO (E-8) | Partial |

## Thresholds

| Metric | Alert when |
|---|---|
| Uptime | 2 consecutive failed checks |
| EmailJS quota | > 80% of monthly free quota |
| Initial bundle | Build warning (> 500 kB) |

## Adding telemetry

Any analytics, error tracking (e.g. Sentry) or RUM script requires an ADR covering privacy, consent and bundle cost.
