import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE, PROJECTS, RESUME, SKILL_GROUPS, formatPeriod, yearsSince } from '@content';
import { IconComponent } from '@shared/icon/icon.component';
import { ProjectCardComponent } from '../portfolio/project-card.component';

/** Landing page: intro, key numbers, featured work, skills, education. */
@Component({
    selector: 'app-about',
    imports: [RouterLink, IconComponent, ProjectCardComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
    readonly profile = PROFILE;
    readonly skills = SKILL_GROUPS;
    readonly featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
    readonly education = RESUME.education.map((e) => ({ ...e, periodLabel: formatPeriod(e.period) }));

    readonly stats = [
        { value: `${yearsSince(PROFILE.careerStart)}+`, label: 'Years in front-end', sub: `Since ${PROFILE.careerStart.slice(0, 4)}` },
        { value: `${PROJECTS.filter((p) => p.type === 'professional').length}`, label: 'Professional projects', sub: 'Enterprise and client work' },
        { value: `${PROJECTS.filter((p) => p.type === 'personal').length}`, label: 'Personal projects', sub: 'Tools, games, a UI kit' },
        { value: 'Angular', label: 'Main stack', sub: 'TypeScript · RxJS · Signals' },
    ];
}
