import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    private __snackbar$ = new Subject<any>();

    registerSnackbarEvent$() {
        return this.__snackbar$.asObservable();
    }

    showSnackbar(message: string, type: 'info' | 'success' | 'error' = 'info') {
        this.__snackbar$.next({ message, type });
    }

}