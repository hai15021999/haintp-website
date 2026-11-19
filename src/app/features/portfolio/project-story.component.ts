import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '@content';
import { IconComponent } from '@shared/icon/icon.component';

/**
 * Structured case-study sections of a project detail page: problem, flow, highlights, decisions,
 * code, screens, outcomes. Each renders only when its content field is set (api-contracts § Project).
 */
@Component({
    selector: 'app-project-story',
    imports: [IconComponent],
    templateUrl: './project-story.component.html',
    styleUrl: './project-story.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectStoryComponent {
    readonly project = input.required<Project>();
}
