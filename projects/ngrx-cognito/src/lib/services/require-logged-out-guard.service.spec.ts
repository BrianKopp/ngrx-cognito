import { TestBed } from '@angular/core/testing';

import { RequireLoggedOutGuardService } from './require-logged-out-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CognitoConfigService } from './cognito-config.service';
import { StoreModule } from '@ngrx/store';

describe('RequireLoggedOutGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), StoreModule.forRoot({})],
      providers: [{ provide: CognitoConfigService, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: RequireLoggedOutGuardService = TestBed.get(RequireLoggedOutGuardService);
    expect(service).toBeTruthy();
  });
});
