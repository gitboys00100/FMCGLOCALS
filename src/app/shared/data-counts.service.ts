import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataCountsService {
  remittancecount: number = 0;
  reportscount: number = 0;
  announcementcount: number = 0;

  private dateRemittanceSource = new BehaviorSubject<number>(this.remittancecount);
  private reportsSource = new BehaviorSubject<number>(this.reportscount);
  private announcementSource = new BehaviorSubject<number>(this.announcementcount);

  currentRemittanceCount = this.dateRemittanceSource.asObservable();
  currentReportsCount = this.reportsSource.asObservable();
  currentAnnouncementCount = this.announcementSource.asObservable();

  constructor() { }

  changeRemittanceCount(dataRemittancecount: number) {
    this.dateRemittanceSource.next(dataRemittancecount);
  }
  changeReportsCount(dataReportscount: number) {
    this.reportsSource.next(dataReportscount);
  }
  changeAnnouncementCount(dataAnnouncementcount: number) {
    this.announcementSource.next(dataAnnouncementcount);
  }
}
