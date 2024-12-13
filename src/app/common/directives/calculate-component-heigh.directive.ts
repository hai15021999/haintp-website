import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appCalculateComponentHeight]',
})
export class CalculateComponentHeightDirective {
    @Input({ required: true }) heighChecking: number;

    @Output() onHeighChecked: EventEmitter<boolean> = new EventEmitter();

    elementRef = inject(ElementRef);
    renderer = inject(Renderer2);

    @HostListener('window:resize')
    onResize(): void {
        this.checkHeight(); // Recalculate height on window resize
    }

    ngAfterViewInit() {
        this.checkHeight();
    }

    checkHeight() {
        //do not user offsetHeight as it will return current height of the element
        const elementHeight = this.elementRef.nativeElement.scrollHeight;

        this.onHeighChecked.emit(elementHeight > this.heighChecking);
    }
}
