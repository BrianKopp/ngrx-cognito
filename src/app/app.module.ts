import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgrxCognitoModule } from 'ngrx-cognito';
import { AppComponent } from './app.component';
import { appReducers, metaReducers } from './state/app.reducer';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([]),
    NgrxCognitoModule.forRoot({
      cognitoAppClientId: environment.cognitoAppClientId,
      cognitoUserPoolId: environment.cognitoUserPoolId
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Cognito App',
      logOnly: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
