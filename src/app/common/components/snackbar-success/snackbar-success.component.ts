

import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";


@Component({
    selector: 'app-snackbar-success',
    templateUrl: './snackbar-success.component.html',
    styleUrls: ['./snackbar-success.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ]
})
export class SnackbarSuccessComponent {
    data = inject<any>(MAT_SNACK_BAR_DATA);
    snackBarRef = inject(MatSnackBarRef<SnackbarSuccessComponent>);

    closeSnackbar() {
        this.snackBarRef.dismiss();
    }
}