# Non-Functional Requirements

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

A change that breaks a "Must" row is not done. "Should" rows need a TODO entry when missed.

## Performance

| ID | Requirement | Target | Level | How checked |
|---|---|---|---|---|
| PERF-1 | Initial JS+CSS (raw) | ≤ 500 kB warn, 1 MB error (current ≈ 340 kB) | Must | `angular.json` budgets on `ng build` |
| PERF-2 | Component style size | ≤ 4 kB warn, 8 kB error | Must | budgets |
| PERF-3 | Every page route lazy-loaded | 100% | Must | `app.routes.ts` review |
| PERF-4 | Largest Contentful Paint (4G, mobile) | ≤ 2.5 s | Should | Lighthouse — TODO: add to CI |
| PERF-5 | Images below the fold | `loading="lazy"` | Should | Review |

## Accessibility

| ID | Requirement | Level |
|---|---|---|
| A11Y-1 | WCAG 2.2 AA contrast for text and controls in light and dark mode | Must |
| A11Y-2 | Every interactive element reachable by keyboard with visible focus | Must |
| A11Y-3 | State via ARIA (`aria-current`, `aria-pressed`, `aria-expanded`, `aria-invalid`, `aria-busy`) — not classes | Must |
| A11Y-4 | Skip link to `#main-content`; one `<h1>` per page | Must |
| A11Y-5 | Closed mobile drawer is `inert`; Escape closes it | Must |
| A11Y-6 | Form errors linked by `aria-describedby`; send result announced (`role=status/alert`) | Must |
| A11Y-7 | `prefers-reduced-motion` respected | Should |

## Compatibility & responsiveness

| ID | Requirement | Level |
|---|---|---|
| COMP-1 | Last 2 versions of Chrome, Edge, Firefox, Safari (needs `color-mix()` and `:has()`) | Must |
| COMP-2 | Layout works from 360 px to 1920 px; no horizontal page scroll | Must |
| COMP-3 | Resume prints on A4 without the shell | Should |

## SEO & sharing

| ID | Requirement | Level |
|---|---|---|
| SEO-1 | Unique `<title>` per route (`PageTitleStrategy`) | Must |
| SEO-2 | Meta description + Open Graph tags in `index.html` | Must |
| SEO-3 | Prerendered HTML per route | Should — TODO (SPA today) |

## Security & privacy

| ID | Requirement | Level |
|---|---|---|
| SEC-1 | No secrets in the repo; only EmailJS public identifiers | Must |
| SEC-2 | No `bypassSecurityTrust*` on content that is not a static constant | Must |
| SEC-3 | External links: `target="_blank" rel="noopener noreferrer"` | Must |
| SEC-4 | No third-party trackers/analytics without an ADR | Must |
| SEC-5 | No owner email/phone in page source (contact via form) | Must |

Details: [security.md](../20-operations/security.md).

## Maintainability

| ID | Requirement | Level |
|---|---|---|
| MAINT-1 | Page text only in `src/app/content/` | Must |
| MAINT-2 | No hex colors outside `theme-haintp.css` and image assets | Must |
| MAINT-3 | `ng build` passes with zero errors | Must |
| MAINT-4 | Docs updated in the same PR as the behavior | Must |
