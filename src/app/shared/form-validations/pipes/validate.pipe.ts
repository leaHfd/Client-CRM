import { Pipe, PipeTransform } from "@angular/core"
import { ValidationErrors } from "@angular/forms";
import { LocalizationService } from "app/shared/localization/localization.service";
import { DEFAULT_ERRORS, ValidationMessages } from "../default-errors"

@Pipe({ name: 'validate' })
export class ValidatePipe implements PipeTransform {
    // create a key-value pair out of the provided validation messages
    readonly validationMessage = DEFAULT_ERRORS;//.reduce(
    //     (all, entry) => ({ ...all, ...entry }),
    //     {} as ValidationMessages,
    //   )
    constructor(
        private localizationService: LocalizationService
        // @Inject(VALIDATION_MESSAGES)
        // readonly validationMessages: ValidationMessages[],
    ) { }
    transform(validationErrors: ValidationErrors | null, label: string = '') {
        // pluck the first error out of the errors
        const [error] = Object.entries(validationErrors || {})
        if (!error) {
            return '';
        }
        // create the validation message
        const [errorKey, errorDetails] = error;
        const template = this.validationMessage[errorKey];
        return template ? template(this.localizationService, errorDetails) : 'This field is invalid';
    }
}