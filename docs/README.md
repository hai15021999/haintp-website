# Documentation — haintp-website

Single Source of Truth (SSoT) for the personal website of Nguyen Tran Phuong Hai (Hai Nguyen).
Optimized for human developers and AI agents: short files, tables, explicit rules, stable headings.

## Start here

| You want to… | Read |
|---|---|
| Understand what the site is and is not | [00-ssot/service-scope.md](00-ssot/service-scope.md) |
| Understand how the code is organized | [00-ssot/architecture.md](00-ssot/architecture.md) |
| Change content (profile, projects, resume) | [00-ssot/api-contracts.md](00-ssot/api-contracts.md) § Content contracts |
| Build or restyle UI | [10-engineering/coding-standards.md](10-engineering/coding-standards.md) § Styling |
| Work as an AI agent | [00-ssot/ai-agent-guidelines.md](00-ssot/ai-agent-guidelines.md) (mandatory) |
| Ship a release | [20-operations/deployment.md](20-operations/deployment.md) |
| See open work | [10-engineering/todo-active.md](10-engineering/todo-active.md) |

## Layout

```
docs/
├── 00-ssot/          What is true: scope, context, architecture, contracts, glossary, NFRs, agent rules, ADRs
├── 10-engineering/   How we build: standards, tests, git, PRs, dependencies, active TODOs
├── 20-operations/    How it runs: deploy, environments, observability, runbook, backup, security
└── 99-templates/     Copy-from templates: ADR, API/content contract, service/feature, runbook
```

## Source-of-truth hierarchy

When two sources disagree, the higher one wins. Fix the lower one in the same change.

| Rank | Source | Notes |
|---|---|---|
| 1 | `docs/00-ssot/adr/*` (status Accepted) | Decisions override everything below |
| 2 | `docs/00-ssot/*` | Scope, architecture, contracts, NFRs, agent rules |
| 3 | `docs/10-engineering/*` | Standards and process |
| 4 | `docs/20-operations/*` | Run and release |
| 5 | `src/app/content/*.ts` | Content facts (profile, projects, resume) |
| 6 | Code (`src/`) | Current behavior. Code that contradicts ranks 1–4 is a bug or needs an ADR |
| 7 | `docs/99-templates/*`, comments, commit messages | Never authoritative |

Vendored UI kit: `D:\report-page-design` (upstream) is the source for `src/styles/ui-kit/{tokens,components}.css`. See [ADR-002](00-ssot/adr/ADR-002-compact-ui-kit.md).

## Ownership

Single-maintainer project. "Owner" = Hai Nguyen. AI agents may edit docs only under the rules in [ai-agent-guidelines.md](00-ssot/ai-agent-guidelines.md).

Full writing rules: [10-engineering/documentation-standards.md](10-engineering/documentation-standards.md).
