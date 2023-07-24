import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';


export const max = (max: number): ValidatorFn => {
    return (control: AbstractControl): {
        [key: string]: any;
    } | null => {
        if (!max)
            return null;
        if (Validators.required(control))
            return null;
        const v: number = +control.value;
        return v <= +max ? null : { actualValue: v, requiredValue: +max, max: true };
    };
};
