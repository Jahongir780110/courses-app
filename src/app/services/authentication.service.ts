import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User | undefined;
  token = '';

  login(user: User) {
    this.user = user;
    this.token = 'sample token';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', this.token);
  }

  logout() {
    this.user = undefined;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  get isAuthenticated() {
    return this.token !== '' ? true : false;
  }

  getUser() {
    return this.user;
  }
}
