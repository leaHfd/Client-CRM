import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export class NumbersValidators {
    static maxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control || !control.value) return null;

            let value = control.value as string;
            if (value.length > maxLength)
                return { maxlength: true };

            return null;
        }
    }

    static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control || !control.value) return null;

            let value = control.value as string;
            if (value.length < minLength)
                return { minlength: true };

            return null;
        }
    }
}   