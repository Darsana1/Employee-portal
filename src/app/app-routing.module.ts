import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DasgboardComponent } from './dasgboard/dasgboard.component';
import { authGuard } from './gaurds/auth.guard';

const routes: Routes = [

{ path: 'users',canActivate:[authGuard], loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
{
  path:'',component:LoginComponent
},
{
  path:'dashboard',component:DasgboardComponent,canActivate:[authGuard]
},{
  path:'**',redirectTo:""
}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
