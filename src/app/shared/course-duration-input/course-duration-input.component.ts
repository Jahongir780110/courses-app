import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-duration-input',
  templateUrl: './course-duration-input.component.html',
  styleUrls: ['./course-duration-input.component.css'],
})
export class CourseDurationInputComponent {
  duration = 0;

  @Input() set value(val: number) {
    this.duration = val;
  }
  @Output() changed = new EventEmitter<number>();

  changeDuration(e: Event) {
    this.duration = +(e.target as HTMLInputElement).value;
    this.changed.emit(this.duration);
  }
}
