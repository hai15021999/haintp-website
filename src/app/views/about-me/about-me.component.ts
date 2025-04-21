import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { MatIconModule } from '@angular/material/icon';
import { calculateExperience } from '@common/functions';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
    standalone: true,
    imports: [
        MatIconModule
    ]
})
export class AboutMeComponent extends BaseComponent {
    isDataLoading: boolean = true;

    skills: {
        _id: string;
        title: string;
        description: string;
        icon: string;
        technicals: {
            _id: string;
            title: string;
            description: string;
            icon: string;
        }[];
    }[] = [];

    yearExperience: number = 0;
    startDate: Date = new Date('2020-06-01');

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
        this.yearExperience = calculateExperience(this.startDate, new Date());
    }

    registerCoreLayer() {
        this.bindingData();
        this.setCurrentPage('about-me');
    }

    redirectTo(page: 'portfolio' | 'resume') {
        this.appState.currentPage = page;
        this.state.commit(this.appState);
        this.router.navigate([`/${page}`]);
    }

    bindingData() {
        this.skills = skill_experience;
        this.isDataLoading = false;
        this.cdr.detectChanges();
    }
}

const skill_experience = [
    {
        _id: 'core_frontend',
        title: 'Core Frontend Skills',
        description: `These are the essential technologies I use to build modern, responsive, and user-friendly web interfaces.`,
        icon: 'common:ic_laptop',
        technicals: [
            {
                _id: 'angular',
                title: 'Angular',
                description: `Component-based architecture and reactive programming`,
                icon: 'common:ic_angular',
            },
            {
                _id: 'html',
                title: 'HTML',
                description: `Structure and semantics of web pages`,
                icon: 'common:ic_html',
            },
            {
                _id: 'css',
                title: 'CSS',
                description: `Styling and layout of web pages`,
                icon: 'common:ic_css',
            },
            {
                _id: 'javascript',
                title: 'JavaScript',
                description: `Logic, DOM manipulation, and web interactions`,
                icon: 'common:ic_javascript',
            },
            {
                _id: 'typescript',
                title: 'TypeScript',
                description: `Type safety and modern JavaScript features`,
                icon: 'common:ic_typescript',
            },
        ]
    },
    {
        _id: 'ui_design',
        title: 'UI & Design Systems',
        description: `I use modern UI frameworks to speed up development and ensure consistent design.`,
        icon: 'common:ic_palette',
        technicals: [
            {
                _id: 'angular_material',
                title: 'Angular Material',
                description: `Material Design components for Angular`,
                icon: 'common:ic_angular_material',
            },
            {
                _id: 'syncfusion',
                title: 'Syncfusion',
                description: `UI components and controls for Angular`,
                icon: 'common:ic_syncfusion',
            },
            {
                _id: 'tailwindcss',
                title: 'Tailwind CSS',
                description: `Utility-first CSS framework for rapid UI development`,
                icon: 'common:ic_tailwindcss',
            },
        ]
    },
    {
        _id: `additional_web_technologies`,
        title: `Additional Web Technologies`,
        description: `I'm familiar with other tools and libraries in the web ecosystem.`,
        icon: `common:ic_web_technologies`,
        technicals: [
            {
                _id: `reactjs`,
                title: `ReactJs`,
                description: `Component-based architecture and virtual DOM`,
                icon: `common:ic_react`,
            },
            {
                _id: `nodejs`,
                title: `Node.js`,
                description: `JavaScript runtime for server-side development`,
                icon: `common:ic_nodejs`,
            },
            {
                _id: `npm`,
                title: `NPM`,
                description: `Package manager for JavaScript libraries and tools`,
                icon: `common:ic_npm`,
            },
        ]
    },
    {
        _id: `devops_and_deployment_tools`,
        title: `DevOps & Deployment Tools`,
        description: `I use various tools to automate deployment and manage CI/CD pipelines.`,
        icon: `common:ic_devops`,
        technicals: [
            {
                _id: `docker`,
                title: `Docker`,
                description: `Containerization platform for consistent environments`,
                icon: `common:ic_docker`,
            },
            {
                _id: `azure_devops`,
                title: `Azure DevOps`,
                description: `CI/CD and project management tools`,
                icon: `common:ic_azuredevops`,
            },
            {
                _id: `nginx`,
                title: `Nginx`,
                description: `Web server and reverse proxy for load balancing`,
                icon: `common:ic_nginx`,
            },
        ]
    },
    {
        _id: `version_control`,
        title: `Version Control & Collaboration`,
        description: `I use version control systems to manage code changes and collaborate with others.`,
        icon: `common:ic_version_control`,
        technicals: [
            {
                _id: `git`,
                title: `Git`,
                description: `Distributed version control system`,
                icon: `common:ic_git`,
            },
            {
                _id: `github`,
                title: `GitHub`,
                description: `Web-based platform for version control and collaboration`,
                icon: `common:ic_github`,
            },
            {
                _id: `azure_devops`,
                title: `Azure DevOps`,
                description: `Cloud-based platform for CI/CD and project management`,
                icon: `common:ic_azuredevops`,
            },
        ]
    },
];
