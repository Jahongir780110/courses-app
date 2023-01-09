import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
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
  date!: Date;

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
    const course: Course = {
      id: Math.random(),
      title: this.title,
      description: this.description,
      duration: this.duration,
      creationDate: this.date,
      topRated: true,
    };

    this.courseService.createCourse(course);

    this.router.navigate(['courses']);
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
