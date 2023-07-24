import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Lookup } from "app/core/model/lookup.model";
import { LookupTableService } from "app/core/services/lookupTable.service";
import { UserService } from "app/core/services/user.service";
import { EMPTY, map, mergeMap } from "rxjs";
import { loadCollectionPersonsNames, loadLookup, loadSalesPersonsNames, LookupsRaiseEvents } from "./lookups.actions";
import { LookupsEventListener, } from "./lookups.selectors";

@Injectable()
export class LookupsEffects {
    constructor(private actions$: Actions, private lookupTableService: LookupTableService, private userService: UserService, private lookupsRaizeEvents: LookupsRaiseEvents
        , private lookupsEventListener: LookupsEventListener) { }

    loadLookup$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadLookup),
                concatLatestFrom(props => this.lookupsEventListener.selectLookup(props.lookupType)),
                mergeMap(([props, existLookup]) =>//use mergemap to allow multiple dispatch actions in same time
                    existLookup ? EMPTY :
                        this.lookupTableService
                            .getLookup(props.lookupType)
                            .pipe(
                                map((data: Lookup[]) => [
                                    this.lookupsRaizeEvents.setLookup(props.lookupType, data)
                                ])
                            )
                )
            );
        },
        { dispatch: false }
    );

    loadSalesPersons$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadSalesPersonsNames),
                concatLatestFrom(props => this.lookupsEventListener.selectSalesPersonsNames()),
                mergeMap(([props, existData]) =>//use mergemap to allow multiple dispatch actions in same time
                    existData ? EMPTY :
                        this.userService.getSalesPersons()
                            .pipe(
                                map((data: Lookup[]) => [
                                    this.lookupsRaizeEvents.setSalesPersonsNames(data)
                                ])
                            )
                )
            );
        },
        { dispatch: false }
    );

    loadCollectionsPersons$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadCollectionPersonsNames),
                concatLatestFrom(props => this.lookupsEventListener.selectCollectionPersonsNames()),
                mergeMap(([props, existData]) =>//use mergemap to allow multiple dispatch actions in same time
                    existData ? EMPTY :
                        this.userService.getCollectionPersons()
                            .pipe(
                                map((data: Lookup[]) => [
                                    this.lookupsRaizeEvents.setCollectionPersonsNames(data)
                                ])
                            )
                )
            );
        },
        { dispatch: false }
    );
}

