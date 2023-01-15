import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  token: string;
  user: User | null;
  error: string;
}

export const initialState: AuthState = {
  token: '',
  user: null,
  error: '',
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, payload) => ({
    ...state,
    token: payload.token,
    error: '',
  })),

  on(AuthActions.loginError, (state, payload) => ({
    ...state,
    error: payload.error,
  })),

  on(AuthActions.getUserSuccess, (state, payload) => ({
    ...state,
    user: payload.user,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    token: '',
    user: null,
  }))
);
