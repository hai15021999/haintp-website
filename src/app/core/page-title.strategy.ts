import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PROFILE } from '@content';

/** Document title = "<route title> · Hai Nguyen". Route titles live in app.routes.ts (`title`). */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
    readonly #title = inject(Title);

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const page = this.buildTitle(snapshot);
        this.#title.setTitle(page ? `${page} · ${PROFILE.displayName}` : `${PROFILE.displayName} — ${PROFILE.role}`);
    }
}
