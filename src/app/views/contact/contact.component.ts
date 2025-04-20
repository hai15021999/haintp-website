import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BaseComponent } from "@common/base";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatInputModule,
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