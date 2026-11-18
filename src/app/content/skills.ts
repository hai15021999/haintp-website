import { SkillGroup } from './content.types';

const logo = (file: string) => `assets/logos/${file}.svg`;

export const SKILL_GROUPS: SkillGroup[] = [
    {
        id: 'frontend',
        title: 'Core front-end',
        summary: 'The stack I ship production interfaces with every day.',
        icon: 'code',
        items: [
            { id: 'angular', name: 'Angular', note: 'Standalone components, signals, RxJS', logo: logo('angular') },
            { id: 'typescript', name: 'TypeScript', note: 'Strict typing for large codebases', logo: logo('typescript') },
            { id: 'javascript', name: 'JavaScript', note: 'DOM, async patterns, browser APIs', logo: logo('javascript') },
            { id: 'html', name: 'HTML', note: 'Semantic, accessible markup', logo: logo('html') },
            { id: 'css', name: 'CSS / SCSS', note: 'Tokens, layout, theming, dark mode', logo: logo('css') },
        ],
    },
    {
        id: 'ui',
        title: 'UI & design systems',
        summary: 'Component libraries and the token systems that keep them consistent.',
        icon: 'palette',
        items: [
            { id: 'ui-kit', name: 'Compact UI kit', note: 'Own themeable kit: 7 themes, WCAG-checked' },
            { id: 'tailwind', name: 'Tailwind CSS', note: 'v3 and v4, preset and @theme integration', logo: logo('tailwindcss') },
            { id: 'material', name: 'Angular Material', note: 'Material components on custom tokens', logo: logo('angular_material') },
            { id: 'syncfusion', name: 'Syncfusion', note: 'Grids, document editor, schedulers', logo: logo('syncfusion') },
        ],
    },
    {
        id: 'platform',
        title: 'Platform & integrations',
        summary: 'What sits behind and around the UI.',
        icon: 'layers',
        items: [
            { id: 'office-js', name: 'Office.js', note: 'Excel task pane add-ins', logo: logo('microsoft-excel') },
            { id: 'react', name: 'React', note: 'Side projects and prototypes', logo: logo('react') },
            { id: 'nodejs', name: 'Node.js', note: 'APIs and build tooling', logo: logo('nodejs') },
            { id: 'npm', name: 'npm', note: 'Packages, scripts, lockfile hygiene', logo: logo('npm') },
        ],
    },
    {
        id: 'delivery',
        title: 'Delivery & DevOps',
        summary: 'Shipping and keeping things running.',
        icon: 'server',
        items: [
            { id: 'azure-devops', name: 'Azure DevOps', note: 'Pipelines, boards, releases', logo: logo('azuredevops') },
            { id: 'docker', name: 'Docker', note: 'Containerized builds and environments', logo: logo('docker') },
            { id: 'nginx', name: 'Nginx', note: 'Static hosting, reverse proxy', logo: logo('nginx') },
            { id: 'git', name: 'Git & GitHub', note: 'Branching, reviews, history hygiene', logo: logo('git') },
        ],
    },
];
