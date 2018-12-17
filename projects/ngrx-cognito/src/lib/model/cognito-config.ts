export interface CognitoConfig {
  region: string;
  cognitoAppClientId: string;
  cognitoUserPoolId: string;
  identityPoolId: string;
  loginRequiredUrl: string;
  loginDidSucceedUrl: string;
  logoutRequiredUrl: string;
  logoutDidSucceedUrl: string;
}
