import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export const minimunCharacters = (min: number): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!isPresent(min)) return null;
        if (isPresent(Validators.required(control))) return null;

        let v: number = +control.value;
        return v >= +min ? null : { actualValue: v, requiredValue: +min, min: true };
    };
};