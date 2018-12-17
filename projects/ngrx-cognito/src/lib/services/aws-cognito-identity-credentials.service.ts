import { Injectable, Inject, OnInit, OnDestroy } from '@angular/core';
import { CognitoConfigService } from 'ngrx-cognito/lib/services/cognito-config.service';
import { CognitoConfig } from '../model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { CognitoFacade } from '../state/cognito.facade';
import { takeUntil } from 'rxjs/operators';
import { AwsCognitoIdentityCredentials } from '../model/aws-cognito-identity-credentials';

@Injectable({
  providedIn: 'root'
})
export class AwsCognitoIdentityCredentialsService implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  private credentialSubject = new BehaviorSubject<AwsCognitoIdentityCredentials>(null);
  cognitoIdentityCredentials$ = this.credentialSubject.asObservable();
  constructor(@Inject(CognitoConfigService) private config: CognitoConfig, private cognitoFacade: CognitoFacade) {}

  ngOnInit() {
    this.cognitoFacade.idToken$.pipe(takeUntil(this.unsubscribe)).subscribe(idToken => {
      if (idToken) {
        const logins: { [key: string]: string } = {};
        logins[`cognito-idp.${this.config.region}.amazonaws.com/${this.config.cognitoUserPoolId}`] = idToken;
        this.credentialSubject.next({
          IdentityPoolId: this.config.identityPoolId,
          Logins: logins
        });
      }
    });
  }
  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
