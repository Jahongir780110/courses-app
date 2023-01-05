import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User | null = null;
  token = '';

  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  isAuthenticated() {
    return this.token !== '' ? true : false;
  }

  login(user: User) {
    this.user = user;
    this.token = 'sample token';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', this.token);

    this.authenticationChanged.emit(true);
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.authenticationChanged.emit(false);
  }

  getUser() {
    return this.user;
  }
}
