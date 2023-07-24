import { createReducer, on } from "@ngrx/store";
import { setGlobalConfig, setSystemTable } from "./system-tables.actions";
import { SystemTablesState } from "./system-tables.state";

export const systemTablesReducer = createReducer(
    new SystemTablesState(),
    on(setSystemTable, (state, { systemTableType, data }): SystemTablesState => {
        const updatedSystemTable = {};
        updatedSystemTable[systemTableType.toString()] = data;
        return {
            ...state,
            ...{ systemTables: { ...state.systemTables, ...updatedSystemTable } }
        };
    }),
    on(setGlobalConfig, (state, { globalConfig }): SystemTablesState => {
        return {
            ...state,
            globalConfig
        };
    })
);