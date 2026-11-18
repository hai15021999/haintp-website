import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '@content';
import { IconComponent } from '@shared/icon/icon.component';
import { ContactService } from './contact.service';

type SendState = 'idle' | 'sending' | 'sent' | 'error';

/** Contact form (EmailJS). Errors show after a field is touched or on submit. */
@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule, IconComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
    readonly #contact = inject(ContactService);

    readonly profile = PROFILE;
    readonly state = signal<SendState>('idle');
    readonly submitted = signal(false);

    readonly form = new FormGroup({
        name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
        email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email, Validators.maxLength(200)] }),
        message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(4000)] }),
        /** Honeypot: hidden from people, bots fill it. Non-empty → drop silently. */
        website: new FormControl('', { nonNullable: true }),
    });

    showError(name: 'name' | 'email' | 'message'): boolean {
        const c = this.form.controls[name];
        return c.invalid && (c.touched || this.submitted());
    }

    async submit(): Promise<void> {
        this.submitted.set(true);
        if (this.form.invalid || this.state() === 'sending') {
            this.form.markAllAsTouched();
            return;
        }
        const { website, ...msg } = this.form.getRawValue();
        if (website) {
            this.state.set('sent');
            return;
        }
        this.state.set('sending');
        try {
            await this.#contact.send({ name: msg.name.trim(), email: msg.email.trim(), message: msg.message.trim() });
            this.state.set('sent');
            this.form.reset();
            this.submitted.set(false);
        } catch {
            this.state.set('error');
        }
    }

    reset(): void {
        this.state.set('idle');
    }
}
