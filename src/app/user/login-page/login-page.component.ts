import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthError } from 'src/app/state/auth/auth.selectors';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form = {
    login: 'flastname',
    password: 'flastname',
  };
  loginError$ = this.store.select(selectAuthError);

  constructor(private store: Store<AppState>) {}

  async loginHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.login({
        login: this.form.login,
        password: this.form.password,
      })
    );
  }
}
