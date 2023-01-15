import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendarDays = faCalendarDays;
  faStar = faStar;

  showModal = false;

  editCourse() {
    this.edit.emit(this.course.id);
  }

  deleteCourse() {
    this.delete.emit(this.course.id);
  }
}
