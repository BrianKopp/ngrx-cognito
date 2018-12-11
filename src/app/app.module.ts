import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgrxCognitoModule } from 'ngrx-cognito';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, metaReducers } from './state/app.reducer';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ConfirmationCodeFormComponent } from './components/confirmation-code-form/confirmation-code-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProtectedComponent } from './components/protected/protected.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    SignupFormComponent,
    ConfirmationCodeFormComponent,
    SignupComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([]),
    NgrxCognitoModule.forRoot({
      cognitoAppClientId: environment.cognitoAppClientId,
      cognitoUserPoolId: environment.cognitoUserPoolId,
      loginDidSucceedUrl: '/protected',
      loginRequiredUrl: '/login',
      logoutDidSucceedUrl: '/',
      logoutRequiredUrl: '/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
