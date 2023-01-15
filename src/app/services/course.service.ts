import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Course } from '../models/course.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  getCourses(start: number, count: number) {
    return this.http.get<any[]>(
      `${this.authService.backendUrl}/courses?start=${start}&count=${count}&sort=date`
    );
  }

  getCourse(id: number) {
    return this.http.get<any>(`${this.authService.backendUrl}/courses/${id}`);
  }

  createCourse(
    title: string,
    description: string,
    duration: number,
    creationDate: Date,
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
    return this.http.get<any[]>(
      `${this.authService.backendUrl}/courses?textFragment=${fragment}`
    );
  }
}
