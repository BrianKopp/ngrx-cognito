import { Component } from '@angular/core';
import { CognitoFacade } from 'ngrx-cognito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-cognito-app';
  isLoggedIn$ = this.cognitoFacade.isLoggedIn$;
  constructor(private cognitoFacade: CognitoFacade) {}
  logoutUser() {
    this.cognitoFacade.logoutUser();
  }
}
