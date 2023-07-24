import { Directive, OnInit, OnChanges, SimpleChanges, Input, forwardRef } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';
import { OwnValidators } from '../validators/global';

const PHONE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PhoneValidatorDirective),
  multi: true
};


@Directive({
  selector: '[appValidPhone]',
  providers: [PHONE_VALIDATOR]
})
export class PhoneValidatorDirective implements Validator {
  constructor() {
  }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return OwnValidators.validPhone(control as FormControl)
  }
}
