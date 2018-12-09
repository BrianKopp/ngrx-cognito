import { TestBed, inject } from '@angular/core/testing';

import { RequireLoggedOutGuardService } from './require-logged-out-guard.service';

describe('RequireLoggedOutGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireLoggedOutGuardService]
    });
  });

  it('should be created', inject([RequireLoggedOutGuardService], (service: RequireLoggedOutGuardService) => {
    expect(service).toBeTruthy();
  }));
});
