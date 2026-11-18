# Coding Standards

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## TypeScript

| Rule | Example / note |
|---|---|
| `strict: true` (incl. null checks) — no `any` unless typed at a boundary | `catch {}` without binding when unused |
| Imports via aliases across folders | `@content`, `@core/theme.service`, `@shared/icon/icon.component` |
| Relative imports only inside the same feature folder | `./project-card.component` |
| Private members with `#` | `readonly #http = inject(HttpClient);` |
| `readonly` for injected deps, inputs, computed | — |
| Pure helpers in `content/` have no Angular imports | `period.ts` |

## Angular components

| Rule | Detail |
|---|---|
| Standalone, `ChangeDetectionStrategy.OnPush` | Default schematic in `angular.json` |
| Signals for state | `signal`, `computed`, `linkedSignal`; `input()` / `input.required()` |
| Route data via inputs | `withComponentInputBinding()` binds `:slug`, `?type` |
| Async data | `rxResource` (HTTP) or `async`/`await` + signals; no manual subscriptions in components unless `takeUntilDestroyed()` |
| No `ChangeDetectorRef`, no `BaseComponent`, no `ngOnInit` boilerplate | ADR-003 |
| Control flow | `@if`, `@for (… ; track key)`, `@switch` |
| Selector prefix | `app-` |
| File naming | `kebab-name.component.ts|html|scss`, `kebab-name.service.ts` |
| Small templates inline (≤ ~25 lines); otherwise `templateUrl` | `not-found.component.ts` |

## Styling

### Rules

| # | Rule | Why |
|---|---|---|
| S1 | Colors only from `--ui-*` (or `--site-*` defined in the theme). No hex/rgb/hsl in components or `styles/site` | Theme + dark mode reach every color |
| S2 | Hex values live only in `styles/ui-kit/theme-haintp.css` and image assets | One place to re-brand |
| S3 | Never edit `ui-kit/tokens.css` or `ui-kit/components.css` | Vendored (ADR-002) |
| S4 | Use kit controls for controls: `.ui-btn`, `.ui-field`, `.ui-segment`, `.ui-sidenav`, `.ui-loader`, `.ui-note`… | Same 32 px system as the Valuation Platform |
| S5 | State via attributes: `aria-pressed`, `aria-current`, `aria-expanded`, `aria-invalid`, `aria-busy`, `[hidden]` | No `is-*` classes |
| S6 | Do not change control heights/paddings | Alignment |
| S7 | Tailwind only for layout (`flex`, `grid`, `gap-*`, `w-full`). No Tailwind color utilities except `*-ui-*` from the preset | — |
| S8 | No `!important`, no `::ng-deep` | Specificity wars |
| S9 | Typography via kit type tokens: `font: var(--ui-type-body)`; larger page titles use `.page-header__title` | Consistent scale (14 px base) |

### Site building blocks (`styles/site/_page.scss`)

| Class | Use |
|---|---|
| `.page` | Page container: max 1120 px, 24 px padding (16 px mobile), 16 px gaps |
| `.page-header`, `__title`, `__desc`, `__actions` | Page title row |
| `.ui-panel` + `.panel-header` / `.panel-title` / `.panel-icon` / `.panel-body` | Section card |
| `.split`, `__main`, `__aside` | 2:1 columns, stacks < 960 px |
| `.tag-list` / `.tag` | Neutral technology labels |
| `.pill`, `.pill--neutral` | Status labels |
| `.stat-grid` / `.stat` | Read-only metrics |
| `.meta-list` | `<dl>` label/value grid |
| `.bullet-list` | Accent-dot list |
| `.empty-state` | Centered empty/error message |
| `.ui-field.field--multiline` | Textarea in kit field style |
| `.prose` | Rendered Markdown |
| `.no-print` | Hidden when printing |

### Example

```html
<section class="ui-panel" aria-labelledby="h-stack">
  <div class="panel-header">
    <app-icon class="panel-icon" name="layers" />
    <h2 class="panel-title" id="h-stack">Stack</h2>
  </div>
  <div class="panel-body">
    <ul class="tag-list"><li class="tag">Angular</li></ul>
  </div>
</section>
```

## Icons

- UI icons: `<app-icon name="…" [size]="16" />` (stroke, `currentColor`, `aria-hidden`). New icon → add to `IconName` and `icon.paths.ts`.
- Technology logos: `<img class="tech-logo" src="assets/logos/<name>.svg" alt="">`.

## Accessibility checklist (per component)

- [ ] Interactive elements are `<a href>` or `<button>`; never clickable `<div>`
- [ ] Icon-only buttons have `aria-label`
- [ ] Headings in order; one `<h1>` per page
- [ ] External links: `target="_blank" rel="noopener noreferrer"`

## Formatting

Prettier (`.prettierrc`: 4 spaces, single quotes, width 180). EditorConfig matches.
