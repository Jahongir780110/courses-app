import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Course } from 'src/app/models/course.model';

import { CourseCardComponent } from './course-card.component';

@Component({
  template: ` <app-course-card
    [course]="course"
    (edit)="editCourse($event)"
    (delete)="deleteCourse($event)"
  >
  </app-course-card>`,
})
class TestHostComponent {
  course: Course = {
    id: 4,
    title: 'Sample title',
    duration: 'Sample duration',
    creationDate: 'Sample date',
    description: 'Sample description',
  };
  selectedId: number | undefined;

  editCourse(id: number) {
    this.selectedId = id;
  }
  deleteCourse(id: number) {
    this.selectedId = id;
  }
}

describe('CourseCardComponentInsideHost', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CourseCardComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change selectedId when "edit" button is clicked', () => {
    const editBtn = fixture.nativeElement.querySelectorAll(
      '.controls button'
    )[0] as HTMLButtonElement;

    editBtn.dispatchEvent(new Event('click'));

    expect(testHost.selectedId).toBe(testHost.course.id);
  });

  it('should change selectedId when "delete" button is clicked', () => {
    const deleteBtn = fixture.nativeElement.querySelectorAll(
      '.controls button'
    )[1] as HTMLButtonElement;

    deleteBtn.dispatchEvent(new Event('click'));

    expect(testHost.selectedId).toBe(testHost.course.id);
  });
});
