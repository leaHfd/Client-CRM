import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { OwnValidators } from '../validators/global';

@Directive({
  selector: '[appIdValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IdValidatorDirective, multi: true }]
})
export class IdValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return OwnValidators.validId(control as FormControl)
  }
}
