import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "@common/base";
import { ProjectDetailService } from "./project-detail.service";
import { take } from "rxjs";
import { MarkdownPipe } from "@common/pipes";


@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
    standalone: true,
    imports: [
        MarkdownPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent extends BaseComponent {
    #router = inject(ActivatedRoute);
    #projectDetailService = inject(ProjectDetailService);

    projectId: string = '';
    markdownContent: WritableSignal<string> = signal('');

    ngOnInit() {
        this.registerCoreLayer();
    }

    registerCoreLayer() {
        this.projectId = this.#router.snapshot.params['id'] || '';
        this.loadProjectDetailMarkdown();
    }

    loadProjectDetailMarkdown() {
        this.#projectDetailService.loadProjectDetailMarkdown$(this.projectId).pipe(take(1)).subscribe({
            next: (res) => {
                this.markdownContent.set(res);
            }
        });
    }
}