import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let template: HTMLElement;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en-US.json'),
          uz: require('src/assets/i18n/uz-UZ.json'),
        }),
      ],
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain copyright text', () => {
    translateService.setDefaultLang('en');

    fixture.detectChanges();

    expect(template.querySelector('.footer div')?.innerHTML).toContain(
      'Copyright © Videocourses. All rights reserved'
    );
  });
});
