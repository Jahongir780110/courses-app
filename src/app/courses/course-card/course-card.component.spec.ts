import { DatePipe, UpperCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Course } from 'src/app/models/course.model';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let template: HTMLElement;
  let mockCourse: Course;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CourseCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    mockCourse = {
      id: 1,
      title: 'Sample title',
      description: 'Sample description',
      duration: 12,
      creationDate: new Date(),
      topRated: true,
      authors: [],
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "green" border color if the course is recent', () => {
    const oneDayInMilliSeconds = 1000 * 60 * 60 * 24;

    component.course = {
      ...mockCourse,
      creationDate: new Date(new Date().getTime() - oneDayInMilliSeconds),
    };

    fixture.detectChanges();

    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('rgb(25, 135, 84)');
  });

  it('should have "blue" border color if the course is upcoming', () => {
    component.course = { ...mockCourse, creationDate: new Date(2024, 0, 5) };

    fixture.detectChanges();

    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('rgb(13, 110, 253)');
  });

  it('should have "transparent" border color if the course is very old', () => {
    component.course = { ...mockCourse, creationDate: new Date(2020, 0, 5) };

    fixture.detectChanges();

    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('');
  });

  it('should emit "edit" once clicked "edit" button', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const spy = spyOn(component.edit, 'emit');
    const editBtn = template.querySelectorAll('.controls button')[0];

    editBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });

  it('should open prompt modal once clicked "delete" button', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const deleteBtn = template.querySelectorAll('.controls button')[1];
    deleteBtn.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(template.querySelector('app-prompt-modal')).toBeTruthy();
  });

  it('should emit delete once delete() is called', () => {
    const spy = spyOn(component.delete, 'emit');

    component.course = mockCourse;
    fixture.detectChanges();

    component.deleteCourse();

    expect(spy).toHaveBeenCalledWith(component.course.id);
  });

  it('should render title, duration, creationDate and description', () => {
    const durationPipe = new DurationPipe();
    const upperCasePipe = new UpperCasePipe();
    const datePipe = new DatePipe('en-EN');

    component.course = mockCourse;
    fixture.detectChanges();

    expect(template.querySelector('.title')?.textContent).toContain(
      upperCasePipe.transform(component.course.title)
    );
    expect(template.querySelector('.duration-text')?.textContent).toContain(
      durationPipe.transform(component.course.duration)
    );
    expect(template.querySelector('.date-text')?.textContent).toContain(
      datePipe.transform(component.course.creationDate, 'dd MMM, yyyy')
    );
    expect(template.querySelector('.description')?.textContent).toContain(
      component.course.description
    );
  });

  it('should have "star" icon if the course is top rated', () => {
    component.course = { ...mockCourse, topRated: true };
    fixture.detectChanges();

    expect(template.querySelector('.top-rated-icon')).toBeTruthy();
  });

  it('shouldn\'t have "star" icon if the course is not top rated', () => {
    component.course = { ...mockCourse, topRated: false };
    fixture.detectChanges();

    expect(template.querySelector('.top-rated-icon')).not.toBeTruthy();
  });
});
