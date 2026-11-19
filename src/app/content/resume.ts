import { Resume } from './content.types';

/**
 * Resume content. Facts marked `VERIFY` were inferred during the 2026-11 restructure and must be
 * confirmed by the owner (tracked in docs/10-engineering/todo-active.md).
 */
export const RESUME: Resume = {
    summary:
        'Front-end developer with experience since 2020 building enterprise Angular applications — Microsoft 365 add-ins, ' +
        'helpdesk and admin portals, and a document-heavy valuation platform. I own UI systems end to end: tokens, ' +
        'accessible components, page patterns and the documentation that keeps a team (and its AI tools) consistent.',
    experience: [
        {
            id: 'valuation-platform',
            // VERIFY: engagement type and company name (footer of the app reads "Casber Solution").
            company: 'Casber Solution — appraisal company client',
            title: 'Front-end Developer (freelance)',
            period: { start: '2026-01' },
            location: 'Remote',
            summary: 'Front-end for an appraisal company: a staff app and an admin app on Angular 21.',
            achievements: [
                'Delivered the appraisal dossier workflow with role-based views for five departments.',
                'Built report, contract and certificate generation (DOCX templates, PDF, in-browser Word editing).',
                'Designed and rolled out a themeable UI kit across both apps: brand themes, dark mode, WCAG AA contrast.',
                'Introduced SSoT documentation and AI-agent guidelines; added Playwright end-to-end tests.',
            ],
            stack: ['Angular 21', 'Tailwind v4', 'Syncfusion', 'ApexCharts', 'OData', 'Playwright'],
            projects: ['valuation-platform', 'compact-ui-kit'],
        },
        {
            id: 'appvity',
            // VERIFY: company name, title, and whether the role is still current.
            company: 'Appvity',
            title: 'Front-end Developer',
            period: { start: '2020-06' },
            location: 'Ho Chi Minh City',
            summary: 'Product development for Microsoft 365 business apps: task, helpdesk and form products.',
            achievements: [
                'Built an Excel task pane add-in that edits SharePoint and Dataverse data as Excel-like tables, from UI to Node.js API and pipeline.',
                'Developed helpdesk features: ticket lifecycle, email intake, role-based access and reporting.',
                'Built an admin portal for users, product objects, workflows and tenant settings.',
                'Maintained CI/CD on Azure DevOps with Docker images and Nginx hosting.',
                'Built an AI chatbot with retrieval-augmented generation (RAG) on the OpenAI platform.',
                'Worked on microservices communicating over REST, SOAP and gRPC, and MCP servers for AI agents.',
                'Delivered approval workflows for large enterprise clients (details confidential).',
            ],
            stack: ['Angular', 'Syncfusion', 'Office.js', 'Node.js', 'MongoDB', 'OpenAI', 'REST / SOAP / gRPC / MCP', 'Azure DevOps', 'Docker'],
            projects: [
                'rag-chatbot',
                'microservices-integration',
                'excel-taskpane-addin',
                'helpdesk-system',
                'admin-portal',
                'vinamilk-approval-workflow',
                'prudential-approval-workflow',
                'viags-approval-workflow',
            ],
        },
    ],
    education: [
        {
            id: 'fptu',
            school: 'FPT University, Ho Chi Minh City',
            degree: 'Bachelor of Software Engineering',
            // Owner (2026-11-19): show only the graduation date, not the study span.
            graduated: '2024-04',
            logo: 'assets/logos/logo_fptu.svg',
        },
    ],
    skills: [
        { group: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'] },
        { group: 'Frameworks', items: ['Angular', 'RxJS & Signals', 'React', 'Node.js'] },
        { group: 'UI', items: ['Design tokens', 'Tailwind CSS', 'Angular Material', 'Syncfusion', 'Accessibility (WCAG AA)'] },
        { group: 'Platform', items: ['Office.js', 'SharePoint / Dataverse', 'OData', 'REST'] },
        { group: 'Delivery', items: ['Git', 'Azure DevOps', 'Docker', 'Nginx', 'Playwright'] },
    ],
    // VERIFY: levels.
    languages: [
        { name: 'Vietnamese', level: 'Native' },
        { name: 'English', level: 'Professional working' },
    ],
};
