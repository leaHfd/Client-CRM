import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import * as AuthActions from './auth.actions';
import { AUTH_DATA_STATE_KEY, LAST_CONNECTED_USER_NAME } from "app/shared/model/local-storage-keys";



const createAuthReducer = createReducer(
    new AuthState(),

    on(AuthActions.setAuthData, (state, { token, userName }) => {
        localStorage.setItem(AUTH_DATA_STATE_KEY, token);
        localStorage.setItem(LAST_CONNECTED_USER_NAME, userName);
        return { ...state, authData: { token, userName } };
    }),

    on(AuthActions.setUserInfo, (state, { name, role }) => {
        return { ...state, authData: { ...state.authData, name, role } };
    }),
    on(AuthActions.clearAuthData, (state) => {
        localStorage.removeItem(AUTH_DATA_STATE_KEY);
        return new AuthState();
    }),
);


export function AuthReducer(state: AuthState | undefined, action: Action) {
    return createAuthReducer(state, action);
}