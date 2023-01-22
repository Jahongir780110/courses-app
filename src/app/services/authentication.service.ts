import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http.post<any>(`${this.backendUrl}/auth/login`, {
      login,
      password,
    });
  }

  getUser(token: string) {
    return this.http.post<any>(`${this.backendUrl}/auth/userinfo`, {
      token,
    });
  }
}
