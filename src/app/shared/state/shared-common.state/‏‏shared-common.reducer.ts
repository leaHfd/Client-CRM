import { setLocalization, setIsLoading } from './shared-common.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { SharedCommonState } from './shared-common.state';



const createSharedCommonReducer = createReducer(
    new SharedCommonState(),
    on(setIsLoading, (state, { isLoading }) => {
        return {
            ...state, isLoading
        };
    }),
    on(setLocalization, (state, { localization }) => {
        return {
            ...state, localization
        };
    }),
    // on(setThemeType, (state, { themeType }) => {
    //   localStorage.setItem('theme', themeType);
    //   document.documentElement.setAttribute('data-theme', themeType);

    //   return {
    //     ...state,
    //     themeType,
    //   };
    // })
    // );
);

export function SharedCommonReducer(state: SharedCommonState | undefined, action: Action) {
    return createSharedCommonReducer(state, action);
}

