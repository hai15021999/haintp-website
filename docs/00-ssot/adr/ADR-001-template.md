# ADR-001: Record architecture decisions

> Status: Accepted (reference) · Date: 2026-11-18 · Deciders: Hai Nguyen

This ADR is both the first decision (we use ADRs) and the worked example of the format. New ADRs copy [99-templates/adr-template.md](../../99-templates/adr-template.md).

## Context

The site is maintained by one person with AI assistance. Decisions made in chat or commit messages get lost, and agents re-open settled questions.

## Decision

- Record decisions that match the triggers in [00-ssot/README.md § ADR triggers](../README.md#adr-triggers) as `ADR-NNN-kebab-title.md` in this folder.
- Numbers are sequential and never reused. Status: `Proposed` → `Accepted` | `Rejected`; later `Superseded by ADR-NNN`.
- An Accepted ADR outranks every other doc. The PR that accepts it also updates the affected SSoT files.

## Consequences

- (+) Reasons survive; agents can check before proposing a reversal.
- (−) Small overhead per decision; keep ADRs to one page.

## Example (format)

| Section | Content |
|---|---|
| Context | Facts and forces, no opinions |
| Options | 2–4 options with pros/cons |
| Decision | One option, stated as a rule |
| Consequences | What becomes easier/harder; follow-up TODOs |
