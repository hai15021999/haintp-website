import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-nav-bar-header',
    templateUrl: './nav-bar-header.component.html',
    styleUrls: ['./nav-bar-header.component.scss'],
    standalone: true,
    imports: [],
})
export class NavBarHeaderComponent extends BaseComponent {

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    registerCoreLayer() {
        
    }
}