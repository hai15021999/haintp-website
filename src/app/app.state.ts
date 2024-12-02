import { GLOBAL_SETTINGS } from './global-settings';

export interface IAppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';
}

export class AppState {
    production: boolean;
    version: string;
    serverUrl: string;
    screenSize: 'small' | 'large';

    constructor(production = false, version = '1.0.0', serverUrl = 'http://localhost:4200', screenSize: 'small' | 'large' = 'large') {
        this.production = production;
        this.version = version;
        this.serverUrl = serverUrl;
        this.screenSize = screenSize;
    }
}

export class AppStateBuilder {
    private production: boolean;
    private version: string;
    private serverUrl: string;
    private screenSize: 'small' | 'large';

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

    build() {
        return new AppState(this.production, this.version, this.serverUrl);
    }
}

export const INITIAL_STATE = new AppStateBuilder()
    .setProduction(GLOBAL_SETTINGS.production)
    .setVersion(GLOBAL_SETTINGS.version)
    .setServerUrl(GLOBAL_SETTINGS.serverUrl)
    .setScreenSize('large')
    .build();