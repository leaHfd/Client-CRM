import { Injectable } from "@angular/core";
import { createAction, props, Store } from "@ngrx/store";
import { SystemTables } from "app/core/model/enums";
import { GlobalConfig } from "app/core/model/global-config.model";

const name = '[SystemTables]';

export const loadSystemTable = createAction(`${name} Load SystemTables`, props<{ systemTableType: SystemTables }>());
export const setSystemTable = createAction(`${name} Set SystemTables`, props<{ systemTableType: SystemTables, data: any[] }>());

export const loadGlobalConfig = createAction(`${name} Load Global Config`);
export const setGlobalConfig = createAction(`${name} Set Global Config`, props<{ globalConfig: GlobalConfig }>());


@Injectable({
    providedIn: 'root'
})
export class SystemTablesRaiseEvents {
    constructor(private store: Store) { }

    public loadSystemTable(systemTableType: SystemTables): void {
        this.store.dispatch(loadSystemTable({ systemTableType }));
    }
    public setSystemTable(systemTableType: SystemTables, data: any[]): void {
        this.store.dispatch(setSystemTable({ systemTableType, data }));
    }

    public loadGlobalConfig(): void {
        this.store.dispatch(loadGlobalConfig());
    }
    public setGlobalConfig(globalConfig: GlobalConfig): void {
        this.store.dispatch(setGlobalConfig({ globalConfig }));
    }
}
