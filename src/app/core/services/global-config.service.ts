import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { GlobalConfig } from "../model/global-config.model";
import { SystemTablesRaiseEvents } from "../state/system-tables.state/system-tables.actions";

@Injectable()
export class GlobalConfigService {
    private config: GlobalConfig

    constructor(private httpClient: HttpClient, private systemTablesRaizeEvents: SystemTablesRaiseEvents) {

    }

    loadConfig() {
        this.systemTablesRaizeEvents.loadGlobalConfig();
    }

    getConfig(): Observable<GlobalConfig> {
        return this.httpClient.get<{
            succeeded: boolean,
            entity: GlobalConfig
        }>('/globalConfig').pipe(map(response => response.entity));
    }
}