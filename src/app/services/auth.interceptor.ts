import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = '';

  constructor(private store: Store<AppState>) {
    this.store.select(selectToken).subscribe((val) => (this.token = val));
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const reqClone = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${this.token}`),
    });

    return next.handle(reqClone);
  }
}
