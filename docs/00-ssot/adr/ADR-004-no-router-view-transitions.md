# ADR-004: Disable router view transitions

> Status: Accepted · Date: 2026-11-18 · Deciders: Hai Nguyen

## Context

v1 enabled `withViewTransitions()`. During the 2026-11 restructure, loading a deep link while the document was hidden (background tab, minimized window) logged `InvalidStateError: Transition was aborted because of invalid state. Document hidden`, and the router never completed the navigation: the outlet stayed empty and later navigations queued behind it. Reproduced with Angular 19.2 + zoneless on `/nothing-here` and `/project/were-wolf-moon-light`; removing `withViewTransitions()` fixed both.

## Decision

Do not use `withViewTransitions()`. Page changes are instant.

## Consequences

- (+) Deep links opened in background tabs always render.
- (−) No cross-fade between pages.
- Revisit when upgrading Angular: re-test a hidden-tab deep link before re-enabling (requires a new ADR).
