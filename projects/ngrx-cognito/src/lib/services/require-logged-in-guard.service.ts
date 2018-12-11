import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CognitoState } from '../state/cognito.reducer';
import { getCognitoCurrentStateIsLoggedIn } from '../state/cognito.selectors';
import { CognitoConfig } from '../model';
import { CognitoConfigService } from './cognito-config.service';

@Injectable({
  providedIn: 'root'
})
export class RequireLoggedInGuardService implements CanActivate {
  constructor(
    private store: Store<CognitoState>,
    private router: Router,
    @Inject(CognitoConfigService) private config: CognitoConfig
  ) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getCognitoCurrentStateIsLoggedIn),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate([this.config.loginRequiredUrl]);
        }
        return isLoggedIn;
      }),
      take(1)
    );
  }
}
