import { Component } from '@angular/core';
import { CognitoFacade, CognitoStates } from 'ngrx-cognito';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cognitoState$ = this.cognitoFacade.cognitoCurrentState$;
  errorMessage$ = this.cognitoFacade.errorMessage$;
  cognitoStates = CognitoStates;
  constructor(private cognitoFacade: CognitoFacade) {}

  onSubmitLogin(event) {
    if (event && event.username && event.password) {
      this.cognitoFacade.loginUser(event.username, event.password);
    } else {
      console.log('invalid event data for onSubmitLogin function');
      console.log(event);
    }
  }

  onSubmitConfirmationCode(event) {
    if (event && event.confirmationCode) {
      this.cognitoFacade.submitConfirmationCode(event.confirmationCode);
    } else {
      console.log('invalid event data for onSubmitConfirmationCode');
      console.log(event);
    }
  }
}
