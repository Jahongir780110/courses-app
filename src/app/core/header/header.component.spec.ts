import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IfAuthenticatedDirective } from 'src/app/shared/if-authenticated.directive';
import { LogoComponent } from '../../shared/logo/logo.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let template: HTMLElement;
  let service: AuthenticationService;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [HeaderComponent, LogoComponent, IfAuthenticatedDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    service = TestBed.inject(AuthenticationService);

    user = {
      id: 1,
      email: 'sampleemail@gmail.com',
      password: '123456',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    expect(template.querySelector('app-logo')).toBeTruthy();
  });

  it("should contain 'user login' if authenticated", () => {
    service.login(user);
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[0].textContent
    ).toBe('User login');
  });

  it("should contain 'log off' if authenticated", () => {
    service.login(user);
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[1].textContent
    ).toBe('Log off');
  });

  it('should log off if "Log off" button is clicked', () => {
    service.login(user);
    fixture.detectChanges();
    const logOffBtn = template
      .querySelectorAll('.navbar-nav .nav-item')[1]
      .querySelector('span');
    logOffBtn?.dispatchEvent(new Event('click'));
    expect(service.isAuthenticated()).toBeFalse();
  });
});
