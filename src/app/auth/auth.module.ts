import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';



@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    SharedModule.forRootOrChild(),
    AuthRoutingModule
  ]
})
export class AuthModule { }
