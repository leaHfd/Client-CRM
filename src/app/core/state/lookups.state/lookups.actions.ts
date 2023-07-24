import { Injectable } from "@angular/core";
import { createAction, props, Store } from "@ngrx/store";
import { Lookups } from "app/core/model/enums";
import { Lookup } from "app/core/model/lookup.model";

const name = '[Lookups]';

export const loadLookup = createAction(`${name} Load Lookup`, props<{ lookupType: Lookups }>());
export const setLookup = createAction(`${name} Set Lookup`, props<{ lookupType: Lookups, data: Lookup[] }>());

export const loadSalesPersonsNames = createAction(`${name} Load Sales Persons Names`);
export const setSalesPersonsNames = createAction(`${name} Set Sales Persons Names`, props<{ salesPersonsNames: Lookup[] }>());
// TODO: change to user by department
export const loadCollectionPersonsNames = createAction(`${name} Load Collection Persons Names`);
export const setCollectionPersonsNames = createAction(`${name} Set Collection Persons Names`, props<{ collectionPersonsNames: Lookup[] }>());

@Injectable({
    providedIn: 'root'
})
export class LookupsRaiseEvents {
    constructor(private store: Store) { }

    public loadLookup(lookupType: Lookups): void {
        this.store.dispatch(loadLookup({ lookupType }));
    }
    public setLookup(lookupType: Lookups, data: Lookup[]): void {
        this.store.dispatch(setLookup({ lookupType, data }));
    }

    public loadSalesPersonsNames(): void {
        this.store.dispatch(loadSalesPersonsNames());
    }
    public setSalesPersonsNames(salesPersonsNames: Lookup[]): void {
        this.store.dispatch(setSalesPersonsNames({ salesPersonsNames }));
    }

    public loadCollectionPersonsNames(): void {
        this.store.dispatch(loadCollectionPersonsNames());
    }
    public setCollectionPersonsNames(collectionPersonsNames: Lookup[]): void {
        this.store.dispatch(setCollectionPersonsNames({ collectionPersonsNames }));
    }
}