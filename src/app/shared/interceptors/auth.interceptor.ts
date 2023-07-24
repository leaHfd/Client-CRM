import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, finalize, take, switchMap } from "rxjs/operators";
import { AppAuthService } from "../services/app-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private AUTH_HEADER = "Authorization";
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(private authService: AppAuthService) {

    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        /**
         * Add content type, but only if Do-Not-Add-Headers header not specified, and the content is not a FormData object
         */
        if (!req.headers.has("Content-Type") && !req.headers.has("Do-Not-Add-Headers") && !(req.body instanceof FormData)) {
            req = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
            });
        }
        if (this.authService.isLoggedOn) {

            req = this.addAuthenticationToken(req);
            this.authService.refreshSession();
        }

        return next.handle(req);
    }


    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // todo
        // If you are calling an outside domain then do not add the token.
        // if (!request.url.match(/www.mydomain.com\//)) {
        //     return request;
        // }

        /**
         * Add self authorization headers, but only for internal requests.
         * When you send an external request (a request which starts with 'http...') you do not want to share sensitive data
         */
        if (this.authService.isLoggedOn && !request.headers.has("Do-Not-Add-Headers")) {
            return request.clone({
                headers: request.headers.set(this.AUTH_HEADER, this.authService.authToken)
            });
        }

        request = request.clone({
            headers: request.headers.delete("Do-Not-Add-Headers")
        })

        // If we do not have a token yet then we should not set the header.
        return request;

    }
}
