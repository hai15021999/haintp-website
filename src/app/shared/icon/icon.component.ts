import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconName } from '@content';
import { ICON_PATHS } from './icon.paths';

/**
 * Decorative stroke icon. Always aria-hidden: the accessible name belongs to the parent control.
 * Usage: <app-icon name="mail" [size]="16" />
 */
@Component({
    selector: 'app-icon',
    template: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        [attr.width]="size()"
        [attr.height]="size()"
        [attr.stroke-width]="strokeWidth()"
        aria-hidden="true"
        focusable="false"
        [innerHTML]="markup()"></svg>`,
    styles: `
        :host {
            display: inline-flex;
            flex: none;
            line-height: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
    readonly name = input.required<IconName>();
    readonly size = input(16);
    readonly strokeWidth = input(1.75);

    readonly #sanitizer = inject(DomSanitizer);

    /** Paths are static constants from ICON_PATHS, never user input, so bypassing the sanitizer is safe here. */
    readonly markup = computed(() => this.#sanitizer.bypassSecurityTrustHtml(ICON_PATHS[this.name()] ?? ''));
}
