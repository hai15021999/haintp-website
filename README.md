# haintp-website

Personal website of **Hai Nguyen** (Nguyen Tran Phuong Hai), front-end developer — profile, portfolio with case studies, printable resume and contact form.

Built with Angular 19 (standalone, signals, zoneless) and the compact UI kit, in the same visual system as the Valuation Platform client project.

## Run

```bash
npm ci
npm start            # http://localhost:4200
npm run build        # production build → dist/
```

## Edit content

| What | File |
|---|---|
| Name, role, socials, career start | `src/app/content/profile.ts` |
| Portfolio projects | `src/app/content/projects.ts` + `src/assets/images/projects/` + optional `src/assets/case-studies/<slug>.md` |
| Resume | `src/app/content/resume.ts` |
| Skills | `src/app/content/skills.ts` |

## Documentation

All architecture, contracts, standards and operations docs live in [`docs/`](docs/README.md). AI agents: read [AGENTS.md](AGENTS.md) first.
