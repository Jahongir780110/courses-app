import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent {
  title = '';
  description = '';
  duration = 0;
  date!: Date;

  constructor(authenticationService: AuthenticationService) {
    console.log(authenticationService);
  }

  changeTitle(e: Event) {
    this.title = (e.target as HTMLInputElement).value;
  }

  changeDescription(e: Event) {
    this.description = (e.target as HTMLTextAreaElement).value;
  }

  changeDuration(e: number) {
    this.duration = e;
  }

  changeDate(e: Date) {
    this.date = e;
  }

  save() {
    console.log(this.title, this.description, this.duration, this.date);
  }

  cancel() {
    console.log('cancelled');
  }
}
