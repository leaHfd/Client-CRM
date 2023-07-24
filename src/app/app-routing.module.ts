import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserResolve } from './shared/resolver/user-resolver';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('app/core/core.module').then(m => m.CoreModule), canLoad: [AuthGuard] ,resolve:{user:UserResolve}},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
