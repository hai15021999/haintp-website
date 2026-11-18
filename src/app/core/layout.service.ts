import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, effect, inject, signal } from '@angular/core';

const STORAGE_KEY = 'haintp.sidenav';
const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Shell layout state: desktop rail (collapsed sidenav) and the mobile drawer.
 * The rail choice is persisted and restored before boot by index.html (data-sidenav="rail").
 */
@Injectable({ providedIn: 'root' })
export class LayoutService {
    readonly #doc = inject(DOCUMENT);
    readonly #media = this.#doc.defaultView?.matchMedia(MOBILE_QUERY);

    readonly isMobile = signal(this.#media?.matches ?? false);
    readonly railCollapsed = signal(this.#doc.documentElement.getAttribute('data-sidenav') === 'rail');
    readonly drawerOpen = signal(false);

    constructor() {
        const onChange = (e: MediaQueryListEvent) => {
            this.isMobile.set(e.matches);
            if (!e.matches) this.drawerOpen.set(false);
        };
        this.#media?.addEventListener('change', onChange);
        inject(DestroyRef).onDestroy(() => this.#media?.removeEventListener('change', onChange));

        effect(() => {
            const rail = this.railCollapsed();
            try {
                localStorage.setItem(STORAGE_KEY, rail ? 'rail' : 'full');
            } catch {
                /* storage blocked */
            }
        });
    }

    toggleRail(): void {
        this.railCollapsed.update((v) => !v);
    }

    openDrawer(): void {
        this.drawerOpen.set(true);
    }

    closeDrawer(): void {
        this.drawerOpen.set(false);
    }
}
