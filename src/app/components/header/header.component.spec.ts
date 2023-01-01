import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoComponent } from '../logo/logo.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [HeaderComponent, LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    expect(template.querySelector('app-logo')).toBeTruthy();
  });

  it('should contain logo', () => {
    expect(template.querySelector('app-logo')).toBeTruthy();
  });

  it("should contain 'user login'", () => {
    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[0].textContent
    ).toBe('User login');
  });

  it("should contain 'log off'", () => {
    expect(
      template.querySelectorAll('.navbar-nav .nav-item span')[1].textContent
    ).toBe('Log off');
  });
});
