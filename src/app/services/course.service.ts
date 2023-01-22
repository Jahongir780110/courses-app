import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getCourses(start: number, count: number) {
    return this.http.get<any[]>(
      `${this.backendUrl}/courses?start=${start}&count=${count}&sort=date`
    );
  }

  getCourse(id: number) {
    return this.http.get<any>(`${this.backendUrl}/courses/${id}`);
  }

  createCourse(
    title: string,
    description: string,
    duration: number,
    creationDate: Date,
    isTopRated: boolean,
    authors: Author[]
  ) {
    return this.http.post<any>(`${this.backendUrl}/courses`, {
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
    return this.http.patch<any>(`${this.backendUrl}/courses/${id}`, {
      id,
      name: title,
      description,
      length: duration,
      date: creationDate,
      isTopRated,
      authors,
    });
  }

  removeCourse(id: number) {
    return this.http.delete(`${this.backendUrl}/courses/${id}`);
  }

  searchCourses(fragment: string) {
    return this.http.get<any[]>(
      `${this.backendUrl}/courses?textFragment=${fragment}`
    );
  }

  getAuthors() {
    return this.http.get<Author[]>(`${this.backendUrl}/authors`);
  }
}
