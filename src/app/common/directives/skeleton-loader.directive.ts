import { Directive, inject, Input, ViewContainerRef } from "@angular/core";
import { CircleSkeletonComponent } from "../components/skeleton-loader/circle-skeleton.component";
import { RecteSkeletonComponent } from "../components/skeleton-loader/rect-skeleton.component";


@Directive({
    selector: '[skeletonLoader]',
    standalone: true
})
export class SkeletonLoaderDirective {
    @Input() skeletonLoading: boolean = true;
    @Input() skeletonType: 'circle' | 'rect' = 'rect';
    @Input() skeletonWidth: string;
    @Input() skeletonHeight: string;
    @Input() skeletonClassName: string;

    #viewContainerRef = inject(ViewContainerRef);

    ngOnInit() {
        this.#viewContainerRef.clear();
        this.renderSkeleton();
    }

    renderSkeleton() {
        const ref = this.skeletonType === 'circle' ? this.#viewContainerRef.createComponent(CircleSkeletonComponent) : this.#viewContainerRef.createComponent(RecteSkeletonComponent);
        ref.instance.width = this.skeletonWidth;
        ref.instance.height = this.skeletonHeight;
        ref.instance.className = this.skeletonClassName;
        // this.#viewContainerRef.createEmbeddedView(ref.location.nativeElement);
    }
}