import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-date-input',
  templateUrl: './course-date-input.component.html',
  styleUrls: ['./course-date-input.component.css'],
})
export class CourseDateInputComponent {
  date = '';

  @Output() changed = new EventEmitter<Date>();

  changeDate(e: Event) {
    this.date = (e.target as HTMLInputElement).value;
    this.changed.emit(new Date(this.date));
  }
}
