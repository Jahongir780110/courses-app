import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipe } from '../pipes/duration.pipe';

import { CourseDurationInputComponent } from './course-duration-input.component';

describe('CourseDurationInputComponent', () => {
  let component: CourseDurationInputComponent;
  let fixture: ComponentFixture<CourseDurationInputComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDurationInputComponent, DurationPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDurationInputComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show duration in formatted way', () => {
    component.duration = 73;
    fixture.detectChanges();

    const durationPipe = new DurationPipe();
    const formattedDuration = durationPipe.transform(component.duration);

    expect(template.querySelector('.duration-value')?.textContent).toContain(
      formattedDuration
    );
  });
});
