import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SystemTables } from "../model/enums";
import { SystemTablesRaiseEvents } from "../state/system-tables.state/system-tables.actions";

@Injectable()
export class SystemTablesService {

    constructor(private httpClient: HttpClient, private systemTablesRaizeEvents: SystemTablesRaiseEvents) {

    }

    loadSystemTable(systemTablesTypes: SystemTables[]) {
        systemTablesTypes.forEach(systemTablesType => this.systemTablesRaizeEvents.loadSystemTable(systemTablesType));
    }
    getSystemTable(systemTablesType: SystemTables): Observable<any[]> {
        let method = Object.keys(SystemTables)[Object.values(SystemTables).indexOf(systemTablesType)];
        return this.httpClient.get<{
            succeeded: boolean,
            entities: any[]
        }>(`/systemTables/${method}`).pipe(map(res => res.entities));
    }

}