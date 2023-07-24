import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
    selector: '[AppNotZeroValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AppNotZeroValidator, multi: true }]
})
export class AppNotZeroValidator implements Validator {
    @Input() AppNotZeroValidator: boolean;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.AppNotZeroValidator === true && control.value === 0 ? { 'zeroError': { value: control.value } }
            : null;
    }


}

