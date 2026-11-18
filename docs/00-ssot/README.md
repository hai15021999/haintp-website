# 00-ssot — Overview

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Purpose

This folder states what is true about the system. Every other doc, and the code, must agree with it.

## Files

| File | Answers | Owner | Update trigger |
|---|---|---|---|
| [service-scope.md](service-scope.md) | What the site does and does not do | Owner | New page, feature or boundary change |
| [system-context.md](system-context.md) | Who and what talks to the site | Owner | New external service or actor |
| [architecture.md](architecture.md) | Code structure, layers, data flow | Owner | Structural refactor, new layer, new library |
| [api-contracts.md](api-contracts.md) | Routes, content schema, external APIs | Owner | Any route, content-type or integration change |
| [domain-glossary.md](domain-glossary.md) | Terms and their single meaning | Owner | New term or renamed concept |
| [non-functional-requirements.md](non-functional-requirements.md) | Performance, a11y, SEO, security targets | Owner | Target change or new risk |
| [ai-agent-guidelines.md](ai-agent-guidelines.md) | Rules for AI-assisted changes | Owner | New tool, repeated agent mistake |
| [adr/](adr/) | Decisions and their reasons | Author of the decision | Any decision listed in § ADR triggers |

## Precedence rules

| Rule | Applies to | Consequence |
|---|---|---|
| ADR (Accepted) > other SSoT files | All | Update the SSoT file in the same PR as the ADR |
| Contracts > templates | Routes, content types, EmailJS params | Change `api-contracts.md` first, then code |
| NFR > feature | Bundle budget, a11y, security | A feature that breaks an NFR is not done |
| Tokens > local CSS | Styling | No hex in component CSS (see coding-standards § Styling) |
| SSoT > local notes | Docs | Feature notes must link back here; never restate a rule |

## ADR triggers

Write an ADR ([template](../99-templates/adr-template.md)) before merging when a change:

- adds, removes or replaces a runtime dependency;
- changes the build system, hosting, or rendering mode (SPA / SSR / prerender);
- changes a public URL without a redirect, or the content schema;
- adds a backend, storage, analytics or third-party script;
- deviates from a rule in `00-ssot` or `10-engineering`.

## ADR index

| ID | Title | Status |
|---|---|---|
| [ADR-001](adr/ADR-001-template.md) | Template / example | Reference |
| [ADR-002](adr/ADR-002-compact-ui-kit.md) | Adopt the compact UI kit (Valuation Platform visual system) | Accepted |
| [ADR-003](adr/ADR-003-content-layer-and-shell.md) | Typed content layer; drop BaseComponent, Material and global state | Accepted |
| [ADR-004](adr/ADR-004-no-router-view-transitions.md) | Disable router view transitions | Accepted |
