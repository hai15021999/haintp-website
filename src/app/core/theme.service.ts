import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type ColorMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'haintp.theme';
const ORDER: ColorMode[] = ['system', 'light', 'dark'];

/**
 * Color mode (light / dark / system). Writes the kit's `.dark` class on <html>.
 * The inline script in index.html applies the saved mode before boot; keep the storage key in sync.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
    readonly #doc = inject(DOCUMENT);
    readonly #media = this.#doc.defaultView?.matchMedia('(prefers-color-scheme: dark)');
    readonly #systemDark = signal(this.#media?.matches ?? false);

    readonly mode = signal<ColorMode>(this.#read());
    readonly isDark = computed(() => (this.mode() === 'system' ? this.#systemDark() : this.mode() === 'dark'));

    constructor() {
        const onChange = (e: MediaQueryListEvent) => this.#systemDark.set(e.matches);
        this.#media?.addEventListener('change', onChange);
        inject(DestroyRef).onDestroy(() => this.#media?.removeEventListener('change', onChange));

        effect(() => {
            this.#doc.documentElement.classList.toggle('dark', this.isDark());
            try {
                localStorage.setItem(STORAGE_KEY, this.mode());
            } catch {
                /* storage blocked: mode still applies for this visit */
            }
        });
    }

    /** system → light → dark → system. */
    cycle(): void {
        const next = ORDER[(ORDER.indexOf(this.mode()) + 1) % ORDER.length];
        this.mode.set(next);
    }

    #read(): ColorMode {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as ColorMode | null;
            return saved && ORDER.includes(saved) ? saved : 'system';
        } catch {
            return 'system';
        }
    }
}
