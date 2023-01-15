import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducers';

export const selectAuth = (state: AppState) => state.auth;

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.token !== ''
);
