import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

import { createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { Name } from 'src/app/models/name.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppState } from '../app.state';
import * as LoadingActions from '../loading/loading.actions';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.login),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.authService.login(action.login, action.password)).pipe(
          map((data: any) => {
            return AuthActions.loginSuccess({ token: data.token });
          }),

          tap((data) => {
            localStorage.setItem('token', data.token);

            this.store.dispatch(LoadingActions.setLoading({ value: false }));
            this.store.dispatch(AuthActions.getUser({ token: data.token }));

            this.router.navigate(['/courses']);
          }),

          catchError((error: any) => {
            this.store.dispatch(LoadingActions.setLoading({ value: false }));

            const errorMessage =
              typeof error.error === 'string'
                ? error.error
                : 'Oops! Something went wrong!';
            return of(AuthActions.loginError({ error: errorMessage }));
          })
        );
      })
    );
  });

  getUser$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.getUser),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.authService.getUser(action.token)).pipe(
          map((data: any) => {
            this.store.dispatch(LoadingActions.setLoading({ value: false }));

            const user: User = {
              id: data.id as number,
              token: data.fakeToken as string,
              name: data.name as Name,
              login: data.login as string,
              password: data.password as string,
            };

            localStorage.setItem('user', JSON.stringify(user));

            return AuthActions.getUserSuccess({ user });
          })
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');

          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );
}
