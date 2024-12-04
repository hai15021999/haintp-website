import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about-me',
        loadComponent: () => (import('./views/about-me/about-me.component').then((m) => m.AboutMeComponent))
    },
    {
        path: '**',
        redirectTo: 'about-me'
    }
];
