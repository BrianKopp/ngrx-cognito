import { Action } from '@ngrx/store';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export enum CognitoActionTypes {
  INIT_AUTH_USER_REMEMBERED = '[Cognito] Init Auth User Remembered',

  LOGIN = '[Cognito] Login',
  LOGIN_WAITING = '[Cognito] Login Waiting',
  LOGIN_SUCCESS = '[Cognito] Login Success',
  LOGIN_FAILURE = '[Cognito] Login Failure',

  SIGNUP = '[Cognito] Signup',
  SIGNUP_WAITING = '[Cognito] Signup Waiting',
  SIGNUP_SUCCESS = '[Cognito] Signup Success',
  SIGNUP_FAILURE = '[Cognito] Signup Failure',

  REQUIRE_MFA = '[Cognito] Multi-Factor Authentication Required',
  REQUIRE_NEW_PASSWORD = '[Cognito] New Password Required',
  REQUIRE_USER_CONFIRMATION = '[Cognito] User Confirmation Required',

  SUBMIT_CONFIRMATION_CODE = '[Cognito] Submit Confirmation Code',
  SUBMIT_CONFIRMATION_CODE_SUCCESS = '[Cognito] Submit Confirmation Code SUCCESS',
  SUBMIT_CONFIRMATION_CODE_FAILURE = '[Cognito] Submit Confirmation Code FAILURE',

  SUBMIT_MFA = '[Cognito] Submit MFA Code',
  SUBMIT_MFA_SUCCESS = '[Cognito] Submit MFA Code Success',
  SUBMIT_MFA_FAILURE_INVALID_CODE = '[Cognito] Submit MFA Failure Invalid Code',

  SUBMIT_NEW_PASSWORD = '[Cognito] Submit New Password',
  SUBMIT_NEW_PASSWORD_SUCCESS = '[Cognito] Submit New Password Success',
  SUBMIT_NEW_PASSWORD_FAILURE = '[Cognito] Submit New Password Failure',

  LOGOUT = '[Cognito] Logout',
  LOGOUT_SUCCESS = '[Cognito] Logout SUccess'
}
export class InitAuthUserRememberedAction implements Action {
  readonly type = CognitoActionTypes.INIT_AUTH_USER_REMEMBERED;
  constructor(public payload: { user: CognitoUser; accessToken: string; idToken: string }) {}
}

export class LoginAction implements Action {
  readonly type = CognitoActionTypes.LOGIN;
  constructor(public payload: { username: string; password: string; redirectUrl?: string }) {}
}

export class LoginWaitingAction implements Action {
  readonly type = CognitoActionTypes.LOGIN_WAITING;
  constructor(public payload: { user: CognitoUser; authDetails: AuthenticationDetails }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = CognitoActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { redirectUrl?: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = CognitoActionTypes.LOGIN_FAILURE;
  constructor(public payload: { errorMessage: string }) {}
}

export class SignupAction implements Action {
  readonly type = CognitoActionTypes.SIGNUP;
  constructor(public payload: { username: string; password: string; email: string; attributeData: { [key: string]: string } }) {}
}

export class SignupWaitingAction implements Action {
  readonly type = CognitoActionTypes.SIGNUP_WAITING;
  constructor(public payload: { user: CognitoUser }) {}
}

export class SignupSuccessAction implements Action {
  readonly type = CognitoActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: { cognitoUser: CognitoUser }) {}
}

export class SignupFailureAction implements Action {
  readonly type = CognitoActionTypes.SIGNUP_FAILURE;
  constructor(public payload: { errorMessage: string }) {}
}

export class RequireMFACodeAction implements Action {
  readonly type = CognitoActionTypes.REQUIRE_MFA;
  constructor() {}
}

export class RequireNewPasswordAction implements Action {
  readonly type = CognitoActionTypes.REQUIRE_NEW_PASSWORD;
  constructor() {}
}

export class RequireUserConfirmationAction implements Action {
  readonly type = CognitoActionTypes.REQUIRE_USER_CONFIRMATION;
  constructor() {}
}

export class SubmitMFACodeAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_MFA;
  constructor(public payload: { mfaCode: string }) {}
}

export class SubmitMFACodeSuccessAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_MFA_SUCCESS;
  constructor() {}
}

export class SubmitMFACodeFailureInvalidAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_MFA_FAILURE_INVALID_CODE;
  constructor(public payload: { errorMessage: string }) {}
}

export class SubmitConfirmationCodeAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_CONFIRMATION_CODE;
  constructor(public payload: { confirmationCode: string }) {}
}

export class SubmitConfirmationCodeSuccessAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_CONFIRMATION_CODE_SUCCESS;
  constructor() {}
}

export class SubmitConfirmationCodeFailureAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_CONFIRMATION_CODE_FAILURE;
  constructor(public payload: { errorMessage: string }) {}
}

export class SubmitNewPasswordAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_NEW_PASSWORD;
  constructor(public payload: { newPassword: string }) {}
}

export class SubmitNewPasswordSuccessAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_NEW_PASSWORD_SUCCESS;
  constructor() {}
}

export class SubmitNewPasswordFailureAction implements Action {
  readonly type = CognitoActionTypes.SUBMIT_NEW_PASSWORD_FAILURE;
  constructor(public payload: { errorMessage: string }) {}
}

export class LogoutAction implements Action {
  readonly type = CognitoActionTypes.LOGOUT;
  constructor() {}
}

export class LogoutSuccessAction implements Action {
  readonly type = CognitoActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

export type CognitoActions =
  | InitAuthUserRememberedAction
  | LoginAction
  | LoginWaitingAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupAction
  | SignupWaitingAction
  | SignupSuccessAction
  | SignupFailureAction
  | RequireMFACodeAction
  | RequireUserConfirmationAction
  | RequireNewPasswordAction
  | SubmitConfirmationCodeAction
  | SubmitConfirmationCodeSuccessAction
  | SubmitConfirmationCodeFailureAction
  | SubmitMFACodeAction
  | SubmitMFACodeSuccessAction
  | SubmitMFACodeFailureInvalidAction
  | SubmitNewPasswordAction
  | SubmitNewPasswordSuccessAction
  | SubmitNewPasswordFailureAction
  | LogoutAction
  | LogoutSuccessAction;
