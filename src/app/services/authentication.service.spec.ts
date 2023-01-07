import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthenticationService);
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

  it('logout() should clear user info and token', () => {
    authService.login(mockUser);
    authService.logout();

    expect(authService.user).toBeNull();
    expect(authService.token).toBe('');
  });
});
