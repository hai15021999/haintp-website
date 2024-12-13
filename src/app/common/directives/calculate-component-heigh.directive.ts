import { Directive, ElementRef, EventEmitter, inject, Input, Output, Renderer2 } from "@angular/core";


@Directive({
    standalone: true,
    selector: '[appCalculateComponentHeight]',
})
export class CalculateComponentHeightDirective {
    @Input({ required: true }) heighChecking: number;

    @Output() onHeighChecked: EventEmitter<boolean> = new EventEmitter();

    elementRef = inject(ElementRef);
    renderer = inject(Renderer2);

    ngAfterViewInit() {
        const elementHeight = this.elementRef.nativeElement.offsetHeight ?? this.elementRef.nativeElement.scrollHeight;

        this.onHeighChecked.emit(elementHeight > this.heighChecking);
    }
}