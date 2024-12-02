import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStateConfigs } from '@common/state';
import { INITIAL_STATE } from '@app-state';
import { appInterceptor } from './app.interceptor';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@common/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([appInterceptor])),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
    provideStateConfigs({
      initialState: INITIAL_STATE
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'vi'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    importProvidersFrom()
  ]
};
