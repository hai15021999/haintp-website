import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appInterceptor } from './app.interceptor';
import { provideIcons } from '@app-config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([appInterceptor])),
        provideAnimations(),
        provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
        importProvidersFrom(),
        provideIcons()
    ],
};
