import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Author } from '../models/author.model';
import { Course } from '../models/course.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [];

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  getCourses(start: number, count: number) {
    return this.http
      .get<any[]>(
        `${this.authService.backendUrl}/courses?start=${start}&count=${count}&sort=date`
      )
      .pipe(
        map((data) => {
          const courses: Course[] = [];
          for (const d of data) {
            const course: Course = {
              id: d.id,
              title: d.name,
              description: d.description,
              creationDate: new Date(d.date),
              duration: d.length,
              topRated: d.isTopRated,
              authors: d.authors,
            };
            courses.push(course);
          }

          this.courses = courses;
          return courses;
        })
      );
  }

  getCourse(id: number) {
    return this.http
      .get<any>(`${this.authService.backendUrl}/courses/${id}`)
      .pipe(
        map((data) => {
          const course: Course = {
            id: data.id,
            title: data.name,
            description: data.description,
            creationDate: new Date(data.date),
            duration: data.length,
            topRated: data.isTopRated,
            authors: data.authors,
          };
          return course;
        })
      );
  }

  createCourse(
    title: string,
    description: string,
    creationDate: Date,
    duration: number,
    isTopRated: boolean,
    authors: Author[]
  ) {
    return this.http.post<any>(`${this.authService.backendUrl}/courses`, {
      name: title,
      description,
      date: creationDate,
      length: duration,
      isTopRated,
      authors,
    });
  }

  updateCourse(
    id: number,
    title: string,
    description: string,
    duration: number,
    creationDate: Date,
    isTopRated: boolean,
    authors: Author[]
  ) {
    return this.http.patch<any>(
      `${this.authService.backendUrl}/courses/${id}`,
      {
        id,
        name: title,
        description,
        length: duration,
        date: creationDate,
        isTopRated,
        authors,
      }
    );
  }

  removeCourse(id: number) {
    return this.http.delete(`${this.authService.backendUrl}/courses/${id}`);
  }

  searchCourses(fragment: string) {
    return this.http
      .get<any[]>(
        `${this.authService.backendUrl}/courses?textFragment=${fragment}`
      )
      .pipe(
        map((data) => {
          const courses: Course[] = [];
          for (const d of data) {
            const course: Course = {
              id: d.id,
              title: d.name,
              description: d.description,
              duration: d.length,
              creationDate: new Date(d.date),
              topRated: d.isTopRated,
              authors: d.authors,
            };
            courses.push(course);
          }

          this.courses = courses;
        })
      );
  }
}
