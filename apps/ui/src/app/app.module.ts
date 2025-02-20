import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';

import { SignupComponent } from './components/SinLog/signup/signup.component';
import { LoginComponent } from './components/SinLog/login/login.component';

import { RedirectComponent } from './components/redirect/redirect.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './story/reducers/user.reducer';
import { AuthEffects } from './story/effects/user.effects';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { UserModule } from './components/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    ProductsComponent,
    SignupComponent,
    LoginComponent,
    RedirectComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
