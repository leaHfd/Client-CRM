import { Lookup } from "app/core/model/lookup.model";

export interface ILookupsState {
    lookups: { [name: string]: Lookup[] };
    salesPersonsNames: Lookup[];
    collectionPersonsNames: Lookup[];
}

export class LookupsState implements ILookupsState {
    lookups: { [name: string]: Lookup[] };
    salesPersonsNames: Lookup[];
    collectionPersonsNames: Lookup[];

    constructor() {
        this.lookups = {};
    }
}