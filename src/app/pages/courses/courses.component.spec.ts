import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseCardComponent } from 'src/app/components/course-card/course-card.component';
import { DurationPipe } from 'src/app/shared/duration.pipe';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [
        CoursesComponent,
        CourseCardComponent,
        OrderByPipe,
        DurationPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all course data', () => {
    fixture.detectChanges();
    expect(component.courses.length).toBeGreaterThan(0);
  });

  it('should show courses ordered by creation date', () => {
    fixture.detectChanges();
    const orderByPipe = new OrderByPipe();
    const orderedCourses = orderByPipe.transform(component.courses);
    expect(orderedCourses).toEqual([
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: '27 min',
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: '88 min',
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: '125 min',
        creationDate: new Date(2018, 8, 3),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
    ]);
  });

  it('should filter courses once search button is clicked', () => {
    fixture.detectChanges();

    const searchInput = template.querySelector(
      '.search input'
    ) as HTMLInputElement;
    const searchBtn = template.querySelector(
      '.search button'
    ) as HTMLButtonElement;

    searchInput.value = '2';
    searchInput.dispatchEvent(new Event('input'));

    searchBtn.dispatchEvent(new Event('click'));

    expect(component.filteredCourses).toEqual([
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: '27 min',
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
    ]);
  });

  it('shouldn\'t show "log more" if there are no courses', () => {
    fixture.detectChanges();
    component.courses = [];
    fixture.detectChanges();

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;

    expect(loadMoreBtn).not.toBeTruthy();
  });

  it('should console log "log more" once clicking "LOAD MORE" button', () => {
    const spy = spyOn(window.console, 'log');
    fixture.detectChanges();

    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;

    loadMoreBtn.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith('log more');
  });

  it('should show "no courses" text if there are no courses', () => {
    fixture.detectChanges();
    component.courses = [];
    fixture.detectChanges();
    expect(template.querySelector('.no-data')).toBeTruthy();
  });

  it('should log course id when editCourse() is called', () => {
    const spy = spyOn(window.console, 'log');

    component.editCourse(55);
    expect(spy).toHaveBeenCalledWith(55);
  });

  it('should log course id when deleteCourse() is called', () => {
    const spy = spyOn(window.console, 'log');

    component.deleteCourse(55);
    expect(spy).toHaveBeenCalledWith(55);
  });
});
