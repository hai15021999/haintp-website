import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AppNavBarComponent } from './nav-bar/app-nav-bar.component';
import { BaseComponent } from '@common/base';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NgClass, RouterOutlet, TranslocoModule, AppNavBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {

    ngOnInit(): void {
        this.registerIcon();
        this.registerAppStateChanged();
    }

    override registerCoreLayer() {
        this.appWindowResize$.asObservable().pipe(takeUntil(this.destroy$)).subscribe({
			next: (size: number) => {
				this.handleWindowSize(size);
			}
		});
    }
}
