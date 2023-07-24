import { Injectable } from "@angular/core";
import { createAction, props, Store } from "@ngrx/store";
import { Role } from "app/shared/model/enums";

const name = '[auth]';

export const setAuthData = createAction(`${name} Set Auth Data`, props<{ token: string, userName: string }>());
export const setUserInfo = createAction(`${name} Set User Info`, props<{ name: string, role: Role }>());
export const clearAuthData = createAction(`${name} Clear Auth Data`);

@Injectable({
    providedIn: 'root'
})
export class AuthDataStateRaiseEvents {
    constructor(private store: Store) { }

    public setAuthData(token: string, userName: string): void {
        this.store.dispatch(setAuthData({ token, userName }));
    }

    public setUserInfo(name: string, role: Role): void {
        this.store.dispatch(setUserInfo({ name, role }));
    }

    public clearAuthData(): void {
        this.store.dispatch(clearAuthData());
    }
}