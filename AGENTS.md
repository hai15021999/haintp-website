# AGENTS.md

Instructions for AI coding agents working in this repository.

**Mandatory:** read [docs/00-ssot/ai-agent-guidelines.md](docs/00-ssot/ai-agent-guidelines.md) before changing anything. It defines the source-of-truth hierarchy, hard rules, change management and the definition of done.

## Quick facts

| Item | Value |
|---|---|
| App | Personal website, Angular 19 standalone + signals, zoneless, SPA |
| UI | Compact UI kit (`.ui-*`, `--ui-*` tokens) vendored in `src/styles/ui-kit/`, theme `theme-haintp.css` |
| Content | `src/app/content/*.ts` (profile, projects, resume, skills) — all page text lives here |
| Build | `npx ng build` (must pass) · Dev: `npm start` → http://localhost:4200 |
| Docs | `docs/` — start at [docs/README.md](docs/README.md) |

## Top rules

1. Never invent facts about the owner. Unknown → omit or `// VERIFY:` + row in `docs/10-engineering/todo-active.md`.
2. No hex colors / `!important` outside `src/styles/ui-kit/theme-haintp.css`. Never edit vendored `tokens.css` / `components.css`.
3. Never remove a route or project slug; add a redirect.
4. No new dependencies, backend, analytics or router view transitions without an ADR.
5. Update docs in the same change; do not commit or deploy unless asked.
