import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { LoginResponseCodes } from './login-response-codes.enum';

export interface LoginResponse {
  code: LoginResponseCodes;
  user?: CognitoUser;
  authData?: AuthenticationDetails;
  accessToken?: string;
  idToken?: string;
}
