import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { findProject } from '@content';

const projectTitle = (route: ActivatedRouteSnapshot) => findProject(route.paramMap.get('slug') ?? '')?.title ?? 'Project not found';

/**
 * Public routes. Every route is lazy and has a `title` (PageTitleStrategy appends the site name).
 * URL contract: docs/00-ssot/api-contracts.md § Routes. Changing a path needs a redirect entry below.
 */
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'about' },
    {
        path: 'about',
        title: 'About',
        loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    },
    {
        path: 'portfolio',
        title: 'Portfolio',
        loadComponent: () => import('./features/portfolio/portfolio.component').then((m) => m.PortfolioComponent),
    },
    {
        path: 'portfolio/:slug',
        title: projectTitle,
        loadComponent: () => import('./features/portfolio/project-detail.component').then((m) => m.ProjectDetailComponent),
    },
    {
        path: 'resume',
        title: 'Resume',
        loadComponent: () => import('./features/resume/resume.component').then((m) => m.ResumeComponent),
    },
    {
        path: 'contact',
        title: 'Contact',
        loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    },

    // Legacy URLs (v1). Keep: links to them exist outside the site.
    { path: 'about-me', redirectTo: 'about' },
    { path: 'project/were-wolf-moon-light', redirectTo: 'portfolio/moonlight-werewolf' },
    { path: 'project/:slug', redirectTo: 'portfolio/:slug' },

    {
        path: '**',
        title: 'Not found',
        loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
];
