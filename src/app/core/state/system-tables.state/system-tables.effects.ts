import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { GlobalConfig } from "app/core/model/global-config.model";
import { GlobalConfigService } from "app/core/services/global-config.service";
import { SystemTablesService } from "app/core/services/system-table.service";
import { EMPTY, map, mergeMap } from "rxjs";
import { loadGlobalConfig, loadSystemTable, SystemTablesRaiseEvents } from "./system-tables.actions";
import { SystemTablesEventListener } from "./system-tables.selectors";

@Injectable()
export class SystemTablesEffects {
    constructor(private actions$: Actions, private systemTableService: SystemTablesService, private systemTablesRaizeEvents: SystemTablesRaiseEvents
        , private systemTablesEventListener: SystemTablesEventListener, private globalConfigService: GlobalConfigService) { }

    loadSystemTable$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadSystemTable),
                concatLatestFrom(props => this.systemTablesEventListener.selectSystemTable(props.systemTableType)),
                mergeMap(([props, existSystemTable]) =>//use mergemap to allow multiple dispatch actions in same time
                    existSystemTable ? EMPTY :
                        this.systemTableService
                            .getSystemTable(props.systemTableType)
                            .pipe(
                                map((data: any[]) => [
                                    this.systemTablesRaizeEvents.setSystemTable(props.systemTableType, data)
                                ])
                            )
                )
            );
        },
        { dispatch: false }
    );


    loadGlobalConfig$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadGlobalConfig),
                concatLatestFrom(props => this.systemTablesEventListener.selectGlobalConfig()),
                mergeMap(([props, existConfig]) =>//use mergemap to allow multiple dispatch actions in same time
                    existConfig ? EMPTY :
                        this.globalConfigService.getConfig()
                            .pipe(
                                map((data: GlobalConfig) => [
                                    this.systemTablesRaizeEvents.setGlobalConfig(data)
                                ])
                            )
                )
            );
        },
        { dispatch: false }
    );
}

