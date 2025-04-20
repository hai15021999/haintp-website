import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BaseComponent } from "@common/base";
import { SendMailService } from "@common/services";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule, 
        FormsModule,
        MatFormFieldModule
    ]
})
export class ContactComponent extends BaseComponent {
    #sendmail = inject(SendMailService);

    contactForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required]),
    });

    registerCoreLayer() {
        this.setCurrentPage('contact');
    }

    ngOnInit() {
        this.registerCoreLayer();
    }

    onSubmitForm() {
        this.loadingDialog.open();
        this.#sendmail.sendMail$(this.contactForm.value.email, this.contactForm.value.name, this.contactForm.value.message).subscribe({
            next: (res) => {
                this.loadingDialog.close();
                if (res.error) {
                    this.snackbarService.showSnackbar('Error sending email. Please try again.', 'error');
                    return;
                }
                this.snackbarService.showSnackbar('Email sent successfully!', 'success');
                setTimeout(() => {
                    this.router.navigate(['/about-me']);
                }, 1000);
            },
            error: (err) => {
                this.snackbarService.showSnackbar('Error sending email. Please try again.', 'error');
            }
        });
    }
}