import { AuthData } from "app/shared/model/auth-data.model";
import { AUTH_DATA_STATE_KEY, LAST_CONNECTED_USER_NAME } from "app/shared/model/local-storage-keys";

export interface IAuthState {
    authData: AuthData;
}
export class AuthState implements IAuthState {
    authData: AuthData
    constructor() {
        const lastToken = localStorage.getItem(AUTH_DATA_STATE_KEY) || '';
        const lastUserName = localStorage.getItem(LAST_CONNECTED_USER_NAME) || '';

        this.authData = { token: lastToken, userName: lastUserName };
    }
}