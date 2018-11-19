import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RefreshDataService {
  newRetailer: boolean = false;
  refreshSuccess: boolean = false;
  private newRetailerSource = new BehaviorSubject<boolean>(this.newRetailer);
  private refreshSuccessSource = new BehaviorSubject<boolean>(this.refreshSuccess);

  currentnewRetailer = this.newRetailerSource.asObservable();
  currentrefreshSuccess = this.refreshSuccessSource.asObservable();
  constructor() { }

  changenewRetailer(isNewRetailer: boolean) {
    this.newRetailerSource.next(isNewRetailer)
  }
  changerefreshSuccess(isrefreshSuccess: boolean) {
    this.refreshSuccessSource.next(isrefreshSuccess)
  }
}
