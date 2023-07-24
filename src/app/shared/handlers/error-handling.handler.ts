import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { AppAuthService } from "../services/app-auth.service";
import { AdvMessageService } from "../services/message.service";

@Injectable()
export class ErrorHandling implements ErrorHandler {

    constructor(@Inject(Injector) private readonly injector: Injector) {
    }

    // Need to get AdvMessageService from injector rather than constructor injection to avoid cyclic dependency error 
    private get advMessageService() {
        return this.injector.get(AdvMessageService);
    }

    // Need to get AppAuthService from injector rather than constructor injection to avoid cyclic dependency error 
    private get authService() {
        return this.injector.get(AppAuthService);
    }

    private showErrors(errors) {
        let errString = typeof (errors) === 'string' ? errors : Object.values(errors).join('\n');
        this.advMessageService.errorMessage(errString, false);
    }

    handleError(error: any): void {
        if (error) {
            switch (error.status) {
                case undefined: // client error
                    //TODO if its client error, send to server for write in log
                    console.error(error);
                    break;
                case 401:
                    console.log('The authentication session expires or the user is not authorised.');
                    // logout and refresh the page (then the login page will be called with return url to current url)
                    this.authService.clientLogout();
                    break;
                case 400:
                    this.showErrors(error.error?.errors || error.error);
                    break;
                case 404:
                    this.advMessageService.errorMessage("ERRORS.NOT_FOUND", true);
                    break;
                default:
                    this.advMessageService.errorMessage("ERRORS.UNKNOWN_ERROR", true);
            }
        }


    }

}