import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Course[], filterText: string): Course[] {
    if (!filterText.length) {
      return value;
    }

    const copiedCourses = [...value];
    const filteredCourses = copiedCourses.filter((course) =>
      course.title.includes(filterText)
    );
    return filteredCourses;
  }
}
