import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { PromptModalComponent } from './prompt-modal.component';

describe('PromptModalComponent', () => {
  let component: PromptModalComponent;
  let fixture: ComponentFixture<PromptModalComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptModalComponent],
      imports: [
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en-US.json'),
          uz: require('src/assets/i18n/uz-UZ.json'),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptModalComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "proceed" if confirm button is clicked', () => {
    fixture.detectChanges();

    const confirmBtn = template.querySelectorAll('.modal-footer button')[1];
    const spy = spyOn(component.proceed, 'emit');

    confirmBtn.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
