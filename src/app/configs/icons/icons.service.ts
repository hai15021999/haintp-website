import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';

@Injectable({
    providedIn: 'root',
})
export class IconsService {
    constructor(
        private readonly domSanitizer: DomSanitizer,
        private readonly iconRegistry: MatIconRegistry
    ) {
        const PATH_ROOT_LOCAL = 'assets/icons';
        this.iconRegistry.addSvgIconResolver((name: string, namespace: string): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
            if (namespace && name) {
                const path = `${PATH_ROOT_LOCAL}/${namespace}/${name}.svg`;
                return this.domSanitizer.bypassSecurityTrustResourceUrl(path);
            } else {
                return null;
            }
        });
    }
}
