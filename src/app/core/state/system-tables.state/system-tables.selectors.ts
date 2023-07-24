import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { CoreFeatures } from "app/core/core-features.enum";
import { SystemTables } from "app/core/model/enums";
import { ISystemTablesState } from "./system-tables.state";



export const getSystemTablesState = createFeatureSelector<ISystemTablesState>(
    CoreFeatures.SystemTables
);

export const getSystemTables = createSelector(getSystemTablesState,
    state => state ? state.systemTables : null
);
export const selectSystemTable = (store: Store<ISystemTablesState>, systemTableType: SystemTables) => {
    return createSelector(
        getSystemTables,
        (systemTables) => {
            return systemTables[systemTableType.toString()];
        })
}

export const selectGlobalConfig = createSelector(getSystemTablesState, (state) => {
    if (state) {
        return state.globalConfig;
    }
    return null;
});



@Injectable({
    providedIn: 'root'
})
export class SystemTablesEventListener {
    constructor(private store: Store<ISystemTablesState>) { }

    public selectSystemTable(systemTable: SystemTables) {
        return this.store.select(selectSystemTable(this.store, systemTable));
    }

    public selectGlobalConfig() {
        return this.store.select(selectGlobalConfig);
    }

}
