import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';
import { ApiService } from '../../../shared/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as jQuery from 'jquery'; (window as any).jQuery = (window as any).$ = jQuery;
import * as bootstrap from "bootstrap";
import * as moment from 'moment'
import 'fullcalendar';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-routescheddaily',
  templateUrl: './routescheddaily.component.html',
  styleUrls: ['./routescheddaily.component.css']
})
export class RoutescheddailyComponent implements OnInit {
  itineraryList = [];
  loading: boolean;
  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;
  caldata = [];
  days: any[];
  calheader = '';
  timestamp = '';
  agentname = '';
  selectedDay: string;

  date;
  type;
  totalbalance;
  itid;
  retailers;
  aid;
  itaids;
  binarydays;

  @ViewChild('onSchedulerDetails') onSchedulerDetails: ModalComponent;
  @ViewChild('deleteConfirmation') deleteConfirmation: ModalComponent;
  @ViewChild('editModal') editModal: ModalComponent;
  @ViewChild('editRoutesModal') editRoutesModal: ModalComponent;
  selectedItinerary: string;
  itineraryOrder: any[];
  selectedRetailer: string;
  editRetailerDetails: FormGroup;
  noDays: boolean = false;

  constructor(private elRef: ElementRef,private formBuilder: FormBuilder, private apiService: ApiService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getItineraryList(this.date, this.type);
    this.caldata;
    this.calheader;
    this.timestamp;
    this.agentname;
    this.totalbalance;
    this.aid;
    this.itaids;

    this.selectedItinerary =  '';
    this.itineraryOrder = [];
    this.days = [];

  }

  public isOpen: boolean = false;

  createForm() {
    this.editRetailerDetails = this.formBuilder.group({
      retailer: '',
      number_of_items: '',
      balance: ''
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editRetailerDetails.controls; }

  getItineraryList(date: any, type: any) {
    this.loading = true;
    this.apiService.get('itineraries/agents/')
      .map((res:any) => res.data)
  		.subscribe((data:any[]) => {
        let item: any[] = JSON.parse('['+JSON.stringify(data)+']');
        // console.log("asd: "+JSON.stringify(Object.values(data)));
        this.itineraryList = Object.values(data);

        var datas = [];
        for (let entry of this.itineraryList) {

          var trimday = entry.days;
          var dayL = trimday.length;
          var newDate;

          if(dayL == 7){

            for(var i=0; i<dayL; i++){

              if(String(entry.days).charAt(i) === "1"){

                  var dayofMonth = this.getMondays(i,type);

                  for (var j = 0; j < dayofMonth.length; j++) {
                    var fname = entry.user['first_name'];
                    var lname = entry.user['last_name'];
                    var dataobj = {
                          id: entry.itinerary['id'],
                          title: entry.itinerary['name'],
                          start: this.getFormattedDate(dayofMonth[j]),
                          retailers: entry.itinerary['retailers'],
                          agent: fname+" "+lname,
                          userid: entry.user['id'],
                          itagentid: entry.id,
                          binary: entry.days,
                    }
                    datas.push(dataobj);
                  }
              }else{}

            }

          }else{
            console.log("NOT APPLICABLE SCHEDULE: "+JSON.stringify(entry.days).length);
          }
        }// end for
        $('#calendar').fullCalendar( 'destroy' );
        if(type == 'prev'){
          this.callCalendar(datas, date);
        }else if(type == 'next'){
          this.callCalendar(datas, date);
        }else{
          this.callCalendar(datas, moment());
        }


        this.loading = false;
      },
		(err) => {
			console.log(err);
		});
  }

  public callCalendar(datas: any, theDate: any){
    let self = this;
    $('#calendar').fullCalendar({
      // editable: true,
      eventLimit: true,
      customButtons: {
        custprev: {
            text: '<',
            click: function() {
                $('#calendar').fullCalendar('prev'); // call method
                var date = moment().subtract(1, "months");
                self.getItineraryList(date,"prev");

            }
        },custnext: {
            text: '>',
            click: function() {
                $('#calendar').fullCalendar('next'); // call method
                var date = moment().add(1, "months");
                self.getItineraryList(date,"next");
            }
        },

      },
      header: {
        left: 'title',
        center: '',
        right: 'custprev, today, custnext'
      },
      selectable: true,
      height: 600,
      eventSources: [
        {
            events: datas,
            color: '#6c757d',     // an option!
            textColor: '#fff' // an option!
        }
      ],
      eventClick: (event) => {
          // console.log(JSON.stringify(event.start))
          var totalarr = [];
          for(let i of event.retailers){
            var total = 0;
              for(let j of i.accounts_receivable){
                total += j.amount;
              }
              totalarr.push(total);
          }
          this.binarydays = event.binary;
          this.retailers = event.retailers;
          this.onSchedulerDetailsOpen(event.retailers,event.title,event.start,event.agent,
            totalarr,event.id,event.userid,event.itagentid);
      },
      defaultDate: theDate,
    });

  }

  public onSchedulerDetailsOpen(value: any, header: any, timedate: any,
    agent: any, total: any, id: any, userid: any, itaid: any) {
    this.caldata = value;
    this.calheader = header;
    this.timestamp = timedate;
    this.agentname = agent;
    this.totalbalance = total;
    this.itid = id;
    this.aid = userid;
    this.itaids = itaid;
		this.onSchedulerDetails.onModalOpen();
	}

  public onSchedulerDetailsClose() {
		this.onSchedulerDetails.onModalClose();
	}

  getFormattedDate(date) {
   var start = new Date(date);
   var year = start.getFullYear();

   var month = (1 + start.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;

   var day = start.getDate().toString();
   day = day.length > 1 ? day : '0' + day;

   return year + '-' + month + '-' + day;
 }

 getMondays(day, type){
   var monday;
   if(day == 0){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Sunday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Sunday");
     }else{
       monday = moment().startOf('month').day("Sunday");
     }
   }else if(day == 1){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Monday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Monday");
     }else{
       monday = moment().startOf('month').day("Monday");
     }
   }else if(day == 2){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Tuesday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Tuesday");
     }else{
       monday = moment().startOf('month').day("Tuesday");
     }
   }else if(day == 3){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Wednesday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Wednesday");
     }else{
       monday = moment().startOf('month').day("Wednesday");
     }
   }else if(day == 4){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Thursday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Thursday");
     }else{
       monday = moment().startOf('month').day("Thursday");
     }
   }else if(day == 5){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Friday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Friday");
     }else{
       monday = moment().startOf('month').day("Friday");
     }
   }else if(day == 6){
     if(type == 'next'){
       var futuremonth = moment().add(1, 'M');
       monday = moment(futuremonth).startOf('month').day("Saturday");
     }else if(type == 'prev'){
       var pastmonth = moment().subtract(1, 'M');
       monday = moment(pastmonth).startOf('month').day("Saturday");
     }else{
       monday = moment().startOf('month').day("Saturday");
     }
   }

   if (monday.date() > 7) monday.add(7,'d');
   var month = monday.month();
   var listofdays = [];
   while(month === monday.month()){
       listofdays.push(monday.toString());
       monday.add(7,'d');

   }

   return listofdays;

 }

 openEditModal(value: string) {
   this.selectedItinerary = value;

   for(var x=0;x<this.retailers.length;x++) {
     this.itineraryOrder.push(this.retailers[x].id);
   }
   this.editModal.onModalOpen();
 }
 closeEditModal() {
   this.editModal.onModalClose();
 }

//  ------------------------ DELETE ITINERARY -----------------------------------
 openDeleteConfirmationModal(value: string) {
   this.selectedItinerary = value;
   this.deleteConfirmation.onModalOpen();
 }
 deleteItinerary() {
   this.deleteItineraryAPI('itineraries/'+this.selectedItinerary+'/');
 }
 deleteItineraryAPI(url: string) {
   this.apiService.delete(url)
   .subscribe((response) => {
     if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
       alert('Success!');
       window.location.reload();
     }
     else {
       alert(response['code']+':'+response['message']);
     }
   });
 }

 updateItineraryOrder() {
   this.itineraryOrder = [];
   for(var x=0;x<this.retailers.length;x++) {
     this.itineraryOrder.push(this.retailers[x].id);
   }

   let itinerary = {};
   itinerary['name'] = this.calheader;//
   itinerary['retailers'] = this.itineraryOrder;
   let itinerary_json_string = JSON.stringify(itinerary);
   // alert(itinerary_json_string);
   this.updateItineraryAPI('itineraries/'+this.selectedItinerary+'/', itinerary_json_string);
 }
 updateItineraryAPI(url: string, json: string) {
   this.apiService.patch(url, json)
   .subscribe((response) => {
     if(response['code'] == 2004 && response['message'] == 'Entry updated') {
       alert('Success!');
       window.location.reload();
     }
     else {
       alert(response['code']+':'+response['message']);
     }
   });

 }

 closeDeleteConfirmationModal() {
   this.deleteConfirmation.onModalClose();
 }

 public toggleBody() {
   let rBody = this.elRef.nativeElement.querySelector('.row-body');
 if(!this.isOpen) {
   if (rBody.classList)
     rBody.classList.add('open');
   else
     rBody.className += 'open';
 }
 else {
   if (rBody.classList)
     rBody.classList.remove('open');
   else
     rBody.className = rBody.className.replate(/ *\b\S*?selected\S*\b/g, '');
 }
 this.isOpen = !this.isOpen;
  }

  public getTotalBalance(itineraryVal) {
    let total = 0;

     for (let i = 0; i < itineraryVal.itinerary_list.length; i++) {
       total += parseFloat(itineraryVal.itinerary_list[i].balance);

     }

    return total;
  }

  public openEditRoutesModal(){
    // alert(this.binarydays);
    // this.days = this.binarydays; 1010100
    this.days = [];
    var day = 0;
    for(var h=0;h<this.binarydays.length;h++){
        day = h+1;
        if(String(this.binarydays).charAt(h) == "1"){

          var alreadySelected: boolean = false;
          for(var i=0;i<this.days.length;i++) {
            if(this.days[i].id == h) {
              alreadySelected = true;
            }
          }

          var toPush = {};
          toPush['id'] = day;
          toPush['day'] = this.getDayDefinition(String(day));

          this.days.push(toPush);

          if(this.days.length > 0) {
            this.noDays = true;
          }
          else {
            this.noDays = false;
          }

        }
    }
    this.days = this.arrangeDays(this.days);
    this.editRoutesModal.onModalOpen();
  }

  saveSchedulePicker(aid,itaids) {
    var days = this.getBinaryOfDays(this.days);
    let itineraryAgent = {};
    itineraryAgent['user_id'] = aid;//
    itineraryAgent['days'] = days;
    let itinerary_json_string = JSON.stringify(itineraryAgent);
    this.saveAgentSchedule('itineraries/agents/'+itaids+'/', itinerary_json_string);
  }
  closeSchedulePicker() {
    this.days = [];
    this.editRoutesModal.onModalClose();
  }

  saveAgentSchedule(url: string, json: string){
    this.apiService.patch(url, json)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
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
    console.log(this.arrangeDays(this.days));
    this.days = this.arrangeDays(this.days);
  }

  getDayDefinition(val: string) {
    var desc = "";
    if(val == '1') {
      desc = "Sun";
    }
    else if(val == '2') {
      desc = "Mon";
    }
    else if(val == '3') {
      desc = "Tue";
    }
    else if(val == '4') {
      desc = "Wed";
    }
    else if(val == '5') {
      desc = "Thu";
    }
    else if(val == '6') {
      desc = "Fri";
    }
    else if(val == '7') {
      desc = "Sat";
    }
    return desc;
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

  onDaySelect(day: string) {
    this.selectedDay = day;
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

}
