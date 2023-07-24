import { GlobalConfig } from "app/core/model/global-config.model";

export interface ISystemTablesState {
    systemTables: { [name: string]: any[] };
    globalConfig: GlobalConfig;
}

export class SystemTablesState implements ISystemTablesState {
    systemTables: { [name: string]: any[] };
    globalConfig: GlobalConfig;

    constructor() {
        this.systemTables = {};
    }
}