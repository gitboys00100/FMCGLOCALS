import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatePickerService {
  today: Date = new Date();
  private dateSource = new BehaviorSubject<Date>(this.today);

  currentDate = this.dateSource.asObservable();

  constructor() { }

  changeDate(datepicked: Date) {
    this.dateSource.next(datepicked)
  }
}
