import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'app/shared/common/consts';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const excludedUrls = '/assets';
        if (req.url.includes(excludedUrls)) {
            return next.handle(req);
        }
        var prefix = !req.url.startsWith("http") ? BASE_API_URL : '';
        const apiReq = req.clone({ url: `${prefix}${req.url}` });
        return next.handle(apiReq);
    }
}
