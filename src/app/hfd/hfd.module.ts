import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { HfdRoutingModule } from './hfd-routing.module';
import { UserService } from './services/user.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { UsersComponent } from './users/users/users.component';


@NgModule({
  declarations: [
    UsersComponent,
  ],
  providers: [
    UserService,
  ],
  imports: [CommonModule, SharedModule.forRootOrChild(), HfdRoutingModule, NgxExtendedPdfViewerModule],
})
export class HfdModule { }
