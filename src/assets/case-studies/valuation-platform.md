## What I worked on

### Dossier workflow

- One **dossier** per appraisal request, with sections that unlock by state: customer and contract, assets, valuation, review, documents.
- **Role-based views** for sales, appraisers, accounting, supervisors and administrators. The same screen shows different actions depending on who opens it.
- Dense **data grids** with sticky headers, column filter popups, paging and saved views over OData endpoints.

### Documents from data

- **Contracts, reports and certificates** are Word templates filled with docxtemplater. Appraisers can fine-tune the result in the browser with Syncfusion DocumentEditor before it is locked.
- **PDF output** with pdfmake for quick previews and internal summaries.
- An **argumentation picker** lets appraisers reuse approved valuation arguments per asset type instead of rewriting them.

### One UI system for two apps

The staff app and the admin app had drifted apart visually. I extracted a **compact UI kit** ([case study](/portfolio/compact-ui-kit)) and moved both apps onto it:

| Before | After |
|---|---|
| Hard-coded hex colors per component | `--ui-*` tokens derived from one brand color |
| Mixed button and field heights | Every control 32px, toolbars line up |
| No dark mode | Light, dark and system, plus 5 brand themes |
| Contrast unchecked | Brand text and fills verified to WCAG AA |

### Working with AI agents

The repository has an **SSoT documentation system** (`docs/00-ssot` … `docs/99-templates`): scope, architecture, API contracts, NFRs, ADRs and explicit rules for AI agents — which files are authoritative, what may not be refactored without an ADR, and how to avoid inventing APIs. AI-assisted changes go through the same review rules as human ones. This website now uses the same structure.

## Stack

Angular 21 (standalone, signals) · TypeScript · Tailwind CSS v4 · Compact UI kit · Angular Material (overlays only) · Syncfusion DocumentEditor · docxtemplater · pdfmake · ApexCharts · OData · Playwright
