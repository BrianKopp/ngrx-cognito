import { CognitoUser } from 'amazon-cognito-identity-js';

export interface ConfirmationCodeResponse {
  errorMessage?: string;
  success: boolean;
  user?: CognitoUser;
}
