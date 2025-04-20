import { Component, ElementRef, inject } from "@angular/core";


@Component({
    selector: 'rect-skeleton',
    template: ``,
    styles: [`
        :host {
            width: var(--skeleton-rect-width);
            height: var(--skeleton-rect-height);
            display: block;
            background: #f6f7f8;
            background-repeat: no-repeat;
            background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
            background-position: 0 0;
            border-radius: 12px;
        }
    `],
    host: {
        class: 'animate-pulse',
    },
    standalone: true
})
export class RecteSkeletonComponent {
    width: string;
    height: string;
    className: string;

    #host = inject(ElementRef<HTMLElement>);

    ngOnInit() {
        const host = this.#host.nativeElement;

        if (this.className) {
            host.classList.add(this.className);
        }

        host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
        host.style.setProperty('--skeleton-rect-height', this.height ?? '20px');
    }
}