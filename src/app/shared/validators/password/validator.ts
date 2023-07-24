import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

export function passwordValidator(passwordRules: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        let passwordValidation: { shortPassword, missingUpperCase, missingLowerCase, missDigit, requireNonLetterOrDigit, skipCountBetweenNumbers };
        passwordValidation = {
            shortPassword: false, missingUpperCase: false, missingLowerCase: false, missDigit: false,
            requireNonLetterOrDigit: false, skipCountBetweenNumbers: false
        };
        let hasError = false;
        if (passwordRules.RequiredLength) {
            if ((control.value.length < passwordRules.RequiredLength)) {
                passwordValidation.shortPassword = true;
                hasError = true;
            }
        }
        if (passwordRules.SkipCountBetweenNumbers) {
            function checkValidCountBetweenNumbers(password: string, index: number) {
                if (index <= 0) {
                    return true;
                }
                return Math.abs(+password[index] - +password[index - 1]) > passwordRules.SkipCountBetweenNumbers && checkValidCountBetweenNumbers(password, index - 1);
            }
            if (!checkValidCountBetweenNumbers(control.value, control.value.length - 1)) {
                passwordValidation.skipCountBetweenNumbers = true;
                hasError = true;
            }
        }
        if (passwordRules.RequireDigit) {
            if (!(/\d/.test(control.value))) {
                passwordValidation.missDigit = true;
                hasError = true;
            }
        }
        if (passwordRules.RequireLowercase) {
            if (!(/[a-z]/g.test(control.value))) {
                passwordValidation.missingLowerCase = true;
                hasError = true;
            }
        }
        if (passwordRules.RequireUppecase) {
            if (!(/[A-Z]/g.test(control.value))) {
                passwordValidation.missingUpperCase = true;
                hasError = true;
            }
        }
        if (passwordRules.RequireNonLetterOrDigit) {
            if (!(/[^a-zA-Z0-9]/g.test(control.value))) {
                passwordValidation.requireNonLetterOrDigit = true;
                hasError = true;
            }
        }

        if (hasError)
            return passwordValidation;
        return null;
    }
}