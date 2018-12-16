import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CognitoState } from './cognito.reducer';
import { CognitoStates } from '../model';
import { MemoizedSelector } from '@ngrx/store';
import { CognitoUser } from 'amazon-cognito-identity-js';

const getCognito = createFeatureSelector<CognitoState>('cognito');

const getCognitoState = createSelector(
  getCognito,
  (state: CognitoState) => state
);

export const getUser = createSelector(
  getCognitoState,
  state => state.user
);
export const getErrorMessage = createSelector(
  getCognitoState,
  state => state.errorMessage
);
export const getAccessToken = createSelector(
  getCognitoState,
  state => state.accessToken
);
export const getIdToken = createSelector(
  getCognitoState,
  state => state.idToken
);
export const getCognitoCurrentState = createSelector(
  getCognitoState,
  state => state.cognitoState
);
export const getCognitoCurrentStateIsLoggedIn = createSelector(
  getCognitoState,
  state => state.cognitoState === CognitoStates.LOGGED_IN
);
export const getIsLoadingLogin = createSelector(
  getCognitoState,
  state => state.isLoading.login
);
export const getIsLoadingSignup = createSelector(
  getCognitoState,
  state => state.isLoading.signup
);
export const getIsLoadingMfa = createSelector(
  getCognitoState,
  state => state.isLoading.mfa
);
export const getIsLoadingConfirmationCode = createSelector(
  getCognitoState,
  state => state.isLoading.confirmationCode
);
export const getIsLoadingLogout = createSelector(
  getCognitoState,
  state => state.isLoading.logout
);
export const getIsLoadingNewPassword = createSelector(
  getCognitoState,
  state => state.isLoading.newPassword
);
export const getIsLoadingAttributes = createSelector(
  getCognitoState,
  state => state.isLoading.attributes
);
export const getUserAttributes = createSelector(
  getCognitoState,
  state => state.userAttributes
);
export const getUserId = createSelector(
  getUserAttributes,
  attrs => {
    if (attrs['sub']) {
      return attrs['sub'];
    } else {
      return null;
    }
  }
);
