import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-assignitinerary',
  templateUrl: './assignitinerary.component.html',
  styleUrls: ['./assignitinerary.component.css']
})
export class AssignitineraryComponent implements OnInit {
  @ViewChild('assignitineraryCreateModal') assignitineraryCreateModal : ModalComponent;
  @ViewChild('schedulepicker') schedulepicker : ModalComponent;
  itinerary: any[];
  agents: any[];
  calendarBtnHide: boolean = true;
  noDays: boolean = false;
  days: any[];
  selectedDay: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getItinerary();

    this.getAgents();
    this.days = [];
  }
  getItinerary() {
    this.apiService.get('itineraries/')
      .subscribe(itin=> {
        let data: any[] = JSON.parse('['+JSON.stringify(itin)+']');
        this.itinerary = Object.values(data);
      },
      (err)=> {
          console.log(err);
    });
  }
  getAgents() {
    this.apiService.get('users/')
      .subscribe(a=> {
        let data: any[] = JSON.parse('['+JSON.stringify(a)+']');
        this.agents = Object.values(data);
      },
      (err)=> {
          console.log(err);
    });
  }
  onDaySelect(day: string) {
    this.selectedDay = day;
  }
  getDayDefinition(val: string) {
    var desc = "";
    if(val == '1') {
      desc = "Mon";
    }
    else if(val == '2') {
      desc = "Tue";
    }
    else if(val == '3') {
      desc = "Wed";
    }
    else if(val == '4') {
      desc = "Thu";
    }
    else if(val == '5') {
      desc = "Fri";
    }
    else if(val == '6') {
      desc = "Sat";
    }
    else if(val == '7') {
      desc = "Sun";
    }
    return desc;
  }
  addDay(day: string) {
    var alreadySelected: boolean = false;
    for(var i=0;i<this.days.length;i++) {
      if(this.days[i].id == day) {
        alreadySelected = true;
      }
    }
    var toPush = {};
    toPush['id'] = day;
    toPush['day'] = this.getDayDefinition(day);
    if(!alreadySelected) {
      this.days.push(toPush);
    }
    if(this.days.length > 0) {
      this.noDays = true;
    }
    else {
      this.noDays = false;
    }
    this.days = this.arrangeDays(this.days);
  }
  arrangeDays(arrDay: any[]) {
    var tempArr = [];
    for(var x=1;x<8;x++) {
      for(var i=0;i<arrDay.length;i++) {
        if(arrDay[i].id == (x)) {
          var t = {};
          t['id'] = arrDay[i].id;
          t['day'] = arrDay[i].day;
          tempArr.push(t);
        }
      }
    }
    return tempArr;
  }
  removeDay(day: string) {
    for(var i=0;i<this.days.length;i++) {
      if(this.days[i].id == day) {
        this.days.splice(i, 1);
      }
    }
    if(this.days.length > 0) {
      this.noDays = true;
    }
    else {
      this.noDays = false;
    }
  }
  onCustomCheck() {
    this.calendarBtnHide = false;
  }
  onOtherSelect() {
    this.calendarBtnHide = true;
  }
  openModal() {
    this.assignitineraryCreateModal.onModalOpen();
  }
  openSchedulePicker() {
    this.schedulepicker.onModalOpen();
  }
  closeSchedulePicker() {
    this.schedulepicker.onModalClose();
  }
  closeModal() {
    this.days = [];
    this.assignitineraryCreateModal.onModalClose();
  }
}
