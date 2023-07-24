import { LocalizationService } from "app/shared/localization/localization.service";

/**
 * Interface for creating validation messages
 */
export interface ErrorMessage {
  /**
   * The error key to look for on the FormControl.errors object
   */
  error: string;
  /**
   * The format string function to create the validation format to be displayed.
   * @param label The text from the first <label> tag found within the .form-group
   * @param error The value accessed from FormControl.errors[error] using ErrorMessage.error as the key
   */
  format?: FormatErrorFunction;

  translator?: LocalizationService;
}

export type FormatErrorFunction = (label?: string, translator?: LocalizationService, error?: any) => string;
