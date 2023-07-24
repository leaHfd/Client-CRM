import {
    Directive,
    AfterViewInit,
    ViewContainerRef,
    Optional,
    ContentChild,
    ElementRef,
} from '@angular/core'
import { NgControl, NgModelGroup } from '@angular/forms'
import { ControlErrorComponent } from '../components/control-error/control-error.component'
@Directive({
    selector: '[formField]',
})
export class FormFieldDirective implements AfterViewInit {
    @ContentChild(NgControl) ngModelChild?: NgControl
    @ContentChild(NgModelGroup) ngModelGroupChild?: NgModelGroup
    constructor(
        private element: ElementRef,
        private viewContainerRef: ViewContainerRef,
        @Optional() private ngModelGroup: NgModelGroup,
    ) { }
    ngAfterViewInit() {
        setTimeout(() => {
            const control =
                this.ngModelGroup?.control ??
                this.ngModelChild?.control ??
                this.ngModelGroupChild?.control
            if (control) {
                this.viewContainerRef.clear()
                const errorContainer = this.viewContainerRef.createComponent(
                    ControlErrorComponent
                )
                const host = this.element.nativeElement as HTMLElement
                host.style.flexWrap = 'wrap'
                host.appendChild(errorContainer.location.nativeElement)
                errorContainer.instance.control = control
            }
        })
    }
}