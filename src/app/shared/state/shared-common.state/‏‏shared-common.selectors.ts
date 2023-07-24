

import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { CoreFeatures } from "app/core/core-features.enum";
import { Observable } from "rxjs";
import { ISharedCommonState } from "./shared-common.state";
import { Localization } from '../../model/enums';
import { DialogModel } from "app/shared/components/dialog/dialogModel";

export const getAuthState = createFeatureSelector<ISharedCommonState>(
    CoreFeatures.Common
);

export const selectIsLoading = createSelector(getAuthState, (state) => {
    if (state) return state.isLoading;
    return null;
});
export const selectLocalization = createSelector(getAuthState, (state) => {
    if (state) return state.localization;
    return null;
});
export const selectDialog = createSelector(getAuthState, (state) => {
    return state ? state.dialog : null;
});

@Injectable({
    providedIn: 'root'
})
export class CommonStateEventListener {
    constructor(private store: Store) { }

    public selectIsLoading(): Observable<boolean> {
        return this.store.select(selectIsLoading);
    }
    public selectLocalization(): Observable<Localization> {
        return this.store.select(selectLocalization);
    }
    public selectDialog(): Observable<DialogModel> {
        return this.store.select(selectDialog);
    }
}
