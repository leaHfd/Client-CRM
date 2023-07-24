import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
    selector: '[appValidateEqualToValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AppEqualToValueValidator, multi: true }]
})
export class AppEqualToValueValidator implements Validator {
    @Input() appValidateEqualToValue: string|number;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.appValidateEqualToValue && control.value != this.appValidateEqualToValue ?
            { 'validateEqualError': { value: control.value } } : null;
    }


}

