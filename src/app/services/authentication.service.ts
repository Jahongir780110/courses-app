import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Name } from '../models/name.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  backendUrl = 'http://localhost:3004';
  token = '';
  user: User | null = null;

  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated() {
    return this.token !== '' ? true : false;
  }

  login(login: string, password: string) {
    return this.http
      .post<any>(`${this.backendUrl}/auth/login`, {
        login,
        password,
      })
      .pipe(
        tap({
          next: (data) => {
            this.token = data.token;
            localStorage.setItem('token', data.token);

            this.authenticationChanged.emit(true);

            this.getUser().subscribe();
          },
        })
      );
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.authenticationChanged.emit(false);

    this.router.navigate(['/login']);
  }

  getUser() {
    return this.http
      .post<any>(`${this.backendUrl}/auth/userinfo`, {
        token: this.token,
      })
      .pipe(
        tap({
          next: (userData) => {
            this.user = {
              id: userData.id as number,
              token: userData.fakeToken as string,
              name: userData.name as Name,
              login: userData.login as string,
              password: userData.password as string,
            };

            localStorage.setItem('user', JSON.stringify(this.user));
          },
        })
      );
  }
}
