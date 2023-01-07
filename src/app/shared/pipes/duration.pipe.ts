import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 0) {
      return '0min';
    }

    const hours = Math.floor(value / 60);
    const remainingMinutes = value % 60;

    let result = `${remainingMinutes}min`;
    if (hours) {
      result = `${hours}h ` + result;
    }

    return result;
  }
}
