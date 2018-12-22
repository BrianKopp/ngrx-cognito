import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoStates } from '../model';
import { CognitoActions, CognitoActionTypes } from './cognito.actions';

export interface CognitoState {
  user: CognitoUser | null;
  userAttributes: { [key: string]: any };
  authDetails: AuthenticationDetails | null;
  errorMessage: string;
  accessToken: string;
  idToken: string;
  isLoading: {
    login: boolean;
    signup: boolean;
    mfa: boolean;
    confirmationCode: boolean;
    logout: boolean;
    newPassword: boolean;
    attributes: boolean;
  };
  cognitoState: CognitoStates;
}

export const initialState: CognitoState = {
  user: null,
  userAttributes: null,
  authDetails: null,
  errorMessage: null,
  accessToken: null,
  idToken: null,
  isLoading: {
    login: false,
    signup: false,
    mfa: false,
    confirmationCode: false,
    logout: false,
    newPassword: false,
    attributes: false
  },
  cognitoState: CognitoStates.NOT_LOGGED_IN
};

export function cognitoReducer(state = initialState, action: CognitoActions): CognitoState {
  switch (action.type) {
    case CognitoActionTypes.LOGIN_WAITING:
      return {
        ...state,
        user: action.payload.user,
        authDetails: action.payload.authDetails,
        isLoading: {
          ...state.isLoading,
          login: true
        }
      };
    case CognitoActionTypes.INIT_AUTH_USER_REMEMBERED:
      return {
        ...state,
        authDetails: null,
        cognitoState: CognitoStates.LOGGED_IN,
        user: action.payload.user
      };
    case CognitoActionTypes.SET_TOKENS:
      return {
        ...state,
        idToken: action.payload.idToken,
        accessToken: action.payload.accessToken
      };
    case CognitoActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authDetails: null,
        user: action.payload.user,
        cognitoState: CognitoStates.LOGGED_IN,
        isLoading: {
          ...state.isLoading,
          login: false
        }
      };
    case CognitoActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        authDetails: null,
        errorMessage: action.payload.errorMessage,
        isLoading: {
          ...state.isLoading,
          login: false
        }
      };
    case CognitoActionTypes.SIGNUP_WAITING:
      return {
        ...state,
        user: action.payload.user,
        isLoading: {
          ...state.isLoading,
          signup: false
        }
      };
    case CognitoActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.cognitoUser,
        cognitoState: CognitoStates.LOGGED_IN,
        isLoading: {
          ...state.isLoading,
          signup: false
        }
      };
    case CognitoActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        authDetails: null,
        errorMessage: action.payload.errorMessage,
        isLoading: {
          ...state.isLoading,
          signup: false
        }
      };
    case CognitoActionTypes.REQUIRE_MFA:
      return {
        ...state,
        cognitoState: CognitoStates.REQUIRE_MFA,
        isLoading: {
          ...state.isLoading,
          login: false,
          signup: false
        }
      };
    case CognitoActionTypes.REQUIRE_USER_CONFIRMATION:
      return {
        ...state,
        cognitoState: CognitoStates.REQUIRE_CONFIRMATION,
        isLoading: {
          ...state.isLoading,
          login: false,
          signup: false
        }
      };
    case CognitoActionTypes.REQUIRE_NEW_PASSWORD:
      return {
        ...state,
        cognitoState: CognitoStates.REQUIRE_NEW_PASSWORD,
        isLoading: {
          ...state.isLoading,
          login: false,
          signup: false
        }
      };
    case CognitoActionTypes.SUBMIT_CONFIRMATION_CODE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          confirmationCode: true
        }
      };
    case CognitoActionTypes.SUBMIT_CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        cognitoState: CognitoStates.LOGGED_IN,
        isLoading: {
          ...state.isLoading,
          confirmationCode: false
        }
      };
    case CognitoActionTypes.SUBMIT_CONFIRMATION_CODE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: {
          ...state.isLoading,
          confirmationCode: false
        }
      };
    case CognitoActionTypes.SUBMIT_MFA:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          mfa: true
        }
      };
    case CognitoActionTypes.SUBMIT_MFA_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          mfa: false
        }
      };
    case CognitoActionTypes.SUBMIT_MFA_FAILURE_INVALID_CODE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: {
          ...state.isLoading,
          mfa: false
        }
      };
    case CognitoActionTypes.SUBMIT_NEW_PASSWORD:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          newPassword: true
        }
      };
    case CognitoActionTypes.SUBMIT_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          newPassword: false
        }
      };
    case CognitoActionTypes.SUBMIT_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: {
          ...state.isLoading,
          newPassword: false
        }
      };
    case CognitoActionTypes.GET_USER_ATTRIBUTES:
      return {
        ...state,
        errorMessage: null,
        userAttributes: null,
        isLoading: {
          ...state.isLoading,
          attributes: true
        }
      };
    case CognitoActionTypes.GET_USER_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        userAttributes: action.payload.attributes,
        isLoading: {
          ...state.isLoading,
          attributes: false
        }
      };
    case CognitoActionTypes.GET_USER_ATTRIBUTES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        userAttributes: null,
        isLoading: {
          ...state.isLoading,
          attributes: false
        }
      };
    case CognitoActionTypes.LOGOUT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          logout: true
        }
      };
    case CognitoActionTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
