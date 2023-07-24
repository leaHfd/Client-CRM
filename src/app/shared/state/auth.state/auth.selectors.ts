
import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { CoreFeatures } from "app/core/core-features.enum";
import { AuthData } from "app/shared/model/auth-data.model";
import { Role } from "app/shared/model/enums";
import { Observable } from "rxjs";
import { IAuthState } from "./auth.state";


export const getAuthState = createFeatureSelector<IAuthState>(
    CoreFeatures.Auth
);

export const selectAuthData = createSelector(getAuthState, (state) => {
    if (state) return state.authData;
    return null;
});
export const selectUserRole = createSelector(getAuthState, (state) => {
    if (state) return state.authData.role;
    return null;
});

@Injectable({
    providedIn: 'root'
})
export class AuthStateEventListener {
    constructor(private store: Store) { }

    public selectAuthData(): Observable<AuthData> {
        return this.store.select(selectAuthData);
    }
    public selectUserRole(): Observable<Role> {
        return this.store.select(selectUserRole);
    }
}
