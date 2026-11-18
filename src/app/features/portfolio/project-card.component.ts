import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, formatPeriod } from '@content';
import { IconComponent } from '@shared/icon/icon.component';

const MAX_TAGS = 4;

/** Portfolio card: cover, type, title, one-line summary, first tags. The whole card is one link. */
@Component({
    selector: 'app-project-card',
    imports: [RouterLink, IconComponent],
    template: `
        <a class="card" [routerLink]="['/portfolio', project().slug]">
            <span class="card__cover">
                <img [src]="project().cover" [alt]="''" loading="lazy" decoding="async" />
            </span>
            <span class="card__body">
                <span class="card__meta">
                    <span class="pill" [class.pill--neutral]="project().type === 'personal'">
                        {{ project().type === 'professional' ? 'Professional' : 'Personal' }}
                    </span>
                    @if (project().confidential) {
                        <span class="pill pill--neutral">
                            <app-icon name="lock" [size]="12" />
                            Confidential
                        </span>
                    }
                    @if (period()) {
                        <span class="card__period">{{ period() }}</span>
                    }
                </span>
                <span class="card__title">{{ project().title }}</span>
                <span class="card__summary">{{ project().summary }}</span>
                @if (project().confidential) {
                    <span class="card__note">Details withheld under company policy</span>
                }
                <span class="tag-list">
                    @for (tech of tags(); track tech) {
                        <span class="tag">{{ tech }}</span>
                    }
                    @if (moreTags() > 0) {
                        <span class="tag">+{{ moreTags() }}</span>
                    }
                </span>
            </span>
        </a>
    `,
    styleUrl: './project-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
    readonly project = input.required<Project>();

    readonly period = computed(() => {
        const p = this.project().period;
        return p ? formatPeriod(p) : '';
    });
    readonly tags = computed(() => this.project().stack.slice(0, MAX_TAGS));
    readonly moreTags = computed(() => Math.max(0, this.project().stack.length - MAX_TAGS));
}
