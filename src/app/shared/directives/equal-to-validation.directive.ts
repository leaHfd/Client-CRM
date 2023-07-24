import { Directive, forwardRef, Provider, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[appValidateEqual][formControlName], [appValidateEqual] [formControl], [appValidateEqual][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AppEqualValidator, multi: true
    }]
})
export class AppEqualValidator implements Validator {
    constructor(
        @Attribute('appValidateEqual') public validateEqual: string,
        @Attribute('reverse') public reverse: string) { }
    private get isReverse() {
        if (!this.reverse) { return false }
        return this.reverse === 'true' ? true : false;
    }
    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;
        // control value
        let e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: false
            }
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse && e.errors !== null) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length) { e.setErrors(null) };
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false })
        }
        return null;
    }
}
