import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.module';
import { User } from '../models/user.model';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let router: Router;
  let location: Location;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
    });

    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    mockUser = {
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    };
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should show isAuthenticated correctly', () => {
    let isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBeFalse;

    authService.login(mockUser);

    isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
  });

  it('logout() should clear user info and token and redirect to "login" page', fakeAsync(() => {
    authService.login(mockUser);
    authService.logout();

    tick();

    expect(location.path()).toBe('/login');
    expect(authService.user).toBeNull();
    expect(authService.token).toBe('');
  }));
});
