import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { IconsService } from './icons.service';

// export function provideIcons(): Array<Provider | EnvironmentProviders> {
// 	return [
// 		{
// 			provide: ENVIRONMENT_INITIALIZER,
// 			useValue: () => inject(IconsService),
// 			multi: true
// 		}
// 	];
// }

export function provideIcons(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(() => {
            inject(IconsService);
        }),
    ]);
}
