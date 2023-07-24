import { createReducer, on } from "@ngrx/store";
import { setCollectionPersonsNames, setLookup, setSalesPersonsNames } from "./lookups.actions";
import { LookupsState } from "./lookups.state";

export const lookupsReducer = createReducer(
    new LookupsState(),
    on(setLookup, (state, { lookupType, data }): LookupsState => {
        const updatedLookup = {};
        updatedLookup[lookupType.toString()] = data;
        return {
            ...state,
            ...{ lookups: { ...state.lookups, ...updatedLookup } }
        };
    }),
    on(setSalesPersonsNames, (state, { salesPersonsNames }): LookupsState => {
        return {
            ...state,
            salesPersonsNames
        };
    }),
    on(setCollectionPersonsNames, (state, { collectionPersonsNames }): LookupsState => {
        return {
            ...state,
            collectionPersonsNames
        };
    })
);