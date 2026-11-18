# Testing Strategy

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Levels

| Level | Tool | Scope | Status |
|---|---|---|---|
| Type check + template check | `ng build` (strict TS, `strictTemplates`) | Everything | Active — must pass |
| Unit | Karma + Jasmine (`ng test`) | Pure helpers (`content/period.ts`), services (`ThemeService`, `ContactService` with EmailJS mocked) | TODO: no specs yet |
| Content integrity | Unit spec over `PROJECTS` / `RESUME` | Unique slugs, covers exist, `caseStudy` file exists, resume project slugs exist | TODO |
| E2E / smoke | Playwright (TODO: add dev dependency via ADR-free devDep) | Each route renders, filter/search, contact validation, legacy redirects, hidden-tab deep link | TODO |
| Manual | Browser | Light/dark, 375 px / desktop, print preview of Resume | Active — per PR |

## What to test first (priority)

1. `period.ts` — `formatPeriod`, `yearsSince` edge months.
2. Content integrity spec (catches broken slugs and missing assets).
3. Contact form: invalid → errors shown; EmailJS reject → error note; honeypot → no call.
4. Routing: `/project/were-wolf-moon-light` → `/portfolio/moonlight-werewolf`; unknown path → Not found.

## Example unit spec

```ts
import { formatPeriod, yearsSince } from './period';

describe('period', () => {
    it('formats an open period', () => {
        expect(formatPeriod({ start: '2020-06' })).toBe('Jun 2020 – Present');
    });
    it('floors whole years', () => {
        expect(yearsSince('2020-06', new Date(2026, 4, 31))).toBe(5); // May 2026
        expect(yearsSince('2020-06', new Date(2026, 5, 1))).toBe(6);  // Jun 2026
    });
});
```

## Manual check (every PR touching UI)

- [ ] `npm start`, open each changed route
- [ ] Theme: System → Light → Dark (sidenav footer)
- [ ] Width 375 px: drawer opens/closes (button, scrim, Escape)
- [ ] Keyboard: Tab order, visible focus, skip link
- [ ] No console errors
