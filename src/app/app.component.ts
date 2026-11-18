import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { IconName, PROFILE } from '@content';
import { LayoutService } from '@core/layout.service';
import { ColorMode, ThemeService } from '@core/theme.service';
import { IconComponent } from '@shared/icon/icon.component';

const THEME_LABEL: Record<ColorMode, string> = { system: 'Theme: System', light: 'Theme: Light', dark: 'Theme: Dark' };
const THEME_ICON: Record<ColorMode, IconName> = { system: 'monitor', light: 'sun', dark: 'moon' };

interface NavItem {
    path: string;
    label: string;
    icon: IconName;
}

/** Site shell: kit side navigation (rail on desktop, drawer on mobile) + top bar + routed page. */
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly layout = inject(LayoutService);
    readonly theme = inject(ThemeService);
    readonly #router = inject(Router);

    readonly profile = PROFILE;
    readonly year = new Date().getFullYear();

    readonly nav: NavItem[] = [
        { path: '/about', label: 'About', icon: 'user' },
        { path: '/portfolio', label: 'Portfolio', icon: 'briefcase' },
        { path: '/resume', label: 'Resume', icon: 'file-text' },
        { path: '/contact', label: 'Contact', icon: 'mail' },
    ];

    readonly #url = toSignal(
        this.#router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map((e) => e.urlAfterRedirects)
        ),
        { initialValue: this.#router.url }
    );

    /** Section label for the top bar (first URL segment). */
    readonly section = computed(() => {
        const first = '/' + (this.#url().split(/[/?#]/)[1] ?? '');
        return this.nav.find((n) => n.path === first)?.label ?? '';
    });

    readonly themeLabel = computed(() => THEME_LABEL[this.theme.mode()]);
    readonly themeIcon = computed(() => THEME_ICON[this.theme.mode()]);

    /** Drawer hidden from keyboard and screen readers while closed on mobile. */
    readonly navHidden = computed(() => this.layout.isMobile() && !this.layout.drawerOpen());
    /** Rail applies on desktop only; the mobile drawer always shows labels. */
    readonly navExpanded = computed(() => this.layout.isMobile() || !this.layout.railCollapsed());

    private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

    constructor() {
        // New page: close the drawer and start at the top of the scroll container.
        this.#router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                takeUntilDestroyed()
            )
            .subscribe(() => {
                this.layout.closeDrawer();
                this.main().nativeElement.scrollTo({ top: 0 });
            });
    }

    onNavKeydown(event: KeyboardEvent): void {
        if (event.key === 'Escape' && this.layout.drawerOpen()) this.layout.closeDrawer();
    }
}
