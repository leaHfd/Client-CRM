import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'
@Component({
    selector: 'app-control-error',
    template: `
   <div class="relative"> <small
      role="alert"
      class="text-red-600 absolute left-0 w-max ml-1"
      [hidden]="control.valid || (!control.touched && !control.dirty)"
    >
      {{ control.errors | validate }}
    </small> </div>
  `,
    styles: [
        `
      :host {
        margin: 0 !important;
        flex-basis: 100% !important;
      }
    `,
    ],
})
export class ControlErrorComponent {
    @Input() control: AbstractControl
}