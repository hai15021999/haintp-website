import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseComponent } from "@common/base";
import { UnderDevelopmentComponent } from "@common/components";


@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    standalone: true,
    imports: [
        UnderDevelopmentComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent extends BaseComponent {

    registerCoreLayer() {
        this.appState.setCurrentPage('resume');
    }

    ngOnInit() {
        this.registerCoreLayer();
    }
}