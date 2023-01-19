import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';

import { AuthorsInputComponent } from './authors-input.component';

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AuthorsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
