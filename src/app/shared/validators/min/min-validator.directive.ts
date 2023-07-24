import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { minimunCharacters } from './validator';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidatorDirective),
  multi: true
};

@Directive({
  selector: '[app-min]',
  providers: [MIN_VALIDATOR]
})
export class MinValidatorDirective implements Validator, OnInit, OnChanges {
  @Input() appMin: number = 0;

  private validator: ValidatorFn;
  private onChange?: () => void;

  constructor() {
    this.validator = minimunCharacters(this.appMin);
  }

  ngOnInit() {
    this.validator = minimunCharacters(this.appMin);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'min') {
        this.validator = minimunCharacters(changes[key].currentValue);
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
