import { Injectable } from "@angular/core";
import emailjs from 'emailjs-com';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SendMailService {

    sendMail$(sender_mail: string, sender_name: string, message: string): Observable<any> {
        return new Observable((observer) => {
            emailjs.send('service_casber', 'template_contact', {
                reply_to: ``,
                name: sender_name,
                email: sender_mail,
                message: message,
                time: new Date().toLocaleString(),
            },
            `xtxyuheaEH3B9HIKg`
        ).then((res) => {
                observer.next(res);
                observer.complete();
            }).catch((err) => {
                observer.next({
                    error: err
                });
                observer.complete();
            })
        });
    }
}