import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-newitinerary',
  templateUrl: './newitinerary.component.html',
  styleUrls: ['./newitinerary.component.css'],
  providers: []
})
export class NewitineraryComponent implements OnInit {
  newItineraryForm: FormGroup;
  submitted = false;

  @ViewChild('itineraryCreateModal') itineraryCreateModal : ModalComponent;
  @ViewChild('schedulepicker') schedulepicker : ModalComponent;

  retailers: any[];
  arrRetailers: any[];
  selectedRetailers: any[];
  selectedRetIds: any[];
  selectedRet: string;
  noRetailer: boolean = false;
  validRetBox: boolean = false;
  calendarBtnHide: boolean = true;
  days: any[];
  selectedDay: string;
  agents: any[];
  noDays: boolean = false;
  retailersByAgent: any[];
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.retailers = [];
    this.retailersByAgent = [];
    this.getRetailers();
    this.getAgents();
    this.selectedRetailers = [];
    this.selectedRetIds = [];
    this.days = [];
    this.newItineraryForm.get('schedule').setValue('1111111');
  }
  createForm() {
    this.newItineraryForm = this.formBuilder.group({
      agent: ['', Validators.required],
      itinerary_name: ['', Validators.required],
      retailers: ['', Validators.required],
      schedule: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newItineraryForm.controls; }
  getRetailerByAgent(value: string) {
    var ret = this.retailers[2];
    var retByAgent = [];
    ret.forEach(function(r){
      var found = false;
      var assigned_agents = r.assigned_agents;
      assigned_agents.forEach(function(a) {
          if(a.id == value) {
            found = true;
          }
      });
      //if found get this retailer
      if(found) {
        var toPush = {};
        toPush['id'] = r.id;
        toPush['name'] = r.name;
        retByAgent.push(toPush);
      }
    });
    console.log(retByAgent);
    this.selectedRetailers = [];
    this.newItineraryForm.get('retailers').setValue(null);
    this.retailersByAgent = retByAgent;
  }
  getRetailers() {
    this.apiService.get('retailers/')
		.subscribe(ret => {
      let data = JSON.parse(JSON.stringify(ret));
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      var obj = Object.values(data);
      this.retailers = obj;
    },
		(err) => {
			console.log(err);
		});
  }
  getAgents() {
    this.apiService.get('users/?role=Sales%20Agent')
      .subscribe(a=> {
        let data: any[] = JSON.parse('['+JSON.stringify(a)+']');
        this.agents = Object.values(data);
      },
      (err)=> {
          console.log(err);
    });
  }
  addRetailer(id: string){
    //alert(this.retailers[0].data[0].name+'sad');
    var retName: string;
    var ret = this.retailersByAgent;
    for(var i=0;i<ret.length;i++) {
      //alert(ret[i].name);
      if(id == ret[i].id) {
        retName = ret[i].name;
      }
    }
    var toPush = {};
    toPush['id'] = id;
    toPush['name'] = retName;
    //check selected retailer
    var alreadySelected: boolean = false;
    for(var i=0;i<this.selectedRetailers.length;i++) {
      if(this.selectedRetailers[i].id == id) {
        alreadySelected = true;
      }
    }
    if((id) && (retName) && (!alreadySelected)) {
      this.selectedRetailers.push(toPush);
      this.selectedRetIds.push(parseInt(id));
      this.newItineraryForm.get('retailers').setValue(this.selectedRetIds);
      this.noRetailer = true;
      console.log(this.selectedRetIds);
    }
    if(this.selectedRetIds.length > 0) {
      //this.f.retailers.errors = null;
      this.validRetBox = true;
    }
    else {
      this.validRetBox = false;
    }
  }
  onRetaileRemove(id: string) {
    var ret = this.selectedRetailers;
    for(var i=0;i<ret.length;i++) {
      if(ret[i].id == id) {
        this.selectedRetailers.splice(i, 1);
        this.selectedRetIds.splice(i, 1);
      }
    }
    if(ret.length == 0) {
      this.noRetailer = false;
    }

    if(this.selectedRetIds.length > 0) {
      this.validRetBox = true;
    }
    else {
      this.validRetBox = false;
      //this.f.retailers.errors = {}  ;
      this.newItineraryForm.get('retailers').setValue(null);
    }
  }
  submitItineraryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newItineraryForm.invalid) {
        return;
    }
    let i_name = this.newItineraryForm.get('itinerary_name').value;
    let i_retailers = this.newItineraryForm.get('retailers').value;
    let i_user = environment.user_id; //this should be the id of user login
    let i_agent = this.newItineraryForm.get('agent').value;
    let i_schedule = this.newItineraryForm.get('schedule').value;

    let itinerary = {};
    itinerary['user_id'] = i_user;//
    itinerary['name'] = i_name;
    itinerary['retailers'] = i_retailers;
    let itinerary_json_string = JSON.stringify(itinerary);

    this.createItinerary('itineraries/', itinerary_json_string, i_agent, i_schedule);
  }
  createItinerary(url: string, load: string, user_id: string, days: number) {
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        console.log('success add itinerary');

        let agentItinerary = {};
        agentItinerary['itinerary_id'] = response['body']['data']['id'];
        agentItinerary['user_id'] = user_id;
        agentItinerary['days'] = days;
        let agent_itinerary_json_string = JSON.stringify(agentItinerary);

        this.assignItinerary('itineraries/agents/', agent_itinerary_json_string);
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }

  assignItinerary(url: string, load: string) {
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        console.log('success assigning agent!');
        window.location.reload();
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }
  onRetailerSelect(id: string) {
    this.selectedRet = id;
  }
  openModal() {
    this.itineraryCreateModal.onModalOpen();
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
    this.newItineraryForm.get('schedule').setValue(this.getBinaryOfDays(this.days));
    let sched = this.newItineraryForm.get('schedule').value;
    if(sched == '0000000') {
      this.newItineraryForm.get('schedule').setValue(null);
      return;
    }
  }
  closeModal() {
    //this.newRetailerForm.reset();
    var form = <HTMLFormElement>document.getElementById('newItineraryForm');
    form.reset();
    this.selectedRetailers = [];
    this.selectedRetIds = [];
    this.itineraryCreateModal.onModalClose();
  }

  onCustomCheck() {
    this.calendarBtnHide = false;
    this.newItineraryForm.get('schedule').setValue(this.getBinaryOfDays(this.days));
    let sched = this.newItineraryForm.get('schedule').value;
    if(sched == '0000000') {
      this.newItineraryForm.get('schedule').setValue(null);
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

  onOtherSelect() {
    this.calendarBtnHide = true;
    //
    let daily = '1111111';
    this.newItineraryForm.get('schedule').setValue(daily);
  }
}
