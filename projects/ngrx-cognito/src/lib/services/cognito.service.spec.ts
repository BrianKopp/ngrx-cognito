import { TestBed } from '@angular/core/testing';

import { CognitoService } from './cognito.service';
import { CognitoConfigService } from './cognito-config.service';

describe('CognitoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: CognitoConfigService, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: CognitoService = TestBed.get(CognitoService);
    expect(service).toBeTruthy();
  });
});
