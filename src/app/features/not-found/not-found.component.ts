import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@shared/icon/icon.component';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink, IconComponent],
    template: `
        <div class="page">
            <div class="ui-panel empty-state">
                <app-icon name="search" [size]="24" />
                <h1 class="panel-title">Page not found</h1>
                <p>This address does not exist on the site.</p>
                <a class="ui-btn ui-btn--primary" routerLink="/about">Go to the home page</a>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
