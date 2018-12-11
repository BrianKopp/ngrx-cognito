import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CognitoState } from '../state/cognito.reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getCognitoCurrentStateIsLoggedIn } from '../state/cognito.selectors';
import { CognitoConfig } from '../model';
import { CognitoConfigService } from './cognito-config.service';

@Injectable({
  providedIn: 'root'
})
export class RequireLoggedOutGuardService implements CanActivate {
  constructor(
    private store: Store<CognitoState>,
    private router: Router,
    @Inject(CognitoConfigService) private config: CognitoConfig
  ) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getCognitoCurrentStateIsLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate([this.config.logoutRequiredUrl]);
        }
        return !isLoggedIn;
      }),
      take(1)
    );
  }
}
