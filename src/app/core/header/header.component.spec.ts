import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let template: HTMLElement;
  let authService: AuthenticationService;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    authService = TestBed.inject(AuthenticationService);

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
    authService.login(user);
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[0].textContent
    ).toBe('User login');
  });

  it("should contain 'log off' if authenticated", () => {
    authService.login(user);
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[1].textContent
    ).toBe('Log off');
  });

  it('should log off if "Log off" button is clicked', () => {
    authService.login(user);
    fixture.detectChanges();

    const logOffBtn = template
      .querySelectorAll('.navbar-nav .nav-item')[1]
      .querySelector('span');
    logOffBtn?.dispatchEvent(new Event('click'));

    expect(authService.isAuthenticated()).toBeFalse();
  });
});
