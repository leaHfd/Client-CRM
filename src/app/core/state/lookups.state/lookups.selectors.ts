import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { CoreFeatures } from "app/core/core-features.enum";
import { Lookups } from "app/core/model/enums";
import { Lookup } from "app/core/model/lookup.model";
import { Observable } from "rxjs";
import { ILookupsState } from "./lookups.state";



export const getLookupsState = createFeatureSelector<ILookupsState>(
    CoreFeatures.Lookups
);

export const getLookups = createSelector(getLookupsState,
    state => state ? state.lookups : null
);
export const selectLookup = (store: Store<ILookupsState>, lookupType: Lookups) => {
    return createSelector(
        getLookups,
        (lookups) => {
            return lookups[lookupType.toString()];
        })
}

export const selectSalesPersonsNames = createSelector(getLookupsState, (state) => {
    if (state) {
        return state.salesPersonsNames;
    }
    return null;
});

export const selectCollectionPersonsNames = createSelector(getLookupsState, (state) => {
    if (state) {
        return state.collectionPersonsNames;
    }
    return null;
});


@Injectable({
    providedIn: 'root'
})
export class LookupsEventListener {
    constructor(private store: Store<ILookupsState>) { }

    public selectLookup(lookup: Lookups) {
        return this.store.select(selectLookup(this.store, lookup));
    }

    public selectSalesPersonsNames(): Observable<Lookup[]> {
        return this.store.select(selectSalesPersonsNames);
    }

    public selectCollectionPersonsNames(): Observable<Lookup[]> {
        return this.store.select(selectCollectionPersonsNames);
    }
}
