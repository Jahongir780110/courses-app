import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(value: Course[]): Course[] {
    const copiedCourses = [...value];
    copiedCourses.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    );
    return copiedCourses;
  }
}
