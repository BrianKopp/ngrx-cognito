import { Injectable, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CognitoState } from './cognito.reducer';
import {
  getUser,
  getErrorMessage,
  getAccessToken,
  getIdToken,
  getCognitoCurrentState,
  getIsLoadingLogin,
  getIsLoadingSignup,
  getIsLoadingMfa,
  getIsLoadingConfirmationCode,
  getIsLoadingLogout,
  getIsLoadingNewPassword,
  getCognitoCurrentStateIsLoggedIn,
  getUserAttributes,
  getIsLoadingAttributes
} from './cognito.selectors';
import { LoginAction, SubmitConfirmationCodeAction, SignupAction, LogoutAction } from './cognito.actions';
// imported explicitly for build
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoStates, CognitoConfig } from '../model';
import { AwsCognitoIdentityCredentials } from '../model/aws-cognito-identity-credentials';
import { CognitoConfigService } from '../services/cognito-config.service';

@Injectable()
export class CognitoFacade {
  cognitoUser$ = this.store.pipe(select(getUser));
  userAttributes$ = this.store.pipe(select(getUserAttributes));
  errorMessage$ = this.store.pipe(select(getErrorMessage));
  accessToken$ = this.store.pipe(select(getAccessToken));
  idToken$ = this.store.pipe(select(getIdToken));
  cognitoCurrentState$ = this.store.pipe(select(getCognitoCurrentState));
  isLoggedIn$ = this.store.pipe(select(getCognitoCurrentStateIsLoggedIn));
  isLoadingLogin$ = this.store.pipe(select(getIsLoadingLogin));
  isLoadingSignup$ = this.store.pipe(select(getIsLoadingSignup));
  isLoadingMfa$ = this.store.pipe(select(getIsLoadingMfa));
  isLoadingConfirmationCode$ = this.store.pipe(select(getIsLoadingConfirmationCode));
  isLoadingLogout$ = this.store.pipe(select(getIsLoadingLogout));
  isLoadingNewPassword$ = this.store.pipe(select(getIsLoadingNewPassword));
  isLoadingAttributes$ = this.store.pipe(select(getIsLoadingAttributes));

  private credentialsSubject = new BehaviorSubject<AwsCognitoIdentityCredentials>(null);
  awsCognitoCredentials$ = this.credentialsSubject.asObservable();
  constructor(private store: Store<CognitoState>, @Inject(CognitoConfigService) private config: CognitoConfig) {
    this.idToken$.subscribe(idToken => {
      if (idToken) {
        const logins: { [key: string]: string } = {};
        logins[`cognito-idp.${this.config.region}.amazonaws.com/${this.config.cognitoUserPoolId}`] = idToken;
        this.credentialsSubject.next({
          IdentityPoolId: this.config.identityPoolId,
          Logins: logins
        });
      } else {
        this.credentialsSubject.next(null);
      }
    });
  }

  loginUser(username: string, password: string) {
    this.store.dispatch(new LoginAction({ username, password }));
  }
  submitConfirmationCode(confirmationCode: string) {
    this.store.dispatch(new SubmitConfirmationCodeAction({ confirmationCode }));
  }
  signupUser(username: string, password: string, email: string, attributeData: { [key: string]: string }) {
    this.store.dispatch(new SignupAction({ username, password, email, attributeData }));
  }
  logoutUser() {
    this.store.dispatch(new LogoutAction());
  }
}
