import { CognitoUser } from 'amazon-cognito-identity-js';

export interface LoadUserFromStorageResponse {
  errorMessage?: string;
  user?: CognitoUser;
  accessToken?: string;
  idToken?: string;
}
