import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${DateTimeFormatPipe.DATE_FMT} hh:mm:ss`;
  transform(value: any, args?: any): any {
    alert(value.delivery_date);
    return super.transform(value.delivery_date, DateTimeFormatPipe.DATE_TIME_FMT);
  }
}
