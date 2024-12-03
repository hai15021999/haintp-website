import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { BaseComponent } from "@common/base";
import { TranslocoModule } from "@jsverse/transloco";


@Component({
    selector: 'app-nav-bar-left',
    templateUrl: './nav-bar-left.component.html',
    styleUrls: ['./nav-bar-left.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        MatIconModule
    ]
})
export class NavBarLeftComponent extends BaseComponent {

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    registerCoreLayer() {
        
    }

    onChangeSession(sesion: 'about-me' | 'portfolio' | 'contact' | 'resume') {
        this.appState.currentPage = sesion;
        this.state.commit(this.appState);
        this.router.navigate([`/${sesion}`]);
    }
}