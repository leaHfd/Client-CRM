import { LocalizationService } from "../localization/localization.service";
import { ErrorMessage } from "./models/error-message";

export interface ValidationMessages {
  [errorKey: string]: (...errorDetails: any[]) => string
}

export const DEFAULT_ERRORS: ValidationMessages = {
  required: (translator: LocalizationService) => `${translator.Translate('ERRORS.REQUIRED')}`,
  invalidPhone: (translator) => translator.Translate("ERRORS.INVALID_PHONE"),
  pattern: (translator: LocalizationService) => `${translator.Translate('ERRORS.INVALID')}`,
  minlength: (translator, error) =>
    `${translator.Translate('ERRORS.MIN_LENGTH')} ${error.requiredLength} ${translator.Translate('ERRORS.CHARS')}`,
  maxlength: (translator, error) =>
    ` ${translator.Translate('ERRORS.MAX_LENGTH')} ${error.requiredLength} ${translator.Translate('ERRORS.CHARS')}`,
  email: (translator) => translator.Translate('ERRORS.EMAIL'),
  max: (translator, error) => `${translator.Translate('ERRORS.MAX')} ${error.max}`,
  min: (translator, error) => `${translator.Translate('ERRORS.MIN')} ${error.min}`,
  correctPassword: (translator) => translator.Translate("ENUMS.Validators.ValidPass"),
  passwordMismatch: (translator) => translator.Translate("ERRORS.PASSWORD_MISMATCH"),
  onlyNumbers: (translator) => ` ${translator.Translate("ERRORS.ONLY_NUMBERS")}`,
  validID: (translator) => ` ${translator.Translate("ERRORS.ID")}`,
  biggerThan: (translator, error) => `${translator.Translate("ERRORS.BIGGER_THAN")}${error}`,
  requiredCheckboxGroup: (translator, error) => error.requiredCheckboxes == 1 ? `${translator.Translate('ERRORS.REQUIRED')}` : `This field must have at least ${error.requiredCheckboxes} ${error.groupName || 'items'} selected`,
  validateEqualError: (translator, error) => `${translator.Translate("ERRORS.EQUAL")}${error.value}`
}
  ;
