import { Component, inject } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./loading-dialog.component.scss'],
    standalone: true,
    imports: [
        MatDialogModule,
        MatProgressSpinnerModule
    ]
})
export class LoadingDialogComponent {
    data = inject<{ message: string }>(MAT_DIALOG_DATA);
}