import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { TranslocoModule } from '@jsverse/transloco';
import { NavBarLeftComponent } from './components/nav-bar-left/nav-bar-left.component';
import { takeUntil } from 'rxjs';


@Component({
    selector: 'app-nav-bar',
    templateUrl: './app-nav-bar.component.html',
    styleUrls: ['./app-nav-bar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        NavBarLeftComponent
    ]
})
export class AppNavBarComponent extends BaseComponent {

    override registerCoreLayer() {
        this.appWindowResize$.asObservable().pipe(takeUntil(this.destroy$)).subscribe({
			next: (size: number) => {
				this.handleWindowSize(size);
			}
		});
    }
}