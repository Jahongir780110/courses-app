import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../state/app.state';
import { selectIsAuthenticated } from '../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  isAuthenticated = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store
      .select(selectIsAuthenticated)
      .subscribe((val) => (this.isAuthenticated = val));
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAuthenticated) {
      return of(true);
    }

    this.router.navigate(['/login']);
    return of(false);
  }
}
