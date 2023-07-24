import {
    Directive,
    AfterViewInit,
    ViewContainerRef,
    Optional,
} from '@angular/core'
import { NgControl, NgModelGroup } from '@angular/forms'
import { ControlErrorComponent } from '../components/control-error/control-error.component'

import { FormFieldDirective } from './form-field.directive'
@Directive({
    selector: '[ngModel], [ngModelGroup]',
})
export class ErrorDirective implements AfterViewInit {
    constructor(
        readonly viewContainerRef: ViewContainerRef,
        @Optional() readonly ngModel: NgControl,
        @Optional() readonly ngModelGroup: NgModelGroup,
        @Optional() readonly formFieldDirective: FormFieldDirective,
    ) { }
    ngAfterViewInit() {
        setTimeout(() => {
            const control = this.ngModel?.control ?? this.ngModelGroup?.control
            if (control && !this.formFieldDirective) {

                const errorContainer = this.viewContainerRef.createComponent(
                    ControlErrorComponent
                );
                errorContainer.instance.control = control
            }
        })
    }
}