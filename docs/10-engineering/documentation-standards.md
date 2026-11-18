# Documentation Standards

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## File rules

| Rule | Detail |
|---|---|
| Header | Line 1 `# Title`; line 3 `> Status: … · Last updated: YYYY-MM-DD · Owner: …` |
| Status values | `Draft`, `Active`, `Deprecated` (link the replacement) |
| Length | One topic per file; split above ~250 lines |
| Headings | Stable `##` names — other docs link to them as anchors |
| Format | Tables for facts, bullets for rules, checklists for procedures, Mermaid for flows |
| Tone | Imperative, concrete; no marketing words ("seamless", "robust") |
| Unknowns | `TODO(owner): <question>` inline + row in [todo-active.md](todo-active.md) |
| Links | Relative Markdown links; code paths in backticks |
| Dates | ISO `YYYY-MM-DD`, absolute (never "last week") |

## Where things go

| Content | Folder |
|---|---|
| What is true (scope, architecture, contracts, terms, NFRs, agent rules, decisions) | `00-ssot/` |
| How we build (standards, tests, git, PRs, deps, TODOs) | `10-engineering/` |
| How it runs (deploy, envs, monitoring, incidents, backup, security) | `20-operations/` |
| Copy-from skeletons | `99-templates/` |
| Long-form project write-ups shown on the site | `src/assets/case-studies/` (content, not docs) |

## Precedence and duplication

- Never restate a rule; link to the file that owns it (see ownership table in [00-ssot/README.md](../00-ssot/README.md)).
- If two docs conflict, the higher folder wins (`00` > `10` > `20` > `99`); fix the lower one.

## Retrieval-friendly writing (for RAG / agents)

- Put the answer in the first lines under a heading.
- Use the exact glossary terms ([domain-glossary.md](../00-ssot/domain-glossary.md)).
- Prefer `Rule → Why → Example` over paragraphs.
- Give IDs to requirements (`PERF-1`, `R4`) so they can be cited.

## Update responsibilities

| Event | Who updates | What |
|---|---|---|
| Code change alters documented behavior | Author of the change (human or agent) | Affected docs, same PR |
| New decision | Decider | New ADR + SSoT files |
| Release | Owner | Deployment log in [deployment.md](../20-operations/deployment.md) |
| Quarterly review | Owner | Check `Last updated` > 6 months; mark stale docs `Deprecated` or refresh |
