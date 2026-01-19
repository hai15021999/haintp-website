import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppStateService } from '@app-state';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    // example for update request
    // const appState = inject(AppStateService);
    // const clonedRequest = req.clone({
    //     headers: req.headers
    //         .set('authorization', `Bearer ${appState.currentState.someToken}`)
    // });
    // return next(clonedRequest);

    return next(req);
}
