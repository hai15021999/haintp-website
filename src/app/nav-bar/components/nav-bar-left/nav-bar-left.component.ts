import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";
import { TranslocoModule } from "@jsverse/transloco";


@Component({
    selector: 'app-nav-bar-left',
    templateUrl: './nav-bar-left.component.html',
    styleUrls: ['./nav-bar-left.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule
    ]
})
export class NavBarLeftComponent extends BaseComponent {
    override registerCoreLayer() {
        
    }
}