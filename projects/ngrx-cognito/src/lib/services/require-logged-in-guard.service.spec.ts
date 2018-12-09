import { TestBed, inject } from '@angular/core/testing';

import { RequireLoggedInGuardService } from './require-logged-in-guard.service';

describe('RequireLoggedInGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireLoggedInGuardService]
    });
  });

  it('should be created', inject([RequireLoggedInGuardService], (service: RequireLoggedInGuardService) => {
    expect(service).toBeTruthy();
  }));
});
