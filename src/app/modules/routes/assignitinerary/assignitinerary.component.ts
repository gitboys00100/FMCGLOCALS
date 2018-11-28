import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-assignitinerary',
  templateUrl: './assignitinerary.component.html',
  styleUrls: ['./assignitinerary.component.css']
})
export class AssignitineraryComponent implements OnInit {
  assignItineraryForm: FormGroup;
  submitted = false;

  @ViewChild('assignitineraryCreateModal') assignitineraryCreateModal : ModalComponent;
  @ViewChild('schedulepicker') schedulepicker : ModalComponent;
  itinerary: any[];
  agents: any[];
  calendarBtnHide: boolean = true;
  noDays: boolean = false;
  days: any[];
  selectedDay: string;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getItinerary();

    this.getAgents();
    this.days = [];

    this.assignItineraryForm.get('schedule').setValue('1111111');
  }
  createForm() {
    this.assignItineraryForm = this.formBuilder.group({
      itinerary: ['', Validators.required],
      agent: ['', Validators.required],
      schedule: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.assignItineraryForm.controls; }

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
  submitAgentItineraryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.assignItineraryForm.invalid) {
        return;
    }
    let itinerary_id = this.assignItineraryForm.get('itinerary').value;
    let agent = this.assignItineraryForm.get('agent').value;
    let schedule = this.assignItineraryForm.get('schedule').value;
    let agentItinerary = {};
    agentItinerary['itinerary_id'] = parseInt(itinerary_id);
    agentItinerary['user_id'] = parseInt(agent);
    agentItinerary['days'] = schedule;
    let agent_itinerary_json_string = JSON.stringify(agentItinerary);
    //alert(agent_itinerary_json_string);
    //this.assignItinerary('itineraries/agents/', agent_itinerary_json_string);
  }
  assignItinerary(url: string, load: string) {
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
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
    this.assignItineraryForm.get('schedule').setValue(this.getBinaryOfDays(this.days));
    let sched = this.assignItineraryForm.get('schedule').value;
    if(sched == '0000000') {
      this.assignItineraryForm.get('schedule').setValue(null);
      return;
    }
  }
  getBinaryOfDays(days: any[]) {
    console.log(days);
    let binaryString = "";
    for(var y=1;y<8;y++) {
      let found = false;
      for(var i=0;i<days.length;i++) {
        if(days[i].id == y) {
          found = true;
        }
      }
      if(found) {
        binaryString += '1';
      }
      else {
        binaryString += '0';
      }
    }
    return binaryString;
  }
  onOtherSelect() {
    this.calendarBtnHide = true;
    //
    let daily = '1111111';
    this.assignItineraryForm.get('schedule').setValue(daily);
  }
  openModal() {
    this.assignitineraryCreateModal.onModalOpen();
  }
  openSchedulePicker() {
    this.schedulepicker.onModalOpen();
  }
  closeSchedulePicker() {
    var form = <HTMLFormElement>document.getElementById('customScheduleForm');
    form.reset();
    this.days = [];
    this.schedulepicker.onModalClose();
  }
  saveSchedulePicker() {
    this.schedulepicker.onModalClose();
    this.assignItineraryForm.get('schedule').setValue(this.getBinaryOfDays(this.days));
    let sched = this.assignItineraryForm.get('schedule').value;
    if(sched == '0000000') {
      this.assignItineraryForm.get('schedule').setValue(null);
      return;
    }
  }
  closeModal() {
    var form = <HTMLFormElement>document.getElementById('assignItineraryForm');
    form.reset();
    this.days = [];
    this.assignitineraryCreateModal.onModalClose();
  }
}
