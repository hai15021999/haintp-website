# API & Content Contracts

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

The site has no own backend. Its "APIs" are: public **routes**, the **content schema**, the **case-study asset path**, and the **EmailJS** call. Each is a contract — change the doc first, then the code, in one PR.

## Routes

| Path | Component | Title | Inputs | Notes |
|---|---|---|---|---|
| `/` | — | — | — | Redirect → `/about` |
| `/about` | `AboutComponent` | About | — | Landing page |
| `/portfolio` | `PortfolioComponent` | Portfolio | `?type=professional\|personal` | Unknown `type` → All |
| `/portfolio/:slug` | `ProjectDetailComponent` | Project title (resolver) | `slug` | Unknown slug → in-page "Project not found" |
| `/resume` | `ResumeComponent` | Resume | — | Print layout via `window.print()` |
| `/contact` | `ContactComponent` | Contact | — | EmailJS |
| `**` | `NotFoundComponent` | Not found | — | — |

### Legacy redirects (v1 URLs — never remove)

| Old | New |
|---|---|
| `/about-me` | `/about` |
| `/project/were-wolf-moon-light` | `/portfolio/moonlight-werewolf` |
| `/project/:slug` | `/portfolio/:slug` |

### Route evolution policy

1. A published path is permanent. Renaming = new path + redirect entry in `app.routes.ts` + row above.
2. A project `slug` is permanent once published. Never reuse a slug for a different project.
3. New query params must be optional and default to current behavior.

## Content contracts

Types: `src/app/content/content.types.ts` (the authoritative schema). Summary:

### `Project` (`content/projects.ts`)

| Field | Type | Required | Rule |
|---|---|---|---|
| `slug` | string | yes | kebab-case, unique, permanent |
| `title` | string | yes | ≤ 40 chars for cards |
| `type` | `'professional' \| 'personal'` | yes | Professional = paid work for an employer or client |
| `summary` | string | yes | One sentence, ≤ 140 chars |
| `context` | string | no | Client/employer context; no confidential data |
| `role` | string | no | What the owner did; omit when unknown or confidential |
| `period` | `{ start: 'YYYY-MM', end?: 'YYYY-MM' }` | no | Omit if unknown — never guess |
| `stack` | string[] | yes | Most important first (cards show 4) |
| `highlights` | string[] | yes | 3–6 outcome-first bullets |
| `cover` | string | yes | `assets/images/projects/<slug>.<ext>`, 16:9 |
| `caseStudy` | boolean | no | `true` ⇒ `assets/case-studies/<slug>.md` must exist |
| `links` | `{ label, url, kind: 'source'\|'live'\|'docs' }[]` | no | Public URLs only |
| `featured` | boolean | no | About page shows the first 3 featured |
| `confidential` | boolean | no | Company policy forbids details. Set `stack: []`, `highlights: []`; no `role`, `period`, `context`, `caseStudy`, `links`. Card shows a lock pill; detail page shows a policy notice instead of details |

### `Profile`, `Resume`, `SkillGroup`

| Type | File | Key rules |
|---|---|---|
| `Profile` | `profile.ts` | `careerStart` drives "years of experience" everywhere; no private email/phone |
| `Resume` | `resume.ts` | `experience[].projects` must be existing slugs; unverified facts carry a `// VERIFY:` comment |
| `SkillGroup` | `skills.ts` | `icon` must be an `IconName`; `logo` must exist under `assets/logos/` |

### Case-study Markdown

| Rule | Detail |
|---|---|
| Path | `src/assets/case-studies/<slug>.md` |
| Start | `##` headings (the page already shows the title as H1) |
| HTML | Rendered with `marked`, inserted through Angular's sanitizer (no bypass). Scripts/handlers are stripped |
| Links | Internal: `/portfolio/<slug>`; external: absolute `https://` |

### Content evolution policy

- Adding an optional field: allowed; document here.
- Renaming/removing a field or changing its meaning: ADR + update every content file in the same PR.

## EmailJS

| Item | Value |
|---|---|
| SDK | `@emailjs/browser` v4 (`emailjs.send(service, template, params, { publicKey })`) |
| Config | `environment.emailjs.{serviceId, templateId, publicKey}` |
| Caller | `features/contact/contact.service.ts` |

Template parameters (must match the EmailJS template):

| Param | Source | Limit |
|---|---|---|
| `name` | form | 1–100 chars |
| `email` | form | valid email, ≤ 200 |
| `reply_to` | = `email` | — |
| `message` | form | 10–4000 chars |
| `time` | `new Date().toLocaleString()` | — |

Example payload:

```json
{ "name": "Jane Doe", "email": "jane@example.com", "reply_to": "jane@example.com", "message": "Hi Hai, …", "time": "18/11/2026, 10:12:03" }
```

Errors: any rejected promise → UI shows "could not be sent" note; nothing is retried automatically. Honeypot field `website` non-empty → silently treated as sent.

## Cross-references

- [domain-glossary.md](domain-glossary.md) · [99-templates/api-template.md](../99-templates/api-template.md) · [security.md](../20-operations/security.md)
