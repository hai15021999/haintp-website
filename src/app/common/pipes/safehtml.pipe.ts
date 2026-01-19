import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
 
@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    readonly sanitizer = inject(DomSanitizer);
 
   transform(content: string, type: 'SafeHtml' | 'SafeStyle' | 'SafeScript' | 'SafeUrl' | 'SafeResourceUrl') {
      switch (type) {
         case 'SafeHtml': return this.sanitizer.bypassSecurityTrustHtml(content);
         case 'SafeStyle': return this.sanitizer.bypassSecurityTrustStyle(content);
         case 'SafeScript': return this.sanitizer.bypassSecurityTrustScript(content);
         case 'SafeUrl': return this.sanitizer.bypassSecurityTrustUrl(content);
         case 'SafeResourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(content);
         default: throw new Error(`Invalid safe type specified: ${type}`);
      }
   }
}