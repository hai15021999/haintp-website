# Pull Request Guidelines

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Size

- Target < 400 changed lines excluding assets and lockfile. Split bigger work by layer (content / styles / feature).

## Template

```markdown
## What
<one paragraph>

## Why
<link to TODO / ADR / issue>

## Screens
<light + dark, desktop + 375 px for UI changes>

## Checks
- [ ] `npx ng build` passes, no new warnings
- [ ] Manual check (testing-strategy.md § Manual check)
- [ ] Docs updated (list files) / not needed because …
- [ ] No hex, `!important`, `::ng-deep` added
- [ ] No route or slug removed without redirect

## Not verified
<anything you could not check>
```

## Review checklist

| Area | Check |
|---|---|
| Contracts | Routes, slugs, content fields, EmailJS params unchanged or documented in `api-contracts.md` |
| Layers | Imports follow [architecture.md § Layers](../00-ssot/architecture.md#layers-and-allowed-dependencies) |
| Styling | Kit classes + tokens only (coding-standards § Styling) |
| A11y | Labels, focus, ARIA state, headings |
| Content | No invented facts; `VERIFY` items tracked |
| Docs | Same PR; `Last updated` bumped |

## Merge

Squash-merge with a Conventional Commit title. Delete the branch.
