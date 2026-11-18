## Why another UI kit

Report and admin pages are dense: a toolbar of mixed controls above a long table, filter popups, dialogs. Component libraries made for marketing pages fight that density, and per-project CSS drifts the moment a second project copies it. I wanted a small kit that any Angular, plain HTML or Tailwind project can vendor, re-brand in one file, and still look the same.

## Design decisions

### Two token layers

A theme only states brand facts:

```css
:root {
  --theme-primary: #007d75;
}
```

`tokens.css` derives everything else with `color-mix()` — hover, pressed, selected wash, focus ring, line colors and the full grey ramp. So any brand color gives a consistent UI, and dark mode works without per-theme work. Components read only the derived `--ui-*` tokens, never `--theme-*`.

### State is ARIA, not classes

```html
<button class="ui-btn" aria-pressed="true">Mine</button>
<a class="ui-sidenav__link" aria-current="page">Portfolio</a>
```

The attribute that makes the control accessible is the same one that styles it. There is no `is-active` class to forget, and screen-reader state can never disagree with what is on screen.

### Fixed measurements

Every control is 32px tall, border included. A toolbar with a search field, a dropdown, a segment and a button lines up without page-level fixes. Pages may not override heights or paddings; a genuinely new size becomes a token or a modifier in the kit.

## Tooling

- `node scripts/theme.mjs new <name> "#hex"` writes a theme, picks a readable label color for the fill, and darkens or lightens the brand text until it passes 4.5:1 in both modes.
- `node scripts/theme.mjs check` prints a contrast report for every theme and fails on anything under 3:1.
- Tailwind v3 preset and v4 `@theme` mapping add utilities that follow the active theme (`bg-ui-surface`, `text-ui-accent`, `border-ui-line`).
- The kit ships as an **AI-agent skill** with one spec file per control, so an agent building a page reads the same rules a person would.

## Where it runs

- **Valuation Platform** (client project) — staff and admin apps, 5 switchable brand themes, light and dark.
- **This website** — Plum theme, side navigation with icon rail, panels, segment filter, form fields, loaders.

## Controls

Buttons (ghost, secondary, primary, toggle, danger, icon, segment) · text, date and time fields · dropdowns · checkbox, radio, switch · metric cards · sticky table with filter popups and pager · chips · tooltips · dialogs · tabs · side navigation with icon rail · dots loader, spinner, loading overlay, progress bar
