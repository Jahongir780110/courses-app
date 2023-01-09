import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.module';
import { CourseCardComponent } from 'src/app/courses/course-card/course-card.component';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let template: HTMLElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes(routes)],
      declarations: [CoursesComponent, CourseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;

    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all course data', () => {
    fixture.detectChanges();
    expect(component.filteredCourses.length).toBeGreaterThan(0);
  });

  it('should show courses ordered by creation date', () => {
    fixture.detectChanges();
    const orderByPipe = new OrderByPipe();
    const orderedCourses = orderByPipe.transform(component.filteredCourses);

    expect(orderedCourses).toEqual([
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: 88,
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: 125,
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
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
    ]);
  });

  it('shouldn\'t show "log more" if there are no courses', () => {
    fixture.detectChanges();
    component.filteredCourses = [];
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

    component.filteredCourses = [];
    fixture.detectChanges();

    expect(template.querySelector('.no-data')).toBeTruthy();
  });

  it('should redirect to edit-course page when showEditCourse() is called', fakeAsync(() => {
    component.showEditCoursePage(1);

    tick();

    expect(location.path()).toBe('/1');
  }));

  it('should redirect to add-course page if "add course" button is clicked', fakeAsync(() => {
    const addCourseBtn = template.querySelector('.add-course button');
    addCourseBtn?.dispatchEvent(new Event('click'));

    tick();

    expect(location.path()).toBe('/new');
  }));
});
