import { Directive, OnInit, OnChanges, SimpleChanges, Input, forwardRef } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { max } from './validator';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidatorDirective),
  multi: true
};


@Directive({
  selector: '[app-max]',
  providers: [MAX_VALIDATOR]
})
export class MaxValidatorDirective implements Validator, OnInit, OnChanges {
  @Input() max: number;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = max(this.max);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'max') {
        this.validator = max(changes[key].currentValue);
        if (this.onChange) this.onChange();
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

}
