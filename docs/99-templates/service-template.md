# Feature / Page: <name>

> Status: Draft · Last updated: YYYY-MM-DD · Owner: <name>
> Use for: a new page, a new site feature, or a new portfolio project.

## Page / feature

| Item | Value |
|---|---|
| Route | `/…` (add to `app.routes.ts` with `title`, lazy `loadComponent`) |
| Folder | `src/app/features/<name>/` |
| Content source | `src/app/content/<file>.ts` |
| Nav entry | yes / no (`AppComponent.nav`) |
| Kit controls used | `.ui-…` |

### Checklist

- [ ] Standalone, OnPush, signals; reads text from `content/`
- [ ] `.page` + `.page-header` + panels; tokens only
- [ ] Light/dark, 375 px, keyboard checked
- [ ] Route row in `api-contracts.md`; scope row in `service-scope.md`
- [ ] TODOs for anything unverified

## Portfolio project

| Field | Value |
|---|---|
| `slug` | kebab-case, permanent |
| `title` | |
| `type` | professional / personal |
| `summary` | one sentence ≤ 140 chars |
| `role` | |
| `period` | `{ start: 'YYYY-MM' }` or omit |
| `stack` | most important first |
| `highlights` | 3–6 outcome-first bullets |
| `cover` | `assets/images/projects/<slug>.svg|jpg|webp`, 16:9 |
| `caseStudy` | true → `assets/case-studies/<slug>.md` (start with `##`) |
| `links` | public URLs only |
| `featured` | max 3 shown on About |

### Checklist

- [ ] No confidential client information; owner approved wording
- [ ] Company policy forbids details? Set `confidential: true`, keep only title + summary + generic cover
- [ ] Cover image added and < 200 kB
- [ ] Resume `experience[].projects` updated if professional
- [ ] Opened `/portfolio/<slug>` and the card in both themes
