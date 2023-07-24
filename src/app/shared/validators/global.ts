import { FormControl } from "@angular/forms";

export abstract class OwnValidators {

    /**
     * validates if an input value can be a valid phone number or email address.
     * 
     */
    static validateTelOrMail(control: FormControl): any {
        if (!control.value?.length) return null;
        return control.value?.indexOf('@') > -1 ? (control.value?.match("^([A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})$") ? null : { telOrMailValidation: true }) : control.value?.match("^[0-9]{9,10}$") ? null : { telOrMailValidation: true };
    }

    /**
     * validates if password contains numbers, eanglish chars and at least 8 chars
     * 
     */
    static correctPassword(control: FormControl): any {
        if (!control.value?.length) return null;
        return /^((?=.*[0-9])(?=.*[a-zA-Z]).{8,40})$/.test(control.value) ? null : { correctPassword: true };
    }

    /**
     * validates if an input value is a valid phone number
     * 
     */
    static validPhone(control: FormControl) {
        if (!control.value?.length) return;
        return /^(\+|00)\d+$/.test(control.value) ? null : /^\d{7,11}$/.test(control.value) ? null : { invalidPhone: true };
    }

    /**
     * validates if input value contains only numbers
     * 
     */
    static onlyNumbers(control: FormControl) {
        if (!control.value?.length) return;
        return /^[0-9]*$/.test(control.value) ? null : { onlyNumbers: true };
    }


    /**
     * validates if input value is a valid ID
     * 
     */
    static validId(control: FormControl) {
        if (!control.value?.length) return;
        return /^[0-9]*$/.test(control.value) ? null : { validID: true };
    }
    /**
     * validates if an input value is a valid float number
     */
    static floatValue(control: FormControl) {
        if (!control.value?.length) return;
        return /^^\d*\.?\d*$/.test(control.value) ? null : { onlyNumbers: true };
    }

    /**
     * validates if a value is bigger than a given value
     */
    static biggerThan<T>(control: FormControl, target: T, targetName: string) {
        if (!control.value) return;
        return control.value >= target ? null : { biggerThan: targetName }
    }


    static requiredCheckboxGroup(control: FormControl, requiredCheckboxGroup: number) {
        const selected = Object.values(control.value).filter(Boolean).length;
        return (selected < requiredCheckboxGroup) ? { requiredCheckboxGroup: { requiredCheckboxes: requiredCheckboxGroup } } : null
    }

}
