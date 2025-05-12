import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavBarComponent } from './common/components/nav-bar/app-nav-bar.component';
import { BaseComponent } from '@common/base';
import { takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent, SnackbarInfoComponent, SnackbarSuccessComponent } from '@common/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AppNavBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent {
    #snackbar = inject(MatSnackBar);

    ngOnInit(): void {
        this.registerIcon();
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    override registerCoreLayer() {
        this.appWindowResize$.asObservable().pipe(takeUntil(this.destroy$)).subscribe({
			next: (size: number) => {
				this.handleWindowSize(size);
			}
		});
        this.snackbarService
            .registerSnackbarEvent$()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.bindingSnackbarTemplate(res.type, res.message);
                },
            });
    }

    bindingSnackbarTemplate(type: 'info' | 'error' | 'success', message: string) {
        const config: any = {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            data: { message },
            panelClass: '__app-snackbar-container'
        }
        if (type === 'error') {
            this.#snackbar.openFromComponent(SnackbarErrorComponent, config);
            return;
        }
        if (type === 'info') {
            this.#snackbar.openFromComponent(SnackbarInfoComponent, config);
            return;
        }
        if (type === 'success') {
            this.#snackbar.openFromComponent(SnackbarSuccessComponent, config);
            return;
        }
    }
}
