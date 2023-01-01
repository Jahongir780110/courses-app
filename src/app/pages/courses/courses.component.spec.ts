import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseCardComponent } from 'src/app/components/course-card/course-card.component';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [CoursesComponent, CourseCardComponent],
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

  it('should console log search text once search button is clicked', () => {
    fixture.detectChanges();

    const searchInput = template.querySelector(
      '.search input'
    ) as HTMLInputElement;
    const searchBtn = template.querySelector(
      '.search button'
    ) as HTMLButtonElement;

    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));

    const spy = spyOn(window.console, 'log');
    searchBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should console log "log more" once clickin "LOAD MORE" button', () => {
    const loadMoreBtn = template.querySelector(
      '.load-more span'
    ) as HTMLButtonElement;
    const spy = spyOn(window.console, 'log');

    loadMoreBtn.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith('log more');
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
