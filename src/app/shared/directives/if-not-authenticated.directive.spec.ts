import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of, tap } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { IfNotAuthenticatedDirective } from './if-not-authenticated.directive';

@Component({
  template: `<div *appIfNotAuthenticated id="authenticated">
    Authenticated
  </div>`,
})
class TestComponent {}

describe('IfNotAuthenticatedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let template: HTMLElement;
  let authService: AuthenticationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IfNotAuthenticatedDirective, TestComponent],
    }).createComponent(TestComponent);

    template = fixture.nativeElement as HTMLElement;
    authService = TestBed.inject(AuthenticationService);
  });

  it('shouln\'t show "Authenticated" text if authenticated', () => {
    spyOn(authService, 'login').and.returnValue(
      of({ token: 'fdas' }).pipe(
        tap((data) => {
          authService.token = data.token;
          authService.authenticationChanged.emit(true);
        })
      )
    );
    authService.login('sampleemail@gmail.com', '123456').subscribe();

    fixture.detectChanges();

    expect(template.querySelector('div')).not.toBeTruthy();
  });
});
