import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';
import { catchError, map, of } from 'rxjs';
import { PROJECTS, findProject, formatPeriod } from '@content';
import { IconComponent } from '@shared/icon/icon.component';

/** /portfolio/:slug — project facts from content/projects.ts + optional Markdown case study. */
@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, IconComponent],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
    readonly #http = inject(HttpClient);

    /** Route param, bound by withComponentInputBinding. */
    readonly slug = input.required<string>();

    readonly project = computed(() => findProject(this.slug()));

    readonly period = computed(() => {
        const p = this.project()?.period;
        return p ? formatPeriod(p) : '';
    });

    /** Previous / next in portfolio order, wrapping around. */
    readonly siblings = computed(() => {
        const i = PROJECTS.findIndex((p) => p.slug === this.slug());
        if (i < 0) return null;
        const at = (n: number) => PROJECTS[(n + PROJECTS.length) % PROJECTS.length];
        return { prev: at(i - 1), next: at(i + 1) };
    });

    /**
     * Case-study HTML. Markdown is a first-party asset; the string still goes through Angular's
     * [innerHTML] sanitizer (no bypass), so scripts and event handlers are stripped.
     */
    readonly caseStudy = rxResource({
        request: () => (this.project()?.caseStudy ? this.slug() : undefined),
        loader: ({ request: slug }) =>
            this.#http.get(`assets/case-studies/${slug}.md`, { responseType: 'text' }).pipe(
                map((md) => marked.parse(md, { gfm: true, async: false }) as string),
                catchError(() => of(null))
            ),
    });

    readonly typeLabel = computed(() => (this.project()?.type === 'professional' ? 'Professional' : 'Personal'));

}
