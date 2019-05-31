import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: any): any { 
    return `${value.day}/${value.month}/${value.year}`
  }

}
