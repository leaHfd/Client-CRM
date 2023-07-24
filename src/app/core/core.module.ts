import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainDesktopComponent } from './components/main-desktop/main-desktop.component';
import { LookupTableService } from './services/lookupTable.service';
import { Store, StoreModule } from '@ngrx/store';
import { CoreFeatures } from './core-features.enum';
import { lookupsReducer } from './state/lookups.state/lookups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LookupsEffects } from './state/lookups.state/lookups.effects';
import { GlobalConfigService } from './services/global-config.service';
import { UserService } from './services/user.service';
import { systemTablesReducer } from './state/system-tables.state/system-tables.reducer';
import { SystemTablesEffects } from './state/system-tables.state/system-tables.effects';
import { SystemTablesService } from './services/system-table.service';



@NgModule({
  declarations: [
    MainLayoutComponent,
    MenuComponent,
    MainDesktopComponent
  ],
  providers: [
    LookupTableService,
    SystemTablesService,
    UserService,
    GlobalConfigService
  ],
  imports: [
    CommonModule,
    SharedModule.forRootOrChild(),
    CoreRoutingModule,
    StoreModule.forFeature(CoreFeatures.Lookups, lookupsReducer),
    StoreModule.forFeature(CoreFeatures.SystemTables, systemTablesReducer),
    EffectsModule.forFeature([LookupsEffects, SystemTablesEffects])
  ]
})
export class CoreModule { }
