import { NgModule } from '@angular/core';
import { CognitoConfig } from './model';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RequireLoggedInGuardService } from './services/require-logged-in-guard.service';
import { RequireLoggedOutGuardService } from './services/require-logged-out-guard.service';
import { CognitoConfigService } from './services/cognito-config.service';
import { StoreModule } from '@ngrx/store';
import { cognitoReducer } from './state/cognito.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CognitoEffects } from './state/cognito.effects';
import { CognitoFacade } from './state/cognito.facade';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, StoreModule.forFeature('cognito', cognitoReducer), EffectsModule.forFeature([CognitoEffects])],
  declarations: [],
  exports: []
})
export class NgrxCognitoModule {
  static forRoot(cognitoConfig: CognitoConfig): ModuleWithProviders {
    return {
      ngModule: NgrxCognitoModule,
      providers: [
        RequireLoggedInGuardService,
        RequireLoggedOutGuardService,
        CognitoFacade,
        RouterModule,
        { provide: CognitoConfigService, useValue: cognitoConfig }
      ]
    };
  }
}
