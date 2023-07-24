import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolve } from 'app/shared/resolver/user-resolver';
import { MainDesktopComponent } from './components/main-desktop/main-desktop.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', component: MainDesktopComponent },
      { path: 'hfd', loadChildren: () => import('app/hfd/hfd.module').then(m => m.HfdModule), resolve: { user: UserResolve } },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
