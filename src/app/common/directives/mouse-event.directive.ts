import { Directive, EventEmitter, HostListener, Output } from "@angular/core";


@Directive({
    selector: '[appMouseEvent]',
    standalone: true
})
export class MouseEventDirective {
    @Output() mouseEnter: EventEmitter<any> = new EventEmitter();
    @Output() mouseLeave: EventEmitter<any> = new EventEmitter();
    @Output() mouseClick: EventEmitter<any> = new EventEmitter();

    @HostListener('mouseenter') onMouseEnter() {
        this.mouseEnter.emit();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.mouseLeave.emit();
    }

    @HostListener('click') onClick() {
        this.mouseClick.emit();
    }
}