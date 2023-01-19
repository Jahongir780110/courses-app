import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from '../shared.module';

import { AuthorsInputComponent } from './authors-input.component';

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en-US.json'),
          uz: require('src/assets/i18n/uz-UZ.json'),
        }),
      ],
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
