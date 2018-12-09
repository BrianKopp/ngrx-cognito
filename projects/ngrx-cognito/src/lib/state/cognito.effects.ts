import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of, defer, Observable, Subscription } from 'rxjs';

import { CognitoService } from '../services/cognito.service';
import * as cog from './cognito.actions';
import { CognitoFacade } from './cognito.facade';
import { CognitoState } from './cognito.reducer';
import {
  LoginResponseCodes,
  SignupResponse,
  ConfirmationCodeResponse,
  LoginResponse,
  LoadUserFromStorageResponse
} from '../model';

@Injectable()
export class CognitoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CognitoState>,
    private cognitoService: CognitoService,
    private authFacade: CognitoFacade,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.LOGIN)).pipe(
    map((action: cog.LoginAction) => action.payload),
    tap(({ username, password }) => {
      const user = this.cognitoService.createUserWithCredentials(username);
      const authDetails = this.cognitoService.createAuthDetails(username, password);
      this.store.dispatch(new cog.LoginWaitingAction({ user, authDetails }));
    }),
    switchMap(({ username, password, redirectUrl }) => {
      return this.cognitoService.loginUser(username, password).pipe(
        map(response => {
          switch (response.code) {
            case LoginResponseCodes.SUCCESS:
              return new cog.LoginSuccessAction({ redirectUrl });
            case LoginResponseCodes.INVALID_CREDENTIALS:
              return new cog.LoginFailureAction({ errorMessage: 'Incorrect username or password' });
            case LoginResponseCodes.MFA_REQUIRED:
              return new cog.RequireMFACodeAction();
            case LoginResponseCodes.NOT_CONFIRMED:
              return new cog.RequireUserConfirmationAction();
            case LoginResponseCodes.REQUIRE_PASSWORD_RESET:
              return new cog.RequireNewPasswordAction();
            case LoginResponseCodes.UNKNOWN:
            default:
              return new cog.LoginFailureAction({ errorMessage: 'Login failed' });
          }
        }),
        catchError(error => of(new cog.LoginFailureAction({ errorMessage: error })))
      );
    })
  );

  @Effect()
  signup$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.SIGNUP)).pipe(
    map((action: cog.SignupAction) => action.payload),
    tap(({ username }) => {
      const user = this.cognitoService.createUserWithCredentials(username);
      this.store.dispatch(new cog.SignupWaitingAction({ user }));
    }),
    switchMap(({ username, password, email, attributeData }) => {
      return this.cognitoService.signupUser(username, password, email, attributeData).pipe(
        map((response: SignupResponse) => {
          if (response.errorMessage) {
            return new cog.SignupFailureAction({ errorMessage: response.errorMessage });
          } else if (response.userIsConfirmed || response.userIsConfirmed === null) {
            return new cog.SignupSuccessAction({
              cognitoUser: response.user
            });
          } else {
            return new cog.RequireUserConfirmationAction();
          }
        }),
        catchError(err => of(new cog.SignupFailureAction({ errorMessage: err })))
      );
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.LOGOUT)).pipe(
    withLatestFrom(this.authFacade.cognitoUser$),
    tap(([_, user]) => {
      this.cognitoService.logoutUser(user);
    }),
    switchMap(_ => {
      return of(new cog.LogoutSuccessAction());
    })
  );

  logoutSuccess$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.LOGOUT_SUCCESS)).subscribe(_ => {
    this.router.navigate(['/login']);
  });

  @Effect()
  submitConfirmationCode$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.SUBMIT_CONFIRMATION_CODE)).pipe(
    map((action: cog.SubmitConfirmationCodeAction) => action.payload.confirmationCode),
    withLatestFrom(this.authFacade.cognitoUser$),
    switchMap(([code, user]) => {
      return this.cognitoService.submitConfirmationCode(user, code).pipe(
        map((response: ConfirmationCodeResponse) => {
          if (response.errorMessage || !response.success) {
            const errMsg = response.errorMessage ? response.errorMessage : 'Error submitting confirmation code';
            return new cog.SubmitConfirmationCodeFailureAction({ errorMessage: errMsg });
          } else {
            return new cog.SubmitConfirmationCodeSuccessAction();
          }
        }),
        catchError(err => of(new cog.SubmitConfirmationCodeFailureAction({ errorMessage: err })))
      );
    })
  );

  submitConfirmationCodeSuccess$ = this.actions$
    .pipe(ofType(cog.CognitoActionTypes.SUBMIT_CONFIRMATION_CODE_SUCCESS))
    .subscribe((action: cog.SubmitConfirmationCodeSuccessAction) => {
      this.router.navigate(['']);
    });

  @Effect()
  submitMfaCode$ = this.actions$.pipe(ofType(cog.CognitoActionTypes.SUBMIT_MFA)).pipe(
    map((action: cog.SubmitMFACodeAction) => action.payload.mfaCode),
    withLatestFrom(this.authFacade.cognitoUser$),
    switchMap(([code, user]) => {
      return this.cognitoService.submitMfaCode(user, code).pipe(
        map((response: LoginResponse) => {
          if (response.code === LoginResponseCodes.MFA_REQUIRED) {
            return new cog.SubmitMFACodeFailureInvalidAction({ errorMessage: 'Code invalid' });
          } else {
            return new cog.SubmitMFACodeSuccessAction();
          }
        }),
        catchError(err => of(new cog.SubmitMFACodeFailureInvalidAction({ errorMessage: err })))
      );
    })
  );

  @Effect({ dispatch: false })
  initAuth$ = defer(() => {
    return this.cognitoService.loadUserFromStorage().pipe(
      map((response: LoadUserFromStorageResponse) => {
        if (response.user && response.accessToken && response.idToken) {
          this.store.dispatch(
            new cog.InitAuthUserRememberedAction({
              user: response.user,
              accessToken: response.accessToken,
              idToken: response.idToken
            })
          );
        }
      })
    );
  });
}