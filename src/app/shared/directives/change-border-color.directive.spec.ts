import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeBorderColorDirective } from './change-border-color.directive';

@Component({
  template: `<div appChangeBorderColor [date]="date">test</div>`,
})
class TestComponent {
  date!: Date;
}

describe('ChangeBorderColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let template: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ChangeBorderColorDirective, TestComponent],
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
  });

  it('should create an instance', () => {
    const directive = new ChangeBorderColorDirective({
      nativeElement: document.createElement('div'),
    });

    expect(directive).toBeTruthy();
  });

  it('should have green border color for recent course', () => {
    const oneDayInMilliSeconds = 1000 * 60 * 60 * 24;
    component.date = new Date(new Date().getTime() - oneDayInMilliSeconds);

    fixture.detectChanges();

    expect(template.querySelector('div')?.style.borderColor).toBe(
      'rgb(25, 135, 84)'
    );
  });

  it('should have blue border color for upcoming course', () => {
    component.date = new Date(2024, 1, 2);

    fixture.detectChanges();

    expect(template.querySelector('div')?.style.borderColor).toBe(
      'rgb(13, 110, 253)'
    );
  });

  it('should have transparent border color for old course', () => {
    component.date = new Date(2021, 1, 2);

    fixture.detectChanges();

    expect(template.querySelector('div')?.style.borderColor).toBe('');
  });
});
