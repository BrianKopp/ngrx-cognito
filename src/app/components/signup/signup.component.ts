import { Component } from '@angular/core';
import { CognitoFacade, CognitoStates } from 'ngrx-cognito';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  cognitoState$ = this.cognitoFacade.cognitoCurrentState$;
  errorMessage$ = this.cognitoFacade.errorMessage$;
  cognitoStates = CognitoStates;
  constructor(private cognitoFacade: CognitoFacade) {}

  onSubmitSignUp(event) {
    if (event && event.username && event.password && event.email) {
      const attributes: { [key: string]: string } = {};
      if (event.firstName) {
        attributes['given_name'] = event.firstName;
      }
      if (event.lastName) {
        attributes['family_name'] = event.lastName;
      }
      this.cognitoFacade.signupUser(event.username, event.password, event.email, attributes);
    } else {
      console.log('invalid event data for onSubmitSignUp');
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
