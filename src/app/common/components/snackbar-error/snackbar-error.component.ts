import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";


@Component({
    selector: 'app-snackbar-error',
    templateUrl: './snackbar-error.component.html',
    styleUrls: ['./snackbar-error.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ]
})
export class SnackbarErrorComponent {
    data = inject<any>(MAT_SNACK_BAR_DATA);
    snackBarRef = inject(MatSnackBarRef<SnackbarErrorComponent>);

    closeSnackbar() {
        this.snackBarRef.dismiss();
    }
}