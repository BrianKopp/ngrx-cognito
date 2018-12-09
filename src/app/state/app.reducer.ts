import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { CognitoState, cognitoReducer } from 'ngrx-cognito';
import { environment } from 'src/environments/environment';

export interface AppState {
  cognito: CognitoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  cognito: cognitoReducer
};

// log all actions
export function logActions(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logActions] : [];
