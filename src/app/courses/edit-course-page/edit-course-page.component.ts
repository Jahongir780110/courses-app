import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css'],
})
export class EditCoursePageComponent implements OnInit {
  title = '';
  description = '';
  duration = 0;
  date!: Date;
  oldCourse: Course | null = null;

  constructor(
    private courseService: CourseService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId') as string;

    this.courseService.getCourse(+courseId).subscribe((course) => {
      this.oldCourse = course;

      this.title = course.title;
      this.description = course.description;
      this.duration = course.duration;
      this.date = course.creationDate;
    });
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
    this.loadingService.loadingChanged.next(true);

    const oldCourseCopy = { ...this.oldCourse } as Course;
    this.courseService
      .updateCourse(
        oldCourseCopy.id,
        this.title,
        this.description,
        this.duration,
        this.date,
        oldCourseCopy.topRated,
        []
      )
      .subscribe(() => {
        this.router.navigate(['courses']);

        this.loadingService.loadingChanged.next(false);
      });
  }

  cancel() {
    this.router.navigate(['courses']);
  }
}
