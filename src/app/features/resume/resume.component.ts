import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE, RESUME, findProject, formatPeriod, yearsSince } from '@content';
import { IconComponent } from '@shared/icon/icon.component';

/** Resume. Screen layout = two columns; print layout (Print / Save PDF) = same content, no shell. */
@Component({
    selector: 'app-resume',
    imports: [RouterLink, IconComponent],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {
    readonly #doc = inject(DOCUMENT);

    readonly profile = PROFILE;
    readonly resume = RESUME;
    readonly years = yearsSince(PROFILE.careerStart);
    readonly github = PROFILE.socials.find((s) => s.id === 'github');

    readonly experience = RESUME.experience.map((item) => ({
        ...item,
        periodLabel: formatPeriod(item.period),
        current: !item.period.end,
        projectLinks: (item.projects ?? []).map((slug) => findProject(slug)).filter((p) => !!p),
    }));

    readonly education = RESUME.education.map((e) => ({ ...e, periodLabel: formatPeriod(e.period) }));

    print(): void {
        this.#doc.defaultView?.print();
    }
}
