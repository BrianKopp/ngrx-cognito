import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export interface SignupResponse {
  user?: CognitoUser;
  userIsConfirmed?: boolean;
  authDetails?: AuthenticationDetails;
  errorMessage?: string;
}
