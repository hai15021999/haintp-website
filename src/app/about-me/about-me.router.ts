import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AboutMeComponent,
    }
];
