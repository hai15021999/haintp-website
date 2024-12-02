import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAppState } from '@app-state';
import { StateService } from '@common/state';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    // example for update request
    // const state = inject(StateService<IAppState>);
    // const appState: IAppState = state.currentState;
    // const clonedRequest = req.clone({
    //     headers: req.headers
    //         .set('authorization', `Bearer ${appState.crmAccessToken}`)
    // });
    // return next(clonedRequest);

    return next(req);
}
