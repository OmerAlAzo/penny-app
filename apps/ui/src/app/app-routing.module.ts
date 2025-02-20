import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';


import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CustomerGuard } from './auth-guards/guard/dachguard.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { AdminGuard } from './auth-guards/guard/adminguard.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/SinLog/login/login.component';
import { SignupComponent } from './components/SinLog/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { ProductsComponent } from './admin/products/products.component';


const routes: Routes = [
  // { path: '', component: RedirectComponent} ,
  { path: '', component: HomeComponent} ,
  { path: 'dach', component: DashboardComponent , canActivate: [CustomerGuard]} ,
  

  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      }
    ]
   } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'signup', component: SignupComponent } ,
  { path: 'forgot-password', component: ForgotPasswordComponent } ,
  { path: 'reset-password/:token', component: ResetPasswordComponent } ,


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    RouterModule.forRoot(routes) , // هذه لكي تعمل ال roterlink = "/test "

  ] ,
  exports: [RouterModule],

})

export class AppRoutingModule { }
