import { InjectionToken } from '@angular/core';
import { CognitoConfig } from '../model/cognito-config';

export const CognitoConfigService = new InjectionToken<CognitoConfig>('CognitoConfig');
