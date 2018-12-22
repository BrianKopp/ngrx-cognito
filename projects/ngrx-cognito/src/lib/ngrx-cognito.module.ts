import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequireLoggedInGuardService } from './services/require-logged-in-guard.service';
import { RequireLoggedOutGuardService } from './services/require-logged-out-guard.service';
import { CognitoFacade } from './state/cognito.facade';
import { CognitoConfigService } from './services/cognito-config.service';
import { CognitoConfig } from './model';
import { cognitoReducer } from './state/cognito.reducer';
import { CognitoEffects } from './state/cognito.effects';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature('cognito', cognitoReducer), EffectsModule.forFeature([CognitoEffects])],
  exports: []
})
export class NgrxCognitoModule {
  static forRoot(cognitoConfig: CognitoConfig): ModuleWithProviders {
    const scrubbedConfig: CognitoConfig = {
      ...cognitoConfig,
      region: cognitoConfig.region,
      identityPoolId: cognitoConfig.identityPoolId,
      loginRequiredUrl: cognitoConfig.loginRequiredUrl || '/login',
      loginDidSucceedUrl: cognitoConfig.loginDidSucceedUrl || '/',
      logoutRequiredUrl: cognitoConfig.logoutRequiredUrl || '/',
      logoutDidSucceedUrl: cognitoConfig.logoutDidSucceedUrl || '/'
    };
    return {
      ngModule: NgrxCognitoModule,
      providers: [
        RequireLoggedInGuardService,
        RequireLoggedOutGuardService,
        CognitoFacade,
        RouterModule,
        { provide: CognitoConfigService, useValue: scrubbedConfig }
      ]
    };
  }
}
