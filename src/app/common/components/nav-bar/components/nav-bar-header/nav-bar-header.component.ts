import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { getExpandCollapseVerticalTrigger } from "@common/animations";
import { BaseComponent } from "@common/base";
import { takeUntil } from "rxjs";


@Component({
    selector: 'app-nav-bar-header',
    templateUrl: './nav-bar-header.component.html',
    styleUrls: ['./nav-bar-header.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        NgClass
    ],
    animations: [
        getExpandCollapseVerticalTrigger('expandCollapse', '__expanded', '__collapsed')
    ]
})
export class NavBarHeaderComponent extends BaseComponent {

    expandedNavbar: boolean = false;

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

    showHideMenu() {
        this.expandedNavbar = !this.expandedNavbar;
    }

    onChangeSession(sesion: 'about-me' | 'portfolio' | 'contact' | 'resume') {
        this.expandedNavbar = false;
        this.appState.currentPage = sesion;
        this.state.commit(this.appState);
        this.router.navigate([`/${sesion}`]);
    }
}