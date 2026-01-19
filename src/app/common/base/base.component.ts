import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '@app-state';
import { fromEvent, map, merge, of, Subject, takeUntil } from 'rxjs';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SnackbarService } from '@common/services';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '@common/components';


@Component({
    template: '',
    standalone: true
})
export abstract class BaseComponent {
    cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    appState = inject(AppStateService);
    router = inject(Router);
    iconRegistry = inject(MatIconRegistry);
    domSanitizer = inject(DomSanitizer);
    snackbarService = inject(SnackbarService);
    dialog = inject(MatDialog);

    destroy$ = new Subject<void>();

    loadingDialog = {
        __componentRef: null as any,
        open: () => {
            this.loadingDialog.__componentRef = this.dialog.open(LoadingDialogComponent, {
                height: '200px',
                width: '360px',
                closeOnNavigation: false,
                disableClose: true
            });
        },
        close: () => {
            if (this.loadingDialog.__componentRef) {
                this.loadingDialog.__componentRef.close();
                this.loadingDialog.__componentRef = null;
            }
        }
    }

    abstract registerCoreLayer();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}