import { environment } from '@environment';

export class GlobalSettings {
    production: boolean;
    version: string;
    serverUrl: string;

    constructor(production = false, version = '1.0.0', serverUrl = 'http://localhost:4200') {
        this.production = production;
        this.version = version;
        this.serverUrl = serverUrl;
    }
}

export class GlobalSettingsBuilder {
    private production: boolean;
    private version: string;
    private serverUrl: string;

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

    build() {
        return new GlobalSettings(this.production, this.version, this.serverUrl);
    }
}

export const GLOBAL_SETTINGS = new GlobalSettingsBuilder()
    .setProduction(environment.production)
    .setVersion(environment.version)
    .setServerUrl(environment.serverUrl)
    .build();