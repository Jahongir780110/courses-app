import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CourseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;

    component.course = {
      id: 1,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: 'Sample creation date',
      description: 'Sample description',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "edit" once clicked "edit" button', () => {
    const spy = spyOn(component.edit, 'emit');
    const editBtn = template.querySelectorAll('.controls button')[0];

    editBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });

  it('should emit "delete" once clicked "delete" button', () => {
    const spy = spyOn(component.delete, 'emit');
    const deleteBtn = template.querySelectorAll('.controls button')[1];

    deleteBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });

  it('should render title, duration, creationDate and description', () => {
    expect(template.querySelector('.title')?.textContent).toContain(
      component.course.title
    );
    expect(template.querySelector('.duration-text')?.textContent).toContain(
      component.course.duration
    );
    expect(template.querySelector('.date-text')?.textContent).toContain(
      component.course.creationDate
    );
    expect(template.querySelector('.description')?.textContent).toContain(
      component.course.description
    );
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
