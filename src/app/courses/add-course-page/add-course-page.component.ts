import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
})
export class AddCoursePageComponent {
  title = '';
  description = '';
  duration = 0;
  date = new Date();

  constructor(private courseService: CourseService, private router: Router) {}

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
    this.courseService
      .createCourse(
        this.title,
        this.description,
        this.date,
        this.duration,
        true,
        []
      )
      .subscribe(() => {
        this.router.navigate(['courses']);
      });
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
