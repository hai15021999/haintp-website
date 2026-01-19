import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about-me',
        loadComponent: () => (import('./views/about-me/about-me.component').then((m) => m.AboutMeComponent))
    },
    {
        path: 'portfolio',
        loadComponent: () => (import('./views/portfolio/portfolio.component').then((m) => m.PortfolioComponent)),
    },
    {
        path: 'resume',
        loadComponent: () => (import('./views/resume/resume.component').then((m) => m.ResumeComponent))
    },
    {
        path: 'contact',
        loadComponent: () => (import('./views/contact/contact.component').then((m) => m.ContactComponent))
    },
    {
        path: 'project/:id',
        loadComponent: () => (import('./common/components/project-detail/project-detail.component').then((m) => m.ProjectDetailComponent)),
    },
    {
        path: '**',
        redirectTo: 'about-me',
        pathMatch: 'full',
    }
];
