import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-duration-input',
  templateUrl: './course-duration-input.component.html',
  styleUrls: ['./course-duration-input.component.css'],
})
export class CourseDurationInputComponent {
  duration = 0;

  @Output() changed = new EventEmitter<number>();

  changeDuration(e: Event) {
    this.duration = +(e.target as HTMLInputElement).value;
    this.changed.emit(this.duration);
  }
}
