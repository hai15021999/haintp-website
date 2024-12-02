import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAppState } from '@app-state';
import { StateService } from '@common/state';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const state = inject(StateService<IAppState>);
    const appState: IAppState = state.currentState;
    return next(req);
}
