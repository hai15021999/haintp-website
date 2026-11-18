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
    },
    // Appvity projects. VERIFY: role, period and exact stack for the two below (only topic + employer given by the owner).
    {
        slug: 'rag-chatbot',
        title: 'AI Chatbot with RAG',
        type: 'professional',
        summary: 'A chatbot that answers questions from company documents, using retrieval-augmented generation on the OpenAI platform.',
        context: 'Built at Appvity.',
        stack: ['OpenAI API', 'Embeddings', 'Vector search', 'RAG', 'Prompt engineering'],
        highlights: [
            'Ingestion pipeline: documents are split into chunks, embedded and indexed for semantic search.',
            'At question time the most relevant chunks are retrieved and passed to the model as context, so answers come from the company’s own content.',
            'Chat interface with conversation history on top of the OpenAI platform.',
        ],
        cover: cover('rag-chatbot'),
    },
    {
        slug: 'microservices-integration',
        title: 'Microservices & Integration APIs',
        type: 'professional',
        summary: 'Back-end services that talk over REST, SOAP and gRPC, plus MCP servers that let AI agents call business operations.',
        context: 'Built at Appvity.',
        stack: ['REST', 'SOAP', 'gRPC', 'MCP (Model Context Protocol)', 'Microservices'],
        highlights: [
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
            'Integration with SharePoint lists and Dataverse as data sources.',
            'Excel-like table with sorting, filtering, pagination and configurable column types.',
            'Batch synchronization with the server, validation and error handling.',
            'Fast viewing, editing and calculating across many rows and columns.',
        ],
        cover: cover('excel-taskpane-addin'),
        featured: true,
    },
    {
        slug: 'helpdesk-system',
        title: 'Helpdesk System',
        type: 'professional',
        summary: 'A ticketing system to submit, track and resolve support requests, with email intake and SLA reporting.',
        role: 'Front-end Developer',
        stack: ['Angular', 'Syncfusion UI', 'RxJS'],
        highlights: [
            'Ticket submission and tracking with status updates and notifications.',
            'Email-to-ticket creation and update threads.',
            'Role-based access for requesters, agents and administrators.',
            'Reporting on resolution time and agent performance.',
        ],
        cover: cover('helpdesk-system'),
    },
    {
        slug: 'admin-portal',
        title: 'Admin Portal',
        type: 'professional',
        summary: 'Back-office portal to manage users, product objects, workflows and settings across a product suite.',
        role: 'Front-end Developer',
        stack: ['Angular', 'Syncfusion UI', 'Node.js', 'MongoDB'],
        highlights: [
            'User management: create, deactivate, assign roles.',
            'Product object management with CRUD and validation.',
            'Workflow configuration with task assignment and notifications.',
            'Central settings and customization per tenant.',
        ],
        cover: cover('admin-portal'),
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
    },
    {
        slug: 'moonlight-werewolf',
        title: 'Moonlight — Werewolf GM Tool',
        type: 'personal',
        summary: 'A game-master assistant for Werewolf nights: 17 roles, guided night phases, voting and AI game analysis.',
        role: 'Author',
        stack: ['React 19', 'TypeScript', 'Vite', 'Google Gemini API', 'i18n (EN / VI)'],
        highlights: [
            'Phase engine: setup → night → day → vote, with role wake priorities.',
            'Night actions for wolves, witch, guard, seer, cupid and cult leader, plus automatic win detection.',
            'Gemini reads a photo of a handwritten player list and writes an end-of-game analysis.',
            'Bilingual UI with on-the-fly language switch.',
        ],
        cover: cover('moonlight-werewolf'),
        caseStudy: true,
        links: [{ label: 'Source code', url: 'https://github.com/hai15021999/were-wolf-moonlight', kind: 'source' }],
        featured: true,
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
    },
    {
        slug: 'bingo-game',
        title: 'Bingo Game',
        type: 'personal',
        summary: 'Online bingo with lobbies, chat and real-time number calling for friends and family.',
        role: 'Full-stack · product · design',
        stack: ['React', 'Node.js', 'Socket.io'],
        highlights: [
            'Lobby with chat and game settings.',
            'Randomized boards, real-time number calling and card marking.',
            'Automatic win detection and round completion.',
        ],
        cover: cover('bingo-game'),
    },
    {
        slug: 'bonsai-services',
        title: 'Bonsai Business Services',
        type: 'personal',
        summary: 'Web and mobile system for a bonsai business: stores, inventory, care contracts and client bookings.',
        role: 'Front-end · project lead · design',
        stack: ['React', 'Java', 'Spring Boot', 'MySQL', 'Flutter'],
        highlights: [
            'Web app for owners and managers: stores, bonsai inventory, services and statistics.',
            'Mobile app for staff and clients: care contracts and service booking.',
            'Role model for owner, manager, staff and client.',
        ],
        cover: cover('bonsai-services'),
    },
];

export function findProject(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}
