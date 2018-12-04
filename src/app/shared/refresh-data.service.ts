import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RefreshDataService {
  newRetailer: boolean = false;
  newItinerary: boolean = false;
  refreshSuccess: boolean = false;

  private newRetailerSource = new BehaviorSubject<boolean>(this.newRetailer);
  private newItinerarySource = new BehaviorSubject<boolean>(this.newItinerary);
  private refreshSuccessSource = new BehaviorSubject<boolean>(this.refreshSuccess);

  currentnewRetailer = this.newRetailerSource.asObservable();
  currentnewItinerary = this.newItinerarySource.asObservable();
  currentrefreshSuccess = this.refreshSuccessSource.asObservable();
  constructor() { }

  changenewRetailer(isNewRetailer: boolean) {
    this.newRetailerSource.next(isNewRetailer)
  }
  changenewItinerary(isNewItinerary: boolean) {
    this.newItinerarySource.next(isNewItinerary)
  }
  changerefreshSuccess(isrefreshSuccess: boolean) {
    this.refreshSuccessSource.next(isrefreshSuccess)
  }
}
