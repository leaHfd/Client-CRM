import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Lookup } from "../model/lookup.model";
import { LookupsRaiseEvents } from "../state/lookups.state/lookups.actions";
import { Departments } from "app/hfd/model/enums";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient, private lookupsRaizeEvents: LookupsRaiseEvents) {

    }

    loadSalesPersons() {
        this.lookupsRaizeEvents.loadSalesPersonsNames();
    }

    loadCollectionPersons() {
        this.lookupsRaizeEvents.loadCollectionPersonsNames();
    }

    getSalesPersons(): Observable<Lookup[]> {
        return this.httpClient.get<{
            succeeded: boolean,
            entities: Lookup[]
        }>(`/user/usersByDepartment/${Departments.Sales.toString()}`).pipe(map(res => res.entities));
    }

    getCollectionPersons(): Observable<Lookup[]> {
        return this.httpClient.get<{
            succeeded: boolean,
            entities: Lookup[]
        }>(`/user/usersByDepartment/${Departments.Collection.toString()}`).pipe(map(res => res.entities));
    }
}