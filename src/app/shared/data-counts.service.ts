import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataCountsService {
  remittancecount: number = 0;
  reportscount: number = 0;
  announcementcount: number = 0;
  retailerapprovalcount: number = 0;
  manageitinerarycount: number = 0;
  remittanceReceivablecount: number = 0;
  receivablecount: number = 0;

  private dateRemittanceSource = new BehaviorSubject<number>(this.remittancecount);
  private reportsSource = new BehaviorSubject<number>(this.reportscount);
  private announcementSource = new BehaviorSubject<number>(this.announcementcount);
  private retailerApprovalSource = new BehaviorSubject<number>(this.retailerapprovalcount);
  private manageItinerarySource = new BehaviorSubject<number>(this.manageitinerarycount);
  private remittanceSource = new BehaviorSubject<number>(this.remittanceReceivablecount);
  private receivableSource = new BehaviorSubject<number>(this.receivablecount);

  currentRemittanceCount = this.dateRemittanceSource.asObservable();
  currentReportsCount = this.reportsSource.asObservable();
  currentAnnouncementCount = this.announcementSource.asObservable();
  currentRetailerApprovalCount = this.retailerApprovalSource.asObservable();
  currentManageItineraryCount = this.manageItinerarySource.asObservable();
  currentRemittanceRecievableCount = this.remittanceSource.asObservable();
  currentReceivableCount = this.receivableSource.asObservable();

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
  changeRetailerApprovalCount(dataRetailerApprovalcount: number) {
    this.retailerApprovalSource.next(dataRetailerApprovalcount);
  }
  changeManageItineraryCount(dataManageItinerarycount: number) {
    this.manageItinerarySource.next(dataManageItinerarycount);
  }

  changeRemittanceReceivableCount(dataRemittanceReceivablecount: number) {
    this.remittanceSource.next(dataRemittanceReceivablecount);
  }
  changeReceivableCount(dataReceivablecount: number) {
    this.receivableSource.next(dataReceivablecount);
  }
}
