import { ChangeDetectorRef, Component, inject, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { IAppState } from "@app-state";
import { StateService } from "@common/state";
import { fromEvent, map, merge, of, Subject, takeUntil } from "rxjs";
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    template: '',
    standalone: true
})
export abstract class BaseComponent {
    cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    state = inject(StateService<IAppState>);
    zone = inject(NgZone);
    router = inject(Router);
    iconRegistry = inject(MatIconRegistry);
    domSanitizer = inject(DomSanitizer);

    destroy$ = new Subject<void>();
    appNetworkState$: Subject<boolean> = new Subject<boolean>();
    appWindowResize$: Subject<number> = new Subject<number>();

    appState: IAppState;

    abstract registerCoreLayer();

    constructor() {
        this.appState = this.state.currentState;
        this.initWindowSize();
        if (this.registerCoreLayer) {
            this.registerCoreLayer();
        }
        this.registerWindowNetworkObserver();
        this.registerWindowResizeObserver();
    }

    registerIcon() {
		const PATH_ROOT_LOCAL = "assets/icons"
		this.iconRegistry.addSvgIconResolver(
			(
				name: string,
				namespace: string
			): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
				if (namespace && name) {
					const path = `${PATH_ROOT_LOCAL}/${namespace}/${name}.svg`
					return this.domSanitizer.bypassSecurityTrustResourceUrl(path);
				} else {
					return null;
				}

			}
		);
	}

    registerWindowNetworkObserver() {
        merge(
            of(null),
            fromEvent(window, 'online'),
            fromEvent(window, 'offline')
        ).pipe(map(() => navigator.onLine), takeUntil(this.destroy$))
            .subscribe(status => {
                this.appNetworkState$.next(status);
            });
    }

    registerWindowResizeObserver() {
        window.addEventListener('resize', () => {
            this.appWindowResize$.next(window.innerWidth);
        });
    }

    initWindowSize() {
        this.appState.screenSize = window.innerWidth > 1024 ? 'large' : 'small';
        this.state.commit(this.appState);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.appNetworkState$.complete();
        this.appWindowResize$.complete();
    }
}