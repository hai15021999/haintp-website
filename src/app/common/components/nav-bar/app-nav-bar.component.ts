import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { getExpandCollapseVerticalTrigger } from '@common/animations';


@Component({
    selector: 'app-nav-bar',
    templateUrl: './app-nav-bar.component.html',
    styleUrls: ['./app-nav-bar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        MatIconModule
    ],
    animations: [
        getExpandCollapseVerticalTrigger('expandCollapse', '__expanded', '__collapsed')
    ]
})
export class AppNavBarComponent extends BaseComponent {

    expandedNavbar: boolean = false;

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    showHideMenu() {
        this.expandedNavbar = !this.expandedNavbar;
    }

    registerCoreLayer() {
        
    }

    onChangeSession(sesion: 'about-me' | 'portfolio' | 'contact' | 'resume') {
        this.appState.currentPage = sesion;
        this.state.commit(this.appState);
        this.router.navigate([`/${sesion}`]);
    }
}