import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthError } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  login = 'flastname';
  password = 'flastname';
  error$ = this.store.select(selectAuthError);

  constructor(private store: Store<AppState>) {}

  async loginHandler(e: Event) {
    e.preventDefault();

    this.store.dispatch(
      AuthActions.login({ login: this.login, password: this.password })
    );
  }
}
