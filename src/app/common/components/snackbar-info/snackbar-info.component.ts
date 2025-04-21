

import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";


@Component({
    selector: 'app-snackbar-info',
    templateUrl: './snackbar-info.component.html',
    styleUrls: ['./snackbar-info.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ]
})
export class SnackbarInfoComponent {
    data = inject<any>(MAT_SNACK_BAR_DATA);
    snackBarRef = inject(MatSnackBarRef<SnackbarInfoComponent>);

    closeSnackbar() {
        this.snackBarRef.dismiss();
    }
}