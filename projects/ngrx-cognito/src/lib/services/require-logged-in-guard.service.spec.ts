import { TestBed } from '@angular/core/testing';

import { RequireLoggedInGuardService } from './require-logged-in-guard.service';
import { CognitoConfigService } from './cognito-config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('RequireLoggedInGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), StoreModule.forRoot({})],
      providers: [{ provide: CognitoConfigService, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: RequireLoggedInGuardService = TestBed.get(RequireLoggedInGuardService);
    expect(service).toBeTruthy();
  });
});
