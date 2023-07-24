import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Lookups } from "../model/enums";
import { Lookup } from "../model/lookup.model";
import { LookupsRaiseEvents } from "../state/lookups.state/lookups.actions";

@Injectable()
export class LookupTableService {

    constructor(private httpClient: HttpClient, private lookupsRaizeEvents: LookupsRaiseEvents) {

    }

    loadLokups(lookupsTypes: Lookups[]) {
        lookupsTypes.forEach(lookupType => this.lookupsRaizeEvents.loadLookup(lookupType));
    }
    getLookup(lookup: Lookups): Observable<Lookup[]> {
        return this.httpClient.get<{
            succeeded: boolean,
            entities: Lookup[]
        }>(`/lookup?lookup=${lookup}`).pipe(map(res => res.entities));
    }
}