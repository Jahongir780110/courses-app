import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ error: string }>()
);

export const getUser = createAction(
  '[Auth] Get User',
  props<{ token: string }>()
);

export const getUserSuccess = createAction(
  '[Auth] Get User Success',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');

export const autoLogin = createAction('[Auth] AutoLogin');
