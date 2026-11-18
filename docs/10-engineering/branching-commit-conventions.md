# Branching & Commit Conventions

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Branches

| Branch | Purpose | Rules |
|---|---|---|
| `master` | Released site | Always builds; deploy source (TODO: confirm host) |
| `feat/<slug>` | New page, project, feature | Short-lived, rebased on `master` |
| `fix/<slug>` | Bug fix | — |
| `docs/<slug>` | Docs only | — |
| `chore/<slug>` | Deps, config, kit re-copy | — |

## Commits — Conventional Commits

```
<type>(<scope>): <imperative summary, ≤ 72 chars>

<why, not what — optional>
```

| Type | Use |
|---|---|
| `feat` | New user-visible capability (page, project, filter) |
| `fix` | Bug fix |
| `content` | Content-only change in `src/app/content/` or `assets/case-studies/` |
| `style` | Visual/CSS change without behavior change |
| `refactor` | Code change without behavior change |
| `docs` | `docs/` only |
| `chore` | Build, deps, tooling, kit re-copy |
| `test` | Tests only |

Scopes: `shell`, `about`, `portfolio`, `resume`, `contact`, `content`, `ui-kit`, `docs`, `build`.

Examples:

```
feat(portfolio): add type filter and search
content(projects): add Valuation Platform case study
chore(ui-kit): re-copy kit v2.4 from report-page-design
```

## Rules

- One logical change per commit; refactor separate from behavior.
- AI-generated commits keep the tool's `Co-Authored-By` trailer.
- Never commit `dist/`, `.angular/`, secrets, or `*.local.*` files.
