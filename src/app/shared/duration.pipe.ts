import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const minutes = +value.split(' ')[0];
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = `${remainingMinutes}min`;
    if (hours) {
      result = `${hours}h ` + result;
    }

    return result;
  }
}
