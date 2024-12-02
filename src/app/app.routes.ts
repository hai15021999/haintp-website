import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about-me',
        loadChildren: () => (import('./about-me/about-me.router').then((m) => m.routes))
    },
    {
        path: '',
        redirectTo: 'about-me',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'about-me'
    }
];
