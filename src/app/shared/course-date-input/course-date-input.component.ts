import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-date-input',
  templateUrl: './course-date-input.component.html',
  styleUrls: ['./course-date-input.component.css'],
})
export class CourseDateInputComponent {
  date = '';

  @Input() set value(val: Date) {
    const datePipe = new DatePipe('en');
    const formattedDate = datePipe.transform(val, 'yyyy-MM-dd') as string;

    this.date = formattedDate;
  }
  @Output() changed = new EventEmitter<Date>();

  changeDate(e: Event) {
    this.date = (e.target as HTMLInputElement).value;
    this.changed.emit(new Date(this.date));
  }
}
