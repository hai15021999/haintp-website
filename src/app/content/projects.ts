import { Project } from './content.types';

const cover = (slug: string, ext = 'svg') => `assets/images/projects/${slug}.${ext}`;

/**
 * Portfolio projects, newest first within each type.
 * Adding a project: docs/99-templates/service-template.md → "Portfolio project" checklist.
 */
export const PROJECTS: Project[] = [
    // ── Professional ──────────────────────────────────────────────
    {
        slug: 'valuation-platform',
        title: 'Valuation Platform',
        type: 'professional',
        summary: 'Two Angular apps that run a real-estate appraisal company: dossiers, reports, certificates and approvals.',
        context: 'Client project for a real-estate appraisal company (name withheld under contract). Staff app and admin app on one shared component layer.',
        role: 'Front-end Developer · UI system owner',
        period: { start: '2026-01' },
        stack: ['Angular 21', 'TypeScript', 'Tailwind CSS v4', 'Compact UI kit', 'Syncfusion DocumentEditor', 'ApexCharts', 'pdfmake', 'docxtemplater', 'OData', 'Playwright'],
        highlights: [
            'Built the appraisal dossier flow: intake, asset records, valuation sections and approval states, with role-based views for sales, appraisers, accounting and supervisors.',
            'Generated contracts, reports and certificates from Word templates (docxtemplater) and PDF (pdfmake), with in-browser editing through Syncfusion DocumentEditor.',
            'Moved both apps to one themeable UI kit: 32px controls, sticky data tables, dialogs, side navigation, 5 brand themes and dark mode, contrast checked to WCAG AA.',
            'Dashboards with ApexCharts; dense grids with column filters, paging and saved views over OData endpoints.',
            'Set up an SSoT documentation system and agent guidelines so AI-assisted changes follow the same architecture rules as people.',
        ],
        cover: cover('valuation-platform'),
        caseStudy: true,
        featured: true,
        // Sections below restate facts already in the case study. TODO(owner): outcomes, screenshots (masked) — todo-active V-11.
        metrics: [
            { value: '2', label: 'Angular apps, one UI layer' },
            { value: '5', label: 'Roles with their own views' },
            { value: '5', label: 'Brand themes + dark mode' },
            { value: 'WCAG AA', label: 'Contrast checked' },
        ],
        problem:
            'The company ran every appraisal across spreadsheets, Word templates and email, and each step belonged to a different department. The goal: one system where each role sees only its step, and the documents the company signs come out of the data instead of being retyped.',
        flow: {
            summary: 'Every valuation follows the same chain. A dossier carries the request through it; sections unlock by state and each role acts only on its step.',
            steps: ['Intake', 'Site survey', 'Asset records', 'Valuation method', 'Review', 'Report', 'Certificate', 'Invoice'],
        },
        techStack: [
            {
                layer: "Front-end",
                items: [
                    { name: "Angular 21 · TypeScript", purpose: "Staff app and admin app, standalone components and signals" },
                ],
            },
            {
                layer: "UI",
                items: [
                    { name: "Compact UI kit", purpose: "Shared controls, --ui-* tokens, 5 brand themes and dark mode for both apps" },
                    { name: "Tailwind CSS v4", purpose: "Utility classes next to the kit" },
                    { name: "Angular Material", purpose: "Overlays only" },
                ],
            },
            {
                layer: "Documents",
                items: [
                    { name: "docxtemplater", purpose: "Fills the company’s Word templates for contracts, reports and certificates" },
                    { name: "Syncfusion DocumentEditor", purpose: "In-browser editing of a generated document before it is locked" },
                    { name: "pdfmake", purpose: "PDF previews and internal summaries" },
                ],
            },
            {
                layer: "Data",
                items: [
                    { name: "OData", purpose: "Server-side filtering, paging and saved views for the data grids" },
                    { name: "ApexCharts", purpose: "Dashboards" },
                ],
            },
            {
                layer: "Testing",
                items: [
                    { name: "Playwright", purpose: "End-to-end test suite" },
                ],
            },
        ],
        decisions: [
            {
                title: 'Documents come out of the data',
                context: 'Contracts, reports and certificates were Word files retyped by hand for each appraisal.',
                decision: 'Fill the company’s Word templates with docxtemplater, let appraisers fine-tune the result in the browser with Syncfusion DocumentEditor, then lock it. pdfmake covers quick previews and internal summaries.',
                rationale: 'The signed documents keep the format the company already uses, while the values come from one source instead of being retyped.',
            },
            {
                title: 'One UI kit for two apps',
                context: 'The staff app and the admin app had drifted apart: hard-coded colors per component, mixed control heights, no dark mode, contrast unchecked.',
                decision: 'Extract a compact UI kit and move both apps onto it: --ui-* tokens derived from one brand color, every control 32px.',
                rationale: 'Toolbars line up without per-page fixes, and both apps get light/dark mode and 5 brand themes with brand text and fills verified to WCAG AA.',
            },
            {
                title: 'Same rules for AI and people',
                context: 'Part of the work is done with AI coding agents.',
                decision: 'An SSoT documentation system (scope, architecture, API contracts, NFRs, ADRs) with explicit rules for agents: which files are authoritative, what needs an ADR, how to avoid inventing APIs.',
                rationale: 'AI-assisted changes go through the same review rules as human ones.',
            },
        ],
        retrospective: [
            'Move the remaining Material form fields to native kit fields to drop one styling layer.',
            'Add visual regression snapshots per theme to the Playwright suite.',
        ],
    },
    // Appvity projects. VERIFY: role, period and exact stack for the two below (only topic + employer given by the owner).
    {
        slug: 'rag-chatbot',
        title: 'AI Chatbot with RAG',
        type: 'professional',
        summary: 'A chatbot that answers questions from company documents, using retrieval-augmented generation on the OpenAI platform.',
        context: 'Built at Appvity.',
        // Stack and highlights from the owner's repo openai-chat (private, not linked). Role and period still unknown — V-9.
        stack: ['OpenAI API', 'Vector stores', 'RAG', 'MCP (Model Context Protocol)', 'Node.js', 'Express 5', 'Angular 17', 'Server-Sent Events'],
        highlights: [
            'Retrieval: each question is rewritten, searched in an OpenAI vector store (top 5, score ≥ 0.6), and the hits are condensed into key points before answering.',
            'Answers stream token by token from Express to the Angular client over Server-Sent Events.',
            'Tool calling: when the model asks for a tool, the server calls it on an MCP server and streams the follow-up answer.',
            'Angular chat client built with signals and OnPush, rendering answers as Markdown.',
        ],
        cover: cover('rag-chatbot'),
        problem: 'Staff needed answers that come from the company’s own documents and systems, not from the model’s general knowledge.',
        flow: {
            summary: 'Every question goes through retrieval first; tools are called only when the model asks for one.',
            steps: ['Question', 'Rewrite query', 'Vector search', 'Condense context', 'Stream answer', 'MCP tool call (if asked)', 'Stream follow-up'],
        },
        techStack: [
            {
                layer: "Client",
                items: [
                    { name: "Angular 17", purpose: "Chat UI with signals and OnPush; reads the SSE stream" },
                    { name: "marked", purpose: "Renders answers as Markdown" },
                ],
            },
            {
                layer: "Server",
                items: [
                    { name: "Node.js · Express 5", purpose: "Chat API that streams answers as Server-Sent Events" },
                ],
            },
            {
                layer: "AI",
                items: [
                    { name: "OpenAI chat completions", purpose: "Answers with streaming and tool calling" },
                    { name: "OpenAI vector stores", purpose: "Retrieval over the company’s documents" },
                    { name: "gpt-4o-mini", purpose: "Rewrites the question for search and condenses the hits" },
                ],
            },
            {
                layer: "Integration",
                items: [
                    { name: "MCP SDK", purpose: "Client that calls business tools on a separate MCP server over stdio" },
                ],
            },
        ],
        decisions: [
            {
                title: 'Condense retrieved chunks before answering',
                context: 'Vector search returns up to five raw chunks, which can be long.',
                decision: 'A small model (gpt-4o-mini) rewrites the question for search, then condenses the hits into short key points that go into the answer prompt.',
                rationale: 'The answering model gets a short, focused context instead of whole chunks.',
            },
            {
                title: 'Stream over Server-Sent Events',
                context: 'Long answers take seconds to generate.',
                decision: 'Express writes each chunk as an SSE event; the Angular service reads the stream and appends to a signal.',
                rationale: 'Users see the answer appear in real time instead of waiting for the full response.',
            },
            {
                title: 'Business operations behind MCP',
                context: 'Some questions need live data, not documents.',
                decision: 'Tools live in a separate MCP server process (stdio). The chat server detects the tool call in the stream, calls the tool through an MCP client, and streams a follow-up answer with the result.',
                rationale: 'New operations are added to the MCP server without changing the chat server.',
            },
        ],
        codeSamples: [
            {
                title: 'Retrieval: search, then condense',
                language: 'JavaScript',
                // Excerpt from openai-chat/src/providers/openai.provider.mjs (getVectorStore). TODO(owner): confirm this Appvity code may be shown — V-13.
                code: `const analyzedPrompt = await this.analyzePrompt(query);

const vectorStore = await this.openai.vectorStores.search(VECTOR_STORE_ID, {
    query: analyzedPrompt,
    max_num_results: 5,
    rewrite_query: true,
    ranking_options: {
        ranker: 'auto',
        score_threshold: 0.6
    }
});

const results = vectorStore.data.reduce((acc, item) => {
    acc.push(item.content?.[0]?.text || '');
    return acc;
}, []);

const summary = await this.openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
        { role: 'system', content: 'You are an AI assistant that summarizes context information into concise key points.' },
        { role: 'user', content: \`Summarize the following context information into concise key points:\\n\\n\${results.join('\\n\\n')}\` }
    ],
    max_tokens: 150,
    temperature: 0.5,
});`,
                note: 'Two cheap calls before the real answer: rewrite the question for search, and condense what was found. A score threshold keeps weak matches out of the context.',
            },
        ],
    },
    {
        slug: 'microservices-integration',
        title: 'Microservices & Integration APIs',
        type: 'professional',
        summary: 'Back-end services that talk over REST, SOAP and gRPC, plus MCP servers that let AI agents call business operations.',
        context: 'Part of the Appvity platform, which is made of many services. I built some of them, such as numbering-service and webhook-service.',
        stack: ['REST', 'SOAP', 'gRPC', 'MCP (Model Context Protocol)', 'Microservices'],
        highlights: [
            'My part: individual services such as numbering-service and webhook-service — small pieces of a larger platform.',
            'REST APIs for web and mobile clients.',
            'SOAP integration with enterprise and legacy systems.',
            'gRPC for fast, typed service-to-service calls.',
            'MCP servers that expose business operations as tools AI agents can discover and call.',
        ],
        cover: cover('microservices-integration'),
    },
    {
        slug: 'excel-taskpane-addin',
        title: 'Excel Task Pane Add-in',
        type: 'professional',
        summary: 'An Office add-in that turns SharePoint lists and Dataverse tables into editable Excel-like grids.',
        role: 'Front-end, back-end and DevOps',
        stack: ['Angular', 'Office.js', 'Node.js', 'SharePoint', 'Dataverse', 'Azure DevOps'],
        highlights: [
            'Integration with SharePoint lists, Dataverse and internal product data as sources.',
            'Excel-like table with sorting, filtering, pagination and configurable column types.',
            'Batch synchronization with the server, validation and error handling.',
            'Version conflict check before writing: the user chooses to skip the item or overwrite the server.',
            'Sync summary after every run: how many items succeeded, failed or were skipped.',
            'Fast viewing, editing and calculating across many rows and columns.',
        ],
        cover: cover('excel-taskpane-addin'),
        featured: true,
        // Sections below from the owner's description (2026-11-19). Company product: no repo access, no code, no screenshots.
        problem:
            'Organizations already on the Microsoft ecosystem keep data in many places — SharePoint lists, Dataverse and the product’s own data. Users wanted to keep that data in sync continuously while working the way they already know: in Excel.',
        flow: {
            summary: 'The task pane pulls data into a sheet, the user edits it like any Excel range, and changes go back to the source in batches with a version check per item.',
            steps: ['Pick a source', 'Load into Excel', 'Edit in the sheet', 'Sync in batches', 'Version check', 'Resolve conflicts', 'Sync summary'],
        },
        techStack: [
            {
                layer: "Add-in",
                items: [
                    { name: "Angular", purpose: "Task pane UI and the Excel-like grid" },
                    { name: "Office.js", purpose: "Reads and writes the workbook from the task pane" },
                ],
            },
            {
                layer: "Back-end",
                items: [
                    { name: "Node.js", purpose: "Server side of the batch sync: validation, version check, sync results" },
                ],
            },
            {
                layer: "Data sources",
                items: [
                    { name: "SharePoint lists", purpose: "Source and target of synced items" },
                    { name: "Dataverse", purpose: "Source and target of synced tables" },
                ],
            },
            {
                layer: "DevOps",
                items: [
                    { name: "Azure DevOps" },
                ],
            },
        ],
        decisions: [
            {
                title: 'Excel as the editing surface',
                context: 'Users already work in Excel every day; the data lives in SharePoint, Dataverse and the product.',
                decision: 'Build an Office task pane add-in that loads source data into the sheet and syncs edits back, instead of a separate editing screen.',
                rationale: 'Users keep their familiar Excel workflow while the data stays connected to its source.',
            },
            {
                title: 'Check versions before overwriting',
                context: 'Someone else may change an item on the server while a user is editing it in Excel.',
                decision: 'Before writing, compare the item’s version in the sheet with the server’s. On a mismatch, ask the user: leave the item as is and edit again after the next sync, or overwrite the server.',
                rationale: 'Nobody silently loses another person’s change, and the user decides item by item.',
            },
            {
                title: 'Report every sync run',
                context: 'A batch sync can partly succeed.',
                decision: 'After each run, show a message with how many items succeeded, failed or were skipped.',
                rationale: 'The user knows exactly what reached the server and what still needs attention.',
            },
        ],
    },
    {
        slug: 'helpdesk-system',
        title: 'Helpdesk System',
        type: 'professional',
        summary: 'A ticketing system to submit, track and resolve support requests, with email intake and SLA reporting.',
        context: 'Appvity product for handling customer support requests.',
        role: 'Main front-end developer',
        stack: ['Angular', 'Syncfusion UI', 'RxJS'],
        highlights: [
            'Ticket submission and tracking with status updates and notifications.',
            'Email-to-ticket creation and update threads.',
            'Tickets handled against the customer’s contract and the SLA it defines.',
            'Role-based access for requesters, agents and administrators.',
            'Reporting on resolution time and agent performance.',
        ],
        cover: cover('helpdesk-system'),
        // Sections below from the owner's description (2026-11-19). Company product: no repo, code or screenshots.
        problem:
            'Customers send support requests, and each customer has a contract with its own SLA. The goal: handle every request as a ticket against that contract, so support is managed easily and professionally.',
        flow: {
            summary: 'Every request becomes a ticket tied to the customer’s contract, so the SLA applies from the moment it is created.',
            steps: ['Request (form or email)', 'Ticket created', 'Contract & SLA applied', 'Agent works the ticket', 'Status updates & notifications', 'Resolved', 'SLA reporting'],
        },
    },
    {
        slug: 'admin-portal',
        title: 'Admin Portal',
        type: 'professional',
        summary: 'Back-office portal to manage users, product objects, workflows and settings across a product suite.',
        context: 'Part of the Appvity Product Platform. It sets the defaults the other projects in the platform start from.',
        role: 'Front-end Developer',
        stack: ['Angular', 'Syncfusion UI', 'Node.js', 'MongoDB'],
        highlights: [
            'User management: create, deactivate, assign roles.',
            'Field sets and status sets defined once and reused by other projects in the platform.',
            'Product object management with CRUD and validation.',
            'Workflow configuration with task assignment and notifications.',
            'Central settings and customization per tenant.',
        ],
        cover: cover('admin-portal'),
        // Sections below from the owner's description (2026-11-19). Company product: no repo, code or screenshots.
        problem:
            'Every project in the platform needs the same building blocks — users, workflows, field sets, status sets. Without one place to define them, each project would set them up on its own.',
        flow: {
            summary: 'Administrators configure the defaults once; the other projects in the platform start from them.',
            steps: ['Set up users & roles', 'Define field sets', 'Define status sets', 'Configure workflows', 'Projects use the defaults'],
        },
    },

    // ── Professional · confidential, all at Appvity (title + summary only; detail page shows a policy notice) ──
    {
        slug: 'vinamilk-approval-workflow',
        title: 'Vinamilk — Approval Workflow',
        type: 'professional',
        summary: 'Multi-level approval process for a large enterprise in the dairy and consumer-goods industry.',
        stack: [],
        highlights: [],
        cover: cover('vinamilk-approval-workflow'),
        confidential: true,
    },
    {
        slug: 'prudential-approval-workflow',
        title: 'Prudential — Approval Workflow',
        type: 'professional',
        summary: 'Approval process for a large insurance organization, with requests routed through several levels of sign-off.',
        stack: [],
        highlights: [],
        cover: cover('prudential-approval-workflow'),
        confidential: true,
    },
    {
        slug: 'viags-approval-workflow',
        title: 'Viags — Approval Workflow',
        type: 'professional',
        summary: 'Approval process for a large aviation ground-services organization.',
        stack: [],
        highlights: [],
        cover: cover('viags-approval-workflow'),
        confidential: true,
    },

    // ── Personal ──────────────────────────────────────────────────
    // VERIFY: copied from plan-werewolf-discord-portfolio.md using the §1 defaults. Owner has not
    // line-reviewed the wording. Omitted: source link (private repo), featured, gallery, Markdown
    // case study, outcomes (no confirmed live game). ADR-004 is still Proposed — see V-15.
    {
        slug: 'werewolf-discord',
        title: 'Werewolf Discord Bot',
        type: 'personal',
        summary:
            'A Discord bot that moderates Werewolf games in a channel: lobby, secret roles, night actions, votes and win checks.',
        context:
            'Personal project. Where Moonlight helps a human game master, this bot replaces one: the whole game runs inside a Discord channel.',
        role: 'Author',
        period: { start: '2026-11' },
        stack: [
            'Node.js 24',
            'TypeScript',
            'discord.js 14',
            'MongoDB 8',
            'Redis 8',
            'BullMQ',
            'zod',
            'Vitest',
            'Testcontainers',
            'Docker Compose',
        ],
        highlights: [
            'The bot is the moderator: it runs lobby, role reveal, night, day discussion, vote and win check without a human game master.',
            'Private information stays private: roles, Seer results and Witch choices go through ephemeral messages, never the public channel.',
            'Game logic is a pure TypeScript domain (state machine, roles, rules) with no Discord or database imports, so a full game plays in a unit test.',
            'Phase timers are BullMQ delayed jobs with idempotent ids; live state sits in Redis behind a per-game lock and version check, with MongoDB snapshots for recovery.',
            'An owner console tunes player limits, phase durations and the role deck at runtime, validated against the written rules before saving.',
            'Built with AI coding agents under an SSoT doc system: 14 numbered business rules, ADRs and a test named after every rule.',
        ],
        cover: cover('werewolf-discord'),
        metrics: [
            { value: '7', label: 'Roles, 5–12 players' },
            { value: '14', label: 'Business rules, each with a test' },
            { value: '9', label: 'Game states in one state machine' },
            { value: '2', label: 'Languages: English, Vietnamese' },
        ],
        problem:
            'Werewolf needs a moderator who cannot play, has to keep every role and night action secret, and has to time phases and count votes without mistakes. On Discord the group also shares one public channel, so secrets are easy to leak.',
        flow: {
            summary:
                'One game per channel. Each phase ends early when everyone has acted, otherwise on its timer; the win check runs after every night and every vote.',
            steps: [
                'Create lobby',
                'Players join',
                'Roles dealt in private',
                'Night actions',
                'Witch / Hunter turn',
                'Dawn report',
                'Discussion',
                'Lynch vote',
                'Win check',
            ],
        },
        techStack: [
            {
                layer: 'Bot',
                items: [
                    {
                        name: 'Node.js 24 · TypeScript (strict, ESM)',
                        purpose: 'One bot service: Discord gateway, use cases, workers and HTTP',
                    },
                    {
                        name: 'discord.js 14',
                        purpose: 'Slash commands, buttons, select menus and ephemeral replies',
                    },
                    { name: 'zod', purpose: 'Validates environment config and owner console input' },
                ],
            },
            {
                layer: 'State & timers',
                items: [
                    {
                        name: 'Redis 8 · ioredis',
                        purpose: 'Live game state with a version number, per-game lock, rate limits',
                    },
                    {
                        name: 'BullMQ',
                        purpose: 'Phase timers as delayed jobs that survive restarts and never fire twice',
                    },
                    {
                        name: 'MongoDB 8 · Mongoose',
                        purpose: 'Game snapshots, history, player stats and the tunable rule set',
                    },
                ],
            },
            {
                layer: 'Operations',
                items: [
                    {
                        name: 'Docker Compose',
                        purpose: 'Bot, MongoDB and Redis on one machine; separate dev and prod projects',
                    },
                    { name: 'pino · prom-client', purpose: 'JSON logs, /healthz, /readyz and /metrics' },
                ],
            },
            {
                layer: 'Testing',
                items: [
                    { name: 'Vitest', purpose: 'Unit tests for the domain, one per business rule' },
                    {
                        name: 'Testcontainers',
                        purpose: 'Integration tests against real MongoDB and Redis in CI',
                    },
                    {
                        name: 'GitHub Actions',
                        purpose: 'Typecheck, lint, format, tests and build on every pull request',
                    },
                ],
            },
        ],
        decisions: [
            {
                title: 'Pure domain, injected time and randomness',
                context:
                    'Werewolf rules have many interactions (Guard, Witch, Elder, Hunter) and must be tested without Discord or databases.',
                decision:
                    'Hexagonal layering: the domain is a state machine with no I/O; clock and random numbers come in through ports, and adapters depend on the domain, never the reverse.',
                rationale:
                    'A seeded random port replays the same game in tests, and every business rule has a test named after its id.',
            },
            {
                title: 'One writer per game',
                context: 'Several players click vote or night-action buttons at the same moment.',
                decision:
                    'Every change goes through one path: take a Redis lock for the game, load, apply the pure domain step, save with a version check, then schedule timers and post messages.',
                rationale:
                    'Concurrent clicks cannot overwrite each other, and a failed side effect (timer, message) never turns a valid action into an error.',
            },
            {
                title: 'Timers as idempotent jobs',
                context: 'Phases end on timers that must survive a restart and must not fire twice.',
                decision:
                    'Each phase end is a BullMQ delayed job with id game:round:phase. The worker re-checks the current phase before advancing; on boot the bot restores missing state and timers from MongoDB.',
                rationale: 'Stale or duplicate jobs do nothing, and a restart mid-game does not lose the timer.',
            },
            {
                // VERIFY: ADR-004 status is Proposed in the source repo. V-15.
                title: 'Rules in code, numbers in a console',
                context: 'The owner wanted to tune games without code changes, but role abilities are logic, not data.',
                decision:
                    'Split rules in two: abilities, night order, voting and win conditions stay in code; player limits, durations and the role deck are stored in MongoDB and edited in a small server-rendered console on localhost, validated against the written ranges.',
                rationale:
                    'No rule engine to maintain, and a bad value cannot be saved. Changes apply only to games created afterwards.',
            },
        ],
        codeSamples: [
            {
                title: 'The single write path',
                language: 'TypeScript',
                // Verbatim excerpt from werewolf-discord/src/application/services/game-runner.ts (mutateGame).
                code: `  return deps.lock.runExclusive(\`game:\${gameId}\`, async () => {
    const stored = await deps.games.findById(gameId);
    if (!stored) return err({ code: 'GAME_NOT_FOUND' });
    const now = deps.clock.now();
    const result = mutation(stored.state, now);
    if (!result.ok) return result;
    const update = advanceIfComplete(deps, result.value, now);
    await commit(deps, stored.state, stored.version, update);
    return ok(update);
  });`,
                note: 'Every action and every timer goes through this function: lock, load, pure domain step, version-checked save. Timers, stats and Discord messages run after the save and only log on failure.',
            },
        ],
        retrospective: [
            'Next: crash recovery tested end to end, backups and observability targets (phase P3), then a v1.0.0 release in a real guild.',
            'Later: automatic mute for dead players (needs extra Discord permissions), per-guild settings through a slash command, and more roles.',
        ],
    },
    {
        slug: 'compact-ui-kit',
        title: 'Compact UI Kit',
        type: 'personal',
        summary: 'A themeable CSS kit for dense report and admin pages: one brand color in, a full accessible UI out.',
        role: 'Author',
        stack: ['CSS custom properties', 'color-mix()', 'ARIA', 'Node.js', 'Tailwind v3 / v4'],
        highlights: [
            'Two token layers: a theme states brand facts (--theme-*), the kit derives hover, wash, focus, lines and the grey ramp (--ui-*).',
            'State lives in ARIA attributes (aria-pressed, aria-selected, aria-current) — the accessible markup is also the styling hook.',
            'Every control is exactly 32px, so mixed toolbars line up without per-page fixes.',
            'A Node script generates a theme from one hex color and darkens the text color until it passes 4.5:1 in light and dark mode.',
            'Ships as an AI-agent skill with a spec per control, used by the Valuation Platform and this website.',
        ],
        cover: cover('compact-ui-kit'),
        caseStudy: true,
        featured: true,
        techStack: [
            {
                layer: "Styling",
                items: [
                    { name: "CSS custom properties", purpose: "Two token layers: --theme-* brand facts, --ui-* derived values" },
                    { name: "color-mix()", purpose: "Derives hover, wash, lines and the grey ramp from a few theme colors" },
                    { name: "ARIA attributes", purpose: "State hooks: aria-pressed, aria-selected, aria-current style the controls" },
                ],
            },
            {
                layer: "Tooling",
                items: [
                    { name: "Node.js", purpose: "Script that generates a theme from one hex color and checks 4.5:1 contrast" },
                ],
            },
            {
                layer: "Integration",
                items: [
                    { name: "Tailwind v3 / v4", purpose: "Presets so Tailwind projects use the kit tokens" },
                ],
            },
        ],
        codeSamples: [
            {
                title: 'Derived tokens: a theme states facts, the kit derives the rest',
                language: 'CSS',
                // Verbatim excerpt from src/styles/ui-kit/tokens.css (kit source).
                code: `/* Lines */
--ui-line: var(--theme-line, color-mix(in srgb, var(--theme-text) 15%, var(--theme-surface)));
--ui-line-strong: var(--theme-line-strong, color-mix(in srgb, var(--theme-text) 26%, var(--theme-surface)));

/* Text, strongest to weakest */
--ui-text: var(--theme-text);
--ui-text-title: var(--theme-text-title, color-mix(in srgb, var(--theme-text) 95%, var(--theme-surface)));
--ui-text-body: var(--theme-text-body, color-mix(in srgb, var(--theme-text) 88%, var(--theme-surface)));
--ui-text-label: var(--theme-text-label, color-mix(in srgb, var(--theme-text) 74%, var(--theme-surface)));
--ui-text-muted: var(--theme-text-muted, color-mix(in srgb, var(--theme-text) 65%, var(--theme-surface)));`,
                note: 'Each --ui-* token uses the theme value if one is set, otherwise mixes it from text and surface. A theme only needs a few --theme-* facts, and dark mode works by swapping those facts — the derived ramp follows.',
            },
        ],
    },
    {
        slug: 'moonlight-werewolf',
        title: 'Moonlight — Werewolf GM Tool',
        type: 'personal',
        summary: 'A game-master assistant for Werewolf nights: 16 roles, guided night phases, voting and automatic win detection.',
        role: 'Author',
        stack: ['React 19', 'TypeScript', 'Vite', 'Google Gemini API', 'i18n (EN / VI)'],
        highlights: [
            'Phase engine: setup → night → day → vote, with role wake priorities.',
            'Night actions for wolves, witch, guard, seer, cupid and cult leader, plus automatic win detection.',
            'Gemini integration that reads a photo of a handwritten player list and writes an end-of-game analysis — built, switched off in the current version.',
            'Bilingual UI with on-the-fly language switch.',
        ],
        cover: cover('moonlight-werewolf'),
        caseStudy: true,
        links: [{ label: 'Source code', url: 'https://github.com/hai15021999/were-wolf-moonlight', kind: 'source' }],
        featured: true,
        metrics: [
            { value: '16', label: 'Roles in 3 teams' },
            { value: '6', label: 'Win conditions, checked automatically' },
            { value: '2', label: 'Languages, switched live' },
        ],
        problem:
            'A Werewolf game master has to remember who wakes when, who was protected, saved, poisoned or converted, and whether a team has already won — while keeping the table entertained. Moonlight keeps that state so the GM can run the night.',
        flow: {
            summary: 'Each night only the roles still alive wake, in priority order. The night resolves in one pass, and the win check runs on every change.',
            steps: ['Setup players & roles', 'Night: roles wake by priority', 'Resolve night', 'Day discussion', 'Vote', 'Win check', 'Game over'],
        },
        techStack: [
            {
                layer: "App",
                items: [
                    { name: "React 19 · TypeScript", purpose: "Single-page GM tool: phase engine, player cards, voting" },
                    { name: "Vite", purpose: "Dev server and build" },
                    { name: "Lucide React", purpose: "Role and UI icons" },
                ],
            },
            {
                layer: "i18n",
                items: [
                    { name: "Own translation dictionary", purpose: "English and Vietnamese for every role, phase and message, switched live" },
                ],
            },
            {
                layer: "AI",
                items: [
                    { name: "Google Gemini API", purpose: "Photo reading and end-of-game analysis — built, switched off in the current version" },
                ],
            },
        ],
        decisions: [
            {
                title: 'Night order comes from data',
                context: '16 roles wake at different points of the night, some only on night 1.',
                decision: 'Each role definition carries isNightRole and wakePriority. The night queue is built from roles still alive, sorted by priority, with Cupid dropped after night 1.',
                rationale: 'Adding a role is one entry in the definition table; the phase engine does not change.',
            },
            {
                title: 'Resolve the night in one pass',
                context: 'Night actions interact: the guard and the witch can cancel the wolves’ kill, poison and the serial killer’s kill cannot, and lovers die together.',
                decision: 'Collect actions during the night, then resolve them in a fixed order — serial killer, guard, witch save, witch poison — and repeat the heartbreak rule until no new deaths appear.',
                rationale: 'Order-dependent rules live in one function, and chains of linked lovers resolve completely.',
            },
            {
                title: 'Win check as derived state',
                context: 'Several teams can win, with a fixed priority between them, and house rules sometimes differ.',
                decision: 'The win is a memoized value computed from alive players (lovers → cult → serial killer → village → wolves; the Tanner wins at the vote). The GM can still declare a result manually.',
                rationale: 'The result cannot drift out of sync with the board, and the GM keeps the final word.',
            },
        ],
        codeSamples: [
            {
                title: 'Building the night queue',
                language: 'TypeScript',
                // Verbatim excerpt from were-wolf-moonlight/App.tsx (startNight).
                code: `// Determine Queue
const presentRoles = Array.from(new Set(alivePlayers.map(p => p.role))) as RoleType[];
const queue = presentRoles
  .filter(r => ROLE_DEFINITIONS[r].isNightRole)
  .sort((a, b) => ROLE_DEFINITIONS[a].wakePriority - ROLE_DEFINITIONS[b].wakePriority);

// Adjust logic for Cupid (Night 1 only)
if (newRound > 1) {
  const idx = queue.indexOf(RoleType.CUPID);
  if (idx > -1) queue.splice(idx, 1);
}

// Ensure Wolves wake
const hasWolves = alivePlayers.some(p => {
   const t = ROLE_DEFINITIONS[p.role].team;
   return t === Team.WEREWOLF && p.role !== RoleType.SORCERER;
});

if (!queue.includes(RoleType.WEREWOLF) && hasWolves) {
    queue.push(RoleType.WEREWOLF);
}`,
                note: 'The queue is derived from who is alive, not from a fixed script. If the plain Werewolf is dead but an Alpha or a Cub is still alive, the Werewolf kill turn is added anyway, so the pack never loses its night kill.',
            },
        ],
        retrospective: [
            'Alpha Wolf extra kills and the Mayor’s double vote still rely on the GM; they could move into the engine.',
            'The Gemini features (photo reading, game analysis, chat) are built but switched off; real-time multiplayer and game replay are on the list.',
        ],
    },
    {
        slug: 'haintp-website',
        title: 'This website',
        type: 'personal',
        summary: 'Personal site rebuilt on the compact UI kit, with typed content files and an SSoT doc system for AI-assisted work.',
        role: 'Author',
        period: { start: '2024-12' },
        stack: ['Angular 19', 'Signals', 'Compact UI kit', 'Tailwind CSS v3', 'EmailJS', 'marked'],
        highlights: [
            'One content layer (profile, projects, resume) drives every page — no copy in templates.',
            'Same visual system as the Valuation Platform (Inter, 14px base, kit controls) with the kit Plum theme, side navigation with icon rail, dark mode.',
            'Printable resume, Markdown case studies, accessible contact form.',
            'docs/ holds the SSoT: architecture, contracts, NFRs, ADRs and AI-agent rules.',
        ],
        cover: cover('haintp-website'),
        links: [{ label: 'Source code', url: 'https://github.com/hai15021999/haintp-website', kind: 'source' }],
        techStack: [
            {
                layer: "App",
                items: [
                    { name: "Angular 19", purpose: "Standalone components, signals, zoneless change detection" },
                    { name: "TypeScript content files", purpose: "Profile, projects and resume in typed files that drive every page" },
                ],
            },
            {
                layer: "UI",
                items: [
                    { name: "Compact UI kit", purpose: "Controls, tokens and the Plum theme with dark mode" },
                    { name: "Tailwind CSS v3", purpose: "Utility classes next to the kit" },
                ],
            },
            {
                layer: "Features",
                items: [
                    { name: "marked", purpose: "Renders Markdown case studies" },
                    { name: "EmailJS", purpose: "Sends the contact form without an own backend" },
                ],
            },
        ],
    },
    {
        slug: 'bingo-game',
        title: 'Bingo Game',
        type: 'personal',
        summary: 'Online lô tô (Vietnamese bingo): a host draws numbers, players join with a game code and mark their sheets in real time.',
        role: 'Full-stack · product · design',
        // VERIFY: period taken from repo activity (backend created 2024-01, last push 2024-03).
        period: { start: '2024-01', end: '2024-03' },
        stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'Socket.io', 'Ant Design'],
        highlights: [
            'Host screen: create a game with a 6-digit code, start it, draw numbers, remove players and restart rounds.',
            'Players join with a name and the code, then pick from 16 lô tô sheets; a sheet can belong to only one player.',
            'Numbers are drawn without repeats from a shuffled 1–90 box and pushed to every client over Socket.io.',
            'Optional auto-mark, a "one number away" alert to the room, and a server-side check of every bingo claim.',
            'Card-swipe layout for several sheets on small screens.',
        ],
        cover: cover('bingo-game'),
        // Backend repo (LotoAppBackEnd) not linked until committed secrets are removed — todo-active V-12.
        links: [{ label: 'Front-end source', url: 'https://github.com/hai15021999/bingo-front-end', kind: 'source' }],
        metrics: [
            { value: '2', label: 'Screens: host and player' },
            { value: '16', label: 'Lô tô sheets' },
            { value: '1–90', label: 'Number box, no repeats' },
            { value: '5', label: 'Socket.io events per game' },
        ],
        problem:
            'Lô tô needs printed sheets, someone calling numbers and everyone in one room. The goal was the same game on phones: one host calls, each player marks their own sheets, and nobody can claim a win that is not on their sheet.',
        flow: {
            summary: 'Each game lives in server memory under its code. Every change is broadcast on that game’s own Socket.io channel.',
            steps: ['Host creates game', 'Players join with code', 'Pick sheets', 'Host starts', 'Draw number', 'Players mark', 'Bingo claim', 'Server verifies', 'Winner broadcast'],
        },
        techStack: [
            {
                layer: "Front-end",
                items: [
                    { name: "React 18 · TypeScript", purpose: "Host screen and player screen" },
                    { name: "Ant Design", purpose: "Forms, buttons, modals and theme" },
                    { name: "Swiper", purpose: "Card-swipe view of several sheets on small screens" },
                    { name: "RxJS", purpose: "Wraps Socket.io events as observables for the components" },
                ],
            },
            {
                layer: "Realtime",
                items: [
                    { name: "Socket.io", purpose: "One channel per game: state, drawn number, winners, removed player, restart" },
                ],
            },
            {
                layer: "Back-end",
                items: [
                    { name: "Node.js · Express", purpose: "REST API for game boards, players and the host" },
                    { name: "Helmet · CORS · compression", purpose: "Security headers, cross-origin access and gzip" },
                ],
            },
        ],
        decisions: [
            {
                title: 'The server checks every bingo',
                context: 'A player presses Bingo on their own device, so the client could send any row of numbers.',
                decision: 'The server verifies that the sheet belongs to the player, the row exists on that sheet, and every number in it has been drawn. A failed claim returns "Kinh hụt".',
                rationale: 'The result is decided in one place, so a mis-tap or a modified client cannot produce a false winner.',
            },
            {
                title: 'Draw from a shuffled box',
                context: 'A first version picked a random 1–90 number and retried when it had already been called.',
                decision: 'Keep a box of the numbers still in play; each draw shuffles the box and takes the first number.',
                rationale: 'No retry loop, never a repeated number, and an empty box clearly means every number has been called.',
            },
            {
                title: 'One channel per game',
                context: 'Several games can run on the same server at once.',
                decision: 'Socket.io events are keyed by game code: game state, new number, winners, removed player, restart. The state event carries the full game board.',
                rationale: 'Clients only hear their own game and replace their state instead of merging partial updates.',
            },
        ],
        codeSamples: [
            {
                title: 'Server-side bingo check',
                language: 'JavaScript',
                // Verbatim excerpt from LotoAppBackEnd/data/games.mjs.
                code: `const verifyBingo = (id, playerName, paperId, rowBingo) => {
  let temp = gameBoards.get(id);
  const paperData = PaperData[paperId];

  const isCorrectPlayerPaper = temp.players[playerName]['paperIds'].includes(paperId);

  const isIncludeCorrectValue = rowBingo.reduce((acc, cur) => {
    if (!temp.result.includes(cur)) {
      acc = false;
    }
    return acc;
  }, true);

  const isCorrectRow = paperData.reduce((acc, cur) => {
    const isFullElement = cur.reduce((acc_cell, cur_cell) => {
      if (!rowBingo.includes(cur_cell)) {
        acc_cell = false;
      }
      return acc_cell;
    }, true);
    if (isFullElement) {
      acc = true;
    }
    return acc;
  }, false);

  return isIncludeCorrectValue && isCorrectRow && isCorrectPlayerPaper;
}`,
                note: 'Three independent checks: the sheet is the player’s, every claimed number was drawn, and the claimed numbers cover a full row of that sheet. All three must pass.',
            },
        ],
    },
    {
        slug: 'bonsai-services',
        title: 'Bonsai Business Services',
        type: 'personal',
        summary: 'Web and mobile system for a bonsai business: stores, inventory, care contracts and client bookings.',
        context: 'University capstone (graduation) project, built as a team for the Thanh Hoa bonsai store chain. I built the web front-end; teammates built the mobile app and the back-end.',
        // VERIFY: "project lead · design" kept from earlier content; owner (2026-11-19) only confirmed the main front-end role.
        role: 'Front-end (main) · project lead · design',
        stack: ['React', 'Java', 'Spring Boot', 'MySQL', 'Flutter'],
        highlights: [
            'Web app for the chain owner and store managers: stores, bonsai inventory, transactions, services and statistics.',
            'Care contracts: bonsai cared for at the customer’s home or brought to the store.',
            'Mobile app for staff and clients: care contracts and service booking.',
            'Role model for chain owner, manager, staff and client.',
        ],
        cover: cover('bonsai-services'),
        problem:
            'A chain of bonsai stores had to keep track of the trees in stock across stores, the transactions, and a care-contract service — caring for customers’ bonsai at home or at the store.',
        techStack: [
            {
                layer: 'Web (my part)',
                items: [{ name: 'ReactJS', purpose: 'Web app for the chain owner and store managers' }],
            },
            {
                layer: 'Mobile (team)',
                items: [{ name: 'Flutter', purpose: 'App for staff and clients' }],
            },
            {
                layer: 'Back-end (team)',
                items: [
                    { name: 'Java · Spring Boot', purpose: 'API for the web and mobile apps' },
                    { name: 'MySQL' },
                ],
            },
        ],
        retrospective: ['Not a perfect project — but it is the graduation project that completed my university program.'],
    },
];

export function findProject(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}
