import { Directive, Input } from "@angular/core"
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms"
import { OwnValidators } from "../validators/global"

@Directive({
  selector: '[requiredCheckboxGroup][ngModelGroup]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RequiredCheckboxGroupValidatorDirective,
      multi: true,
    },
  ],
})

export class RequiredCheckboxGroupValidatorDirective implements Validator {
  private _requiredCheckboxGroup = 1
  private _onChange?: () => void
  // 2: create a getter and a setter for the input property
  @Input()
  get requiredCheckboxGroup() {
    return this._requiredCheckboxGroup
  }
  set requiredCheckboxGroup(value: number) {
    this._requiredCheckboxGroup = value
    // 3: invoke the change handler
    if (this._onChange) {
      this._onChange()
    }
  }

  @Input() requiredCheckboxGroupDisabled: boolean;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.requiredCheckboxGroupDisabled ? null : OwnValidators.requiredCheckboxGroup(control as FormControl, this.requiredCheckboxGroup)
  }
  // 1: register the change handler
  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn
  }
}