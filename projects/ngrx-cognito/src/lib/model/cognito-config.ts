export interface CognitoConfig {
  cognitoAppClientId: string;
  cognitoUserPoolId: string;
  loginRequiredUrl: string;
  loginDidSucceedUrl: string;
  logoutRequiredUrl: string;
  logoutDidSucceedUrl: string;
}
