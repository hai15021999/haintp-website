# Domain Glossary

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

One term, one meaning. Use these words in code, docs and UI. "Avoid" lists synonyms that must not be introduced.

## Content terms

| Term | Definition | Code | Avoid |
|---|---|---|---|
| Profile | Identity facts about the owner (name, role, socials, career start) | `Profile`, `PROFILE` | "user", "me" |
| Project | One portfolio entry | `Project`, `PROJECTS` | "work item", "case" |
| Slug | Permanent URL id of a project | `Project.slug` | "id" (v1 used numeric ids) |
| Professional project | Paid work for an employer or client | `type: 'professional'` | "company project" |
| Personal project | Self-initiated work | `type: 'personal'` | "side project" in code |
| Case study | Optional long Markdown for a project | `assets/case-studies/<slug>.md` | "project md", "detail md" |
| Highlight | One outcome bullet of a project | `Project.highlights` | "feature" |
| Stack | Technologies used, most important first | `Project.stack` | "tech", "technologies" |
| Featured | Project shown on About | `Project.featured` | "pinned" |
| Confidential project | Project whose details company policy forbids publishing; only title + summary shown | `Project.confidential` | "private", "hidden" |
| Experience item | One job/engagement on the resume | `ExperienceItem` | "job" in code |
| Period | Start/end months, end omitted = Present | `Period`, `formatPeriod()` | "duration" |
| Career start | First month of professional front-end work | `Profile.careerStart` | hard-coded dates |

## UI terms

| Term | Definition | Code |
|---|---|---|
| Shell | Side navigation + top bar + routed page | `AppComponent`, `.ui-shell` |
| Sidenav | Main navigation column (kit) | `.ui-sidenav` |
| Rail | Collapsed 56px sidenav on desktop | `LayoutService.railCollapsed` |
| Drawer | Sidenav sliding over the page below 768px | `LayoutService.drawerOpen` |
| Top bar | 48px header with section crumb and actions | `.site-topbar` |
| Panel | Bordered surface block | `.ui-panel` + `.panel-header` / `.panel-body` |
| Tag | Neutral label for a technology | `.tag` |
| Pill | Status label (project type, Current) | `.pill` |
| Stat | Read-only metric tile | `.stat` |
| Color mode | light / dark / system | `ThemeService.mode` |
| Theme | Brand color set of the UI kit | `theme-haintp.css` |
| Token | CSS custom property; `--theme-*` = input, `--ui-*` = derived | `tokens.css` |

## Engineering terms

| Term | Definition |
|---|---|
| SSoT | `docs/00-ssot`, the authoritative documentation |
| ADR | Architecture Decision Record in `docs/00-ssot/adr/` |
| Kit / UI kit | Compact UI kit, upstream at `D:\report-page-design`, vendored in `src/styles/ui-kit/` |
| Vendored | Copied from upstream, never edited in place |
| VERIFY | Code comment marking a fact the owner must confirm before publishing |
