import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStateConfigs } from '@common/state';
import { INITIAL_STATE } from '@app-state';
import { appInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([appInterceptor])),
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideStateConfigs({
      initialState: INITIAL_STATE
    }),
    importProvidersFrom()
  ]
};
