import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '@environment';

export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}

/**
 * Sends the contact form through EmailJS (no own backend).
 * Contract: docs/00-ssot/api-contracts.md § EmailJS. Template variables must match the EmailJS template.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
    async send(msg: ContactMessage): Promise<void> {
        const { serviceId, templateId, publicKey } = environment.emailjs;
        await emailjs.send(
            serviceId,
            templateId,
            {
                name: msg.name,
                email: msg.email,
                reply_to: msg.email,
                message: msg.message,
                time: new Date().toLocaleString(),
            },
            { publicKey }
        );
    }
}
