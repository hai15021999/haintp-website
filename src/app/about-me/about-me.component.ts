import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class AboutMeComponent extends BaseComponent {

    registerCoreLayer() {
        
    };
}