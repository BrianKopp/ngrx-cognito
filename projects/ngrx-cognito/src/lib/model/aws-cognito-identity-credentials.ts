export interface AwsCognitoIdentityCredentials {
  IdentityPoolId: string;
  Logins: { [key: string]: string };
}
