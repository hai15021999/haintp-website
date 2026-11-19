import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';
import { catchError, map, of } from 'rxjs';
import { PROJECTS, findProject, formatPeriod } from '@content';
import { IconComponent } from '@shared/icon/icon.component';
import { ProjectStoryComponent } from './project-story.component';

/** /portfolio/:slug — project facts from content/projects.ts, structured case-study sections + optional Markdown case study. */
@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, IconComponent, ProjectStoryComponent],
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

    /** Sections present for this project, in page order. Drives the "On this page" list. */
    readonly sections = computed(() => {
        const p = this.project();
        if (!p || p.confidential) return [];
        const all: { id: string; label: string; show: boolean }[] = [
            { id: 'h-problem', label: 'The problem', show: !!p.problem },
            { id: 'h-flow', label: 'How it works', show: !!p.flow?.steps.length },
            { id: 'h-tech', label: 'Tech stack', show: !!p.techStack?.length },
            { id: 'h-highlights', label: 'What I built', show: p.highlights.length > 0 },
            { id: 'h-decisions', label: 'Key decisions', show: !!p.decisions?.length },
            { id: 'h-code', label: 'Code highlights', show: !!p.codeSamples?.length },
            { id: 'h-gallery', label: 'Screens', show: !!p.gallery?.length },
            { id: 'h-outcomes', label: 'Outcomes', show: !!p.outcomes?.length },
            { id: 'h-case', label: 'Case study', show: !!p.caseStudy },
            { id: 'h-retro', label: 'Looking back', show: !!p.retrospective?.length },
        ];
        return all.filter((s) => s.show);
    });

    /** In-page jump without touching the URL (the SPA base href would turn '#id' into a route). */
    jumpTo(event: Event, id: string): void {
        event.preventDefault();
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el?.focus({ preventScroll: true });
    }
}
