import { TestBed } from '@angular/core/testing';

import { AwsCognitoIdentityCredentialsService } from './aws-cognito-identity-credentials.service';
import { CognitoConfigService } from './cognito-config.service';
import { CognitoFacade } from '../state/cognito.facade';
import { StoreModule } from '@ngrx/store';

describe('AwsCognitoIdentityCredentialsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: CognitoConfigService, useValue: {} }, CognitoFacade]
    })
  );

  it('should be created', () => {
    const service: AwsCognitoIdentityCredentialsService = TestBed.get(AwsCognitoIdentityCredentialsService);
    expect(service).toBeTruthy();
  });
});
