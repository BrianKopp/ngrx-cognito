import { TestBed } from '@angular/core/testing';

import { AwsCognitoIdentityCredentialsService } from './aws-cognito-identity-credentials.service';

describe('AwsCognitoIdentityCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsCognitoIdentityCredentialsService = TestBed.get(AwsCognitoIdentityCredentialsService);
    expect(service).toBeTruthy();
  });
});
