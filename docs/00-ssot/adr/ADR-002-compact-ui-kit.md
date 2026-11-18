# ADR-002: Adopt the compact UI kit (Valuation Platform visual system)

> Status: Accepted · Date: 2026-11-18 · Deciders: Hai Nguyen

## Context

- v1 used a purple sidebar, hand-written Tailwind palette (`Grayscale*`, `Purple*`, `Lime*`…), a Material violet theme and per-component hex colors. No dark mode; visual language differed from the owner's professional work.
- The owner maintains the compact UI kit (`D:\report-page-design`, v2.4) and uses it in the Valuation Platform client project. Requirement: the site should look like that project.

## Options

| Option | Pros | Cons |
|---|---|---|
| A. Keep v1 styles | No work | Inconsistent, no dark mode, many hex colors |
| B. Angular Material theme | Familiar | Not the reference look; heavy |
| C. Vendor the compact UI kit + reference brand values | Same look as the reference project, dark mode, a11y-checked, small CSS | Must follow kit rules |

## Decision

Option C.

- Client name is not written anywhere in the repo or site (contract policy); refer to it as "Valuation Platform" / "appraisal application".
- Vendor `tokens.css`, `components.css`, `tailwind-v3.preset.cjs` into `src/styles/ui-kit/` unchanged.
- Brand in `theme-haintp.css`: kit **Plum** `#8e2c6e` (light fill and accent text; white label 7.7:1). Dark mode: fill `color-mix(#8e2c6e 60%, #fff)` with `#0e0e11` label, accent `color-mix(#8e2c6e 40%, #f5f5f5)` — same values as the reference project's Plum color set. Everything else follows the reference project: Inter, radius 6/8 px, canvas `#f5f6f8`, neutrals.
- Amendment 2026-11-18: brand changed from the reference teal to Plum at the owner's request; layout and neutrals unchanged.
- Shell = `.ui-shell` + `.ui-sidenav` (rail on desktop, drawer < 768 px), 48 px top bar.
- Tailwind v3 stays for layout utilities only; old palettes removed.
- Remove Angular Material and `@angular/animations`.

## Consequences

- (+) Light/dark/system modes; one source of color; consistent with the reference project.
- (+) Initial bundle 598 kB → ~340 kB (with ADR-003).
- (−) Kit updates are manual re-copies (see dependency-management.md).
- Follow-up: none required.
