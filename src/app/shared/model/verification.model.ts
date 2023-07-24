import { VerificationType } from "./enums";

export class VerificationModel {
    UserMailOrPhone: string;
    VerificationType?: VerificationType;
    VerificationCode?: string;
}
