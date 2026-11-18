# Runbook

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Smoke test (after every deploy)

- [ ] `/` redirects to `/about`; page renders, no console errors
- [ ] `/portfolio` → filter "Personal", search "react" narrows the list
- [ ] `/portfolio/valuation-platform` loads directly (deep link) and shows the case study
- [ ] `/project/were-wolf-moon-light` redirects to `/portfolio/moonlight-werewolf`
- [ ] `/resume` → Print preview shows content without navigation
- [ ] `/contact` → empty submit shows 3 errors (do not send unless testing delivery)
- [ ] Theme toggle cycles System → Light → Dark

## Incidents

| Symptom | Likely cause | Fix |
|---|---|---|
| Deep link returns host 404 | No SPA fallback | Configure rewrite to `index.html` (deployment.md) |
| Blank page after load, no errors | Navigation stuck; check if `withViewTransitions` was re-enabled | Remove it (ADR-004) |
| Blank page, console `ChunkLoadError` | Old `index.html` cached with new chunks | Set `index.html` no-cache; redeploy |
| Unstyled page | CSS path/base href wrong | Check `<base href>` and host root |
| Contact: "could not be sent" | EmailJS quota, wrong IDs, origin not allowed, offline | Check EmailJS dashboard history; verify `environment.prod.ts` IDs |
| Case study panel shows load error | `assets/case-studies/<slug>.md` missing or `caseStudy: true` wrong | Add file or set flag false |
| Dark mode flashes light on load | Pre-boot script in `index.html` changed | Restore script; keep key `haintp.theme` |
| Fonts look different | Google Fonts blocked | Acceptable fallback (system UI) |

## Rollback

1. Redeploy the previous `dist/` (host "rollback" or rebuild previous tag/commit).
2. Record in deployment log with reason.

Template for new procedures: [runbook-template.md](../99-templates/runbook-template.md).
