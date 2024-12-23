import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";
import { UnderDevelopmentComponent } from "@common/components";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [
        UnderDevelopmentComponent
    ]
})
export class ContactComponent extends BaseComponent {

    registerCoreLayer() {
        this.setCurrentPage('contact');
    }

    ngOnInit() {
        this.registerCoreLayer();
    }
}