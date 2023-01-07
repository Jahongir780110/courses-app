import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let service: AuthenticationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [IfNotAuthenticatedDirective, TestComponent],
    }).createComponent(TestComponent);

    template = fixture.nativeElement as HTMLElement;
    service = TestBed.inject(AuthenticationService);
  });

  it('shouln\'t show "Authenticated" text if authenticated', () => {
    fixture.detectChanges();
    service.login({
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    });

    expect(template.querySelector('div')).not.toBeTruthy();
  });
});
