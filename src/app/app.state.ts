import { Injectable, signal, computed, effect } from '@angular/core';
import { GLOBAL_SETTINGS } from './global-settings';

export interface IAppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
    currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume';
    networkOnline: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private state$ = signal<IAppState>({
        production: GLOBAL_SETTINGS.production,
        version: GLOBAL_SETTINGS.version,
        serverUrl: GLOBAL_SETTINGS.serverUrl,
        screenSize: 'large',
        currentPage: 'about-me',
        networkOnline: true
    });

    // Public read-only signals for individual properties
    production = computed(() => this.state$().production);
    version = computed(() => this.state$().version);
    serverUrl = computed(() => this.state$().serverUrl);
    screenSize = computed(() => this.state$().screenSize);
    currentPage = computed(() => this.state$().currentPage);
    networkOnline = computed(() => this.state$().networkOnline);

    // Full state access
    get currentState(): IAppState {
        return { ...this.state$() };
    }

    // Update full or partial state
    updateState(changes: Partial<IAppState>) {
        this.state$.update(current => ({
            ...current,
            ...changes
        }));
    }

    // Convenience methods for common updates
    setScreenSize(screenSize: 'small' | 'large') {
        this.updateState({ screenSize });
    }

    setCurrentPage(currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume') {
        this.updateState({ currentPage });
    }

    setNetWorkOnline(networkOnline: boolean) {
        this.updateState({ networkOnline });
    }
}
