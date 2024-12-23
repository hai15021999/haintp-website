import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";
import { UnderDevelopmentComponent } from "@common/components";


@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    standalone: true,
    imports: [
        UnderDevelopmentComponent
    ]
})
export class ResumeComponent extends BaseComponent {

    registerCoreLayer() {
        this.setCurrentPage('resume');
    }

    ngOnInit() {
        this.registerCoreLayer();
    }
}