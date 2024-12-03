import { GLOBAL_SETTINGS } from './global-settings';

export interface IAppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
    currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume';
}

export class AppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
    currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume';

    constructor(
        production = false,
        version = '1.0.0',
        serverUrl = 'http://localhost:4200',
        screenSize: 'small' | 'large' = 'large',
        currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume' = 'about-me'
    ) {
        this.production = production;
        this.version = version;
        this.serverUrl = serverUrl;
        this.screenSize = screenSize;
        this.currentPage = currentPage;
    }
}

export class AppStateBuilder {
    private production: boolean;
    private version: string;
    private serverUrl: string;
    private screenSize: 'small' | 'large';
    private currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume';

    setProduction(production: boolean) {
        this.production = production;
        return this;
    }

    setVersion(version: string) {
        this.version = version;
        return this;
    }

    setServerUrl(serverUrl: string) {
        this.serverUrl = serverUrl;
        return this;
    }

    setScreenSize(screenSize: 'small' | 'large') {
        this.screenSize = screenSize;
        return this;
    }

    setCurrentPage(currentPage: 'about-me' | 'portfolio' | 'contact' | 'resume') {
        this.currentPage = currentPage;
        return this;
    }

    build() {
        return new AppState(this.production, this.version, this.serverUrl, this.screenSize, this.currentPage);
    }
}

export const INITIAL_STATE = new AppStateBuilder()
    .setProduction(GLOBAL_SETTINGS.production)
    .setVersion(GLOBAL_SETTINGS.version)
    .setServerUrl(GLOBAL_SETTINGS.serverUrl)
    .setScreenSize('large')
    .setCurrentPage('about-me')
    .build();
