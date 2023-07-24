import { Injectable } from "@angular/core";
import { createAction, props, Store } from "@ngrx/store";
import { Localization } from "app/shared/model/enums";

const name = '[shared-common]';

export const setLocalization = createAction(`${name}  setLocalization`, props<{ localization: Localization }>());
export const setIsLoading = createAction(`${name}  setIsLoading`, props<{ isLoading: boolean }>());
export const setDivElement = createAction(`${name}  setDivElement`, props<{ divElement: any }>());

@Injectable({
    providedIn: 'root'
})
export class CommonStateRaiseEvents {
    constructor(private store: Store) { }

    public setLocalization(localization: Localization): void {
        this.store.dispatch(setLocalization({ localization }));
    }


    public setIsLoading(isLoading: boolean): void {
        this.store.dispatch(setIsLoading({ isLoading }));
    }


    public setDivElement(divElement: any): void {
        this.store.dispatch(setDivElement({ divElement }));
    }
}