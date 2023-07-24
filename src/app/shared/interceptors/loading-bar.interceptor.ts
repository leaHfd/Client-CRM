import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {

    constructor(private commonService: CommonService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!req.headers.has("showLoading"))
            return next.handle(req);

        this.commonService.blockScreen();
        return next.handle(req).pipe(
            finalize(() => {
                this.commonService.unblockScreen();
            }));
    }
}
