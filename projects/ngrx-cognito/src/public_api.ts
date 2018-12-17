/*
 * Public API Surface of ngrx-cognito
 */

export { NgrxCognitoModule } from './lib/ngrx-cognito.module';
export { CognitoConfig, CognitoStates } from './lib/model';
export { RequireLoggedOutGuardService } from './lib/services/require-logged-out-guard.service';
export { RequireLoggedInGuardService } from './lib/services/require-logged-in-guard.service';
export { cognitoReducer, CognitoState } from './lib/state/cognito.reducer';
export { CognitoFacade } from './lib/state/cognito.facade';
export { AwsCognitoIdentityCredentialsService } from './lib/services/aws-cognito-identity-credentials.service';
