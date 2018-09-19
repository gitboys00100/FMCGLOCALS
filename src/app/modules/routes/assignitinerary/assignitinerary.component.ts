import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

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

  constructor() { }

  ngOnInit() {
    this.itinerary = [{
       "status":"2001",
       "message":"Success",
       "data":[
        {
         "name":"Agent ABC Monday Route",
         "agent": "Juan Dela Cruz",
         "date":[
           "1533192780000",
           "1533279180000",
           "1533106380000"
         ],
         "retailers": [
          {
           "retailer_id": 1,
           "retailer_name": "Yangon123 Store",
           "owner": "Hii Hello",
           "coordinates": "16.1234567,96.0004",
           "credit_limit": 1000000,
           "current_credit": 250000,
           "status": "Active",
           "image": "mobile/images/213131231.jpg",
           "house_number": "12",
           "street_name": "Hii Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 6,
           "retailer_name": "Myan Store",
           "owner": "Myan Marrr",
           "coordinates": "16.10,95.0004",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/34324442.jpg",
           "house_number": "4",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 9,
           "retailer_name": "MM Store",
           "owner": "Mu Nin",
           "coordinates": "16.34,95.0004",
           "credit_limit": 2000000,
           "current_credit": 150000,
           "status": "Active",
           "image": "mobile/images/9890384024.jpg",
           "house_number": "4",
           "street_name": "Dog Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        },
        {
         "name":"Agent Test",
         "agent": "Juan Dela Cruz",
         "date":[
           "1519862400000"
         ],
         "retailers": [
          {
           "retailer_id": 1,
           "retailer_name": "Yangon123 Store",
           "owner": "Hii Hello",
           "coordinates": "16.1234567,96.0004",
           "credit_limit": 1000000,
           "current_credit": 250000,
           "status": "Active",
           "image": "mobile/images/213131231.jpg",
           "house_number": "12",
           "street_name": "Hii Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 6,
           "retailer_name": "Myan Store",
           "owner": "Myan Marrr",
           "coordinates": "16.10,95.0004",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/34324442.jpg",
           "house_number": "4",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 9,
           "retailer_name": "MM Store",
           "owner": "Mu Nin",
           "coordinates": "16.34,95.0004",
           "credit_limit": 2000000,
           "current_credit": 150000,
           "status": "Active",
           "image": "mobile/images/9890384024.jpg",
           "house_number": "4",
           "street_name": "Dog Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        },
        {
         "name":"Agent ABC Wednesday Route",
         "agent": "John Doe",
         "date": [
           "1533451980000"
         ],
         "retailers": [
          {
           "retailer_id": 4,
           "retailer_name": "Hmm Store",
           "owner": "Hmm Hii",
           "coordinates": "15.9990,96.01",
           "credit_limit": 1000000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/83498237423.jpg",
           "house_number": "1",
           "street_name": "Hmm Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 5,
           "retailer_name": "G Store",
           "owner": "G El",
           "coordinates": "16.5,95.55",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/32424234.jpg",
           "house_number": "7",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        }
       ],
       "pagination": {
        "offset":20,
        "limit":10,
        "total":1
       }
    }];

    this.agents = [{
    "status": "2003",
    "message": "Results found",
    "data": [
      {
        "user_id": 12345,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentABC",
        "first_name": "John",
        "last_name": "Doe",
        "session": ""
      },
      {
        "user_id": 12346,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentDEF",
        "first_name": "Agent",
        "last_name": "X",
        "session": ""
      },
      {
        "user_id": 12347,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentGHI",
        "first_name": "Hanamichi",
        "last_name": "Sakuragi",
        "session": ""
      }
    ],
    "pagination": {
      "offset": 20,
      "limit": 10,
      "total": 1
      }
    }];
    this.days = [];
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
