import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterViewInit,
    OnDestroy
{
  @Input() course!: Course;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendarDays = faCalendarDays;

  ngOnInit() {
    console.log('OnInit');
  }
  ngOnChanges() {
    console.log('OnChanges');
  }
  ngDoCheck() {
    console.log('DoCheck');
  }
  ngAfterContentInit() {
    console.log('AfterContentInit');
  }
  ngAfterViewInit() {
    console.log('AfterViewInit');
  }
  ngOnDestroy() {
    console.log('OnDestroy');
  }

  editCourse() {
    this.edit.emit(this.course.id);
  }

  deleteCourse() {
    this.delete.emit(this.course.id);
  }
}
