import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PROJECTS, ProjectType } from '@content';
import { IconComponent } from '@shared/icon/icon.component';
import { ProjectCardComponent } from './project-card.component';

type Filter = 'all' | ProjectType;

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'professional', label: 'Professional' },
    { id: 'personal', label: 'Personal' },
];

/** Project grid with a type segment (?type=) and a text search over title, summary and stack. */
@Component({
    selector: 'app-portfolio',
    imports: [ProjectCardComponent, IconComponent],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
    readonly #router = inject(Router);

    /** Query param (?type=personal), bound by withComponentInputBinding. */
    readonly type = input<string>();

    readonly filters = FILTERS.map((f) => ({
        ...f,
        count: f.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.type === f.id).length,
    }));

    readonly filter = linkedSignal<Filter>(() => (FILTERS.some((f) => f.id === this.type()) ? (this.type() as Filter) : 'all'));
    readonly query = signal('');

    readonly projects = computed(() => {
        const q = this.query().trim().toLowerCase();
        return PROJECTS.filter((p) => this.filter() === 'all' || p.type === this.filter()).filter(
            (p) => !q || [p.title, p.summary, ...p.stack].some((text) => text.toLowerCase().includes(q))
        );
    });

    setFilter(id: Filter): void {
        this.filter.set(id);
        this.#router.navigate([], { queryParams: { type: id === 'all' ? null : id }, queryParamsHandling: 'merge', replaceUrl: true });
    }

    onSearch(event: Event): void {
        this.query.set((event.target as HTMLInputElement).value);
    }

    clearSearch(input: HTMLInputElement): void {
        input.value = '';
        this.query.set('');
        input.focus();
    }
}
