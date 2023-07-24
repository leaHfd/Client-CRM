import { SharedCommonReducer } from "./shared-common.state/‏‏shared-common.reducer";
import { AuthReducer } from "./auth.state/auth.reducer";


export const appReducers = {
    auth: AuthReducer,
    common: SharedCommonReducer,
};

