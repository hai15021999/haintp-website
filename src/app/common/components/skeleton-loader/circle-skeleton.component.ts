import { Component, ElementRef, inject } from "@angular/core";


@Component({
    selector: 'circle-skeleton',
    template: ``,
    styles: [`
        :host {
            width: var(--skeleton-circle-width);
            height: var(--skeleton-circle-height);
            border-radius: 50%;
            display: block;
            background: #f6f7f8;
            background-repeat: no-repeat;
            background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
            background-position: 0 0;
        }
    `],
    host: {
        class: 'animate-pulse',
    },
    standalone: true
})
export class CircleSkeletonComponent {
    width: string;
    height: string;
    className: string;

    #host = inject(ElementRef<HTMLElement>);

    ngOnInit() {
        const host = this.#host.nativeElement;

        if (this.className) {
            host.classList.add(this.className);
        }

        host.style.setProperty('--skeleton-circle-width', this.width ?? '100%');
        host.style.setProperty('--skeleton-circle-height', this.height ?? '20px');
    }
}