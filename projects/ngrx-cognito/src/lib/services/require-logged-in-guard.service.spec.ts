import { TestBed } from '@angular/core/testing';

import { RequireLoggedInGuardService } from './require-logged-in-guard.service';

describe('RequireLoggedInGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequireLoggedInGuardService = TestBed.get(RequireLoggedInGuardService);
    expect(service).toBeTruthy();
  });
});
