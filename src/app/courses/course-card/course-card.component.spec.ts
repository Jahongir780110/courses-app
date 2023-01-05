import { DatePipe, UpperCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseService } from 'src/app/services/course.service';
import { ChangeBorderColorDirective } from 'src/app/shared/change-border-color.directive';
import { DurationPipe } from 'src/app/shared/duration.pipe';
import { PromptModalComponent } from 'src/app/shared/prompt-modal/prompt-modal.component';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let template: HTMLElement;
  let service: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [
        CourseCardComponent,
        DurationPipe,
        ChangeBorderColorDirective,
        PromptModalComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    service = TestBed.inject(CourseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "green" border color if the course is recent', () => {
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(2022, 11, 29),
      description: 'Sample description',
      topRated: true,
    };
    fixture.detectChanges();
    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('rgb(25, 135, 84)');
  });

  it('should have "blue" border color if the course is upcoming', () => {
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(2024, 11, 29),
      description: 'Sample description',
      topRated: true,
    };
    fixture.detectChanges();
    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('rgb(13, 110, 253)');
  });

  it('should have "transparent" border color if the course is very old', () => {
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(2020, 11, 29),
      description: 'Sample description',
      topRated: true,
    };
    fixture.detectChanges();
    expect(
      template.querySelector<HTMLElement>('.course-card')?.style.borderColor
    ).toBe('');
  });

  it('should emit "edit" once clicked "edit" button', () => {
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(),
      description: 'Sample description',
      topRated: true,
    };
    fixture.detectChanges();

    const spy = spyOn(component.edit, 'emit');
    const editBtn = template.querySelectorAll('.controls button')[0];

    editBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });

  it('should open prompt modal once clicked "delete" button', () => {
    component.course = service.getCourses()[0];
    fixture.detectChanges();

    const deleteBtn = template.querySelectorAll('.controls button')[1];
    deleteBtn.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(template.querySelector('app-prompt-modal')).toBeTruthy();
  });

  it('should remove course once delete() is called', () => {
    component.course = service.getCourses()[0];
    fixture.detectChanges();

    component.deleteCourse();
    fixture.detectChanges();

    expect(service.getCourses()).not.toContain(component.course);
  });

  it('should render title, duration, creationDate and description', () => {
    const durationPipe = new DurationPipe();
    const upperCasePipe = new UpperCasePipe();
    const datePipe = new DatePipe('en-EN');

    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(),
      description: 'Sample description',
      topRated: true,
    };
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
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(),
      description: 'Sample description',
      topRated: true,
    };
    fixture.detectChanges();
    expect(template.querySelector('.top-rated-icon')).toBeTruthy();
  });

  it('shouldn\'t have "star" icon if the course is top rated', () => {
    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: new Date(),
      description: 'Sample description',
      topRated: false,
    };
    fixture.detectChanges();
    expect(template.querySelector('.top-rated-icon')).not.toBeTruthy();
  });

  it('should console log "OnInit" when ngOnInit hook is called', () => {
    const spy = spyOn(window.console, 'log');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('OnInit');
  });

  it('should console log "AfterViewInit" when ngAfterViewInit hook is called', () => {
    const spy = spyOn(window.console, 'log');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith('AfterViewInit');
  });
});
