import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { TranslocoModule } from '@jsverse/transloco';
import { NavBarLeftComponent } from './components/nav-bar-left/nav-bar-left.component';
import { takeUntil } from 'rxjs';
import { NavBarHeaderComponent } from './components/nav-bar-header/nav-bar-header.component';


@Component({
    selector: 'app-nav-bar',
    templateUrl: './app-nav-bar.component.html',
    styleUrls: ['./app-nav-bar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        NavBarLeftComponent,
        NavBarHeaderComponent
    ]
})
export class AppNavBarComponent extends BaseComponent {

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    registerCoreLayer() {
        this.appWindowResize$.asObservable().pipe(takeUntil(this.destroy$)).subscribe({
			next: (size: number) => {
				this.handleWindowSize(size);
			}
		});
    }
}