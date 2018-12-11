import { TestBed } from '@angular/core/testing';

import { RequireLoggedOutGuardService } from './require-logged-out-guard.service';

describe('RequireLoggedOutGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequireLoggedOutGuardService = TestBed.get(RequireLoggedOutGuardService);
    expect(service).toBeTruthy();
  });
});
