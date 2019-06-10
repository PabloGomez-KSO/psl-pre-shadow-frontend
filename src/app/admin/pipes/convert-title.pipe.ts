import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTitle'
})
export class ConvertTitlePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Startdate':
        return 'Start Date';
      case 'Releasedate':
        return 'Release Date';
      default:
        return value;
    }
  }
}


