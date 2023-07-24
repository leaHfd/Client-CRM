import { AuthData } from '../model/auth-data.model';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginStatus, Role } from '../model/enums';
import { Observable, of, throwError } from 'rxjs';
import { AuthDataStateRaiseEvents } from '../state/auth.state/auth.actions';
import { AuthStateEventListener } from '../state/auth.state/auth.selectors';



@Injectable({
    providedIn: 'root'
})
export class AppAuthService {

    private _authData: AuthData;

    constructor(private router: Router, private httpClient: HttpClient,
        private ngZone: NgZone, private authDataStateRaiseEvents: AuthDataStateRaiseEvents, authStateEventListener: AuthStateEventListener) {
        authStateEventListener.selectAuthData().subscribe((authData: AuthData) => {
            this._authData = authData;
        });

        setTimeout(() => {
            this.initExpireSessionTimer();
        }, 1);
    }
    //#region Private Members   
    sessionExpireIntervalMinutes = 15;
    refreshSessionTimer: any;
    private _returnUrl = '';
    //#endregion

    //#region Public getters

    get authToken(): string {
        return this._authData?.token;
    }
    get authUserName(): string {
        return this._authData?.userName;
    }
    get authName(): string {
        return this._authData.name;
    }
    get SessionExpiry(): boolean {
        return !this.authToken && this.authToken != 'undefined';
    }
    get isLoggedOn(): boolean {
        return this.isSessionActive;
    }
    get isSessionActive(): boolean {
        return !this.SessionExpiry;
    }

    get loginUrl(): string {
        return '/login';
    }

    get returnUrl(): string {
        return this._returnUrl;
    }

    set returnUrl(url: string) {
        this._returnUrl = url;
    }

    //#endregion

    //#region Public Methods
    refreshSession() {
        if (this.refreshSessionTimer) {
            clearInterval(this.refreshSessionTimer)
        }
        this.refreshSessionTimer = setTimeout(() => {
            clearInterval(this.refreshSessionTimer);
            this.clientLogout();
        }, this.sessionExpireIntervalMinutes * 60 * 1000);
    }

    login(request: { userName: string, password: string }) {
        this.clearLogin();
        return this.httpClient.post<{
            Status: LoginStatus,
            Token: string
        }>('/auth/login', request, { headers: { 'showLoading': 'true' } }).pipe(map((response) => {
            this.authDataStateRaiseEvents.setAuthData(response.Token, request.userName);
            return { status: response.Status };
        }));
    }


    getOrLoadUserInfo(): Observable<{ userName: string, name: string, role: Role }> {
        if (this.authName) {
            return of({ userName: this.authUserName, name: this.authName, role: this._authData.role });
        } else {
            return this.loadUserInfo();
        }
    }

    loadUserInfo(): Observable<{ name: string, role: Role, userName: string }> {
        return this.httpClient.get<{
            succeeded: boolean,
            role: Role,
            name: string,
        }>('/auth/getUserInfo').pipe(tap(async (response: any) => {
            if (response.succeeded) {
                this.authDataStateRaiseEvents.setUserInfo(response.name, response.role);
            }
        }, (error) => {
            this.logout();
        })).pipe(map(response => {
            return response.succeeded ? { role: response.role, name: response.name, userName: this.authUserName } : null;
        }));
    }


    logout() {
        this.httpClient.post("/auth/logout", null).subscribe(() => {
            this.clientLogout();
        });
    }

    clientLogout() {
        const url = this.router.routerState.snapshot.url;
        if (url !== this.loginUrl) {
            this.returnUrl = url;
        }
        this.clearLogin();
        this.ngZone.run(() => this.router.navigate(['/login']));
    }


    //#endregion

    //#region Private Methods

    private initExpireSessionTimer() {
        this.httpClient.get('/auth/getSessionTime').subscribe((res: any) => {
            this.sessionExpireIntervalMinutes = res;
            if (this.isLoggedOn) {
                this.refreshSession()
            }
        })
    }
    private clearLogin() {
        this.authDataStateRaiseEvents.clearAuthData();
    }
    //#endregion
}


