import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgrxCognitoModule } from 'ngrx-cognito';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxCognitoModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
