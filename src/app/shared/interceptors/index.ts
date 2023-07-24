import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api-url.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { LoadingBarInterceptor } from './loading-bar.interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingBarInterceptor, multi: true },
];
